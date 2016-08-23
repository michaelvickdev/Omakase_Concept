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
} from '../../../res/Colors';

//components
import OrderTitle from '../../components/clientorder/OrderTitle';
import {
  Button
} from '../../components/common/Button';

/**
 * Thrid screen of creating an event
 * client to enter: Budget, Number of People
 */
export default class ClientBudget extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <OrderTitle />
        <View style={styles.topContainer}>
          <Text style={styles.text}>
            Numbers of People
          </Text>
          <Text style={styles.text}>
            Budget
          </Text>
        </View>
        <View style={styles.botContainer}>
          <Button
            label={"Next"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={Sizes.H2} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.Background,
    marginTop: 70
  },
  botContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
});