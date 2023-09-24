import { adminReducer } from '../reducers/adminReducer';
import { server } from '../store';
import axios from 'axios';
import { configForm } from './config';

export const getDashboardStats = () => async dispatch => {
  try {
    dispatch(adminReducer.actions.getStatsRequest());

    const { data } = await axios.get(`${server}/admin/stats`, {
      withCredentials: true,
    });

    dispatch(adminReducer.actions.getStatsSuccess(data));
  } catch (error) {
    dispatch(adminReducer.actions.getStatsFail(error.response.data.message));
  }
};

export const getAllUsers = () => async dispatch => {
  try {
    dispatch(adminReducer.actions.getAllUsersRequest());

    const { data } = await axios.get(`${server}/admin/users`, {
      withCredentials: true,
    });

    dispatch(adminReducer.actions.getAllUsersSuccess(data));
  } catch (error) {
    dispatch(adminReducer.actions.getAllUsersFail(error.response.data.message));
  }
};

export const updateUserRole = id => async dispatch => {
  try {
    dispatch(adminReducer.actions.updateUserRoleRequest());

    const { data } = await axios.put(`${server}/admin/user/${id}`, null, {
      withCredentials: true,
    });

    dispatch(adminReducer.actions.updateUserRoleSuccess(data.message));
  } catch (error) {
    dispatch(
      adminReducer.actions.updateUserRoleFail(error.response.data.message)
    );
  }
};

export const deleteUser = id => async dispatch => {
  try {
    dispatch(adminReducer.actions.deleteUserRequest());

    const { data } = await axios.delete(`${server}/admin/user/${id}`, {
      withCredentials: true,
    });

    dispatch(adminReducer.actions.deleteUserSuccess(data.message));
  } catch (error) {
    dispatch(adminReducer.actions.deleteUserFail(error.response.data.message));
  }
};

export const createCourse = formData => async dispatch => {
  try {
    dispatch(adminReducer.actions.createCourseRequest());

    const { data } = await axios.post(
      `${server}/createcourse`,
      formData,
      configForm
    );

    dispatch(adminReducer.actions.createCourseSuccess(data.message));
  } catch (error) {
    dispatch(
      adminReducer.actions.createCourseFail(error.response.data.message)
    );
  }
};

export const deleteCourse = id => async dispatch => {
  try {
    dispatch(adminReducer.actions.deleteCourseRequest());

    const { data } = await axios.delete(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch(adminReducer.actions.deleteCourseSuccess(data.message));
  } catch (error) {
    dispatch(
      adminReducer.actions.deleteCourseFail(error.response.data.message)
    );
  }
};

export const addLecture = (id, formData) => async dispatch => {
  try {
    dispatch(adminReducer.actions.addLectureRequest());

    const { data } = await axios.post(
      `${server}/course/${id}`,
      formData,
      configForm
    );

    dispatch(adminReducer.actions.addLectureSuccess(data.message));
  } catch (error) {
    dispatch(adminReducer.actions.addLectureFail(error.response.data.message));
  }
};

export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    dispatch(adminReducer.actions.deleteLectureRequest());

    const { data } = await axios.delete(
      `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      { withCredentials: true }
    );

    dispatch(adminReducer.actions.deleteLectureSuccess(data.message));
  } catch (error) {
    dispatch(
      adminReducer.actions.deleteLectureFail(error.response.data.message)
    );
  }
};
