import { courseReducer } from '../reducers/courseReducer';
import { server } from '../store';
import axios from 'axios';
import { configJson } from './config';

export const getAllCourses =
  (keyword = '', category = '') =>
  async dispatch => {
    try {
      dispatch(courseReducer.actions.getAllCoursesRequest());

      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`,
        {
          withCredentials: true,
        }
      );

      dispatch(courseReducer.actions.getAllCoursesSuccess(data));
    } catch (error) {
      dispatch(
        courseReducer.actions.getAllCoursesFail(error.response.data.message)
      );
    }
  };

export const addToPlaylist = id => async dispatch => {
  try {
    dispatch(courseReducer.actions.addToPlaylistRequest());

    const { data } = await axios.post(
      `${server}/addtoplaylist`,
      { id },
      configJson
    );

    dispatch(courseReducer.actions.addToPlaylistSuccess(data.message));
  } catch (error) {
    dispatch(
      courseReducer.actions.addToPlaylistFail(error.response.data.message)
    );
  }
};

export const getLectures = id => async dispatch => {
  try {
    dispatch(courseReducer.actions.getLecturesRequest());

    const { data } = await axios.get(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch(courseReducer.actions.getLecturesSuccess(data.lectures));
  } catch (error) {
    dispatch(
      courseReducer.actions.getLecturesFail(error.response.data.message)
    );
  }
};
