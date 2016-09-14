import React, {
  Component
} from 'react';
import {
  StyleSheet, View, ListView
} from 'react-native';
import Database, {
  Firebase
} from '../../utils/Firebase';

// components
import BookingCard from './BookingCard';
import InputSectionHeader from '../common/InputSectionHeader';

// a collection of closures to build a new ListView
let lvClosures = {
  getSectionData: (data, section) => data[section],
  getRowData: (data, section, row) => data[`${section}:${row}`],
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (r1, r2) => r1 !== r2
}

/**
 * A listing of a certain day's Bookings.
 *
 * @param {Date} [props.date] - The Date this BookingDayList should show.
 */
export default class BookingDayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ListView.DataSource(lvClosures)
    };

    this.init = this.init.bind(this);
  }

  init(date) {

    // perform reset if previously initialized
    this.listener && this.componentWillUnmount();
    this.setState({
      data: new ListView.DataSource(lvClosures)
    });

    // setup new filters
    this.db = Database
      .ref('bookings')
      .orderByChild('requestedTime')
      .startAt(new Date(
        date.getFullYear(), date.getMonth(), date.getDate()
      ).valueOf())
      .endAt(new Date(
        date.getFullYear(), date.getMonth(), date.getDate() + 1
      ).valueOf());

    // and listener
    this.listener = this.db.on('value', data => {
      if (data.exists()) {
        let rows = [[], [], []];
        let blob = {
          0: 'Active',
          1: 'Applied',
          2: 'Available'
        };

        data.forEach(booking => {

          // headers are by statuses: 0 - selected, 1 - interested, 2 - general
          let section = 2;
          if (
            booking.child('planner').exists()
            && booking.child(
              'planner'
            ).val() === Firebase.auth().currentUser.uid
          ) {
            section = 0;
          } else if (
            booking.child(
              `interested/${Firebase.auth().currentUser.uid}`
            ).exists()
          ) {
            section = 1;
          }

          // put in blob
          rows[section].push(booking.key);
          blob[`${section}:${booking.key}`] = booking.key;
        });

        // and finally, clone into DataSource
        this.setState({
          data: this.state.data.cloneWithRowsAndSections(blob, [0, 1, 2], rows)
        });
      }
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

  renderSectionHeader(header) {
    return (
      <InputSectionHeader
        label={header} />
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
        renderSectionHeader={this.renderSectionHeader}
        scrollEnabled={true}
        removeClippedSubviews={true} />
    );
  }
}
