import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, TextInput
} from 'react-native';
import {
  Button
} from '../../components/common/Button'
import{
  Colors
} from '../../../res/Colors';

//components
import OrderTitle from '../../components/clientorder/OrderTitle';

/**
  * The screen of client filling exclusions
  * for their order in the TextInput. E.g. Veggies only
  */
export default class ClientException extends Component {
  render() {
    return (
      <View style={[{flex: 1}]}>
        <OrderTitle />
        <View style={styles.titleContainer}>
          <Text>
            To ensure your better experience. Please tell
            us if you have any exclusions.(e.g. Veggies only)
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Tell us your exclusions" />
          <Button
            label={"Next"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={14} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    titleContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: Colors.Background,
      marginTop: 60
    },
    bottomContainer: {
      flex: 1,
      top: 5,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      borderWidth: 1
    },
    textInput: {
      width: 80,
      height: 120
    }
});
