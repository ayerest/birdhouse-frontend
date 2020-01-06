import { Platform, Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer,
createSwitchNavigator, createDrawerNavigator, DrawerItems} from 'react-navigation';
import AddFieldEntryForm from '../components/AddFieldEntryForm';
import FieldEntriesScreen from '../screens/FieldEntriesScreen';
import FieldEntryDetailsScreen from '../screens/FieldEntryDetailsScreen';
import BirdODexScreen from '../screens/BirdODexScreen';
import BirdsList from '../components/BirdsList';
import BirdDetailsScreen from '../screens/BirdDetailsScreen';
import MainViewScreen from '../screens/MainViewScreen';
import BadgesScreen from '../screens/BadgesScreen';
import PicturesScreen from '../screens/PicturesScreen';
import GeoMap from '../components/GeoMap';
import StaticMap from '../components/StaticMap';
import AuthScreen from '../screens/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import BadgeCard from '../components/BadgeCard';
import BadgeDetailsScreen from '../screens/BadgeDetailsScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import CustomDrawer from './CustomDrawer';



// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {},
// });


// const HomeStack = createStackNavigator(
//     {
//     Home: HomeScreen,
//   },
//   config
// );

const Badges = createStackNavigator({
  MyBadges: {
    screen: BadgesScreen,
    navigationOptions: {
      title: 'My Badges',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 20,
        fontWeight: '400'
      }
    }
  },
  Badge: {screen: BadgeCard,
  navigationOptions: {
    title: 'My Badge',
    headerTitleStyle: {
      fontFamily: 'Fred-Great',
      fontSize: 19,
      fontWeight: '400'
    }
  }},
  BadgeDetails: BadgeDetailsScreen
})

const Pictures = createStackNavigator({
  MyPhotos: {
    screen: PicturesScreen,
    navigationOptions: {
      title: 'My Photos',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 20,
        fontWeight: '400'
      }
    }
  },
  FieldEntryInfo: FieldEntryDetailsScreen,
  BirdieInfo: BirdDetailsScreen,
})

const FieldEntries = createStackNavigator({
  FieldEntries: {
    screen: FieldEntriesScreen,
    navigationOptions: {
      title: 'My Bird Sightings',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 17,
        fontWeight: '400'
      }
    }
  },
  EntryInfo: {screen: FieldEntryDetailsScreen,
  navigationOptions: {
    title: 'Bird Sighting',
    headerTitleStyle: {
      fontFamily: 'Fred-Great',
      fontSize: 20,
      fontWeight: '400'
    }
  }
},
  FieldEntry: {
    screen: FieldEntryDetailsScreen,
    navigationOptions: {
      title: 'Bird Sighting',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 20,
        fontWeight: '400'
      }
    }
  },
  BirdStuff: BirdDetailsScreen,
})

const Birds = createStackNavigator({
  BirdieDex: {
    screen: BirdODexScreen,
    navigationOptions: {
      title: 'BirdieDex',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }
  },
  BirdsList: BirdsList,
  BirdDetails: BirdDetailsScreen,
})

const Main = createStackNavigator({
  Main: {
    screen: MainViewScreen,
    navigationOptions: {
      title: 'BirdHouse',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }},
  GeoMap: GeoMap,
  StaticMap: StaticMap,
  FieldDetails: FieldEntryDetailsScreen,
  AddEntry: {
    screen: AddFieldEntryForm,
    navigationOptions: {
      title: 'Add Bird Sighting',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 19,
        fontWeight: '400'
      }
    }
  },
  BirdInfo: BirdDetailsScreen,
  BirdStuff: BirdDetailsScreen,
})

const Account = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: {
      title: 'My Account',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }
  },
  BirdieSightings: FieldEntriesScreen,
  BirdODex: BirdODexScreen,
})

const MenuNavigator = createDrawerNavigator({
  Home: Main, 
  "Bird Sightings": FieldEntries,
  BirdieDex: Birds,
  "My Badges": Badges,
  "My Photos": Pictures,
  "My Account": Account,
},
{
  contentComponent: CustomDrawer,
  drawerWidth: Dimensions.get('window').width / 1.5,
  contentOptions: {
    activeBackgroundColor: 'thistle',
    labelStyle: {
      fontFamily: 'Roboto-Condensed',
      fontSize: Dimensions.get('window').width > 350 ? 20 : 18,
      fontWeight: 'bold'
    }
  }
,}
)

const AuthNavigator = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      title: 'BirdHouse',
      headerTitleStyle: {
        fontFamily: 'Fred-Great',
        fontSize: 21,
        fontWeight: '400'
      }
    }
  },
})

const SwitchMenu = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Menu: MenuNavigator,
})


export default createAppContainer(SwitchMenu);
