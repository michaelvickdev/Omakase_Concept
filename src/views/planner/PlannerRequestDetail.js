import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Alert, Image
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
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
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
import TabButton from '../../components/common/TabButton';

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

  notAllowed() {
    Alert.alert(
      'Not confirmed',
      'This feature is locked until the sponsor confirms you '
      + 'to attend this adventure. Please wait until that happens '
      + 'before making any plans.',
      [
        {
          text: 'OK'
        }
      ]
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          parallaxHeaderHeight={Sizes.height * 0.4}
          contentBackgroundColor={Colors.Background}
          renderBackground={() => (
            <Image
              source={
                this.state.photo
                ? {uri: (
                  Strings.googlePlaceURL
                  + 'photo?maxwidth=800&photoreference='
                  + this.state.photo
                  + '&key='
                  + Strings.googleApiKey
                )}: require('../../../res/img/profile_bg.jpg')
              }
              style={styles.cover} />
          )}
          renderForeground={() => (
            <LinearGradient
              colors={[
                Colors.Transparent,
                Colors.Transparent,
                Colors.NearBlack,
              ]}
              style={styles.headerContainer}>
              <View style={styles.header}>
                <View style={styles.headerText}>
                  <View style={styles.locationContainer}>
                    <Button
                      style={styles.location}
                      color={Colors.Primary}
                      fontColor={Colors.Text}
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
            </LinearGradient>
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
        </ParallaxScrollView>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => this.setState({
              view: 0
            })}>
            <TabButton
              icon='info'
              label='Summary' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (
                this.state.booking.planner
                === Firebase.auth().currentUser.uid
              ) {
                this.setState({view: 1});
              } else {
                this.notAllowed();
              }
            }}>
            <TabButton
              icon='assignment'
              label='Itinerary' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (
                this.state.booking.planner
                === Firebase.auth().currentUser.uid
              ) {
                this.setState({view: 2});
              } else {
                this.notAllowed();
              }
            }}>
            <TabButton
              icon='directions'
              label='Places' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (
                this.state.booking.planner
                === Firebase.auth().currentUser.uid
              ) {
                Actions.camera({
                  onUploaded: photoId => {

                    // handle linking photoId to:
                    // Photographer,
                    Database.ref(
                      `profiles/${
                        Firebase.auth().currentUser.uid
                      }/photos/${
                        photoId
                      }`
                    ).set(true);

                    // Booking,
                    this.ref.child(
                      `photos/${photoId}`
                    ).set(true);

                    // TODO: and Activity
                  }
                });
              } else {
                this.notAllowed();
              }
            }}>
            <TabButton
              icon='photo-camera'
              label='Camera' />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.NearBlack
  },

  cover: {
    height: Sizes.height * 0.4
  },

  headerContainer: {
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
    color: Colors.Text
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
    justifyContent: 'space-around'
  }
});
