import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const BadgesInfo = (props) => {
  const { category } = props;
  return (
    <View>
      <Text>
        {category === 'Login' && 'Login badges are awarded for logging in at least once a week for consecutive weeks. The Bronze Login badge corresponds to logging in at least once in a week. The Silver Login badge corresponds to logging in at least once in a week for two weeks in a row. The Gold Login badge is awarded for logging in at least once in a week for three weeks in a row.'}
        {category === 'Steps' && 'Step badges are awarded for your steps taken with your device. The Bronze Steps badge is awarded when you have reached 1,000 steps. The Silver Steps badge corresponds to 5,000 steps. The Gold Steps badge is awarded at 20,000 steps.'}
        {category === 'Sightings' && 'Sightings badges are awarded based on the number of bird sightings you have submitted. The Bronze Sightings badge corresponds to 2 bird sightings. The Silver Sightings badge corresponds to 5 sightings. The Gold Sightings badge is awarded for 10 sightings.'}
        {category === 'Birds' && 'Birds badges are awarded based on the number of unique species of birds that you have submitted in your bird sightings. The Bronze Birds badge is awarded when you have seen 2 different species of birds. The Silver Birds badge corresponds to sighting at least 5 different species of birds. The Gold Birds badge is awarded when you have seen at least 10 different specices of birds.'}
      </Text>
    </View>
  );
};

BadgesInfo.defaultProps = {
  category: '',
};

BadgesInfo.propTypes = {
  category: PropTypes.string,
};

export default BadgesInfo;
