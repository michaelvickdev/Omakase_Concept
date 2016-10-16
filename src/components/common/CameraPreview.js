import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Image, TouchableOpacity, Alert, NativeModules
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';

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

                // start upload of photo
                NativeModules.RNImageToBase64.getBase64String(
                  this.props.path, (err, base64) => {
                    if (!err) {
                      let task = Firebase.storage().ref().child(
                        `images/${
                          this.props.path.split('/').pop()
                        }`
                      ).putString(base64);

                      // keep track of upload
                      task.on('state_changed', snapshot => {
                        this.setState({
                          progress: (
                            snapshot.bytesTransferred
                            / snapshot.totalByes
                          )
                        });
                      }, err => {

                      }, () => {

                        // successful, close window
                        Alert.alert(task.snapshot.downloadURL);
                      })
                    }
                  }
                );
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
