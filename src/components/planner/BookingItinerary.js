import React, {
  Component
} from 'react';
import {
  StyleSheet, View
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import Activity from './Activity';
import BlankActivity from './BlankActivity';
import InformationField from '../common/InformationField';

export default class BookingSummary extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Activity
          thin
          activityId="-KEJWEHEJjeweh-wehe-ej2" />
        <Activity
          thin
          activityId="-KEKWEJJEWjejw-wejwejweejw2jn" />
        <BlankActivity />
        <InformationField
          label="Total Price"
          subtitle="Per person"
          info="$95" />
        <InformationField
          label="Allowed Price"
          subtitle="Paid by the sponsor"
          info="-$100" />
        <InformationField
          noLine
          style={[

            // changes to Red if negative
            {color: Colors.Green}
          ]}
          label="Available Funds"
          subtitle="Balance left after currently selected activities"
          info="$5" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Sizes.InnerFrame,
    alignSelf: 'stretch'
  }
});
