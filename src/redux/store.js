import { configureStore } from '@reduxjs/toolkit';
import { subscriptionReducer, userReducer } from './reducers/userReducer.js';
import { profileReducer } from './reducers/profileReducer.js';
import { courseReducer } from './reducers/courseReducer.js';
import { adminReducer } from './reducers/adminReducer.js';
import { otherReducer } from './reducers/otherReducer.js';

const rootReducer = {
  user: userReducer.reducer,
  profile: profileReducer.reducer,
  course: courseReducer.reducer,
  subscription: subscriptionReducer.reducer,
  admin: adminReducer.reducer,
  other: otherReducer.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export const server =
  'https://mern-project-course-bundler-chandrabhansingh813-gmailcom.vercel.app/api/v1';
