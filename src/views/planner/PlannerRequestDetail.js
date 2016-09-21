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

// components
import ParallaxView from 'react-native-parallax-view';
import GroupAvatar from '../../components/profile/GroupAvatar';
import InformationField from '../../components/common/InformationField';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import Activity from '../../components/planner/Activity';

export default class PlannerRequestDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return (
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
                Toronto, ON
              </Text>
              <GroupAvatar
                limit={4}
                uids={
                  this.state.party
                } />
            </View>
          </View>
        )}>
        <Text style={styles.status}>
          We're still waiting to hear back from the sponsor before
          you should start planning things to do.
        </Text>
        <InputSectionHeader label="Adventure Criteria" />
        <InformationField
          isTop
          label="Adventure Date"
          color={Colors.White}
          info="September 18th, 2016" />
        <InformationField
          label="Meeting Location"
          color={Colors.White}
          info="1839 Queen Street W, Toronto, ON" />
        <InformationField
          isBottom
          label="Excitement Level"
          color={Colors.White}
          info="Leisurely" />

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
          info="English, and Cantonese" />
        <Activity activityId="-KEJWEHEJjeweh-wehe-ej2" />
        <Activity activityId="-KEKWEJJEWjejw-wejwejweejw2jn" />
      </ParallaxView>
    );
  }
}

const styles = StyleSheet.create({
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

  title: {
    color: Colors.AlternateText
  },

  status: {
    margin: Sizes.InnerFrame,
    padding: Sizes.InnerFrame,
    backgroundColor: Colors.Primary,
    color: Colors.AlternateText
  }
});
