import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableHighlight, Dimensions, ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import InputField from './InputField';
import CircleCheck from '../../components/common/CircleCheck';
import Divider from '../../components/common/Divider';

/** Generic Picker
  * @param {text} [defaultVal] - The default value for the picker.
  * @param {list} [options] - List of available selections
  * @param {number} [max] - optional: max selections shown before '...'
  */
export default class MultiPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      options: props.options,
      max: props.max || 3,
      visible: this.start(),
      tempvisible: this.start()
    };

    // bind methods
    this.val = this.val.bind(this);

  }

  val() {
    return this.state.visible;
  };

  start() {
    var temp = {}
    var get = this.props.defaultVal + ""
    temp[get] = true
    return temp
  }

  // return true if array has same values
  sameValue(array) {
    for (i=1;i<array.length;i++) {
      if (array[i] == array[0]) {
        return false;
      }
    }
    return true;
  }

  // toggle the visibility of each option
  toggle(option) {
    for (i in this.state.visible.keys) {
      this.state.tempvisible[i] = this.state.visible[i];
    }
    if (this.state.visible[option]) {
      this.state.visible[option] = false;
    } else {
      this.state.visible[option] = true;
    }
    return this.state.visible;
  };

  // return selected option(s)
  returnOption() {
    var text = "";
    var temp = Object.keys(this.state.visible);
    var count = 0;
    for (i in temp) {
      if (this.state.visible[temp[i]] == true) {
        if (count < this.state.max){
          if (text.length != 0){
            text += ", ";
          }
          count == this.state.max-1 ? text += '...' : text += temp[i] ;
          count++;
        }
      }
    }
    return text.length == 0 ? 'Select' : text;
  };

  render() {
    return(
      <InputField
        {...this.props}
        field={(
          <View style={styles.wrapper}>
            <Modal
              animationType="slide"
              onRequestClose={() => this.setState({
                showModal: false
              })}
              transparent={true}
              visible={this.state.showModal}>
              <View style={styles.modalContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight
                      underlayColor={Colors.Transparent}
                      onPress={() => this.setState({
                        showModal: false,
                        visible: Object.assign({}, this.state.tempvisible)
                      })}>
                      <Text style={styles.buttonText}>
                        {this.props.cancelLabel || 'Cancel'}
                      </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={Colors.Transparent}
                      onPress={() => this.setState({
                        showModal: false,
                        tempvisible: Object.assign({}, this.state.visible)
                      })}>
                      <Text style={styles.buttonText}>
                        {this.props.doneLabel || 'Done'}
                      </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.optionsContainer}>
                  <Divider style={styles.divider} />
                  <ScrollView>
                    {
                      this.state.options.map(lang => (
                        <View
                          style={styles.singleOptionContainer}
                          key={lang}>
                          <TouchableHighlight
                          underlayColor={Colors.Transparent}
                          onPress={() => this.setState({
                            visible: this.toggle(lang)
                          })}>
                            <View style={styles.optionTextContainer}>
                              <Text style={styles.text}>
                                {lang}
                              </Text>
                              <CircleCheck
                                color={this.state.visible[lang]
                                  ? Colors.Primary : Colors.Disabled}/>
                            </View>
                          </TouchableHighlight>
                        </View>
                      ))
                    }
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <View style={styles.contentContainer}>
              <TouchableHighlight
                style={styles.wrapper}
                underlayColor={Colors.Transparent}
                onPress={() => this.setState({
                  showModal: true
                })}>
                <Text style={styles.text}>
                  {this.returnOption()}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        )} />

    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },

  divider: {
    width: Sizes.width,
    height: 0.6,
    marginTop: Sizes.InnerFrame,
    marginLeft: Sizes.OuterFrame
  },

  buttonText: {
    textAlign: 'center',
    fontSize: Sizes.Text,
    color: Colors.Primary
  },

  text: {
    textAlign: 'right',
    fontSize: Sizes.Text,
    color: Colors.Text
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingRight: Sizes.OuterFrame
  },

  optionsContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/3,
    backgroundColor: Colors.Background,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  },

  singleOptionContainer: {
    width: Dimensions.get('window').width,
    height: 20,
    padding: Sizes.InnerFrame,
    backgroundColor: Colors.Background,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  optionTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },

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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame,
    paddingTop: Sizes.InnerFrame,
    borderTopWidth: 1,
    borderColor: Colors.Text

  }
});
