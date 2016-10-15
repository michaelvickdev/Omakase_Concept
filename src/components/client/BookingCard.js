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
export default class BookingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: this.props.booking,
      random: Math.random()
    };
  }

  componentDidMount() {
    // Compute display values
    console.log("mount " + this.props.booking.address);


    if (this.props.booking) {
      let booking = this.props.booking;

      if (booking.city.placeId){
        fetch(Strings.googlePlaceURL + 'details/json?placeid='
          + booking.city.placeId + '&key='
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

      if (booking.requestedTime){
        booking.date = Lists.Days[new Date(booking.requestedTime).getDay()]
          + ", " + DateFormat(new Date(booking.requestedTime),
          'mmmm dS yyyy');
      }

      let [party, budget] = expandOnParty(booking);
      this.setState({
        booking: booking,
        budget: budget,
        party: party,
        size: party.length,
        status: 'Hang tight!! We\'re looking for a planner for you'
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
                  this.state.booking.city && this.state.booking.city.name
                    ? this.state.booking.city.name
                    : 'Trip'
                }
              </Text>
            </View>
            <Text style={styles.cardText}>
              {this.state.booking.date}
            </Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardText}>
              {
                this.state.booking.address
                && 'Pickup:\n' + this.state.booking.address
              }
            </Text>
            <Text style={styles.cardText}>
              {
                "Budget:\n$" + this.state.budget
                + " for party of " + this.state.size
              }
            </Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.cardText}>
            {this.state.status}
          </Text>
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

  cardBody: {
    margin: Sizes.InnerFrame,
    marginTop: Sizes.InnerFrame*2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.Transparent
  },

  cardFooter: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.Primary,
    paddingTop: Sizes.InnerFrame/2,
    paddingLeft: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame
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
