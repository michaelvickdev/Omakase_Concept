import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import {
  Sizes, Colors, Styles
} from '../../../res/Constants';
import {
  Actions
} from 'react-native-router-flux';
import Database from '../../utils/Firebase';

// components
import Button from '../../components/common/Button';
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Photo from '../../components/common/Photo';
import MapView from 'react-native-maps';
import GroupAvatar from '../../components/profile/GroupAvatar';
import PhotoGrid from '../../components/common/PhotoGrid';

export default class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: {}
    };

    this.ref = Database.ref(
      `activities/${
        this.props.activityId
      }`
    );
  }

  componentDidMount() {
    this.listener = this.ref.on('value', data => {
      data.exists() && this.setState({
        activity: data.val()
      });
    });
  }

  componentWillUnmount() {
    this.listener && this.ref.off('value', this.listener);
  }

  render() {
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          parallaxHeaderHeight={200}
          contentBackgroundColor={Colors.Background}
          renderBackground={() => (
            <Photo
              photoId={
                this.state.activity.photos
                && Object.keys(this.state.activity.photos)[0]
              }
              style={styles.photo} />
          )}
          renderForeground={() => (
            <LinearGradient
              colors={[
                Colors.Transparent,
                Colors.Transparent,
                Colors.Background
              ]}
              style={styles.photoOverlay}>
              <View style={styles.coverForeground}>
                <View style={styles.header}>
                  <Text style={styles.subtitle}>
                    Zen Japanese Restaurant - 2.3km away
                  </Text>
                  <Text style={[
                    Styles.Header,
                    styles.title
                  ]}>
                    {this.state.activity.name}
                  </Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>
                    ${this.state.activity.price}
                  </Text>
                  <Text style={styles.pricePerPerson}>
                    per person
                  </Text>
                </View>
              </View>
            </LinearGradient>
          )}>
          <View style={styles.content}>
            <View style={styles.recommendedContainer}>
              <GroupAvatar
                size={20}
                uids={[
                  'HOtOvx58WEgkOeOguoBs7Mu7LDe2',
                  'XbK9Czedh2c2d6w3By4Q7TZhckI2',
                  'gX1zgZbcQPh0D6yiqhKTLRygEyT2',
                  'lq96kaJpFmdyikJlcuRUOqoUwjM2',
                  'vbP2QbYxTNUxaUmNnW1tH806DNo1',
                  'HOtOvx58WEgkOeOguoBs7Mu7LDe2',
                  'XbK9Czedh2c2d6w3By4Q7TZhckI2',
                  'gX1zgZbcQPh0D6yiqhKTLRygEyT2',
                  'lq96kaJpFmdyikJlcuRUOqoUwjM2',
                  'vbP2QbYxTNUxaUmNnW1tH806DNo1',
                  'HOtOvx58WEgkOeOguoBs7Mu7LDe2',
                  'XbK9Czedh2c2d6w3By4Q7TZhckI2',
                  'gX1zgZbcQPh0D6yiqhKTLRygEyT2',
                  'lq96kaJpFmdyikJlcuRUOqoUwjM2',
                  'vbP2QbYxTNUxaUmNnW1tH806DNo1'
                ]}
                limit={10} />
              <Text style={styles.recommendedLabel}>
                recommend this activity.
              </Text>
            </View>
            <Text style={styles.details}>
              {this.state.activity.description}
            </Text>
            <MapView
              style={styles.map}
              scrollEnabled={false}
              region={{
                latitude: 43.784560,
                longitude: -79.184770,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}>
              <MapView.Marker
                coordinate={{
                  latitude: 43.784560,
                  longitude: -79.184770,
                }}
                title={'Meet-up Location'}
                description={'1265 Military Trail'}
                pinColor={Colors.Primary}
              />
            </MapView>
            <View style={styles.grid}>
              <PhotoGrid
                photoIds={[
                  'sushi_1',
                  'sushi_2',
                  'sushi_3',
                  'sushi_4',
                  'sushi_5',
                  'sushi_6',
                  'sushi_7'
                ]}
                eachRow={3}
                width={Sizes.width - Sizes.InnerFrame * 2 + 5} />
              </View>
          </View>
        </ParallaxScrollView>
        <Button
          squareBorders
          onPress={() => {
            this.props.select(this.props.activityId);
            Actions.pop({popNum: 3});
          }}
          style={styles.button}
          color={Colors.Green}
          fontColor={Colors.Text}
          icon="check"
          label="Add to Itinerary" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background
  },

  photo: {
    height: 200
  },

  photoOverlay: {
    flex: 1,
    alignSelf: 'stretch'
  },

  coverForeground:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: Sizes.InnerFrame
  },

  button: {
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame
  },

  header: {
    flex: 1,
    flexWrap: 'wrap'
  },

  title: {
    paddingLeft: 0,
    color: Colors.Text
  },

  subtitle: {
    fontSize: Sizes.SmallText,
    color: Colors.Text
  },

  priceContainer: {
    borderRadius: 10,
    padding: 10,
    marginLeft: Sizes.InnerFrame,
    backgroundColor: Colors.Primary,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  price: {
    fontSize: Sizes.H1,
    color: Colors.Text
  },

  pricePerPerson: {
    fontSize: Sizes.SmallText,
    color: Colors.Text
  },

  // content starts
  content: {
    flex: 1,
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame
  },

  details: {
    marginBottom: Sizes.InnerFrame,
    color: Colors.Text
  },

  recommendedContainer: {
    flexDirection: 'row',
    marginBottom: Sizes.InnerFrame,
    alignItems: 'center'
  },

  recommendedLabel: {
    marginLeft: Sizes.InnerFrame / 3,
    fontSize: Sizes.SmallText,
    color: Colors.Text
  },

  map: {
    height: 200,
    alignSelf: 'stretch',
    marginBottom: Sizes.InnerFrame
  },

  grid: {
    alignItems: 'center',
    marginBottom: Sizes.InnerFrame
  }
});
