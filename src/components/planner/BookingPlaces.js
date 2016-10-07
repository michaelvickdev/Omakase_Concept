import React, {
  Component
} from 'react';
import {
  StyleSheet, View
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import MapView from 'react-native-maps';

export default class BookingPlaces extends Component {
  render() {
    return (
      <MapView
        scrollEnabled
        style={styles.map}
        region={{
          latitude: 43.784560,
          longitude: -79.184770,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}>
        <MapView.Marker
          coordinate={{
            latitude: 43.784560,
            longitude: -79.184770,
          }}
          title={'Meet-up Location'}
          description={'1265 Military Trail'}
          pinColor={Colors.Primary}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: Sizes.height,
    flex: 1,
    alignSelf: 'stretch'
  }
});
