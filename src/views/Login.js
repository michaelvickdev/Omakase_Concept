import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, Image
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors, Sizes
} from '../../res/Constants';
import {
  LoginManager, AccessToken
} from 'react-native-fbsdk';
import * as firebase from 'firebase';
import Database from '../utils/Firebase';

// components
import Photo from '../components/common/Photo';
import Button from '../components/common/Button';
import Divider from '../components/common/Divider';

/**
 * If fetching user is unsuccessful, allow logging with existing acct
 * or register for a new one
 */
export default class Login extends Component {
  componentDidMount() {
    StatusBar.setHidden(true, 'slide');
  }

  render() {
    return (
      <Photo
        photoId='login'
        style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../res/img/logo.png')}
                style={styles.logo} />
            </View>
            <Text style={[styles.text, styles.title]}>
              A better way to travel
            </Text>
            <Text style={styles.text}>
              Explore the world for free by using your smartphone's camera
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
        <Button
          squareBorders
          style={{
            paddingTop: Sizes.InnerFrame,
            paddingBottom: Sizes.InnerFrame
          }}
          color={Colors.Facebook}
          fontColor={Colors.Text}
          fontAwesome
          icon='facebook'
          label='Login with Facebook'
          onPress={() => {
            LoginManager.logInWithReadPermissions([
              'public_profile',
              'email'
            ]).then(result => {
              if (!result.isCancelled) {
                AccessToken.getCurrentAccessToken().then(
                  data => {
                    firebase.auth().signInWithCredential(
                      firebase.auth.FacebookAuthProvider.credential(
                        data.accessToken.toString()
                      )
                    ).then(user => {

                      // update profile
                      Database.ref(
                        `profiles/${user.uid}`
                      ).set({
                        displayName: user.displayName,
                        email: user.email,
                      }).then(result => {

                        // now store the photo
                        let photoId = Database.ref(`photos`).push().key;
                        Database.ref().update({
                          [`photos/${photoId}`]: {
                            createdBy: user.uid,
                            url: user.photoURL
                          }, [`profiles/${user.uid}/photo`]: photoId
                        });
                      });

                      // user logged in, ready for use
                      Actions.tutorial();
                    }).catch(error => {});
                  }
                );
              }
            }, error => {
            });
          }} />
      </Photo>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.Background
  },

  header: {
    flex: 1,
    padding: Sizes.InnerFrame,
    paddingTop: Sizes.InnerFrame * 3,
    backgroundColor: Colors.Overlay
  },

  headerContainer: {
    alignSelf: 'stretch',
    borderRadius: 10
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.LightWhiteOverlay,
    overflow: 'hidden'
  },

  logo: {
    width: 25,
    height: 25
  },

  text: {
    fontSize: Sizes.H1 * 1.5,
    color: Colors.Text,
    backgroundColor: Colors.Transparent,
    fontWeight: '100'
  },

  title: {
    marginTop: Sizes.InnerFrame,
    fontSize: Sizes.H1 * 2.2,
    fontWeight: '300'
  },

  footer: {
    alignItems: 'center',
    backgroundColor: Colors.Overlay,
    padding: Sizes.InnerFrame / 2
  },

  footerText: {
    textAlign: 'center',
    padding: Sizes.InnerFrame / 3,
    fontSize: Sizes.SmallText,
    color: Colors.Text
  }
});
