import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Colors, Sizes
} from '../../../res/Constants';

// components
import {
  Button
} from '../../components/common/Button';

/**
  * Show the corresponding request details:
  * Date, Seating, Number of ppl, Address, Occasions, Budget and Exclusions
  */
export default class PlannerRequestDetail extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.topContainer}>
          <Text style={styles.text}>
            DETAILS IN LISTVIEW
          </Text>
        </View>
        <View style={styles.botContainer}>
          <Button
            label={"Accept"}
            color={Colors.Transparent}
            fontColor={Colors.Primary} />
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

  topContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  botContainer: {
    top: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
});
