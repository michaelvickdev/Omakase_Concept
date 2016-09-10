import React, {
  Component
} from 'react';
import {
  View, StyleSheet, TextInput, Modal, TouchableHighlight, Dimensions,
  Text
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import InputField from './InputField';
import Divider from './Divider';

/**
  * MultiLineInput allows client enter any
  * text in multiple lines
  * @param {defaultText} - The text used to open the text input and preview
  * @param {placeholder} - The placeholder for the textinput
  */
export default class MultiLineInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultText: this.props.defaultText || "Enter",
      tempText: this.props.defaultText || "Enter",
      placeholder: this.props.placeholder || "Enter here",
      showModal: false,
      multiline: this.props.multiline || true,
      numberOfLines: this.props.numberOfLines || 5,
      maxWord: this.props.maxWord || 120
    };
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
              visible={this.state.showModal}>
              <View style={styles.modalContainer}>
                <View style={styles.buttonContainer}>
                  <TouchableHighlight
                    underlayColor={Colors.Transparent}
                    onPress={() => this.setState({
                      tempText: this.state.defaultText,
                      showModal: false
                    })}>
                    <Text style={styles.text}>
                      {this.props.cancelLabel || 'Cancel'}
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={Colors.Transparent}
                    onPress={() => this.setState({
                      defaultText: this.state.tempText,
                      showModal: false
                    })}>
                    <Text style={styles.text}>
                      {this.props.doneLabel || 'Done'}
                    </Text>
                  </TouchableHighlight>
                </View>
                <Divider style={styles.divider}/>
                <View style={styles.inputContainer}>
                  <TextInput
                    {...this.props}
                    clearButtonMode='always'
                    style={styles.inputstyle}
                    placeholder={this.state.placeholder}
                    onChangeText={defaultText => this.setState({
                      tempText: defaultText
                    })}
                    value={((this.state.tempText) === "Enter") ? "" :
                    (this.state.tempText)}
                    multiline={true}
                    numberOfLines={this.state.numberOfLines}
                    maxLength={this.state.maxWord}
                     />
                </View>
              </View>
            </Modal>
            <View style={styles.contentContainer}>
              <TouchableHighlight
                underlayColor={Colors.Transparent}
                onPress={() => this.setState({
                  showModal: true
                })} >
                <Text>
                  {((this.state.defaultText).length > 13) ?
                  (((this.state.defaultText.substring(0, 10) + "..."))) :
                  this.state.defaultText}
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/3
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
    backgroundColor: Colors.Background,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: Sizes.InnerFrame
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
