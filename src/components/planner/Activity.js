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
          photo: activity.images && activity.images[0]
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
          {
            this.state.photo
            ? (
              <Image
                source={{uri: this.state.photo}}
                style={styles.image} />
            ): (
              <View style={styles.image} />
            )
          }
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>
            {this.state.activity.name}
          </Text>
          <View style={styles.footer}>
            <View style={styles.detailContainer}>
              <Text style={[
                styles.details,
                this.props.thin && styles.thinDetails
              ]}>
                {this.state.activity.description}
              </Text>
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
    backgroundColor: Colors.White,
  },

  thinContainer: {
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

  content: {
    padding: Sizes.InnerFrame,
    flex: 1,
    justifyContent: 'space-between'
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  title: {
    fontSize: Sizes.H2,
    color: Colors.Primary,
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
    color: Colors.Disabled
  },

  priceContainer: {
    borderRadius: 10,
    padding: 10,
    marginLeft: Sizes.InnerFrame,
    backgroundColor: Colors.Primary,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  thinPriceContainer: {
    padding: 2,
    backgroundColor: Colors.Transparent
  },

  price: {
    fontSize: Sizes.H1,
    color: Colors.AlternateText
  },

  thinPrice: {
    color: Colors.Primary
  },

  pricePerPerson: {
    fontSize: Sizes.SmallText,
    color: Colors.AlternateText
  },

  thinPricePerPerson: {
    color: Colors.Primary
  }
});
