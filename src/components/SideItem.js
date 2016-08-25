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
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: Colors.Transparent,
    alignSelf: 'stretch'
  },

  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  label: {
    color: Colors.AlternateText,
    fontSize: Sizes.H1,
    fontWeight: '300',
    alignSelf: 'flex-start'
  },

  icon: {
    marginTop: 2,
    marginRight: 10
  }
});
