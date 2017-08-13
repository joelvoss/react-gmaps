import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleLibraryService from 'utilities/GoogleLibraryService';
import escapeRegExp from 'utilities/escapeRegExp';
import debounce from 'lodash.debounce';

import filterInputAttributes from './filter-input-attributes';

import Input from './input';
import SuggestList from './suggest-list';



/**
 * Entry point for the Geosuggest component
 */
class Geosuggest extends Component {

  static propTypes = {
    config: PropTypes.object.isRequired,
    queryDelay: PropTypes.number
  }

  state = {
    isSuggestsHidden: true,
    isLoading: false,
    userInput: this.props.initialValue,
    activeSuggest: null,
    suggests: []
  }

  /**
   * Called on the client side after component is mounted.
   * Google api sdk object will be obtained and cached as a instance property.
   * Necessary objects of google api will also be determined and saved.
   */
  async componentWillMount() {
    const { config } = this.props;
    // Load the google maps library
    const google = await GoogleLibraryService(config);

    this.autocompleteService = new google.places.AutocompleteService();
    this.geocoder = new google.Geocoder();
  }

  /**
   * When the component will unmount
   */
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  /**
   * When the input changed
   * @param {String} userInput The input value of the user
   */
  onInputChange = userInput => {
    this.setState({userInput}, this.onAfterInputChange);
  };

  /**
   * On After the input got changed
   */
  onAfterInputChange = debounce(() => {
    if (!this.state.isSuggestsHidden) {
      this.showSuggests();
    }
  }, this.props.queryDelay);

  /**
   * When the input gets focused
   */
  onInputFocus = () => {
    this.showSuggests();
  };

  /**
   * When the input gets blurred
   */
  onInputBlur = () => {
    if (!this.state.ignoreBlur) {
      this.hideSuggests();
    }
  };

  onNext = () => this.activateSuggest('next');

  onPrev = () => this.activateSuggest('prev');

  onSelect = () => this.selectSuggest(this.state.activeSuggest);

  onSuggestMouseDown = () => this.setState({ignoreBlur: true});

  onSuggestMouseOut = () => this.setState({ignoreBlur: false});

  onSuggestNoResults = () => {
    this.props.onSuggestNoResults(this.state.userInput);
  };

  /**
   * Search for new suggests
   */
  searchSuggests() {
    if (!this.state.userInput) {
      this.updateSuggests();
      return;
    }

    const options = {
        input: this.state.userInput
      },
      inputLength = this.state.userInput.length,
      isShorterThanMinLength = inputLength < this.props.minLength;

    if (isShorterThanMinLength) {
      return;
    }

    ['location', 'radius', 'bounds', 'types'].forEach(option => {
      if (this.props[option]) {
        options[option] = this.props[option];
      }
    });

    if (this.props.country) {
      options.componentRestrictions = {
        country: this.props.country
      };
    }

    this.setState({isLoading: true}, () => {
      this.autocompleteService.getPlacePredictions(
        options,
        suggestsGoogle => {
          this.setState({isLoading: false});
          this.updateSuggests(suggestsGoogle || [], // can be null
            () => {
              if (this.props.autoActivateFirstSuggest &&
                !this.state.activeSuggest
              ) {
                this.activateSuggest('next');
              }
            });
        }
      );
    });
  }

  /**
   * Update the suggests
   * @param {Array} suggestsGoogle The new google suggests
   * @param {Function} callback Called once the state has been updated
   */
  updateSuggests(suggestsGoogle = [], callback) {
    var suggests = [],
      userInput = this.state.userInput,
      regex = new RegExp(escapeRegExp(userInput), 'gim'),
      skipSuggest = this.props.skipSuggest,
      maxFixtures = this.props.maxFixtures,
      fixturesSearched = 0,
      activeSuggest = null;

    this.props.fixtures.forEach(suggest => {
      if (fixturesSearched >= maxFixtures) {
        return;
      }

      if (!skipSuggest(suggest) && suggest.label.match(regex)) {
        fixturesSearched++;

        suggest.placeId = suggest.label;
        suggest.isFixture = true;
        suggest.matchedSubstrings = {
          offset: suggest.label.indexOf(userInput),
          length: userInput.length
        };
        suggests.push(suggest);
      }
    });

    suggestsGoogle.forEach(suggest => {
      if (!skipSuggest(suggest)) {
        suggests.push({
          description: suggest.description,
          label: this.props.getSuggestLabel(suggest),
          placeId: suggest.place_id,
          isFixture: false,
          matchedSubstrings: suggest.matched_substrings[0]
        });
      }
    });

    activeSuggest = this.updateActiveSuggest(suggests);
    this.setState({suggests, activeSuggest}, callback);
  }

  /**
   * Return the new activeSuggest object after suggests have been updated
   * @param {Array} suggests The new list of suggests
   * @return {Object} The new activeSuggest
   **/
  updateActiveSuggest(suggests = []) {
    let activeSuggest = this.state.activeSuggest;

    if (activeSuggest) {
      const newSuggest = suggests.filter(listedSuggest =>
        activeSuggest.placeId === listedSuggest.placeId &&
        activeSuggest.isFixture === listedSuggest.isFixture
      )[0];

      activeSuggest = newSuggest || null;
    }

    return activeSuggest;
  }

