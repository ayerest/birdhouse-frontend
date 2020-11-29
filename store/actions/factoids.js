import { base1 } from '../../env';

const GET_FACT = 'GET_FACT';

const getFact = () => async (dispatch, getState) => {
  const { token } = getState().user;
  try {
    const response = await fetch(`${base1}/factoids`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('error in steps action');
    }

    const fact = await response.json();

    return dispatch({ type: 'GET_FACT', fact });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  GET_FACT,
  getFact,
};
