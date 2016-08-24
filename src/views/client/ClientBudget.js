import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Sizes
} from '../../../res/Sizes';
import {
  Colors
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux';

// components
import {
  Button
} from '../../components/common/Button';
import SingleLineInput from '../../components/common/SingleLineInput';

/**
 * Thrid screen of creating an event
 * client to enter: Budget, Number of People
 */
export default class ClientBudget extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.childContainer}>
          <Text style={styles.text}>
            Number of People:
          </Text>
          <SingleLineInput
            label="NumberOfPeoplePicker"
            isTop={true}
            isBottom={true} />
        </View>
        <View style={styles.childContainer}>
          <Text style={styles.text}>
            Budget per person:
          </Text>
          <SingleLineInput
            label="BudgetPicker"
            isTop={true}
            isBottom={true} />
        </View>
        <View style={styles.botContainer}>
          <Button
            label={"Next"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={Sizes.H2}
            onPress={Actions.clientConfirm} />
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
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center'

  },

  botContainer: {
    top: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
});
