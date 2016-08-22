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
          <View style={styles.midContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Tell us your exclusions" />
          </View>
          <View style={styles.bottomContainer}>
          <Button
            label={"Next"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={14} />
          </View>
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
    midContainer: {
      top: 5,
      borderWidth: 1
    },
    bottomContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    textInput: {
      width: 300,
      height: 320
    }
});
