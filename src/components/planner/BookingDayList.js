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
 * @param {number} [props.start] - The starting time range (for fine control).
 * @param {number} [props.end] - The ending time range (for fine control).
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

    this.db = Database
      .ref('bookings')
      .orderByChild('requestedTime')
      .startAt(this.props.start || this.props.date && new Date(
        this.props.date.getFullYear(),
        this.props.date.getMonth(),
        this.props.date.getDate()
      ).valueOf())
      .endAt(this.props.end || this.props.date && new Date(
        this.props.date.getFullYear(),
        this.props.date.getMonth(),
        this.props.date.getDate() + 1
      ).valueOf());
  }

  componentDidMount() {
    this.listener = this.db.on('value', data => {
      data.exists() && this.setState({
        data: this.state.data.cloneWithRows(
          Object.keys(data.val())
        )
      });
    });
  }

  componentWillUnmount() {
    this.db.off('value', this.listener);
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
