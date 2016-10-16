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

export default class CameraPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    };
  }

  revert(blob, xml) {
    window.Blob = blob;
    window.XMLHttpRequest = xml;
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
            <TouchableOpacity
              onPress={this.props.cancel}>
              <CircleCheck
                icon='delete'
                color={Colors.Foreground}
                size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {

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
                  console.log(blob);
                  let task = Firebase.storage().ref().child(
                    `images/${
                      this.props.path.split('/').pop()
                    }`
                  ).put(blob, {
                    contentType: 'image/jpg'
                  });

                  // keep track of upload
                  task.on('state_changed', snapshot => {
                    console.log('change');
                    this.setState({
                      progress: (
                        snapshot.bytesTransferred
                        / snapshot.totalBytes
                      )
                    });
                  }, err => {
                    console.log(err);
                    this.revert(realBlob, realXML);
                  }, () => {

                    // successful, close window
                    console.log('complete');
                    this.revert(realBlob, realXML);
                  });
                }).catch(err => {
                  console.log(err);
                  this.revert(realBlob, realXML);
                });
              }}>
              <CircleCheck
                style={styles.accept}
                size={60} />
            </TouchableOpacity>
          </Image>
          <Progress.Bar
            borderWidth={0}
            borderRadius={0}
            color={Colors.Primary}
            progress={this.state.progress}
            height={1}
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

  progressFill: {
    backgroundColor: Colors.Primary
  },

  progressBackground: {
    backgroundColor: Colors.Background
  },

  progress: {
    width: Sizes.width
  }
});
