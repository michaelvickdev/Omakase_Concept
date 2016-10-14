import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableHighlight, Image
} from 'react-native';
import {
  Colors, Sizes, Strings, Lists
} from '../../../res/Constants';
import {
  expandOnParty
} from '../planner/BookingCard';

import DateFormat from 'dateformat';
import Button from '../common/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';


/**
 * Booking Card Component for bookings
 */
export default class BookingCardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.props.city.name || 'Your Destination',
      placeId: this.props.city.placeId,
      random: Math.random()
    };
  }

  componentDidMount() {
    // Compute display values

    if (this.state.placeId){
      fetch(Strings.googlePlaceURL + 'details/json?placeid='
        + this.state.placeId + '&key='
        + Strings.googleApiKey)
      .then(response => response.json())
      .then((json) => {
        let photoReference = json.result.photos[Math.floor(this.state.random
          *(json.result.photos.length))].photo_reference;
        if (!this.isUnmounted){
          this.setState({
            photoReference: photoReference
          });
        }
      });
    }

  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    return (
      <View style={styles.cardWrapper}>
        {this.state.photoReference ?
        <Image style={styles.primaryPhoto}
          source={{uri:
            Strings.googlePlaceURL + 'photo?maxwidth=800&photoreference=' +
            this.state.photoReference +
            '&key=' + Strings.googleApiKey}}/>
        : <View/> }
        <View style={styles.cardContent}>
          <View style={styles.cardIntro}>
            <View style={styles.rowWrapper}>
              <Icon style={styles.icon}
                name='place'
                size={Sizes.H1}
                color={Colors.Secondary} />
              <Text style={[styles.cardText, styles.cardTitleText]}>
                {
                  this.state.city ? this.state.city : 'Trip'
                }
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    backgroundColor: Colors.Background,
    shadowColor: Colors.Shadow,
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 2,
    },
    marginTop: 10,
  },

  cardContent: {
    backgroundColor: Colors.Overlay,
  },

  primaryPhoto: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Sizes.width,
    height: 250,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  rowWrapper: {
    flex: 0.8,
    flexDirection: 'row',
  },

  icon: {
    marginTop: 10,
    marginRight: 5,
    marginLeft: -5
  },

  cardIntro: {
    margin: Sizes.InnerFrame,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.Transparent
  },

  cardText: {
    marginTop: Sizes.InnerFrame/2,
    color: Colors.Secondary,
    fontSize: Sizes.H2,
    fontWeight: '500'
  },

  cardTitleText: {
    fontSize: Sizes.H1,
    fontWeight: '600'
  },


});
