import React, {
  Component
} from 'react';
import {
  StyleSheet, View, ScrollView
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import Database from '../../utils/Firebase';

// components
import FirebaseCamera from '../../components/common/FirebaseCamera';
import PhotoGrid from '../../components/common/PhotoGrid';
import CloseFullscreenButton from '../../components/common/CloseFullscreenButton';

export default class TripCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };

    this.ref = Database.ref(
      `bookings/${
        this.props.bookingId
      }/photos`
    );
  }

  componentDidMount() {
    this.listener = this.ref.on('value', data => {
      data.exists() && this.setState({
        photos: Object.keys(data.val())
      });
    });
  }

  componentWillUnmount() {
    this.ref.off('value', this.listener);
  }

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
            width={Sizes.width - 2}
            photoIds={this.state.photos} />
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
    paddingLeft: 2,
    paddingTop: 2,
    paddingBottom: 2
  }
});
