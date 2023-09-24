import { profileReducer } from '../reducers/profileReducer';
import { server } from '../store';
import axios from 'axios';
import { configForm, configJson } from './config';

export const updateProfile = (name, email) => async dispatch => {
  try {
    dispatch(profileReducer.actions.updateProfileRequest());

    const { data } = await axios.put(
      `${server}/updateprofile`,
      { email: email, name: name },
      configJson
    );

    dispatch(profileReducer.actions.updateProfileSuccess(data.message));
  } catch (error) {
    dispatch(
      profileReducer.actions.updateProfileFail(error.response.data.message)
    );
  }
};

export const updateProfilePicture = formdata => async dispatch => {
  try {
    dispatch(profileReducer.actions.updateProfilePictureRequest());

    const { data } = await axios.put(
      `${server}/updateprofilepicture`,
      formdata,
      configForm
    );

    dispatch(profileReducer.actions.updateProfilePictureSuccess(data.message));
  } catch (error) {
    dispatch(
      profileReducer.actions.updateProfilePictureFail(
        error.response.data.message
      )
    );
  }
};

export const changePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    dispatch(profileReducer.actions.changePasswordRequest());

    const { data } = await axios.put(
      `${server}/changepassword`,
      { oldPassword, newPassword },
      configJson
    );

    dispatch(profileReducer.actions.changePasswordSuccess(data.message));
  } catch (error) {
    dispatch(
      profileReducer.actions.changePasswordFail(error.response.data.message)
    );
  }
};

export const forgotPassword = email => async dispatch => {
  try {
    dispatch(profileReducer.actions.forgotPasswordRequest());

    const { data } = await axios.post(
      `${server}/forgotpassword`,
      { email },
      configJson
    );

    dispatch(profileReducer.actions.forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(
      profileReducer.actions.forgotPasswordFail(error.response.data.message)
    );
  }
};

export const resetPassword = (token, password) => async dispatch => {
  try {
    dispatch(profileReducer.actions.resetPasswordRequest());

    const { data } = await axios.put(
      `${server}/resetpassword/${token}`,
      { password },
      configJson
    );

    dispatch(profileReducer.actions.resetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(
      profileReducer.actions.resetPasswordFail(error.response.data.message)
    );
  }
};

export const removeFromPlaylist = id => async dispatch => {
  try {
    dispatch(profileReducer.actions.removeFromPlaylistRequest());

    const { data } = await axios.delete(
      `${server}/removefromplaylist?id=${id}`,
      { withCredentials: true }
    );

    dispatch(profileReducer.actions.removeFromPlaylistSuccess(data.message));
  } catch (error) {
    dispatch(
      profileReducer.actions.removeFromPlaylistFail(error.response.data.message)
    );
  }
};
