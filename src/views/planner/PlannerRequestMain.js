import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, ListView
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';

// components
import RequestCard from '../../components/planner/RequestCard'

/**
 * Shows all kinds of request for planners including
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

    // listing of all bookingIds assigned to this planner
    this.bookingRef = Database.ref(
      `assigned/${Firebase.auth().currentUser.uid}`
    ).orderByKey();
  }

  componentWillUnmount() {
    this.bookingListener && this.bookingRef.off(
      'value', this.bookingListener
    );
  }

  componentDidMount() {
    this.bookingListener = this.bookingRef.on('value', data => {
      data.exists() && this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data.val()),
      });
    });
  }

  renderRow(bookingId) {
    return (
      <RequestCard
        bookingId={bookingId} />
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
          removeClippedSubviews={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.Secondary,
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
