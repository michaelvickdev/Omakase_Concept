import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text, Platform, Modal, DatePickerIOS,
  DatePickerAndroid, TimePickerAndroid, TouchableHighlight, Dimensions
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';

// components
import InputField from './InputField';

/**
 * Platform agnostic DatePicker wrapped inside InputField.
 *
 * @param {Date} [startDate] - The start date/time for this DatePicker.
 * @param {Date} [minDate] - The minimum allowable Date.
 * @param {Date} [maxDate] - The maximum allowable Date.
 * @param {string} [type] - Either `time` or `date`.
 */
export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    let startDate = this.props.date || new Date();
    this.state = {
      date: startDate,
      tempDate: startDate,
      showModal: false
    };

    // bind methods
    this._renderIOS = this._renderIOS.bind(this);
    this.val = this.val.bind(this);
  }

  val() {
    return this.state.date;
  }

  render() {
    return (
      <InputField
        {...this.props}
        field={(
          <View style={styles.textContainer}>
            {this._renderIOS()}
            <TouchableHighlight
              style={styles.textContainer}
              underlayColor={Colors.Transparent}
              onPress={() => {
                if (Platform.OS === 'ios') {
                  this.setState({showModal: true});
                } else {
                  if (this.props.type === 'time'){
                    TimePickerAndroid.open({

                      // set forward 6 hours by default
                      hour: (this.state.date.getHours() + 6) % 12,
                      minute: this.state.date.getMinutes(),
                      is24Hour: false
                    }).then(result => {
                      if (result.action !== TimePickerAndroid.dismissedAction) {
                        this.setState({
                          date: new Date(
                            0, 0, 0, result.hour, result.minute, 0, 0
                          )
                        });
                      }
                    })
                  } else {
                    DatePickerAndroid.open({
                      date: this.state.date,
                      minDate: this.props.minDate,
                      maxDate: this.props.maxDate
                    }).then(result => {
                      if (result.action !== DatePickerAndroid.dismissedAction) {
                        this.setState({
                          date: new Date(result.year, result.month, result.day)
                        });
                      }
                    });
                  }
                }
              }}>
              <Text style={styles.text}>
                {
                  this.props.type === 'time'
                  ? (this.state.date.getHours() % 12 || 12)+ ':'
                  + this.state.date.getMinutes()
                  + (this.state.date.getHours() > 11 ? ' PM' : ' AM')
                  : this.state.date.toDateString()
                }
              </Text>
            </TouchableHighlight>
          </View>
        )} />
    );
  }

  _renderIOS() {
    if (Platform.OS === 'ios') {
      return (
        <Modal
          animationType="slide"
          onRequestClose={() => this.setState({
            showModal: false
          })}
          transparent
          visible={this.state.showModal}>
          <View style={styles.modalContainer}>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                underlayColor={Colors.Transparent}
                onPress={() => this.setState({
                  showModal: false
                })}>
                <Text style={styles.button}>
                  {this.props.cancelLabel || 'Cancel'}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={Colors.Transparent}
                onPress={() => this.setState({
                  date: this.state.tempDate,
                  showModal: false
                })}>
                <Text style={styles.button}>
                  {this.props.doneLabel || 'Done'}
                </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.datePickerContainer}>
              <DatePickerIOS
                style={styles.datePickerIOS}
                date={this.state.tempDate}
                minimumDate={this.props.minDate}
                maximumDate={this.props.maxDate}
                mode={this.props.type || 'date'}
                onDateChange={date => this.setState({
                  tempDate: date
                })} />
            </View>
          </View>
        </Modal>
      )
    }
  }
}

let styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },

  text: {
    textAlign: 'right',
    fontSize: Sizes.Text,
    paddingRight: Sizes.OuterFrame
  },

  // modal for iOS
  modalContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  buttonContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: Colors.Background,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame,
    borderTopWidth: 1,
    borderColor: Colors.Text,
    paddingTop: Sizes.InnerFrame
  },

  datePickerContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: Colors.Background,
    alignItems: 'center',
    justifyContent: 'center'
  },

  datePickerIOS: {
    width: Dimensions.get('window').width
  },

  button: {
    color: Colors.Primary
  }
});
