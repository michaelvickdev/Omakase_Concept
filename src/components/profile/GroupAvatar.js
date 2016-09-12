import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';

// components
import Avatar from './Avatar';

/**
 * Displays a circlar avatar.
 */
export default class GroupAvatar extends Component {

  /**
   * Creates a new Group of Avatars.
   *
   * @param {string} props.uids[] - A listing of UIDs to show.
   * @param {object} props.style - The style to override with.
   * @param {string} props.color - The color for empty Avatars.
   * @param {number} props.limit - Avatars to show before collapsing.
   */
  constructor(props) {
    super(props);
    this.state = {
      visible: [],
      collapsed: []
    };
  }

  componentWillReceiveProps(nextProps) {
    nextProps.uids
    && nextProps.uids.length > 0
    && this.setState({
      visible: nextProps.uids.slice(
        0,
        nextProps.limit || nextProps.uids.length
      ),
      collapsed: nextProps.uids.slice(
        nextProps.limit || nextProps.uids.length,
        nextProps.uids.length
      )
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.visible.map(uid => (
            <View
              key={`${uid}-${Math.random()}`}
              style={styles.outline}>
              <Avatar
                color={this.props.color || Colors.Primary}
                size={35}
                uid={uid} />
            </View>
          ))
        }
        {
          this.state.collapsed.length > 0 && (
            <View style={styles.outline}>
              <View style={[
                styles.collapsedContainer,
                {
                  backgroundColor: this.props.color || Colors.Primary
                }
              ]}>
                <Text style={styles.collapsed}>
                  +{
                    this.state.collapsed.length < 1000
                    ? this.state.collapsed.length
                    : 'lots'
                  }
                </Text>
              </View>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },

  outline: {
    marginRight: -7,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Background,
    overflow: 'hidden'
  },

  collapsedContainer: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },

  collapsed: {
    color: Colors.AlternateText,
    fontSize: Sizes.SmallText,
    fontWeight: '600'
  }
});
