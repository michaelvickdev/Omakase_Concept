import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux'
import Database from '../../utils/Firebase';

// components
import Avatar from '../profile/Avatar';

/**
 * Request Card Component for booking requests
 */
export default class RequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: null,
      budget: 0
    };
  }

  componentDidMount() {
    Database.ref(
      `bookings/${this.props.bookingId}`
    ).once('value', data => {
      if (data.exists()) {

        // total total contributions
        let booking = data.val();
        this.setState({
          booking: booking,
          budget: Object.keys(
            booking.contributions
          ).map(
            uid => booking.contributions[uid].budget
          ).reduce((total, contribution) => total + contribution, 0)
        });
      }
    });
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.avatarContainer}>
          {
            this.state.booking && Object.keys(
              this.state.booking.contributions
            ).map(uid => (
              <View
                style={styles.avatarContainer}
                key={uid}>
                {
                  new Array(
                    this.state.booking.contributions[uid].party
                  ).fill().map(i => (
                    <View
                      key={`${uid}-${Math.random()}`}
                      style={styles.avatar}>
                      <Avatar
                        size={35}
                        uid={uid} />
                    </View>
                  ))
                }
              </View>
            ))
          }
        </View>
        <View>
          <View style={styles.detailsContainer}>
            <Text style={styles.budget}>
              {`$${this.state.budget.toFixed(2)}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Sizes.OuterFrame,
    marginBottom: Sizes.ItemSpacer
  },

  avatarContainer: {
    flexDirection: 'row',
  },

  avatar: {
    marginRight: -7,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Background
  },

  detailsContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },

  budget: {
    fontSize: Sizes.H2,
    color: Colors.Text,
    alignSelf: 'flex-end'
  }
});
