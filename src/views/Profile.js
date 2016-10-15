import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Image
} from 'react-native';
import Database from '../utils/Firebase';
import {
  Sizes, Styles, Colors
} from '../../res/Constants';

// components
import Avatar from '../components/profile/Avatar';
import InformationField from '../components/common/InformationField';
import LinearGradient from 'react-native-linear-gradient';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null
    };

    this.ref = Database.ref(`profiles/${this.props.uid}`);
  }

  componentDidMount() {
    this.profileListener = this.ref.on('value', data => {
      data.exists() && this.setState({
        profile: data.val()
      });
    })
  }

  componentWillUnmount() {
    this.ref.off('value', this.profileListener);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.header}
          source={require('../../res/img/profile_bg.jpg')} />
        <View style={styles.body}>
          <View style={styles.avatar}>
            <Avatar
              outline
              uid={this.props.uid}
              size={120} />
          </View>
          <Text
            style={[
              Styles.Header,
              styles.name
            ]}>
            {this.state.profile && this.state.profile.displayName}
          </Text>
          <Text
            style={[
              Styles.BodyText,
              styles.since
            ]}>
            Since Sept 2016
          </Text>
          <InformationField
            isTop
            label="Region"
            info="Toronto, ON" />
          <InformationField
            isBottom
            label="Age"
            info="18-29" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background
  },

  header: {
    height: 150,
    alignSelf: 'stretch'
  },

  body: {

    // to make the avatar appear in between the header image
    marginTop: -60
  },

  avatar: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },

  name: {
    marginTop: Sizes.InnerFrame,
    textAlign: 'center'
  },

  since: {
    textAlign: 'center',
    marginBottom: Sizes.OuterFrame
  }
});
