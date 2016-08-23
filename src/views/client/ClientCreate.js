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
} from '../../components/common/Button';

import OrderTitle from '../../components/clientorder/OrderTitle';

/**
 * First screen of creating an event
 * client to enter basic info:
 * date, # of people, time, area, budget, occasion
 */
export default class ClientCreate extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <OrderTitle />
        <View style={styles.titleContainer}>
          <Text style={styles.text}>
            Create new event
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            label={"Next"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={14}
            onPress={Actions.clientExclusion} />
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
    alignItems: 'flex-end',
  },

  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.Primary
  }
});
