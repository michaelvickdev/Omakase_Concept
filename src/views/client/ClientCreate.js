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
        <View style={styles.dateContainer}>
          <DatePicker
            label="Choose Your Date"
            isTop={true}/>
        </View>
        {/* SeatingPicker*/}
        <View style={styles.seatingContainer}>
          <SingleLineInput
          label="SeatingPicker"  />
        </View>
        {/* OccasionsPicker*/}
        <View style={styles.occasionContainer}>
          <SingleLineInput
          label="OccasionsPicker"
          isBottom={true}  />
        </View>
        {/* Next Button*/}
        <View style={styles.bottomContainer}>
          <Button
            label={"Next"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={14}
            onPress={Actions.clientExclusion} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },

  dateContainer: {
    marginTop: 100
  },

  seatingContainer: {

  },

  occasionContainer: {

  },

  bottomContainer: {
    flex: 1,
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
