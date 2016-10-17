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
import {
  Actions
} from 'react-native-router-flux';

// components
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Avatar from '../../components/profile/Avatar';
import OutlineText from '../../components/common/OutlineText';

import PlannerDayList from './PlannerDayList';
import Button from '../../components/common/Button';
import Photo from '../../components/common/Photo';

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
          <Photo
            style={styles.upsell}
            photoId='upsell'>
            <View style={styles.upsellContainer}>
              <View>
                <Text style={styles.upsellTitle}>
                  Try the other side
                </Text>
                <Text style={styles.upsellText}>
                  Let someone else plan your adventure instead and get amazing photos.
                </Text>
              </View>
            </View>
            <Button
              onPress={Actions.clientMain}
              style={styles.upsellButton}
              size={14}
              label='Find a Frrand'
              color={Colors.Primary}
              fontColor={Colors.Text} />
          </Photo>
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
  },

  upsell: {
    padding: Sizes.OuterFrame,
    marginTop: Sizes.OuterFrame,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    height: 200
  },

  upsellContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },

  logo: {
    height: 20,
    width: 20,
    margin: 4
  },

  upsellTitle: {
    backgroundColor: Colors.Transparent,
    color: Colors.Text,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: Sizes.InnerFrame / 3
  },

  upsellText: {
    width: 200,
    backgroundColor: Colors.Transparent,
    color: Colors.Text
  },

  upsellButton: {
    alignSelf: 'stretch'
  }
});
