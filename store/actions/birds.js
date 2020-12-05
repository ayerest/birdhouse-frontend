import { base1 } from '../../env';

const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_BIRDS = 'SET_BIRDS';
const GET_BIRD = 'GET_BIRD';
const SEARCH_BIRDS = 'SEARCH_BIRDS';
const MY_BIRDS = 'MY_BIRDS';
// TODO: refactor try catch blocks and token user destructuring

const fetchBirdCategories = () => async (dispatch, getState) => {
  const { token } = getState().user;
  try {
    const response = await fetch(`${base1}/birds`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('error');
    }

    const categoriesData = await response.json();

    dispatch({ type: SET_CATEGORIES, birdCategories: categoriesData });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const fetchBirds = (category) => async (dispatch, getState) => {
  const { token } = getState().user;
  const { user } = getState().user;
  try {
    const response = await fetch(`${base1}/birds`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        user,
      }),
    });

    if (!response.ok) {
      throw new Error('error');
    }

    const birdData = await response.json();

    dispatch({ type: SET_BIRDS, categoryBirds: birdData });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getBird = (birdId) => async (dispatch, getState) => {
  const { token } = getState().user;
  const { user } = getState().user;
  try {
    const response = await fetch(`${base1}/birds/${birdId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('error');
    }

    const birdData = await response.json();

    dispatch({ type: GET_BIRD, singleBird: birdData });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const searchBirds = (searchTerm) => async (dispatch, getState) => {
  const { token } = getState().user;
  const { user } = getState().user;
  try {
    const response = await fetch(`${base1}/bird_entries`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchTerm,
        user,
      }),
    });

    if (!response.ok) {
      throw new Error('error');
    }

    const birdData = await response.json();

    dispatch({ type: SEARCH_BIRDS, filteredBirds: birdData });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getMyBirds = () => async (dispatch, getState) => {
  const { token } = getState().user;
  const { user } = getState().user;
  try {
    const response = await fetch(`${base1}/bird_images`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
      }),
    });

    if (!response.ok) {
      throw new Error('error');
    }

    const birdData = await response.json();

    dispatch({ type: MY_BIRDS, myBirds: birdData });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  MY_BIRDS,
  getMyBirds,
  SEARCH_BIRDS,
  searchBirds,
  GET_BIRD,
  getBird,
  SET_BIRDS,
  fetchBirds,
  SET_CATEGORIES,
  fetchBirdCategories,
};
