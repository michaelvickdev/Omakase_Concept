import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Image, TouchableOpacity, Text
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
      photo: ''
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
      <TouchableOpacity
        style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: this.state.photo}}
            style={styles.image} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>
            {this.state.activity.name}
          </Text>
          <View style={styles.footer}>
            <View style={styles.detailContainer}>
              <Text style={styles.details}>
                {this.state.activity.description}
              </Text>
              <Text style={[
                styles.details,
                styles.subtitle
              ]}>
                Zen Japanese Restaurant - 2.3km away
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                ${this.state.activity.price}
              </Text>
              <Text style={styles.pricePerPerson}>
                per person
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: Colors.White,
    marginBottom: 2
  },

  imageContainer: {
    alignSelf: 'stretch',
    height: 200,
    overflow: 'hidden'
  },

  image: {
    width: Sizes.width,
    height: 200
  },

  content: {
    padding: Sizes.InnerFrame
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },

  title: {
    fontSize: Sizes.H2,
    color: Colors.Primary,
    fontWeight: '500'
  },

  detailContainer: {
    flex: 1
  },

  details: {
    fontSize: Sizes.SmallText
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

  price: {
    fontSize: Sizes.H1,
    color: Colors.AlternateText
  },

  pricePerPerson: {
    fontSize: Sizes.SmallText,
    color: Colors.AlternateText
  }
});
