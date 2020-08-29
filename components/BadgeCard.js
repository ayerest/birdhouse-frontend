/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  Text, StyleSheet, TouchableOpacity, View, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Card from './Card';
import { getMyEntries } from '../store/actions/entries';
import { getMyBirds } from '../store/actions/birds';
import BadgesInfo from './BadgesInfo';
import LoginBronze from '../assets/images/LoginBronze.png';
import LoginSilver from '../assets/images/LoginSilver.png';
import LoginGold from '../assets/images/LoginGold.png';
import BirdsBronze from '../assets/images/BirdsBronze.png';
import BirdsSilver from '../assets/images/BirdsSilver.png';
import BirdsGold from '../assets/images/BirdsGold.png';
import StepsBronze from '../assets/images/StepsBronze.png';
import StepsSilver from '../assets/images/StepsSilver.png';
import StepsGold from '../assets/images/StepsGold.png';
import SightingsBronze from '../assets/images/SightingsBronze.png';
import SightingsSilver from '../assets/images/SightingsSilver.png';
import SightingsGold from '../assets/images/SightingsGold.png';

const styles = StyleSheet.create({
  badge: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  center: {
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 5,
    fontFamily: 'Roboto-Condensed',
    fontSize: 16,
  },
  card: {
    backgroundColor: Colors.myColor,
  },
  info: {
    alignSelf: 'flex-end',
  },
});

const BadgeCard = (props) => {
  const [showInfo, setShowInfo] = useState(false);
  const { badge } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const myBirds = useSelector((state) => state.birds.myBirds);

  const myEntries = useSelector((state) => state.entries.entries);

  useEffect(() => {
    let mounted = true;
    const loadBirdsAndSightings = async () => {
      await Promise.all(dispatch(getMyEntries()),
        dispatch(getMyBirds()));
    };
    if (mounted) {
      loadBirdsAndSightings();
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const renderLoginMedal = () => {
    switch (badge.medal) {
      case 'Bronze':
        return <Image style={styles.badge} source={LoginBronze} />;
      case 'Silver':
        return <Image style={styles.badge} source={LoginSilver} />;
      case 'Gold':
        return <Image style={styles.badge} source={LoginGold} />;
      default:
        return null;
    }
  };

  const renderBirdsMedal = () => {
    switch (badge.medal) {
      case 'Bronze':
        return <Image style={styles.badge} source={BirdsBronze} />;
      case 'Silver':
        return <Image style={styles.badge} source={BirdsSilver} />;
      case 'Gold':
        return <Image style={styles.badge} source={BirdsGold} />;
      default:
        return null;
    }
  };

  const renderStepsMedal = () => {
    switch (badge.medal) {
      case 'Bronze':
        return <Image style={styles.badge} source={StepsBronze} />;
      case 'Silver':
        return <Image style={styles.badge} source={StepsSilver} />;
      case 'Gold':
        return <Image style={styles.badge} source={StepsGold} />;
      default:
        return null;
    }
  };

  const renderSightingsMedal = () => {
    switch (badge.medal) {
      case 'Bronze':
        return <Image style={styles.badge} source={SightingsBronze} />;
      case 'Silver':
        return <Image style={styles.badge} source={SightingsSilver} />;
      case 'Gold':
        return <Image style={styles.badge} source={SightingsGold} />;
      default:
        return null;
    }
  };

  const renderMedalImage = () => {
    switch (badge.category) {
      case 'Login':
        return renderLoginMedal();
      case 'Birds':
        return renderBirdsMedal();
      case 'Steps':
        return renderStepsMedal();
      case 'Sightings':
        return renderSightingsMedal();
      default:
        return null;
    }
  };

  const renderLoginMedalText = () => <Text style={styles.center}>Great job logging in at least once a week!</Text>;

  const renderBirdsMedalText = () => (
    <Text style={styles.center}>
      Nice work! You&apos;ve seen a total of
      {' '}
      {myBirds.length}
      {' '}
      bird species!!
    </Text>
  );

  const renderStepsMedalText = () => (
    <Text style={styles.center}>
      Wow! You have taken
      {' '}
      {user.step_count}
      {' '}
      steps!
    </Text>
  );

  const renderSightingsMedalText = () => (
    <Text style={styles.center}>
      You&apos;ve logged
      {' '}
      {myEntries.length}
      {' '}
      {badge.category}
      {' '}
      of birds!
    </Text>
  );

  const renderBadgeText = () => {
    switch (badge.category) {
      case 'Login':
        return renderLoginMedalText();
      case 'Birds':
        return renderBirdsMedalText();
      case 'Steps':
        return renderStepsMedalText();
      case 'Sightings':
        return renderSightingsMedalText();
      default:
        return null;
    }
  };

  return (
    <Card style={styles.card}>
      <View>
        {renderBadgeText()}
        <TouchableOpacity onPress={() => {
          props.navigation.navigate({
            name: 'Badge Details',
          });
        }}
        >
          {renderMedalImage()}
        </TouchableOpacity>
        <Text style={styles.center}>
          Earned on:
          {badge.updated_at.slice(0, 10)}
        </Text>
        {showInfo ? <BadgesInfo category={badge.category} /> : null}
        <View>
          <TouchableOpacity onPress={() => {
            setShowInfo(!showInfo);
          }}
          >
            <Feather style={styles.info} name="info" size={40} color="cornflowerblue" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

BadgeCard.defaultProps = {
  badge: '',
  navigation: '',
};

BadgeCard.propTypes = {
  badge: PropTypes.instanceOf(Object),
  navigation: PropTypes.instanceOf(Object),
};

export default BadgeCard;
