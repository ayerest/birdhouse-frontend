import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import BirdHouseLogo from '../assets/images/birdhouse_logo_drawn.png';

// TODO: refactor stylesheet and move to a separate file

const ScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.warningText,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  // label: {
  //   paddingTop: 10,
  //   textAlign: 'center',
  //   fontFamily: 'Roboto-Condensed',
  //   fontSize: 18,
  // },
  // inner: {
  //   padding: 5,
  //   flex: 1,
  //   justifyContent: 'flex-end',
  // },
});

export default ScreenStyles;