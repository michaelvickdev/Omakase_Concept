import React, {
  Component
} from 'react';
import {
  TouchableHighlight, StyleSheet, Image
} from 'react-native';
import {
  Colors
} from '../../../res/Constants';
import Database from '../../utils/Firebase';

/**
 * Displays a circlar avatar.
 */
export default class Avatar extends Component {

  /**
   * Creates a new Avatar.
   *
   * @param {string} props.uid - The UID of the Profile for this Avatar.
   * @param {object} props.style - The style to override with.
   * @param {string} props.color - The color for the empty Avatar.
   * @param {number} props.size - The size.
   */
  constructor(props) {
    super(props);
    this.state = {
      url: ' '
    };

    this.profileRef = Database.ref(
      `profiles/${this.props.uid}/photo`
    );
  }

  componentDidMount() {
    this.profileListener = this.profileRef.on('value', data => {
      if (data.val()) {

        // save ref to unlisten later
        this.photoRef = Database.ref(
          `photos/${data.val()}/url`
        );
        this.photoListener = this.photoRef.on('value', data => {
          this.setState({
            url: data.val()
          });
        });
      }
    });
  }

  componentWillUnmount() {
    this.profileRef.off('value', this.profileListener);
    this.photoRef && this.photoRef.off('value', this.photoListener);
  }

  render() {
    let innerSize = (
      this.props.outline
      ? (this.props.size || 20) - (this.props.size * 0.1)
      : (this.props.size || 20)
    );

    return (
      <TouchableHighlight
        style={[
          styles.container,
          this.props.size && {
            width: this.props.size,
            height: this.props.size,
            borderRadius: this.props.size / 2
          },
          this.props.outlineColor && {
            backgroundColor: this.props.outlineColor
          }
        ]}
        onPress={this.props.onPress}
        underlayColor={Colors.Transparent}>
        <Image
          style={[
            styles.avatar,
            this.props.style,
            this.props.size && {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2
            },
            this.props.color && {
              backgroundColor: this.props.color
            }
          ]}
          source={{uri: this.state.url}} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    borderRadius: 10,
    width: 20,
    height: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatar: {
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    width: 20,
    height: 20,
  }
});
