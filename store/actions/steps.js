import { base1 } from '../../env';

const GET_STEPS = 'GET_STEPS';
const NEW_STEPS = 'NEW_STEPS';
const UPDATE_STEPS = 'UPDATE_STEPS';

const getMySteps = () => async (dispatch, getState) => {
  const { token } = getState().user;
  const { user } = getState().user;
  try {
    const response = await fetch(`${base1}/steps`, {
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
      throw new Error('error in steps action');
    }

    const stepsData = await response.json();

    dispatch({ type: GET_STEPS, mySteps: stepsData });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const currentSteps = (steps) => ({ type: NEW_STEPS, newSteps: steps });

const updateSteps = (steps) => async (dispatch, getState) => {
  const { token } = getState().user;
  const { user } = getState().user;
  try {
    const response = await fetch(`${base1}/my_steps`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        steps,
      }),
    });

    if (!response.ok) {
      throw new Error('error in steps action');
    }

    const stepsData = await response.json();
    dispatch({ type: UPDATE_STEPS, steps: stepsData });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  GET_STEPS,
  getMySteps,
  NEW_STEPS,
  currentSteps,
  UPDATE_STEPS,
  updateSteps,
};
