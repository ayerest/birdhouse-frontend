import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ActivityIndicator, Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import MenuButton from '../components/MenuButton';
import SearchBar from '../components/SearchBar';
import BirdsList from '../components/BirdsList';
import BirdCount from '../components/BirdCount';
import CategoriesList from '../components/CategoriesList';
import * as audioActions from '../store/actions/audio';
import AvatarButton from '../components/AvatarButton';

// TODO: refactor stylesheet and move to a separate file

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.myColor,
  },
  category: {
    borderBottomColor: 'black',
    borderBottomWidth: 10,
    backgroundColor: Colors.myColor,
  },
});

const BirdODexScreen = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [showBirds, setShowBirds] = useState(false);
  const [currentBirds, setCurrentBirds] = useState([]);
  const dispatch = useDispatch();

  const filteredBirds = useSelector((state) => state.birds.filteredBirds);
  const myBirds = useSelector((state) => state.birds.myBirds);
  const categoryBirds = useSelector((state) => state.birds.categoryBirds);
  const audio = useSelector((state) => state.audio.currentSound);

  useEffect(() => {
    const handleLeaving = async () => {
      if (audio) {
        await audio.stopAsync();
        dispatch(audioActions.stopAudio);
      }
    };
    const unsubscribe = navigation.addListener('blur', () => {
      handleLeaving();
    });

    return unsubscribe;
  }, [navigation, audio, dispatch]);

  const handleOnShowBirds = async (type) => {
    setIsLoading(true);
    setCurrentBirds([]);
    setShowBirds(false);
    switch (type) {
      case false:
        setCurrentBirds([]);
        setShowBirds(false);
        setIsLoading(false);
        return;
      case 'mine':
        if (audio) {
          await audio.stopAsync();
          dispatch(audioActions.stopAudio);
        }
        setCurrentBirds(myBirds);
        setShowBirds(true);
        setIsLoading(false);
        return;
      case 'search':
        setCurrentBirds(filteredBirds);
        setShowBirds(true);
        setIsLoading(false);
        return;
      case 'category':
        setCurrentBirds(categoryBirds);
        setShowBirds(true);
        setIsLoading(false);
        break;
      default:
    }
  };

  return (
    <View style={styles.screen}>
      <SearchBar onShowBirds={handleOnShowBirds} />
      <BirdCount onShowBirds={handleOnShowBirds} />
      {isLoading && <ActivityIndicator size="large" color={Colors.linkColor} />}
      {!isLoading && showBirds && currentBirds.length > 0 && 
        <BirdsList
          onShowBirds={handleOnShowBirds}
          {...props}
          birdList={currentBirds}
        />
      }
      <CategoriesList onShowBirds={handleOnShowBirds} />
    </View>
  );
};

export const screenOptions = (navData) => {
  const leftOption = (
    <HeaderButtons HeaderButtonComponent={MenuButton}>
      <Item
        iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        onPress={() => { navData.navigation.toggleDrawer(); }}
        title="Menu"
      />
    </HeaderButtons>
  );
  return {
    headerTitle: 'BirdieDex',
    headerLeft: () => leftOption,
    headerRight: () => (
      <AvatarButton handleClick={() => {
        navData.navigation.navigate({
          name: 'My Account',
          params: {
          },
        });
      }}
      />
    ),
  };
};

BirdODexScreen.defaultProps = {
  navigation: '',
};

BirdODexScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object),
};

export default BirdODexScreen;
