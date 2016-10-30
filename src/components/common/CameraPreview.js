import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Image, TouchableOpacity, Alert
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';
import RNFetchBlob from 'react-native-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;

// components
import {
  BlurView
} from 'react-native-blur';
import CircleCheck from './CircleCheck';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';

export default class CameraPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    };

    this.revert = this.revert.bind(this);
  }

  revert(blob, xml) {
    window.Blob = blob;
    window.XMLHttpRequest = xml;

    // reset progress
    this.setState({
      progress: 0
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <BlurView
          blurType='dark'
          style={styles.container}>
          <Image
            style={styles.preview}
            source={{
              uri: this.props.path,
              isStatic: true
            }}>
            <Animatable.View ref='cancel'>
              <TouchableOpacity
                onPress={this.props.cancel}>
                <CircleCheck
                  icon='close'
                  color={Colors.Foreground}
                  size={40} />
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View ref='accept'>
              <TouchableOpacity
                onPress={() => {

                  // hide buttons
                  this.refs.accept.bounceOutDown(1000);
                  this.refs.cancel.bounceOutDown(1000);

                  // hijack Blob and XMLHttpRequest temporarily
                  let realBlob = window.Blob;
                  let realXML = window.XMLHttpRequest;
                  window.Blob = Blob;
                  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;

                  Blob.build(
                    RNFetchBlob.wrap(
                      this.props.path
                    ), {
                      type: 'image/jpg;'
                    }
                  ).then(blob => {
                    let task = Firebase.storage().ref().child(
                      `images/${
                        this.props.path.split('/').pop()
                      }`
                    ).put(blob, {
                      contentType: 'image/jpg'
                    });

                    // keep track of upload
                    task.on('state_changed', snapshot => {
                      this.setState({
                        progress: (
                          snapshot.bytesTransferred
                          / snapshot.totalBytes
                        )
                      });
                    }, err => {
                      console.error(err);
                      this.revert(realBlob, realXML);
                    }, () => {

                      // successful, create photos item ref
                      let photoId = Database.ref(`photos`).push().key;
                      Database.ref(
                        `photos/${photoId}`
                      ).set({
                        createdBy: Firebase.auth().currentUser.uid,
                        url: task.snapshot.downloadURL
                      });

                      // and now finalize by callback from parent
                      this.revert(realBlob, realXML);
                      this.props.accept
                      && this.props.accept(photoId);
                    });
                  }).catch(err => {
                    console.error(err);
                    this.revert(realBlob, realXML);
                  });
                }}>
                <CircleCheck
                  style={styles.accept}
                  size={60} />
              </TouchableOpacity>
            </Animatable.View>
          </Image>
          <Progress.Bar
            style={styles.progress}
            borderWidth={0}
            borderRadius={0}
            color={Colors.Primary}
            progress={this.state.progress}
            height={3}
            width={Sizes.width * 0.9 - 8} />
        </BlurView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: 'stretch'
  },

  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },

  preview: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: Sizes.width * 0.9,
    height: Sizes.height * 0.7,
    borderRadius: 5,
    padding: Sizes.InnerFrame,
    flexDirection: 'row'
  },

  accept: {
    marginLeft: Sizes.InnerFrame
  },

  progress: {
    top: -3
  }
});
