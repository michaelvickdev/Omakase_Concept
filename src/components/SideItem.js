import React, {
  Component
} from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text
} from 'react-native';
import {
  Colors, Sizes
} from '../../res/Constants';

// components
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * Entries on Side Menu for router to non sequential pages
 */
export default class SideItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.innerContainer}
          onPress={this.props.onPress}>
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
            {this.props.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Sizes.InnerFrame / 2,
    marginBottom: Sizes.InnerFrame,
    backgroundColor: Colors.Transparent,
    alignSelf: 'stretch',
  },

  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  label: {
    color: Colors.Text,
    fontSize: Sizes.H1,
    fontWeight: '300'
  },

  icon: {
    marginTop: 2,
    marginRight: 10
  }
});
