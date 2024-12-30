import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice'
import formReducer from './slices/formSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    form: formReducer,
    tasks: taskReducer,
  },
});