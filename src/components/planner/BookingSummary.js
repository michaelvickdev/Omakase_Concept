import React, {
  Component
} from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text
} from 'react-native';
import {
  Firebase
} from '../../utils/Firebase';
import {
  Colors, Sizes
} from '../../../res/Constants';
import DateFormat from 'dateformat';

// components
import CircleCheck from '../common/CircleCheck';
import InputSectionHeader from '../common/InputSectionHeader';
import InformationField from '../common/InformationField';
import InputField from '../common/InputField';
import Excitement from '../../components/common/Excitement';

export default class BookingSummary extends Component {
  render() {
    let a = (
      this.props.booking
      && this.props.booking.languages
      || []
    );

    return (
      <View style={styles.container}>
        {
          (
            this.props.booking
            && this.props.booking.planner === Firebase.auth().currentUser.uid
          ) ? (
            <View style={[
              styles.status, styles.active
            ]}>
              <Text style={styles.statusText}>
                You've been selected to go and plan this adventure!
              </Text>
              <CircleCheck
                color={Colors.Text}
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
          info={DateFormat(
            this.props.booking
            && this.props.booking.requestedTime
            && new Date(this.props.booking.requestedTime)
            || new Date(),
            'mmmm dS, yyyy'
          )} />
        <InputField
          isBottom
          label="Excitement Level"
          field={
            <Excitement
              style={styles.excitement}
              level={this.props.booking.excitement || 0} />
          } />

        <InputSectionHeader label="Sponsor Profile" />
        <TouchableOpacity
          onPress={() => Actions.profile({
            uid: this.props.booking.createdBy
          })}>
          <InformationField
            isTop
            label="Name"
            info="Kenneth Ma" />
        </TouchableOpacity>
        <InformationField
          isBottom
          label="Languages Spoken"
          info={
            a.join(', ').replace(/,([^,]+)$/,`${a[2] ? ',': ''} and$1`)

            // default english
            || 'English'
          } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.InnerFrame,
    padding: Sizes.InnerFrame
  },

  statusText: {
    color: Colors.Text,
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
  }
});
