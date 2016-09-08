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
import SingleLineInput from '../../components/common/SingleLineInput';
import CheckboxField from '../../components/common/CheckboxField';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/common/Button';

/**
  * Allows planner to make plans
  */
export default class PlannerRequestPlan extends Component {

  constructor(props){
    super(props);
    this.state = {
      booking: props.booking,
      users: props.booking.users,
      place: props.booking.place
    };
  }

  componentDidMount() {
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
      booking: booking,
      ready: false
    })
    Actions.refresh({title: this.state.booking.status})
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
          <View style={styles.topContainer}>
            <InputSectionHeader
              label="Plan" />
            <SingleLineInput
              isTop
              ref={ref => this._address = ref}
              label="Restaurant Address" />
            <CheckboxField
              ref={ref => this._reservation = ref}
              label="Reservation" />
            <CheckboxField
              ref={ref => this._ride = ref}
              label="Ride" />
            <CheckboxField
              ref={ref => this._food = ref}
              label="Food" />
            <SingleLineInput
              isBottom
              ref={ref => this._address = ref}
              label="Notes" />
          </View>
          {!this.state.ready ?
          <View style={styles.buttonContainer}>
            <Button
              label={"Save"}
              color={Colors.Primary}
              fontColor={Colors.AlternateText}
              onPress={() => alert("save")} />
          </View>
          :
          <View style={styles.buttonContainer}>
            <Button
              label={"Save"}
              color={Colors.Primary}
              fontColor={Colors.AlternateText}
              onPress={() => alert("save")} />
            <Button
              label={"Submit"}
              color={Colors.Primary}
              fontColor={Colors.AlternateText}
              onPress={() => alert("submit")} />
          </View>}
        </ScrollView>

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
    backgroundColor: Colors.Transparent
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
