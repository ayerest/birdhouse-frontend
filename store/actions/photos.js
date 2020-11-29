import { base1 } from '../../env';

const MY_PHOTOS = 'MY_PHOTOS';

// TODO: use abort controller to abort fetch requests when component is unmounted

const photosAbortController = new AbortController();

const abortMyPhotos = () => async () => {
  photosAbortController.abort();
};

const getMyPhotos = () => async (dispatch, getState) => {
  const { token, user } = getState().user;
  try {
    const response = await fetch(`${base1}/images`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
      }),
      signal: photosAbortController.signal,
    });

    if (!response.ok) {
      throw new Error('error in entries action');
    }

    const photosData = await response.json();

    dispatch({ type: MY_PHOTOS, myPhotos: photosData });
  } catch (err) {
    if (!photosAbortController.signal.aborted) {
      console.log({ error: err.message });
    }
    throw err;
  }
};

export {
  MY_PHOTOS,
  getMyPhotos,
  abortMyPhotos,
};
