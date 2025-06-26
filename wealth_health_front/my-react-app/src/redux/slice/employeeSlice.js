import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    loadInitialEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
});

export const { addEmployee, loadInitialEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;