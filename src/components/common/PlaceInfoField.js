import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Modal, TouchableOpacity, TouchableHighlight
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';

// components
import MapView from 'react-native-maps';
import InputField from './InputField';

/**
 * Creates a line of Information wrapped in a InputField.
 *
 * @param {number} maxLength - The information.
 * @param {place} name - The name of the place.
 * @param {object} location - The latLng obj of the place.
 */
export default class PlaceInfoField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      maxLength: this.props.maxLength || 15,
      showModal: false
    };
  }


  render() {
    return (
      <View>
        <InputField
          {...this.props}
          field={
            <TouchableOpacity style={[
              styles.info,
              this.props.styles
            ]}
            onPress={() => {
              this.setState({
                showModal: true
              })
            }}>
              <Text style={styles.text}>
                  {this.props.name &&
                  this.props.name.length > this.state.maxLength ?
                  this.props.name.substring(0, this.state.maxLength-3)
                  + "..." : this.props.name }
              </Text>
            </TouchableOpacity>
          } />
          <Modal
            style={styles.modal}
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
                    showModal: false
                  })}>
                  <Text style={styles.text}>
                    {this.props.closeLabel || 'Close'}
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.title}>
                  <Text style={styles.modalText}>
                    {this.props.name}
                  </Text>
                </View>
                <View style={styles.mapContainer}>
                  {this.props.location ?
                  <MapView
                    style={styles.map}
                    scrollEnabled={false}
                    region={{
                      latitude: this.props.location.lat,
                      longitude: this.props.location.lng,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01
                    }}>
                    <MapView.Marker
                      coordinate={{
                        latitude: this.props.location.lat,
                        longitude: this.props.location.lng,
                      }}
                      pinColor={Colors.Primary}
                    />
                  </MapView>
                  : <View/>}
                </View>
              </View>
            </View>
          </Modal>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    alignSelf: 'flex-end',
    paddingRight: Sizes.OuterFrame,
  },

  text: {
    fontSize: Sizes.Text,
    color: Colors.Text,
    textAlign: 'right',
  },

  modalText: {
    fontSize: Sizes.Text,
    color: Colors.Text,
    textAlign: 'left',
  },

  modalContainer: {
    width: Sizes.width,
    height: Sizes.height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    backgroundColor: Colors.Background,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  title: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame,
  },

  mapContainer: {
    width: Sizes.width,
    justifyContent: 'flex-end'
  },

  map: {
    alignSelf: 'stretch',
    margin: Sizes.InnerFrame,
    height: Sizes.height*0.45,
  }
});
