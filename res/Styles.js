import {
  StyleSheet
} from 'react-native';
import Sizes from './Sizes';
import Colors from './Colors';

export const Styles = StyleSheet.create({
  Header: {
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame,
    fontSize: Sizes.H1,
    color: Colors.Text,
    fontWeight: '500'
  },

  BodyText: {
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame,
    fontSize: Sizes.Text,
    color: Colors.Text
  }
});
export default Styles;
