import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice'
import formReducer from './slices/formSlice';
import taskReducer from './slices/taskSlice';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productSlice';
export const store = configureStore({
  reducer: {
    chat: chatReducer,
    form: formReducer,
    tasks: taskReducer,
    auth: authReducer,
    products: productsReducer,
  },
});