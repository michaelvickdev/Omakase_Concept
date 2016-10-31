import React, {
  Component
} from 'react';
import {
  View, StyleSheet, TextInput, Modal, TouchableHighlight,
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

/**
  * AutoCompleteInput allows client to search for an establishment,
  * address, cities, region, or geocode using google autocomplete
  * @param {type} - The type of results, allowed values are:
  *   address, establishment, geocode, (cities) or (regions)
  * @param {placeholder} - The placeholder text for the autocomplete
  * @param {location} - Optional search from location, format: 'lat,lng'
  * @param {radius} - The search radius if 'location' is specified
  * @param {onSelect} - Pass in function on selection of a place item
  * @param {alwaysClear} - whether past result should be sticky
  */
export default class AutoCompleteModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    // bind methods
    this.val = this.val.bind(this);
    this.detail = this.detail.bind(this);
    this.show = this.show.bind(this);
  }

  show() {
    this.setState({
      showModal: true,
      value: this.props.alwaysClear ? null : this.state.value,
      description: this.props.alwaysClear ?  null : this.state.description
    });
  }

  detail() {
    return this.state.value;
  }

  val() {
    return this.state.description;
  }

  render() {
    return (
      <Modal
        style={styles.wrapper}
        animationType="slide"
        onRequestClose={() => this.setState({
          value: this.state.previousVal,
          showModal: false
        })}
        transparent={true}
        visible={this.state.showModal}
        onShow={() => this.setState({
          previousVal: this.state.value
        })}>
        <View style={styles.modalContainer}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              underlayColor={Colors.Transparent}
              onPress={() => this.setState({
                value: this.state.previousVal,
                showModal: false
              })}>
              <Text style={styles.text}>
                {this.props.cancelLabel || 'Cancel'}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.inputContainer}>
            <GooglePlacesAutocomplete
               placeholder={
                 this.props.placeholder || 'Search'
               }
               minLength={2}
               autoFocus={this.state.description ? false : true}
               fetchDetails={true}
               onPress={(data, details = null) => {
                 console.log(data);
                 console.log(details);
                 this.setState({
                   value: details,
                   description: data.description,
                   showModal: false
                 })
                 this.props.onSelect ? this.props.onSelect() : null ;
               }}
               getDefaultValue={() => {
                  return this.state.description || '';
               }}

               enablePoweredByContainer={false}
               query={{
                 key: Strings.googleApiKey,
                 language: 'en',
                 location: this.props.location || '',
                 radius: this.props.radius || 10000,
                 types: this.props.type || 'geocode',
               }}
               styles={{
                 description: {
                   fontWeight: '500',
                   color: Colors.Text,
                   fontSize: Sizes.H2,
                   alignSelf: 'flex-start',
                 },
                 row:{
                   alignSelf: 'stretch',
                 },

               }}
               currentLocation={false}
               nearbyPlacesAPI='GooglePlacesSearch'
               GooglePlacesSearchQuery={{
                 rankby: 'distance',
               }}/>
          </View>
        </View>
      </Modal>
    );
  }


}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },

  text: {
    textAlign: 'right',
    fontSize: Sizes.Text,
    color: Colors.Text
  },

  buttonContainer: {
    width: Sizes.width,
    backgroundColor: Colors.Background,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame,
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame,
    borderTopWidth: 1,
    borderColor: Colors.Text
  },

  inputContainer: {
    width: Sizes.width,
    height: Sizes.height - Sizes.NavHeight,
    backgroundColor: Colors.Background,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  modalContainer: {
    width: Sizes.width,
    height: Sizes.height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
})
