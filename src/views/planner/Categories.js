import React, {
  Component
} from 'react';
import {
  StyleSheet, View, ListView, TouchableOpacity
} from 'react-native';
import Database from '../../utils/Firebase';
import {
  Sizes, Colors
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux'

// components
import Category from '../../components/planner/Category';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      city: null
    };

    this.ref = Database.ref(
      `cities/${this.props.cityId}`
    );

    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.listener = this.ref.on('value', data => {
      if (data.exists()) {
        let city = data.val();

        this.setState({
          data: this.state.data.cloneWithRows(
            Object.keys(city.categories)
          ),
          city: city
        });
      }
    });
  }

  componentWillUnmount() {
    this.ref.off('value', this.listener);
  }

  renderRow(categoryId) {
    return (
      <TouchableOpacity
        onPress={() => Actions.activities({
          categoryId: categoryId,
          select: this.props.select
        })}>
        <Category
          categoryId={categoryId} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.list}
          enableEmptySections
          removeClippedSubviews
          scrollEnabled={false}
          initialListSize={0}
          renderRow={this.renderRow}
          dataSource={this.state.data}
          scrollRenderAheadDistance={6} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Sizes.InnerFrame
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 8,
    alignItems: 'center'
  }
});
