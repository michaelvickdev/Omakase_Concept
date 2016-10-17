import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';

// components
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Avatar from '../../components/profile/Avatar';
import OutlineText from '../../components/common/OutlineText';

import PlannerDayList from './PlannerDayList';

export default class PlannerMain extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          parallaxHeaderHeight={Sizes.height * 0.4}
          contentBackgroundColor={Colors.Background}
          renderBackground={() => (
            <Video
              repeat
              muted
              resizeMode='cover'
              source={require('../../../res/img/header.mp4')}
              style={styles.cover} />
          )}
          renderForeground={() => (
            <LinearGradient
              colors={[
                Colors.Transparent,
                Colors.Transparent,
                Colors.NearBlack,
              ]}
              style={styles.headerContainer}>
              <Avatar

                size={30}
                uid={Firebase.auth().currentUser.uid} />
              <Text style={styles.welcomeTitle}>
                Good afternoon, Kenneth.
              </Text>
              <OutlineText
                style={styles.location}
                text='Toronto, ON, Canada' />
            </LinearGradient>
          )}>
          <PlannerDayList />
        </ParallaxScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background
  },

  cover: {
    flex: 1,
    minHeight: Sizes.height * 0.4,
    alignSelf: 'stretch'
  },

  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Sizes.InnerFrame
  },

  welcomeTitle: {
    width: Sizes.width * 0.7,
    fontSize: 32,
    fontWeight: '700',
    color: Colors.Text,
    textAlign: 'center'
  },

  location: {
    marginTop: Sizes.OuterFrame
  }
});
