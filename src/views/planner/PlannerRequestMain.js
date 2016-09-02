import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, ListView
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import Button from '../../components/common/Button';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import RequestCard from '../../components/planner/RequestCard'

/** Shows all kinds of request for planners including
  * Accepted, Unfinished and Finished
  */

export default class PlannerRequestMain extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
    };
  }

  componentDidMount(){
    let bookingList = [];
    bookingList.push({
      bookingId: 'booking1',
      createdBy: 'bookerUserId',
      planner: null,
      requestedTime: 1472515800581,
      occasion: 'tinder date',
      finalized: true,
      confirmed: false,
      contributions: {
        budget: 120.135,
        party: 3,
        exceptions: 'fully cooked beef, no cheese, no red stuff'
      }
    });
    bookingList.push({
      bookingId: 'booking2',
      createdBy: 'bookerUserId',
      planner: 'planner1',
      requestedTime: 1472515900581,
      occasion: 'chill',
      finalized: true,
      confirmed: false,
      contributions: {
        budget: 40,
        party: 2,
        exceptions: 'no veggies, i am a meat eater'
      }
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(bookingList),
    });
  }

  renderRow = (booking) => {
    return (
      <RequestCard
        key={booking.bookingId} booking={booking}
      />
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ListView
          style={styles.listContainer}
          enableEmptySections={true}
          initialListSize={0}
          scrollRenderAheadDistance={10}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          scrollEnabled={true}
          removeClippedSubviews={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.Background,
  },

  topContainer: {
    justifyContent: 'space-between'
  },

  childContainer: {
    padding: 10,
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
});
