import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableHighlight
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';
import DateFormat from 'dateformat';

//components
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../common/Button';


/**
 * Request Card Component for booking requests
 */
export default class RequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: {
        bookingId: '1234',
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
      },
    };
  }

  componentDidMount() {
    let status = !this.state.booking.planner ? 'Assigned' :
      ! this.state.booking.confirmed ? 'Awaiting Details' :
      ! this.state.booking.finalized ? 'Confirmed' : 'Complete' ;
    this.setState({
      status: status
    });
  }

  render() {
    let usersView = [];
    if (this.state.booking.contributions.party){
      for (var i=0; i < this.state.booking.contributions.party; i++) {
        usersView.push(
          <View key={i}>
            <Icon
              style={[
                styles.icon
              ]}
              name='account-circle'/>
          </View>
        )
      }
    }
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.rowWrapper}>
          {usersView}
        </View>
        <View>
          <View style={styles.columnWrapper}>
            <Text style={styles.text}>
              {this.state.status}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    // borderRadius: 2,
    // borderColor: '#ffffff',
    // borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Sizes.InnerFrame,
  },

  rowWrapper: {
    flex: 0.8,
    flexDirection: 'row',
  },

  columnWrapper: {
    flex: 0.8,
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },

  text: {
    fontSize: Sizes.H2,
    color: Colors.Primary,
  },

  icon: {
    color: Colors.Text,
    fontSize: 25,
    marginRight: -1,
  }

});
