import { base1 } from '../../env';

const CREATE_FIELD_ENTRY = 'CREATE_FIELD_ENTRY';
const MY_ENTRIES = 'MY_ENTRIES';
const DISMISS = 'DISMISS';
const SHARED_ENTRIES = 'SHARED_ENTRIES';

const postNewEntry = (date, bird, notes, image, latitude, longitude, share) => async (dispatch, getState) => {
  const { token, user } = getState().user;
  try {
    const response = await fetch(`${base1}/field_entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user,
        date,
        bird,
        notes,
        image,
        latitude,
        longitude,
        share,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorType = errorData.message;
      console.log(errorType);
    }

    const entryData = await response.json();

    dispatch({ type: CREATE_FIELD_ENTRY, entry: entryData });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getMyEntries = () => async (dispatch, getState) => {
  const { token, user } = getState().user;
  try {
    const response = await fetch(`${base1}/entries`, {
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
      throw new Error('error in entries action');
    }

    const entriesData = await response.json();

    dispatch({ type: MY_ENTRIES, entries: entriesData });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getSharedEntries = () => async (dispatch, getState) => {
  const { token, user } = getState().user;
  try {
    const response = await fetch(`${base1}/shared_entries`, {
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
      throw new Error('error in entries action');
    }

    const entriesData = await response.json();
    dispatch({ type: SHARED_ENTRIES, entries: entriesData });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const dismissSharedEntries = () => ({ type: 'DISMISS' });

export {
  CREATE_FIELD_ENTRY,
  postNewEntry,
  MY_ENTRIES,
  getMyEntries,
  SHARED_ENTRIES,
  getSharedEntries,
  dismissSharedEntries,
  DISMISS,
};
