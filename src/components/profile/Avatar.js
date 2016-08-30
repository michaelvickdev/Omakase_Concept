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
  }

  componentDidMount() {
    Database.ref(
      `profiles/${this.props.uid}/photo`
    ).once('value', data => {
      if (data.val()) {
        Database.ref(
          `photos/${data.val()}/url`
        ).once('value', data => {
          this.setState({
            url: data.val()
          });
        });
      }
    });
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor={Colors.Transparent}>
        <Image
          style={[
            styles.avatar,
            this.props.style,
            this.props.size && {
              width: this.props.size,
              height: this.props.size,
              borderRadius: this.props.size / 2
            }
          ]}
          source={{uri: this.state.url}} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    width: 20,
    height: 20,
  }
});
