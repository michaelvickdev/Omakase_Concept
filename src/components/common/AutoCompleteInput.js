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
  }

  val() {
    return this.state.value;
  }

  render() {
    return (
      <InputField
        {...this.props}
        field={(
          <View style={styles.wrapper}>
            <Modal
              animationType="slide"
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
                  <TouchableHighlight
                    underlayColor={Colors.Transparent}
                    onPress={() => this.setState({
                      defaultText:
                        this.state.description || this.state.defaultText,
                      showModal: false
                    })}>
                    <Text style={styles.text}>
                      {this.props.doneLabel || 'Done'}
                    </Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.inputContainer}>
                <GooglePlacesAutocomplete
                   contentContainerStyle={styles.inputContainer}
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
                       defaultText: data.description,
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
                       fontSize: Sizes.Text,
                       alignSelf: 'center',
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
            <View style={styles.contentContainer}>
              <TouchableHighlight
                underlayColor={Colors.Transparent}
                onPress={() => {
                  !this.props.failCondition ? this.setState({
                    showModal: true
                  }) : Alert.alert('Oops!', this.props.conditionMsg
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
    fontSize: Sizes.Text
  },

  inputstyle: {
    fontSize: Sizes.Text,
    textAlign: 'left',
    paddingLeft: Sizes.InnerFrame,
  },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: Sizes.OuterFrame
  },

  buttonContainer: {
    width: Dimensions.get('window').width,
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*2/3,
    backgroundColor: Colors.Background,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  modalContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})
