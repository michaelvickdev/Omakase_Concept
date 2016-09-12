import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, ListView
} from 'react-native';
import {
  Sizes, Colors, Styles
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';

// components
import BookingDayList from '../../components/planner/BookingDayList';
import Button from '../../components/common/Button';

let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

/**
 * Shows all kinds of request for planners including
 * Accepted, Unfinished and Finished
 */
export default class PlannerRequestMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.body}>
          <Text style={Styles.Header}>
            {
              `${this.state.date.toLocaleString(
                'en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                }
              )} in Toronto`
            }
          </Text>
          <Text style={Styles.BodyText}>
            Seems like a busy day.
          </Text>
        </View>
        <BookingDayList date={this.state.date} />
        <View style={styles.buttons}>
          <Button
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            icon="arrow-back"
            onPress={() => this.setState({
              date: new Date(
                this.state.date.getFullYear(),
                this.state.date.getMonth(),
                this.state.date.getDate() - 1
              )
            })}
            label={`${
              days[
                new Date(
                  this.state.date.getFullYear(),
                  this.state.date.getMonth(),
                  this.state.date.getDate() - 1
                ).getDay()
              ]
            }`} />
          <Button
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            rightIcon="arrow-forward"
            onPress={() => this.setState({
              date: new Date(
                this.state.date.getFullYear(),
                this.state.date.getMonth(),
                this.state.date.getDate() + 1
              )
            })}
            label={`${
              days[
                new Date(
                  this.state.date.getFullYear(),
                  this.state.date.getMonth(),
                  this.state.date.getDate() + 1
                ).getDay()
              ]
            }`} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },

  body: {
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame
  },

  buttons: {
    padding: Sizes.InnerFrame,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  }
});
