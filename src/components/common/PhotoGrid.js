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
import Photo from './Photo';

export default class PhotoGrid extends Component {
  render() {
    return (
      <View style={[
        styles.container,
        this.props.width && {
          width: this.props.width
        }
      ]}>
        {this.props.photoIds.map(photoId => {
          return (
            <Photo
              key={Math.random()}
              style={[
                styles.photo,
                this.props.width && {
                  width: (
                    (this.props.width / this.props.eachRow) - 2
                  ),
                  height: (
                    (this.props.width / this.props.eachRow) - 2
                  )
                }
              ]}
              photoId={photoId} />
            );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: -1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  photo: {
    margin: 1,
    height: 100,
    width: 100
  }
});
