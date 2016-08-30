import React, {
  Component
} from 'react';
import {
  View, Text, Image, StatusBar, StyleSheet
} from 'react-native';
import {
  Colors, Sizes
} from '../../res/Constants';
import
  Storage
from 'react-native-simple-store';
import {
  Actions
} from 'react-native-router-flux';

// components
import Button from '../components/common/Button';

/**
 * Brief tutorial of the solution, next next next done
 */
export default class Tutorial extends Component {

  constructor(props){
    super(props);
    this.state = {
      step: 0,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true, 'slide');
  }

  onDone(){
    Storage.save('notNew', true).then(() => {
      Actions.clientMain()
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Image
          style={styles.fullImage}
          source={require('../../res/img/tut_sample.jpg')}>
        <View style={styles.titleContainer}>
          <Text style={[styles.text]}>
            {this.state.step == 0 ?
            'Simply let us know when you need the event...'
            : this.state.step == 1 ?
            'Whether it is for a special occasion and' +
            ' how many people we need to plan for...'
            : this.state.step == 2 ?
            'Select one of the planners we have chosen for you..'
            :
            '..sit back, we will plan the event for you and let you know' +
            ' when its time to leave home'
            }
          </Text>

        </View>
        <View style={styles.bottomContainer}>
          {this.state.step == 3 ?
          <Button
            label={"Done"}
            color={Colors.Transparent}
            fontColor={Colors.AlternateText}
            onPress={this.onDone}
            size={14}
          />
          :
          <Button
            label={"Next"}
            color={Colors.Transparent}
            fontColor={Colors.AlternateText}
            size={14}
            onPress={() => this.setState({step: this.state.step + 1})}
          />
          }
        </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    flex: 1
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Transparent,
    paddingTop: 100,
    paddingLeft: 50,
    paddingRight: 50
  },

  bottomContainer: {
    flex: 1,
    top: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H1,
    color: Colors.AlternateText
  },

  fullImage: {
    flex: 1,
    width: null,
    height: null,  },
});
