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
      booking: props.booking,
      users: props.booking.users,
      place: props.booking.place
    };
  }

  componentDidMount() {
    Actions.refresh({title: this.state.booking.status})
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
    //hack
    let booking = this.state.booking;
    booking.status = 'Confirmed';
    this.setState({
      booking: booking
    })
    Actions.refresh({title: this.state.booking.status})
  }

  _makePlan() {
    Actions.plannerRequestPlan({booking: this.state.booking});
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
              <Text style={[styles.text, styles.subheadingText]}>
                {this.state.booking.contributions.party + ' participants:'}
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
              <Text style={[styles.text, styles.subheadingText]}>
                Budget
              </Text>
              <Text style={styles.text}>
                {'$' + this.state.booking.contributions.budget.toFixed(2)}
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
                <Text style={[styles.text, styles.subheadingText]}>
                  Occasion
                </Text>
                <Text style={[styles.text, {}]}>
                  {this.state.booking.occasion ?
                    this.state.booking.occasion :
                    Strings.NotSpecified}
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
              <Text style={[styles.text, styles.subheadingText]}>
                Exclusions
              </Text>
              <Text style={styles.text}>
                {this.state.booking.contributions.exceptions ?
                  this.state.booking.contributions.exceptions :
                  Strings.NotSpecified}
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
              <Text style={[styles.text, styles.subheadingText]}>
                Area
              </Text>
              <Text style={styles.text}>
                {this.state.place ?
                  this.state.place :
                  Strings.NotSpecified}
              </Text>
            </View>
          </View>
        </ScrollView>
        {this.state.booking.status === 'Assigned'?
          this.renderAssignButton() :
          this.state.booking.status === 'Awaiting Details' ?
          this.renderPlanButton() :
          this.state.booking.status === 'Confirmed' ?
          this.renderEditButton() : <View/>}
      </View>
    );
  }

  renderAssignButton() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          ref={this.cancelButton}
          label={"Cancel"}
          color={Colors.Primary}
          fontColor={Colors.AlternateText}
          shouldBlur={true}
          onPress={() => Actions.pop()} />
        <Button
          label={"Confirm"}
          color={Colors.Primary}
          fontColor={Colors.AlternateText}
          onPress={() => this._confirmClick()} />
      </View>
    );
  }

  renderPlanButton() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          label={"Make Plan"}
          color={Colors.Primary}
          fontColor={Colors.AlternateText}
          onPress={() => this._makePlan()} />
      </View>
    );
  }

  renderEditButton() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          label={"Edit Plan"}
          color={Colors.Primary}
          fontColor={Colors.AlternateText}
          onPress={() => this._makePlan()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  topContainer: {
    paddingTop: Sizes.InnerFrame,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame,
  },

  rowContainer: {
    flexDirection: 'row',
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame,
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

  subheadingText: {
    fontStyle: 'italic'
  },

  icon: {
    color: Colors.Text,
    fontSize: Sizes.H1,
    alignSelf: 'flex-start',
    marginRight: Sizes.InnerFrame,
    marginTop: -1,
  }
});
