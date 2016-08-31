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
    let booking = {};
    booking.bookingId = 'booking1';
    bookingList.push(booking);
    booking.bookingId = 'booking2';
    bookingList.push(booking);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(bookingList),
    });
  }

  renderRow = (booking) => {
    return (
      <RequestCard
        key={booking.bookingId}
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
