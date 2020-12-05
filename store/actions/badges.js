import { base1 } from '../../env';

const MY_BADGES = 'MY_BADGES';

const getMyBadges = () => async (dispatch, getState) => {
  const { token } = getState().user;
  const { user } = getState().user;
  try {
    const response = await fetch(`${base1}/badges`, {
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

    const badgesData = await response.json();

    dispatch({ type: MY_BADGES, myBadges: badgesData });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  getMyBadges,
  MY_BADGES,
};
