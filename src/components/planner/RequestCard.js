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
      booking: props.booking
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

  _open(){
    Actions.plannerRequestDetail({booking: this.state.booking});
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
              name='person'/>
          </View>
        )
      }
    }
    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={() => this._open()}>
        <View style={styles.rowWrapper}>
          {usersView}
        </View>
        <View>
          <View style={styles.columnWrapper}>
            <Text style={styles.text}>
              {this.state.status}
            </Text>
            <Text style={styles.dollarText}>
              {'$' + this.state.booking.contributions.budget.toFixed(2)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
    fontWeight: '500',
    color: Colors.Primary,
  },

  dollarText: {
    fontSize: Sizes.H2,
    color: Colors.Text,
    alignSelf: 'flex-end'
  },

  icon: {
    color: Colors.Text,
    fontSize: 25,
    marginRight: -7,
  }

});
