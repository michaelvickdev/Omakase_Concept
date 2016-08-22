import React, {
  Component
} from 'react';
import * as firebase from 'firebase';

// components
import {
  LoginButton, AccessToken
} from 'react-native-fbsdk';

/**
 * A button to control account login and logout.
 *
 * @param {callback} [onLoginFinished] - A callback called on
 *  successful login.
 * @param {callback} [onLoginFailed] - A callback called on a failed
 *  login, with a single parameter `error`.
 * @param {callback} [onLogout] - A callback called during logout.
 * @param {callback} [onLogoutFailed] - A callback called on a failed
 *  logout, with a single parameter `error`.
 */
export default class FacebookButton extends Component {
  render() {
    return (
      <LoginButton
        readPermissions={[
          'public_profile', 'email'
        ]}
        onLoginFinished={(error, result) => {
          if (error || result.isCancelled) {
            this.props.onLoginFailed &&
              this.props.onLoginFailed(error || result.isCancelled);
          } else {
            AccessToken.getCurrentAccessToken().then(
              data => {
                firebase.auth().signInWithCredential(
                  firebase.auth.FacebookAuthProvider.credential(
                    data.accessToken.toString()
                  )
                ).catch(error => this.props.onLoginFailed
                  && this.props.onLoginFailed(error)
                );

                // login successful, perform `onLoginFinished`
                this.props.onLoginFinished
                  && this.props.onLoginFinished();
              }
            );
          }
        }}
        onLogoutFinished={() => {
          firebase.auth().signOut().then(
            () => this.props.onLogoutFinished
              && this.props.onLogoutFinished(),
            error => this.props.onLogoutFailed
              && this.props.onLogoutFailed(error)
          )
        }} />
    );
  }
}

function _handleError(error=null) {
  console.log(`Login failed: ${error}`);
}
