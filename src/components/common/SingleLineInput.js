import React, {
  Component
} from 'react';
import {
  View, StyleSheet, TextInput, Text
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';

// components
import Icon from 'react-native-vector-icons/MaterialIcons';
import Divider from './Divider';

/**
 * Displays a Input box for text entry.
 */
export default class SingleLineInput extends Component {

  /**
   * Creates a new Input box for text entry.
   */
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isTop && (<Divider />)}
        <View style={styles.innerContainer}>
          {
            this.props.icon
            && <Icon
              style={[
                styles.label,
                styles.icon
              ]}
              name={this.props.icon} />
          }
          <Text
            style={styles.label}>
            {this.props.label || this.props.placeholder}
          </Text>
          <TextInput
            {...this.props}
            clearButtonMode='always'
            onChangeText={text => {
              text = (
                !!this.props.onChangeText ?
                this.props.onChangeText(text) || text:
                text
              );
              this.setState({value: text});
            }}
            style={styles.input} />
        </View>
        <Divider
          style={
            !this.props.isBottom && {marginLeft: Sizes.InnerFrame}
          } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    flexDirection: 'column',
    alignSelf: 'stretch'
  },

  innerContainer: {
    paddingLeft: Sizes.InnerFrame,
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  label: {
    color: Colors.Text,
    fontSize: Sizes.Text,
    fontWeight: '500',
    alignSelf: 'flex-start'
  },

  icon: {
    marginTop: 1,
    marginRight: 5
  },

  input: {
    fontSize: Sizes.Text,
    textAlign: 'right',
    flex: 1,
  }
});
