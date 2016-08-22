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
  Colors
} from '../../../res/Constants';

// components
import {
  Button
} from '../../components/common/Buttons';

/**
 * Main screen for general users (Client)
 * can toggle to Planners view for registered planners
 */
export default class ClientMain extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={[{flex: 1}]}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>
            Client Main Screen
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Button style={[{width:150}]}
            label={"New Event"}
            color={Colors.Primary}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Background,
    paddingTop: 100
  },

  bottomContainer: {
    flex: 1,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.Primary
  }
});
