import { createSlice } from '@reduxjs/toolkit';

const initialState = { users: [], error: null, message: null, loading: false };

export const adminReducer = createSlice({
  name: 'adminReducer',
  initialState,
  reducers: {
    getStatsRequest: state => {
      state.loading = true;
    },
    getStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.usersCount = action.payload.usersCount;
      state.subscriptionsCount = action.payload.subscriptionsCount;
      state.viewsCount = action.payload.viewsCount;
      state.usersPercentage = action.payload.usersPercentage;
      state.subscriptionsPercentage = action.payload.subscriptionsPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
      state.usersProfit = action.payload.usersProfit;
      state.subscriptionsProfit = action.payload.subscriptionsProfit;
      state.viewsProfit = action.payload.viewsProfit;
    },
    getStatsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllUsersRequest: state => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.message = action.payload.message;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRoleRequest: state => {
      state.loading = true;
    },
    updateUserRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateUserRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: state => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCourseRequest: state => {
      state.loading = true;
    },
    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCourseRequest: state => {
      state.loading = true;
    },
    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addLectureRequest: state => {
      state.loading = true;
    },
    addLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteLectureRequest: state => {
      state.loading = true;
    },
    deleteLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteLectureFail: (state, action) => {
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
