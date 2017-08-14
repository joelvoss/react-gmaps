import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import GoogleLibraryService from 'utilities/GoogleLibraryService';

import Wrapper from './Wrapper';
import Input from './Input';
import Button from './Button';

class Autocomplete extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    queryDelay: PropTypes.number
  };

  static defaultProps = {
    queryDelay: 250,
    location: null,
    radius: null,
    bounds: null,
    country: null,
    types: null,
    minLength: 1
  };

  state = {
    userInput: '',
    google: null,
    autocompleteService: null,
    geocoder: null,
    isLoading: false,
    isSuggestsHidden: true,
    activeSuggest: null
  };

  async componentDidMount() {
    const { config } = this.props;
    // Load the google maps library
    const google = await new GoogleLibraryService(config);

    // Initialize the autocompleteservice and the geocoder
    const autocompleteService = new google.maps.places.AutocompleteService();
    const geocoder = await new google.maps.Geocoder();

    this.setState({
      google,
      autocompleteService,
      geocoder
    });
  }

  handleOnChange = e => {
    this.setState(
      {
        userInput: e.target.value
      },
      this.onAfterInputChange
    );
  };

  /**
   * On After the input got changed
   */
  onAfterInputChange = debounce(() => {
    const { isSuggestsHidden } = this.state;
    if (!isSuggestsHidden) {
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

  showSuggests = () => {
    console.log('showSuggests');
    this.searchSuggests();
    this.setState({ isSuggestsHidden: false });
  };

  /**
   * Hide the suggestions
   */
  hideSuggests = () => {
    this.timer = setTimeout(() => {
      this.setState({
        isSuggestsHidden: true,
        activeSuggest: null
      });
    }, 100);
  };

  searchSuggests = async () => {
    const { userInput, autocompleteService, google } = this.state;
    const { location, radius, bounds, types, minLength, country } = this.props;

    // if we dont have a userInput, update the suggests
    if (!userInput) {
      this.updateSuggests();
      return;
    }

    // if the userinput length is less than the required stringlength, return
    if (userInput.length < minLength) {
      return;
    }

    // set the loading state to true
    this.setState({ isLoading: true });

    // build the getPlacePredictions options object
    const options = {
      input: userInput,
      location: new google.maps.LatLng(location.lat, location.lng),
      radius,
      bounds,
      types
    };

    // if we have a country prop set, add the componentRestrictions property
    // to the options object
    if (country) {
      options.componentRestrictions = {
        country
      };
    }

    // Await the getPlacePredictions by wrapping the default google request method with
    // a new promise wrapper.
    const predictions = await new Promise((resolve, reject) => {
      autocompleteService.getPlacePredictions(options, (suggestions, status) => {
        if (status === 'INVALID_REQUEST') {
          const message = 'This request was invalid.';
          resolve({ payload: [], message });
        }

        if (status === 'OK') {
          const message = 'The response contains a valid result.';
          resolve({ payload: suggestions, message });
        }

        if (status === 'OVER_QUERY_LIMIT') {
          const message = 'The application has gone over its request quota.';
          resolve({ payload: [], message });
        }

        if (status === 'REQUEST_DENIED') {
          const message = 'The application is not allowed to use the PlacesService.';
          resolve({ payload: [], message });
        }

        if (status === 'UNKNOWN_ERROR') {
          const message =
            'The PlacesService request could not be processed due to a server error. The request may succeed if you try again.';
          resolve({ payload: [], message });
        }

        if (status === 'ZERO_RESULTS') {
          const message = 'No result was found for this request.';
          resolve({ payload: [], message });
        }
      });
    });

    if (predictions.payload.length === 0) {
      console.error(predictions.message);
    }

    this.updateSuggests(predictions.payload);

    // this.setState({isLoading: true}, () => {
    //   this.autocompleteService.getPlacePredictions(
    //     options,
    //     suggestsGoogle => {
    //       this.setState({isLoading: false});
    //       this.updateSuggests(suggestsGoogle || [], // can be null
    //         () => {
    //           if (this.props.autoActivateFirstSuggest &&
    //             !this.state.activeSuggest
    //           ) {
    //             this.activateSuggest('next');
    //           }
    //         });
    //     }
    //   );
    // });
  };

  updateSuggests = suggests => {
    console.log('suggests', suggests);
    this.setState({ isLoading: false });
  };

  render() {
    const { userInput, isLoading } = this.state;

    console.log('component is loading?', isLoading);

    return (
      <Wrapper>
        <Input
          type="text"
          placeholder="Auf der Karte suchen"
          value={userInput}
          onChange={this.handleOnChange}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
        />
        <Button />
      </Wrapper>
    );
  }
}

export default Autocomplete;
