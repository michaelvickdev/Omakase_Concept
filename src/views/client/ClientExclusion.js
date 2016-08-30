import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, TextInput
} from 'react-native';
import{
  Colors, Sizes
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux';

// components
import Button from '../../components/common/Button';
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
            multiline={true}
            placeholder="Tell us your exclusions" />
        </View>
        <View style={styles.bottomContainer}>
          <Button
            label={"Next"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={Sizes.TextButton}
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
      padding: 5,
      borderWidth: 1,
      borderColor: Colors.Text
    },

    bottomContainer: {
      flex: 1,
      top: 0,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },

    textInput: {
      width: 300,
      height: 320,
      fontSize: Sizes.Text,
      color: Colors.Text
    },

    text: {
      textAlign: 'center',
      fontSize: Sizes.H2,
      color: Colors.Primary
    }
});
