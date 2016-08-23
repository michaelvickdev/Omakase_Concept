import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Colors
} from '../../../res/Colors';
import {
  Sizes
} from '../../../res/Sizes';

// components
import {
  Button
} from '../../components/common/Button';

/**
  * The Screen of confirmation after client filling
  * all basic infos.
  */
export default class ClientConfirm extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.topContainer}>
          <Text style={styles.text}>
            Client's confirmation details in the
            following format.
            Date:
            Seating:
            Number of People:
            Address:
            Occasions:
            Budget:
          </Text>
        </View>
        <View style={styles.botContainer}>
          <Button
            label={"Pay"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={Sizes.H2}
            />
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
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
});
