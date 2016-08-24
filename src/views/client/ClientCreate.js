import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors, Sizes
} from '../../../res/Constants';

// components
import {
  Button
} from '../../components/common/Button';
import DatePicker from '../../components/common/DatePicker';
import SingleLineInput from '../../components/common/SingleLineInput';
/**
 * First screen of creating an event
 * client to enter basic info:
 * date, # of people, time, area, budget, occasion
 */
export default class ClientCreate extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {/* DatePicker*/}
        <View style={styles.childContainer}>
          <Text style={styles.text}>
            Choose your date having dinner:
          </Text>
          <DatePicker
            label="Choose Your Date"
            isTop={true}
            isBottom={true} />
        </View>
        {/* SeatingPicker*/}
        <View style={styles.childContainer}>
          <Text style={styles.text}>
            Choose your seating time:
          </Text>
          <SingleLineInput
          label="SeatingPicker"
          isTop={true}
          isBottom={true} />
        </View>
        {/* OccasionsPicker*/}
        <View style={styles.childContainer}>
          <Text style={styles.text}>
            Choose your occasions:
          </Text>
          <SingleLineInput
          label="OccasionsPicker"
          isTop={true}
          isBottom={true} />
        </View>
        {/* Next Button*/}
        <View style={styles.bottomContainer}>
          <Button
            label={"Next"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={Sizes.H2}
            onPress={Actions.clientExclusion} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 100
  },

  childContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottomContainer: {
    top: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
});
