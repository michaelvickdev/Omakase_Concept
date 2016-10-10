import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import {
  Colors, Sizes, Styles, Strings
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';
import {
  Actions
} from 'react-native-router-flux';
import {
  expandOnParty
} from '../../components/planner/BookingCard';
import DateFormat from 'dateformat';

// components
import ParallaxView from 'react-native-parallax-view';
import GroupAvatar from '../../components/profile/GroupAvatar';
import InformationField from '../../components/common/InformationField';
import InputField from '../../components/common/InputField';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CircleCheck from '../../components/common/CircleCheck';
import Button from '../../components/common/Button';
import BookingItinerary from '../../components/planner/BookingItinerary';
import BookingSummary from '../../components/planner/BookingSummary';
import BookingPlaces from '../../components/planner/BookingPlaces';

export default class PlannerRequestDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      booking: {},
      photo: null,
      random: Math.random()
    };

    this.ref = Database.ref(
      `bookings/${this.props.bookingId}`
    );
  }

  componentDidMount() {
    this.listener = this.ref.on('value', data => {
      if (data.exists()) {
        let booking = data.val();
        let [party, budget] = expandOnParty(booking);

        // obtain photo
        if (booking.city.placeId){
          fetch(Strings.googlePlaceURL + 'details/json?placeid='
            + booking.city.placeId + '&key='
            + Strings.googleApiKey)
          .then(response => response.json())
          .then(json => {
            let photo = json.result.photos[
              Math.floor(
                this.state.random
                * json.result.photos.length
              )
            ].photo_reference;
            this.setState({
              photo: photo
            });
          });
        }

        this.setState({
          booking: booking,
          party: party,
          budget: budget,
          size: party.size
        });
      }
    });
  }

  componentWillUnmount() {
    this.ref.off('value', this.listener);
  }

  render() {
    return (
      <View style={styles.container}>
        <ParallaxView
          backgroundSource={
            this.state.photo
            ? {uri: (
              Strings.googlePlaceURL
              + 'photo?maxwidth=800&photoreference='
              + this.state.photo
              + '&key='
              + Strings.googleApiKey
            )}: require('../../../res/img/profile_bg.jpg')
          }
          windowHeight={400}
          scrollableViewStyle={styles.headerScroll}
          header={(
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <View style={styles.headerText}>
                  <View style={styles.locationContainer}>
                    <Button
                      style={styles.location}
                      color={Colors.Primary}
                      fontColor={Colors.AlternateText}
                      size={Sizes.SmallText}
                      icon="place"
                      label={
                        this.state.booking
                        && this.state.booking.city
                        && this.state.booking.city.name
                      } />
                  </View>
                  <Text style={[
                    Styles.Header,
                    styles.title
                  ]}>
                    {DateFormat(
                      this.state.booking
                      && this.state.booking.requestedTime
                      && new Date(this.state.booking.requestedTime)
                      || new Date(),
                      'dddd, mmmm dS'
                    )}
                  </Text>
                </View>
                <GroupAvatar
                  style={styles.group}
                  limit={3}
                  uids={
                    this.state.party
                  } />
              </View>
            </View>
          )}>
          {(() => {
            switch(this.state.view) {
              case 1: return (
                <BookingItinerary
                  bookingId={this.props.bookingId}
                  booking={this.state.booking} />
              );
              case 2: return (
                <BookingPlaces
                  bookingId={this.props.bookingId}
                  booking={this.state.booking} />
              );
              default: return (
                <BookingSummary
                  bookingId={this.props.bookingId}
                  booking={this.state.booking} />
              );
            }
          })()}
        </ParallaxView>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => this.setState({
              view: 0
            })}
            style={styles.tabItem}>
            <Icon
              color={Colors.AlternateText}
              size={15}
              name='info' />
            <Text style={styles.tabLabel}>
              Summary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({
              view: 1
            })}
            style={styles.tabItem}>
            <Icon
              color={Colors.AlternateText}
              size={15}
              name='assignment' />
            <Text style={styles.tabLabel}>
              Itinerary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({
              view: 2
            })}
            style={styles.tabItem}>
            <Icon
              color={Colors.AlternateText}
              size={15}
              name='directions' />
            <Text style={styles.tabLabel}>
              Places
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({
              view: 3
            })}
            style={styles.tabItem}>
            <Icon
              color={Colors.AlternateText}
              size={15}
              name='photo-camera' />
            <Text style={styles.tabLabel}>
              Camera
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background
  },

  headerScroll: {
    backgroundColor: Colors.Background
  },

  headerContainer: {
    backgroundColor: Colors.Overlay,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: Sizes.InnerFrame,
    paddingRight: Sizes.OuterFrame
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },

  group: {
    flex: 1
  },

  top: {
    marginTop: Sizes.InnerFrame
  },

  title: {
    color: Colors.AlternateText
  },

  location: {
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10
  },

  locationContainer: {
    marginLeft: Sizes.InnerFrame,
    marginBottom: 3,
    alignItems: 'flex-start'
  },

  tabs: {
    backgroundColor: Colors.Primary,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Sizes.InnerFrame
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  tabLabel: {
    fontSize: Sizes.SmallText,
    color: Colors.AlternateText
  }
});
