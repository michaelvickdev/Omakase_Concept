import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableHighlight, Image
} from 'react-native';
import {
  Colors, Sizes, Strings, Lists
} from '../../../res/Constants';
import {
  expandOnParty
} from '../planner/BookingCard';

import DateFormat from 'dateformat';
import Button from '../common/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';


/**
 * Booking Card Component for bookings
 */
export default class BookingCardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.props.city.name || 'Your Destination',
      placeId: this.props.city.placeId,
      random: Math.random()
    };
  }

  componentDidMount() {
    // Compute display values

    if (this.state.placeId){
      fetch(Strings.googlePlaceURL + 'details/json?placeid='
        + this.state.placeId + '&key='
        + Strings.googleApiKey)
      .then(response => response.json())
      .then((json) => {
        let photoReference = json.result.photos[Math.floor(this.state.random
          *(json.result.photos.length))].photo_reference;
        if (!this.isUnmounted){
          this.setState({
            photoReference: photoReference
          });
        }
      });
    }

  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardContent}>
        {this.state.photoReference ?
          <Image style={styles.primaryPhoto}
            source={{uri:
              Strings.googlePlaceURL + 'photo?maxwidth=800&photoreference=' +
              this.state.photoReference +
              '&key=' + Strings.googleApiKey}}>
            <LinearGradient
              colors={[
                Colors.Transparent,
                Colors.Transparent,
                Colors.Foreground,
              ]}
              style={styles.overlay}/>
          </Image>
          : <View/> }
          <View style={styles.header}>
            <View style={styles.locationContainer}>
              <Button
                style={styles.location}
                color={Colors.Primary}
                fontColor={Colors.Text}
                size={Sizes.SmallText}
                icon="place"
                label={this.state.city} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: Sizes.width,
    backgroundColor: Colors.Background,
    height: 250,
  },

  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },

  primaryPhoto: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Sizes.width,
    height: 250,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  rowWrapper: {
    flex: 0.4,
    flexDirection: 'row',
  },

  icon: {
    marginTop: 10,
    marginRight: 5,
    marginLeft: -5
  },

  cardIntro: {
    margin: Sizes.InnerFrame,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.Transparent
  },

  cardText: {
    marginTop: Sizes.InnerFrame/2,
    color: Colors.Secondary,
    fontSize: Sizes.H2,
    fontWeight: '500'
  },

  cardTitleText: {
    fontSize: Sizes.H1,
    fontWeight: '600'
  },

  header: {
    alignItems: 'flex-start',
  },

  overlay:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationContainer: {
    marginLeft: Sizes.InnerFrame,
    marginBottom: Sizes.InnerFrame/2,
    alignItems: 'flex-start'
  },

});
