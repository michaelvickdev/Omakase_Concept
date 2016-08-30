import React, {
  Component
} from 'react';
import {
  View, ScrollView, Text, Alert, StyleSheet
} from 'react-native';
import {
  Colors, Sizes, Strings
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux'
import DateFormat from 'dateformat';

// components
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/common/Button';

/**
  * Show the corresponding request details:
  * Date, Seating, Number of ppl, Address, Occasions, Budget and Exclusions
  */
export default class PlannerRequestDetail extends Component {

  constructor(props){
    super(props);
    this.state = {
      booking: {
        bookingId: '1234',
        createdBy: 'bookerUserId',
        planner: null,
        requestedTime: 1472515800581,
        occasion: 'tinder date',
        finalized: true,
        confirmed: false,
        contributions: {
          budget: 120,
          party: 2,
          exceptions: 'fully cooked beef, no cheese, no red stuff'
        }
      }
    };
  }

  _confirmClick() {
    Alert.alert(
      '',
      Strings.ConfirmPlan,
      [
        {text: 'No', onPress: () => this._confirmNo()},
        {text: 'Yes', onPress: () => this._confirmYes()},
      ]
    );
  }

  _confirmNo() {
    console.log("reject");
  }

  _confirmYes() {
    console.log("confirm");
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.topContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.day}>
                {DateFormat(
                  new Date(this.state.booking.requestedTime), "dddd")}
              </Text>
              <Text style={styles.date}>
                {DateFormat(
                  new Date(this.state.booking.requestedTime), "mmm dS, yyyy")}
              </Text>
            </View>
            <Text style={styles.time}>
              {DateFormat(
                new Date(this.state.booking.requestedTime), "h:MM TT")}
            </Text>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='group'/>
            <View style={styles.textWrap}>
              <Text style={styles.text}>
                {this.state.booking.contributions.party + ' people'}
              </Text>
            </View>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='attach-money'/>
            <View style={styles.textWrap}>
              <Text style={styles.text}>
                {this.state.booking.contributions.budget.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='local-play'/>
              <View style={styles.textWrap}>
                <Text style={[styles.text, {}]}>
                  {this.state.booking.occasion ?
                    this.state.booking.occasion :
                    Strings.NoOccasion}
                </Text>
              </View>
            <View/>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='block'/>
            <View style={styles.textWrap}>
              <Text style={styles.text}>
                {this.state.booking.contributions.exceptions ?
                  this.state.booking.contributions.exceptions :
                  Strings.NoException}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            label={"Cancel"}
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            onPress={() => Actions.pop()} />
          <Button
            label={"Confirm"}
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            onPress={() => this._confirmClick()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: Sizes.OuterFrame
  },

  topContainer: {
    marginBottom: Sizes.InnerFrame,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Sizes.OuterFrame,
  },

  rowContainer: {
    flexDirection: 'row',
  },

  textWrap: {
    flex: 0.8,
    flexDirection: 'column',
  },

  day: {
    fontSize: Sizes.H1,
    color: Colors.Primary,
  },

  date: {
    marginLeft: 5,
    marginBottom: 1,
    fontSize: Sizes.Text,
    color: Colors.Primary,
    alignSelf: 'flex-end'
  },

  time: {
    fontSize: Sizes.H1,
    color: Colors.Primary,
    alignSelf: 'flex-end'
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  text: {
    fontSize: Sizes.H1,
    color: Colors.Text,
  },

  icon: {
    color: Colors.Text,
    fontSize: Sizes.H1,
    alignSelf: 'flex-start',
    marginRight: Sizes.InnerFrame,
    marginTop: 3,
  }
});
