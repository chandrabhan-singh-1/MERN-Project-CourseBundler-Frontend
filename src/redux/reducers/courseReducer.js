import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  courses: [],
  lectures: [],
  error: null,
  message: null,
};

export const courseReducer = createSlice({
  name: 'courseReducer',
  initialState: initialState,
  reducers: {
    getAllCoursesRequest: state => {
      state.loading = true;
    },
    getAllCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload.courses;
    },
    getAllCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getLecturesRequest: state => {
      state.loading = true;
    },
    getLecturesSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    },
    getLecturesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToPlaylistRequest: state => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  },
});
