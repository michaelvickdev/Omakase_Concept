import React, {
  Component
} from 'react';
import {
  StyleSheet, View, ScrollView
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import FirebaseCamera from '../../components/common/FirebaseCamera';
import PhotoGrid from '../../components/common/PhotoGrid';
import CloseFullscreenButton from '../../components/common/CloseFullscreenButton';

export default class TripCamera extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.camera}>
          <FirebaseCamera
            onUploaded={this.props.onUploaded} />
        </View>
        <ScrollView
          contentContainerStyle={styles.grid}>
          <PhotoGrid
            eachRow={4}
            width={Sizes.width - Sizes.InnerFrame * 2 + 5}
            photoIds={this.props.photos} />
        </ScrollView>
        <CloseFullscreenButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background
  },

  camera: {
    height: Sizes.height * 0.7,
    alignSelf: 'stretch'
  },

  grid: {
    alignItems: 'center',
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame
  }
});
