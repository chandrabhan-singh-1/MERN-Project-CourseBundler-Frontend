import { server } from '../store.js';
import axios from 'axios';
import { subscriptionReducer, userReducer } from '../reducers/userReducer.js';
import { configForm, configJson } from './config.js';

export const login = (email, password) => async dispatch => {
  try {
    dispatch(userReducer.actions.loginRequest());

    const { data } = await axios.post(
      `${server}/login`,
      { email: email, password: password },
      configJson
    );
    dispatch(userReducer.actions.loginSuccess(data));
  } catch (error) {
    dispatch(userReducer.actions.loginFail(error.response.data.message));
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch(userReducer.actions.loadUserRequest());

    const { data } = await axios.get(`${server}/me`, { withCredentials: true });

    dispatch(userReducer.actions.loadUserSuccess(data.user));
  } catch (error) {
    dispatch(userReducer.actions.loadUserFail(error.response.data.message));
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch(userReducer.actions.logoutRequest());

    const { data } = await axios.delete(`${server}/logout`, {
      withCredentials: true,
    });

    dispatch(userReducer.actions.logoutSuccess(data.message));
  } catch (error) {
    dispatch(userReducer.actions.logoutFail(error.response.data.message));
  }
};

export const register = formdata => async dispatch => {
  try {
    dispatch(userReducer.actions.registerRequest());

    const { data } = await axios.post(
      `${server}/register`,
      formdata,
      configForm
    );
    dispatch(userReducer.actions.registerSuccess(data));
  } catch (error) {
    dispatch(userReducer.actions.registerFail(error.response.data.message));
  }
};

export const buySubscription = () => async dispatch => {
  try {
    dispatch(subscriptionReducer.actions.buySubscriptionRequest());

    const { data } = await axios.get(`${server}/subscription`, {
      withCredentials: true,
    });
    dispatch(
      subscriptionReducer.actions.buySubscriptionSuccess(data.subscriptionId)
    );
  } catch (error) {
    dispatch(
      subscriptionReducer.actions.buySubscriptionFail(
        error.response.data.message
      )
    );
  }
};

export const cancelSubscription = () => async dispatch => {
  try {
    dispatch(subscriptionReducer.actions.cancelSubscriptionRequest());

    const { data } = await axios.delete(`${server}/subscription/cancel`, {
      withCredentials: true,
    });
    dispatch(
      subscriptionReducer.actions.cancelSubscriptionSuccess(data.message)
    );
  } catch (error) {
    dispatch(
      subscriptionReducer.actions.cancelSubscriptionFail(
        error.response.data.message
      )
    );
  }
};
