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
import InformationField from '../components/common/InformationField';
import PhotoGrid from '../components/common/PhotoGrid';
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Photo from '../components/common/Photo';
import OutlineText from '../components/common/OutlineText';
import CloseFullscreenButton from '../components/common/CloseFullscreenButton';
import {
  BlurView
} from 'react-native-blur';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
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
    console.log(this.state.profile.photo);
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          parallaxHeaderHeight={Sizes.height * 0.3}
          contentBackgroundColor={Colors.Background}
          fadeOutForeground={false}
          renderBackground={() => (
            <Photo
              photoId={this.state.profile.photo}
              style={styles.cover}>
            </Photo>
          )}
          renderForeground={() => (
            <LinearGradient
              colors={[
                Colors.Transparent,
                Colors.Transparent,
                Colors.Background,
              ]}
              style={styles.headerContainer} />
          )}>
          <View style={styles.body}>
            <InformationField
              isTop
              label="Region"
              info="Toronto, ON" />
            <InformationField
              isBottom
              label="Age"
              info="18-29" />
          </View>
          <View style={styles.grid}>
            <PhotoGrid
              photoIds={
                this.state.profile.photos
                && Object.keys(this.state.profile.photos)
                || []
              }
              eachRow={3}
              width={Sizes.width - Sizes.InnerFrame * 2 + 5} />
          </View>
        </ParallaxScrollView>
        <CloseFullscreenButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Black
  },

  headerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },

  cover: {
    flex: 1,
    alignSelf: 'stretch'
  },

  body: {
    marginTop: Sizes.InnerFrame
  },

  name: {
    marginTop: Sizes.InnerFrame,
    textAlign: 'center'
  },

  since: {
    textAlign: 'center',
    marginBottom: Sizes.OuterFrame
  },

  grid: {
    alignItems: 'center',
    marginBottom: Sizes.InnerFrame
  }
});
