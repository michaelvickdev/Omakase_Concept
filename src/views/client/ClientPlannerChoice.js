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
  Colors, Sizes, Styles
} from '../../../res/Constants';

// components
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';

/**
 * Presents three planners assigned to a newly booked event and
 * allows re-rolling of the planners.
 */
export default class ClientCreate extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <View style={styles.body}>
            <Text style={Styles.Header}>
              Meet your planners
            </Text>
            <Text style={Styles.BodyText}>
              We've selected some possible planners locally based
              on your budget and criteria. You can review them below.
            </Text>
          </View>
        </View>
        <View style={styles.planners}>
          <Divider />
          <View></View>
          <Divider />
        </View>
        <View style={styles.buttons}>
          <Button
            label=" " />
          <Button
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            label="Book & View Assigned Planners" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: Colors.Secondary
  },

  input: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  body: {
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame
  },

  buttons: {
    padding: Sizes.InnerFrame,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  }
});
