import {
  Dimensions
} from 'react-native';

export const Sizes = {

  // screen
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,

  // text sizes
  H1: 20,
  H2: 14,
  Text: 12,
  SmallText: 10,
  TextButton: 14,

  // padding sizes
  OuterFrame: 25,
  InnerFrame: 15,

  // margin sizes
  ItemSpacer: 2
};

export default Sizes;
