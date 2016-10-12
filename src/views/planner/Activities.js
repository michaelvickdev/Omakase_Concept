import React, {
  Component
} from 'react';
import {
  StyleSheet, View, ListView, Text
} from 'react-native';
import Database, {
  Firebase
} from '../../utils/Firebase';
import {
  Colors
} from '../../../res/Constants';

// components
import Activity from '../../components/planner/Activity';

export default class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };

    this.ref = Database.ref(
      `categories/${
        this.props.categoryId
      }/activities`
    );
  }

  componentDidMount() {
    this.listener = this.ref.on('value', data => {
      data.exists() && this.setState({
        data: this.state.data.cloneWithRows(
          Object.keys(data.val())
        )
      })
    });
  }

  componentWillUnmount() {
    this.listener && this.ref.off('value', this.listener);
  }

  renderRow(activityId) {
    return (
      <Activity activityId={activityId} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections
          scrollEnabled
          removeClippedSubviews
          initialListSize={0}
          scrollRenderAheadDistance={4}
          dataSource={this.state.data}
          renderRow={this.renderRow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background
  }
});
