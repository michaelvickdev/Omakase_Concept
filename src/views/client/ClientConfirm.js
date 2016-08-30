import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, TextInput
} from 'react-native';
import {
  Colors
} from '../../../res/Colors';
import {
  Sizes
} from '../../../res/Sizes';
import {
  Actions
} from 'react-native-router-flux';

// components
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';

/**
  * The Screen of confirmation after client filling
  * all basic infos:
  * Date, Seating, Occasions, Number of people
  * Address, Budget, Exclusions
  */
export default class ClientConfirm extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.topContainer}>
          <Text style={styles.text}>
            Please Confirm the following:
          </Text>
          <InputField
            label="Date"/>
            <InputField
              label="Seating"/>
              <InputField
                label="Occasions"/>
                <InputField
                  label="Number of People"/>
                  <InputField
                    label="Address"/>
                    <InputField
                      label="Budget"/>
                      <InputField
                        label="Exclusions"/>
        </View>
        <View style={styles.botContainer}>
          <Button
            label={"Confirm"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={Sizes.H2}
            onPress={Actions.clientPay}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1
  },
  topContainer: {
    flex: 1,
    backgroundColor: Colors.Background,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100
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
