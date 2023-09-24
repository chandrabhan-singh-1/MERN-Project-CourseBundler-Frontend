import { otherReducer } from '../reducers/otherReducer';
import { server } from '../store';
import axios from 'axios';
import { configJson } from './config';

export const contactUs = (name, email, message) => async dispatch => {
  try {
    dispatch(otherReducer.actions.contactRequest());

    const { data } = await axios.post(
      `${server}/contact`,
      { name: name, email: email, message: message },
      configJson
    );

    dispatch(otherReducer.actions.contactSuccess(data.message));
  } catch (error) {
    dispatch(otherReducer.actions.contactFail(error.response.data.message));
  }
};

export const courseRequest = (name, email, course) => async dispatch => {
  try {
    dispatch(otherReducer.actions.courseRequestRequest());

    const { data } = await axios.post(
      `${server}/courserequest`,
      { name, email, course },
      configJson
    );

    dispatch(otherReducer.actions.courseRequestSuccess(data.message));
  } catch (error) {
    dispatch(
      otherReducer.actions.courseRequestFail(error.response.data.message)
    );
  }
};
