import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import {
  Colors, Sizes, Styles
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
import Excitement from '../../components/common/Excitement';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CircleCheck from '../../components/common/CircleCheck';
import BookingItinerary from '../../components/planner/BookingItinerary';

export default class PlannerRequestDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      booking: {}
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
    let a = (
      this.state.booking
      && this.state.booking.languages
      || []
    );

    return (
      <View style={styles.container}>
        <ParallaxView
          backgroundSource={require('../../../res/img/profile_bg.jpg')}
          windowHeight={100}
          scrollableViewStyle={styles.headerScroll}
          header={(
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Text style={[
                  Styles.Header,
                  styles.title
                ]}>
                  {this.state.booking && this.state.booking.city}
                </Text>
                <GroupAvatar
                  limit={4}
                  uids={
                    this.state.party
                  } />
              </View>
            </View>
          )}>
          {
            this.state.view === 0

            // show summary tab
            ? (
              <View>
                {
                  (
                    this.state.booking
                    && this.state.booking.planner === Firebase.auth().currentUser.uid
                  ) ? (
                    <View style={[
                      styles.status, styles.active
                    ]}>
                      <Text style={styles.statusText}>
                        You've been selected to go and plan this adventure!
                      </Text>
                      <CircleCheck
                        color={Colors.AlternateText}
                        checkColor={Colors.Green}
                        size={30} />
                    </View>
                  ): (
                    <View style={[
                      styles.status, styles.pending
                    ]}>
                      <Text style={styles.statusText}>
                        We're still waiting to hear back from the sponsor before you
                        should start planning things to do.
                      </Text>
                    </View>
                  )
                }
                <InputSectionHeader
                  label="Adventure Criteria" />
                <InformationField
                  isTop
                  label="Adventure Date"
                  color={Colors.White}
                  info={DateFormat(
                    this.state.booking
                    && this.state.booking.requestedTime
                    && new Date(this.state.booking.requestedTime)
                    || new Date(),
                    'mmmm dS, yyyy'
                  )} />
                <InformationField
                  label="Meeting Location"
                  color={Colors.White}
                  info={
                    this.state.booking
                    && this.state.booking.address
                    || 'Unknown'
                  } />
                <TouchableOpacity
                  onPress={() => Actions.activities({

                    // TODO: remove hardcoded defaults
                    city: this.state.booking.city || 'Toronto, ON, Canada',
                    excitement: this.state.booking.excitement || 0
                  })}>
                  <InputField
                    isBottom
                    label="Excitement Level"
                    color={Colors.White}
                    field={
                      <Excitement
                        style={styles.excitement}
                        level={this.state.booking.excitement || 0} />
                    } />
                </TouchableOpacity>

                <InputSectionHeader label="Sponsor Profile" />
                <TouchableOpacity
                  onPress={() => Actions.profile({
                    uid: this.state.booking.createdBy
                  })}>
                  <InformationField
                    isTop
                    label="Name"
                    color={Colors.White}
                    info="Kenneth Ma" />
                </TouchableOpacity>
                <InformationField
                  isBottom
                  label="Languages Spoken"
                  color={Colors.White}
                  info={
                    a.join(', ').replace(/,([^,]+)$/,`${a[2] ? ',': ''} and$1`)

                    // default english
                    || 'English'
                  } />
              </View>
            ): (
              <BookingItinerary booking={this.state.booking}/>
            )
          }
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

  top: {
    marginTop: Sizes.InnerFrame
  },

  title: {
    color: Colors.AlternateText
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.InnerFrame,
    padding: Sizes.InnerFrame
  },

  statusText: {
    color: Colors.AlternateText,
    flex: 1
  },

  pending: {
    backgroundColor: Colors.Primary
  },

  active: {
    backgroundColor: Colors.Green
  },

  excitement: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: Sizes.OuterFrame
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
