import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Image, Alert, TouchableOpacity
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import Camera from 'react-native-camera';

export default class FirebaseCamera extends Component {
  constructor(props) {
    super(props);
    this.shutter = this.shutter.bind(this);
  }
  
  shutter() {
    this.camera.capture().then(data => {
      Alert.alert('hi');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => this.camera = cam}
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}>
          <View style={styles.upperContainer}></View>
          <View style={styles.lowerContainer}>
            <TouchableOpacity
              onPress={this.shutter}>
              <Image
                style={styles.shutter}
                source={require('../../../res/img/shutter.png')} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },

  camera: {
    flex: 1,
    alignSelf: 'stretch',
    padding: Sizes.InnerFrame,
    justifyContent: 'space-between'
  },

  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  lowerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around'
  },

  shutter: {
    height: 80,
    width: 80
  }
});
