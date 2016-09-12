import React, {
  Component
} from 'react';
import {
  StyleSheet, View, ListView
} from 'react-native';
import Database from '../../utils/Firebase';

// components
import BookingCard from './BookingCard';

/**
 * A listing of a certain day's Bookings.
 *
 * @param {Date} [props.date] - The Date this BookingDayList should show.
 */
export default class BookingDayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (r1, r2) => r1 !== r2
      })
    };

    this.init = this.init.bind(this);
  }

  init(date) {

    // perform reset if previously initialized
    this.listener && this.componentWillUnmount();
    this.setState({
      data: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (r1, r2) => r1 !== r2
      })
    });

    // setup new filters
    this.db = Database
      .ref('bookings')
      .orderByChild('requestedTime')
      .startAt(new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).valueOf())
      .endAt(new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      ).valueOf());

    // and listener
    this.listener = this.db.on('value', data => {
      data.exists() && this.setState({
        data: this.state.data.cloneWithRows(
          Object.keys(data.val())
        )
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps.date);
  }

  componentDidMount() {
    this.init(this.props.date);
  }

  componentWillUnmount() {
    this.db && this.db.off('value', this.listener);
  }

  renderRow(bookingId) {
    return (
      <BookingCard bookingId={bookingId} />
    );
  }

  render() {
    return (
      <ListView
        {...this.props}
        enableEmptySections={true}
        initialListSize={0}
        scrollRenderAheadDistance={10}
        dataSource={this.state.data}
        renderRow={this.renderRow}
        scrollEnabled={true}
        removeClippedSubviews={true} />
    );
  }
}
