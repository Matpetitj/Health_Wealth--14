import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './slice/employeeSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});