  /**
   * Show the suggestions
   */
  showSuggests() {
    this.searchSuggests();
    this.setState({isSuggestsHidden: false});
  }

  /**
   * Hide the suggestions
   */
  hideSuggests = () => {
    this.props.onBlur(this.state.userInput);
    this.timer = setTimeout(() => {
      this.setState({
        isSuggestsHidden: true,
        activeSuggest: null
      });
    }, 100);
  };

  /**
   * Activate a new suggest
   * @param {String} direction The direction in which to activate new suggest
   */
  activateSuggest(direction) { // eslint-disable-line complexity
    if (this.state.isSuggestsHidden) {
      this.showSuggests();
      return;
    }

    const suggestsCount = this.state.suggests.length - 1,
      next = direction === 'next';
    let newActiveSuggest = null,
      newIndex = 0,
      i = 0;

    for (i; i <= suggestsCount; i++) {
      if (this.state.suggests[i] === this.state.activeSuggest) {
        newIndex = next ? i + 1 : i - 1;
      }
    }

    if (!this.state.activeSuggest) {
      newIndex = next ? 0 : suggestsCount;
    }

    if (newIndex >= 0 && newIndex <= suggestsCount) {
      newActiveSuggest = this.state.suggests[newIndex];
    }

    this.props.onActivateSuggest(newActiveSuggest);

    this.setState({activeSuggest: newActiveSuggest});
  }

  /**
   * When an item got selected
   * @param {GeosuggestItem} suggest The selected suggest item
   */
  selectSuggest = suggest => {
    if (!suggest) {
      suggest = {
        label: this.state.userInput
      };
    }

    this.setState({
      isSuggestsHidden: true,
      userInput: typeof suggest.label !== 'object' ?
        suggest.label :
        suggest.description
    });

    if (suggest.location) {
      this.setState({ignoreBlur: false});
      this.props.onSuggestSelect(suggest);
      return;
    }

    this.geocodeSuggest(suggest);
  };

  /**
   * Geocode a suggest
   * @param  {Object} suggest The suggest
   */
  geocodeSuggest(suggest) {
    let options = null;
    if (suggest.placeId && !suggest.isFixture) {
      options = {
        placeId: suggest.placeId
      };
    } else {
      options = {
        address: suggest.label,
        location: this.props.location,
        bounds: this.props.bounds,
        componentRestrictions: this.props.country ?
        {country: this.props.country} : null
      };
    }
    this.geocoder.geocode(
      options,
      (results, status) => {
        if (status === this.googleMaps.GeocoderStatus.OK) {
          var gmaps = results[0],
            location = gmaps.geometry.location;

          suggest.gmaps = gmaps;
          suggest.location = {
            lat: location.lat(),
            lng: location.lng()
          };
        }
        this.props.onSuggestSelect(suggest);
      }
    );
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const attributes = filterInputAttributes(this.props),
      classes = classnames(
        'geosuggest',
        this.props.className,
        {'geosuggest--loading': this.state.isLoading}
      ),
      shouldRenderLabel = this.props.label && attributes.id,
      input = <Input className={this.props.inputClassName}
        ref={i => this.input = i}
        value={this.state.userInput}
        ignoreEnter={!this.state.isSuggestsHidden}
        ignoreTab={this.props.ignoreTab}
        style={this.props.style.input}
        onChange={this.onInputChange}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
        onKeyDown={this.props.onKeyDown}
        onKeyPress={this.props.onKeyPress}
        onNext={this.onNext}
        onPrev={this.onPrev}
        onSelect={this.onSelect}
        onEscape={this.hideSuggests} {...attributes} />,
      suggestionsList = <SuggestList isHidden={this.state.isSuggestsHidden}
        style={this.props.style.suggests}
        suggestItemStyle={this.props.style.suggestItem}
        userInput={this.state.userInput}
        isHighlightMatch={this.props.highlightMatch}
        suggestsClassName={this.props.suggestsClassName}
        suggestItemClassName={this.props.suggestItemClassName}
        suggests={this.state.suggests}
        hiddenClassName={this.props.suggestsHiddenClassName}
        suggestItemActiveClassName={this.props.suggestItemActiveClassName}
        activeSuggest={this.state.activeSuggest}
        onSuggestNoResults={this.onSuggestNoResults}
        onSuggestMouseDown={this.onSuggestMouseDown}
        onSuggestMouseOut={this.onSuggestMouseOut}
        onSuggestSelect={this.selectSuggest}
        renderSuggestItem={this.props.renderSuggestItem}
        minLength={this.props.minLength}/>;

    return <div className={classes}>
      <div className="geosuggest__input-wrapper">
        {shouldRenderLabel &&
          <label className="geosuggest__label"
            htmlFor={attributes.id}>{this.props.label}</label>
        }
        {input}
      </div>
      <div className="geosuggest__suggests-wrapper">
        {suggestionsList}
      </div>
    </div>;
  }
}

export default Geosuggest;
