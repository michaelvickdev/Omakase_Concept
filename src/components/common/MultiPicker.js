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
import Icon from 'react-native-vector-icons/MaterialIcons';
import CircleCheck from '../../components/common/CircleCheck';


/** Generic Picker
  * @param {defaultVal} - The default value for the picker.
  * @param {pickerLabel} - The button name for the picker
  */
export default class MultiPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      options: this.props.options,
      save: [],
      tempsave: [],
      visible: {},
      tempvisible: {}
    };

    // bind methods
    this.val = this.val.bind(this);

  }

  val() {
    return this.state.save;
  };

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

  // tune the list of options
  tuneOption(option) {
    if (!this.state.tempsave.includes(option)) {
        this.state.tempsave.push(option);
    } else {
      var index = this.state.tempsave.indexOf(option);
      this.state.tempsave.splice(index, 1);
    }
    return this.state.tempsave;
  };

  // return a list of options, need to change later
  // to be compatibable with not only text inputs
  // It is only for testing purpose to use text outputs
  returnOption() {
    var text = "";
    var len = this.state.save.length;
    for (i=0;i<len;i++) {
        if (i===(len-1)) {
          text += this.state.save[i];
        } else {
          text += this.state.save[i] + ", ";
        }
    }
    if (text==="") {
      text = "select";
    }
    return text;
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
                        tempsave: this.state.save.map(i => i),
                        visible: Object.assign({}, this.state.tempvisible)
                      })}>
                      <Text style={styles.text}>
                        {this.props.cancelLabel || 'Cancel'}
                      </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={Colors.Transparent}
                      onPress={() => this.setState({
                        showModal: false,
                        save: this.state.tempsave.map(i => i),
                        tempvisible: Object.assign({}, this.state.visible)
                      })}>
                      <Text style={styles.text}>
                        {this.props.doneLabel || 'Done'}
                      </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.optionsContainer}>
                  <ScrollView>
                    {
                      this.state.options.map(lang => (
                        <View
                          style={styles.singleOptionContainer}
                          key={lang}>
                          <TouchableHighlight
                          underlayColor={Colors.Transparent}
                          onPress={() => this.setState({
                            tempsave: this.tuneOption(lang),
                            visible: this.toggle(lang)
                          })}>
                            <View style={styles.optionTextContainer}>
                              <Text style={styles.text}>
                                {lang}
                              </Text>
                              <CircleCheck
                                color={this.state.visible[lang]
                                  ? Colors.Green : Colors.Secondary}/>
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

  text: {
    textAlign: 'right',
    fontSize: Sizes.text
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
    marginTop: Sizes.InnerFrame,
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame,
    backgroundColor: Colors.Secondary,
    alignItems: 'stretch',
    justifyContent: 'space-between'
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
