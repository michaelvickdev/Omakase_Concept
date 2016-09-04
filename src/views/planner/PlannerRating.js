import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
  * Show the Rating of the planners
  */
export default class PlannerRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 4.65,
      ratingCount: 9,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.rowContainer}>
            <Icon
              style={[
                styles.icon
              ]}
              name='star'/>
            <Text style={styles.label}>
              {this.state.rating}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.text}>
              {'From ' + this.state.ratingCount + ' ratings'}
            </Text>
          </View>
          <View style={styles.commentContainer}>
            <Text style={styles.headingText}>
              Comments
            </Text>
            <Text style={styles.subtitleText}>
              August 31, 2016
            </Text>
            <Text style={styles.text}>
              thanks for the plan. it was a good tinder date
            </Text>
            <Text style={styles.subtitleText}>
              August 29, 2016
            </Text>
            <Text style={styles.text}>
              I would have never known the wonders of sushi!!
            </Text>
            <Text style={styles.subtitleText}>
              August 26, 2016
            </Text>
            <Text style={styles.text}>
              Sotto Sotto, it will be my go to fancy place from now on
            </Text>
            <Text style={styles.subtitleText}>
              August 22, 2016
            </Text>
            <Text style={styles.text}>
              That was a wonderful experience for my anniversay with my
              wife. We had a great night and the flower was bonus!!!
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },

  text: {
    fontSize: Sizes.H2,
    color: Colors.Text
  },

  subtitleText: {
    marginTop: Sizes.InnerFrame,
    fontSize: Sizes.H2,
    color: Colors.Text,
    fontStyle: 'italic'
  },

  headingText: {
    marginTop: Sizes.InnerFrame,
    fontSize: Sizes.H2,
    color: Colors.Text,
    fontWeight: '500'
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },

  commentContainer: {
    marginTop: Sizes.InnerFrame,
    marginLeft: Sizes.InnerFrame
  },

  icon: {
    color: Colors.Rating ,
    fontSize: Sizes.H1*1.2*3,
    alignSelf: 'flex-start',
    marginRight: 2,
    paddingTop: 5
  },

  label: {
    color: Colors.Text,
    fontSize: Sizes.H1*3,
  }

})
