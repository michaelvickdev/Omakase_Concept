import React, {
  Component
} from 'react';
import {
  View, ScrollView, Text, Alert, StyleSheet
} from 'react-native';
import {
  Colors, Sizes, Strings
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux'
import DateFormat from 'dateformat';

// components
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/common/Button';

/**
  * Show the corresponding request details:
  * Date, Seating, Number of ppl, Address, Occasions, Budget and Exclusions
  */
export default class PlannerRequestDetail extends Component {

  constructor(props){
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
      users: [],
      place: 'Trinity, Toronto, ON'
    };
  }

  componentDidMount() {
    let users = [];
    let user = {};
    user.name = 'Kenneth the Pedo';
    user.age = '36',
    users.push(user);
    user = {};
    user.name = 'Little Girl';
    user.age = '12',
    users.push(user);
    user = {};
    user.name = 'Little Girls Puppy';
    user.age = '3',
    users.push(user);
    this.setState({
      users: users
    })
  }

  _confirmClick() {
    Alert.alert(
      '',
      Strings.ConfirmPlan,
      [
        {text: 'No', onPress: () => this._confirmNo()},
        {text: 'Yes', onPress: () => this._confirmYes()},
      ]
    );
  }

  _confirmNo() {
    console.log("reject");
  }

  _confirmYes() {
    console.log("confirm");
  }

  render() {
    let usersView = [];
    if (this.state.users){
      for (var i=0; i < this.state.users.length; i++) {
        usersView.push(
          <View key={i}>
            <Text style={styles.text}>
              {this.state.users[i].name + ', ' +
                this.state.users[i].age}
            </Text>
          </View>
        )
      }
    }
    return (
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.topContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.day}>
                {DateFormat(
                  new Date(this.state.booking.requestedTime), "dddd")}
              </Text>
              <Text style={styles.date}>
                {DateFormat(
                  new Date(this.state.booking.requestedTime), "mmm dS, yyyy")}
              </Text>
            </View>
            <Text style={styles.time}>
              {DateFormat(
                new Date(this.state.booking.requestedTime), "h:MM TT")}
            </Text>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='group'/>
            <View style={styles.textWrap}>
              <Text style={styles.text}>
                {this.state.booking.contributions.party + ' people:'}
              </Text>
              {usersView}
            </View>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='attach-money'/>
            <View style={styles.textWrap}>
              <Text style={styles.text}>
                {this.state.booking.contributions.budget.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='local-play'/>
              <View style={styles.textWrap}>
                <Text style={[styles.text, {}]}>
                  {this.state.booking.occasion ?
                    this.state.booking.occasion :
                    Strings.NoOccasion}
                </Text>
              </View>
            <View/>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='block'/>
            <View style={styles.textWrap}>
              <Text style={styles.text}>
                {this.state.booking.contributions.exceptions ?
                  this.state.booking.contributions.exceptions :
                  Strings.NoException}
              </Text>
            </View>
          </View>
          <View style={[styles.topContainer, styles.rowContainer]}>
            <Icon
              style={[
                styles.icon
              ]}
              name='place'/>
            <View style={styles.textWrap}>
              <Text style={styles.text}>
                {this.state.place ?
                  this.state.place :
                  'Area not specified'}
              </Text>
            </View>
          </View>
        </ScrollView>
        {!this.state.planner ?
          this.renderAssignButton() : <View/>}
      </View>
    );
  }

  renderAssignButton() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          label={"Cancel"}
          color={Colors.Primary}
          fontColor={Colors.AlternateText}
          onPress={() => Actions.pop()} />
        <Button
          label={"Confirm"}
          color={Colors.Primary}
          fontColor={Colors.AlternateText}
          onPress={() => this._confirmClick()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.Secondary
  },

  topContainer: {
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame,
    paddingTop: Sizes.InnerFrame,

  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowContainer: {
    flexDirection: 'row',
  },

  textWrap: {
    flex: 0.8,
    flexDirection: 'column',
  },

  day: {
    fontSize: Sizes.H1,
    color: Colors.Primary,
    fontWeight: '500'
  },

  date: {
    marginLeft: 5,
    marginBottom: 1,
    fontSize: Sizes.Text,
    color: Colors.Primary,
    alignSelf: 'flex-end'
  },

  time: {
    fontSize: Sizes.H1,
    color: Colors.Primary,
    fontWeight: '500',
    alignSelf: 'flex-end',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Sizes.OuterFrame,
  },

  text: {
    fontSize: Sizes.H2,
    color: Colors.Text,
  },

  icon: {
    color: Colors.Text,
    fontSize: Sizes.H1,
    alignSelf: 'flex-start',
    marginRight: Sizes.InnerFrame,
  }
});
