import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, StatusBar
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors
} from '../../../res/Constants';

// components
import {
  Button
} from '../../components/common/Button';
import FacebookButton from '../../components/account/FacebookButton';

/**
 * Main screen for general users (Client)
 * can toggle to Planners view for registered planners
 */
export default class ClientMain extends Component {
  componentDidMount() {
    StatusBar.setHidden(false, 'slide');
  }

  render() {
    return (
      <View style={[{flex: 1}]}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>
            You have no pending events
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Button style={[{width:150, marginBottom: 50}]}
            label={"New Event"}
            color={Colors.Primary}
            onPress={Actions.clientCreate} />
          <FacebookButton />
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
    marginTop: 100
  },

  bottomContainer: {
    flex: 1,
    top: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
  },

  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.Primary
  }
});
