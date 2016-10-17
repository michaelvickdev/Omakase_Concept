import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, ListView, TouchableOpacity
} from 'react-native';
import {
  Sizes, Colors, Styles
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';
import DateFormat from 'dateformat';

// components
import BookingDayList from '../../components/planner/BookingDayList';
import Button from '../../components/common/Button';
import CircleCheck from '../../components/common/CircleCheck';

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
          <TouchableOpacity
            onPress={() => this.setState({
              date: new Date(
                this.state.date.getFullYear(),
                this.state.date.getMonth(),
                this.state.date.getDate() - 1
              )
            })}>
            <CircleCheck
              size={40}
              color={Colors.Foreground}
              checkColor={Colors.Primary}
              icon='arrow-back' />
          </TouchableOpacity>
          <Text style={[
            Styles.Header,
            styles.date
          ]}>
            {
              DateFormat(
                this.state.date,
                'dddd, mmmm dS'
              )
            }
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({
              date: new Date(
                this.state.date.getFullYear(),
                this.state.date.getMonth(),
                this.state.date.getDate() + 1
              )
            })}>
            <CircleCheck
              size={40}
              color={Colors.Foreground}
              checkColor={Colors.Primary}
              icon='arrow-forward' />
          </TouchableOpacity>
        </View>
        <BookingDayList date={this.state.date} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.Background,
  },

  body: {
    padding: Sizes.InnerFrame,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  date: {
    color: Colors.Text
  }
});
