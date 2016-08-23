import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, TextInput
} from 'react-native';
import{
  Colors
} from '../../../res/Colors';
import {
  Actions
} from 'react-native-router-flux';

// components
import {
  Button
} from '../../components/common/Button';
/**
  * The screen of client filling exclusions
  * for their order in the TextInput. E.g. Veggies only
  */
export default class ClientExclusion extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>
            To ensure your better experience. Please tell
            us if you have any exclusions.(e.g. Veggies only)
          </Text>
        </View>
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
            size={14}
            onPress={Actions.clientBudget} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1
    },

    titleContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: Colors.Background,
      marginTop: 100,
      marginLeft: 10,
      marginRight: 10,
    },

    midContainer: {
      margin: 10,
      borderWidth: 1,
    },

    bottomContainer: {
      flex: 1,
      top: 0,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },

    textInput: {
      width: 300,
      height: 320
    },

    text: {
      fontSize: 16,
      color: Colors.Text
    }
});
