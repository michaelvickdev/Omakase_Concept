import React, {
  Component
} from 'react';
import {
  StyleSheet, View, ListView, Alert, TouchableOpacity
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';
import {
  Actions
} from 'react-native-router-flux'

// components
import Activity from './Activity';
import BlankActivity from './BlankActivity';
import Swipeout from 'react-native-swipeout';

let lvClosures = {
  rowHasChanged: (r1, r2) => r1 !== r2
};

export default class BookingSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ListView.DataSource(lvClosures)
    };

    this.ref = Database.ref(
      `bookings/${this.props.bookingId}/itinerary`
    );

    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.listener = this.ref.on('value', data => {
      data.exists()
      && this.setState({
        data: (
          new ListView.DataSource(lvClosures)
        ).cloneWithRows(
          Object.keys(data.val())
        )
      });
    });
  }

  renderRow(activityId) {
    return (
      <Swipeout
        right={[
          {
            text: 'Remove',
            color: Colors.Text,
            backgroundColor: Colors.Red,
            onPress: () => {
              Alert.alert(
                'Remove this Activity?',
                null,
                [
                  {
                    text: 'Cancel'
                  }, {
                    text: 'Remove',
                    onPress: () => {
                      this.ref.child(activityId).remove()
                    }
                  }
                ]
              );
            }
          }
        ]}>
        <Activity
          thin
          activityId={activityId} />
      </Swipeout>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections
          removeClippedSubviews
          initialListSize={0}
          renderRow={this.renderRow}
          dataSource={this.state.data}
          scrollRenderAheadDistance={6} />
        <TouchableOpacity
          onPress={() => Actions.categories({
            cityId: (
              this.props.booking
              && this.props.booking.city
              && this.props.booking.city.placeId
            ),

            // behavior triggered when an activity is
            // selected by the planner
            select: activityId => {
              this.ref.update({
                [activityId]: true
              });
            }
          })}>
          <BlankActivity
            style={styles.blank} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Sizes.InnerFrame,
    alignSelf: 'stretch'
  },

  blank: {
    marginTop: 5
  }
});
