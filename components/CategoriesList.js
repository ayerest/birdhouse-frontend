import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as birdsActions from '../store/actions/birds';
import Colors from '../constants/Colors';

// TODO: remove antipattern in useeffects
// TODO: refactor stylesheet and move to another file

const styles = StyleSheet.create({
  text: {
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'Roboto-Condensed',
    fontSize: 16,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: 'black',
    borderBottomWidth: 2,
    backgroundColor: Colors.myColor,
    padding: 8,
  },
});

const CategoriesList = (props) => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const loadCategories = async () => {
        await dispatch(birdsActions.fetchBirdCategories());
      };
      loadCategories();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const categoryList = useSelector((state) => state.birds.birdCategories);

  const setCategory = async (category) => {
    await setCurrentCategory(category);
  };

  const getBirds = async () => {
    try {
      setIsLoading(true);
      await dispatch(birdsActions.fetchBirds(currentCategory));
      props.onShowBirds('category');
      setIsLoading(false);
      setCurrentCategory(null);
    } catch (err) {
      setIsLoading(false);
      setCurrentCategory(null);
      throw new Error(err);
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getBirds();
    }
    return () => {
      mounted = false;
    };
  }, [currentCategory]);

  const renderCategoryItem = (categoryItem) => (
    <TouchableOpacity style={styles.category} onPress={() => setCategory(categoryItem.item)}>
      <Text style={styles.text}>{categoryItem.item}</Text>
      <Entypo name="plus" color={Colors.linkColor} size={20} />
    </TouchableOpacity>
  );

  return (
    <View>
      {isLoading && !!currentCategory && <ActivityIndicator size="large" color={Colors.linkColor} />}
      <FlatList
        keyExtractor={item => item}
        data={categoryList}
        renderItem={renderCategoryItem}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

CategoriesList.defaultProps = {
  onShowBirds: '',
};

CategoriesList.propTypes = {
  onShowBirds: PropTypes.instanceOf(Function),
};

export default CategoriesList;
