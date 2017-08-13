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
  }

  static defaultProps = {
    queryDelay: 400
  }

  state = {
    userInput: '',
    autocompleteService: null,
    geocoder: null,
    isLoading: false,
    isSuggestsHidden: true
  }

  async componentDidMount() {
    const { config } = this.props;
    // Load the google maps library
    const google = await new GoogleLibraryService(config);

    // Initialize the autocompleteservice and the geocoder
    const autocompleteService = new google.maps.places.AutocompleteService();
    const geocoder = await new google.maps.Geocoder();

    this.setState({
      autocompleteService,
      geocoder
    })
  }

  handleOnChange = (e) => {
    console.log('handleOnChange');
    this.setState({
      userInput: e.target.value
    }, this.onAfterInputChange);
  }

  /**
   * On After the input got changed
   */
  onAfterInputChange = debounce(() => {
    if (!this.state.isSuggestsHidden) {
      this.showSuggests();
    }
  }, this.props.queryDelay);

  showSuggests = () => {
    console.log('showSuggests');
    this.searchSuggests();
    this.setState({isSuggestsHidden: false});
  }

  searchSuggests = () => {
    const { userInput } = this.state;

    // if we dont have a userInput, update the suggests
    if (!userInput) {
      this.updateSuggests();
      return;
    }

    const options = {
        input: userInput
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

  render() {
    const { userInput } = this.state;

    return (
      <Wrapper>
        <Input type="text" placeholder="Auf der Karte suchen" value={userInput} onChange={this.handleOnChange}/>
        <Button />
      </Wrapper>
    )
  }
}

export default Autocomplete;
