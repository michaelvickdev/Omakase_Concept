import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import {
  Sizes, Colors, Styles
} from '../../../res/Constants';
import Database from '../../utils/Firebase';

// components
import Photo from '../common/Photo';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null
    }

    this.ref = Database.ref(
      `categories/${this.props.categoryId}`
    );
  }

  componentDidMount() {
    this.listener = this.ref.on('value', data => {
      if (data.exists()) {
        this.setState({
          category: data.val()
        });
      }
    });
  }

  componentWillUnmount() {
    this.ref.off('value', this.listener);
  }

  render() {
    return (
      <Photo
        style={styles.container}
        photoId={
          this.state.category
          && this.state.category.photo
        }>
        <View style={styles.overlay}>
          <Text style={[
            Styles.Header,
            styles.title,
          ]}>
            {
              this.state.category
              ? this.state.category.name
              : 'Unknown'
            }
          </Text>
          <View style={styles.count}>
            <Text style={styles.countText}>
              {
                this.state.category
                && this.state.category.activities
                ? Object.keys(
                  this.state.category.activities
                ).length: 0
              }
            </Text>
          </View>
        </View>
      </Photo>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: (Sizes.width / 2) - 15,
    height: (Sizes.width / 2) - 15,
    margin: 5,
    backgroundColor: Colors.Primary
  },

  overlay: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PrimaryOverlay
  },

  title: {
    color: Colors.Text
  },

  count: {
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: Sizes.InnerFrame,
    right: Sizes.InnerFrame,
    backgroundColor: Colors.Primary
  },

  countText: {
    color: Colors.Text,
    fontSize: Sizes.SmallText
  }
});
