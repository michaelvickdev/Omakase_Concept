import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Image, Text
} from 'react-native';
import {
  Sizes, Colors, Styles
} from '../../../res/Constants';
import Database from '../../utils/Firebase';

// components
import Photo from '../common/Photo';

export default class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: {},
      photo: null
    };
    this.ref = Database.ref(
      `activities/${this.props.activityId}`
    );
  }

  componentDidMount() {
    this.listener = this.ref.on('value', data => {
      if (data.exists()) {
        let activity = data.val();
        this.setState({
          activity: activity,
          photoId: (
            activity.photos
            && Object.keys(activity.photos)[0]
          )
        });
      }
    });
  }

  componentWillUnmount() {
    this.ref.off('value', this.listener);
  }

  render() {
    return (
      <View style={[
        styles.container,
        this.props.thin && styles.thinContainer
      ]}>
        <View style={[
          styles.imageContainer,
          this.props.thin && styles.thinImageContainer
        ]}>
          <Photo
            style={styles.image}
            photoId={this.state.photoId}>
            {!this.props.thin && (
              <View style={styles.overlay} />
            )}
          </Photo>
        </View>
        <View style={[
          styles.content,
          this.props.thin && styles.thinContent
        ]}>
          <Text style={styles.title}>
            {this.state.activity.name}
          </Text>
          <View style={styles.footer}>
            <View style={styles.detailContainer}>
              <Text style={[
                styles.details,
                styles.subtitle
              ]}>
                Zen Japanese Restaurant - 2.3km away
              </Text>
            </View>
            <View style={[
              styles.priceContainer,
              this.props.thin && styles.thinPriceContainer
            ]}>
              <Text style={[
                styles.price,
                this.props.thin && styles.thinPrice
              ]}>
                ${this.state.activity.price}
              </Text>
              <Text style={[
                styles.pricePerPerson,
                this.props.thin && styles.thinPricePerPerson
              ]}>
                per person
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Transparent,
    margin: 5,
    marginLeft: Sizes.InnerFrame,
    marginRight: Sizes.InnerFrame
  },

  thinContainer: {
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: Colors.Transparent,
    flexDirection: 'row'
  },

  imageContainer: {
    alignSelf: 'stretch',
    height: 200,
    overflow: 'hidden'
  },

  thinImageContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  image: {
    backgroundColor: Colors.Primary,
    alignSelf: 'stretch',
    height: 200
  },

  overlay: {
    flex: 1,
    backgroundColor: Colors.PrimaryOverlay
  },

  content: {
    backgroundColor: Colors.Primary,
    padding: Sizes.InnerFrame,
    flex: 1,
    justifyContent: 'space-between'
  },

  thinContent: {
    backgroundColor: Colors.Foreground
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  title: {
    fontSize: Sizes.H2,
    color: Colors.Text,
    fontWeight: '500',
    flexWrap: 'nowrap'
  },

  detailContainer: {
    flex: 1
  },

  details: {
    fontSize: Sizes.SmallText
  },

  thinDetails: {
    height: 0
  },

  subtitle: {
    marginTop: Sizes.InnerFrame,
    color: Colors.Text
  },

  priceContainer: {
    borderRadius: 10,
    padding: 2,
    marginLeft: Sizes.InnerFrame,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  price: {
    fontSize: Sizes.H1,
    color: Colors.Text
  },

  pricePerPerson: {
    fontSize: Sizes.SmallText,
    color: Colors.Text
  }
});
