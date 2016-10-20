import React, {
  Component
} from 'react';
import {
  View, StyleSheet, TextInput, Modal, TouchableHighlight, Dimensions,
  Alert, Text
} from 'react-native';
import {
  Strings, Sizes, Colors
} from '../../../res/Constants';

// components
import {
  GooglePlacesAutocomplete
} from 'react-native-google-places-autocomplete';
import InputField from './InputField';
import Divider from './Divider';
import AutoCompleteModal from './AutoCompleteModal';

/**
  * AutoCompleteInput allows client to search for an establishment,
  * address, cities, region, or geocode using google autocomplete
  * @param {type} - The type of results, allowed values are:
  *   address, establishment, geocode, (cities) or (regions)
  * @param {defaultText} - The text button to open the modal
  * @param {maxLength} - The max chars before result is truncated
  * @param {placeholder} - The placeholder text for the autocomplete
  * @param {location} - Optional search from location, format: 'lat,lng'
  * @param {radius} - The search radius if 'location' is specified
  * @param {onSelect} - Pass in function on selection of a place item
  * @param {failCondition} - optional condition to block search
  * @param {conditionMsg} - error msg if above is satisfied
  */
export default class AutoCompleteInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultText: this.props.defaultText || 'Search',
      showModal: false,
      maxLength: this.props.maxLength || 15,
    };

    // bind methods
    this.val = this.val.bind(this);
    this.detail = this.detail.bind(this);
  }

  detail() {
    return this._modal.detail();
  }

  val() {
    return this._modal.val();
  }

  render() {
    return (
      <InputField
        {...this.props}
        field={(
          <View style={styles.wrapper}>
            <AutoCompleteModal
              ref={ref => this._modal = ref}
              onSelect={() => {
                this.setState({
                  defaultText: this._modal.val()
                });
                this.props.onSelect && this.props.onSelect();
              }}
              placeholder={this.props.placeholder}
              type={this.props.type}
              location={this.props.location}
            />
            <View style={styles.contentContainer}>
              <TouchableHighlight
                style={styles.wrapper}
                underlayColor={Colors.Transparent}
                onPress={() => {
                  !this.props.failCondition ? this._modal && this._modal.show()
                  : Alert.alert('Oops!', this.props.conditionMsg
                    || 'Something is wrong')
                }} >
                <Text style={styles.text}>
                  {this.state.defaultText.length > this.state.maxLength ?
                    this.state.defaultText.substring(0, this.state.maxLength-3)
                    + "..." : this.state.defaultText }
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        )} />
    )
  };

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },

  divider: {
    marginLeft: Sizes.OuterFrame
  },

  text: {
    textAlign: 'right',
    fontSize: Sizes.Text,
    color: Colors.Text
  },


  contentContainer: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingRight: Sizes.OuterFrame
  },


})
