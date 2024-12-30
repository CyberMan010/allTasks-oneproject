import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    fullName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    country: "",
    agreeToTerms: false,
  },
  errors: {},
  isFormValid: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setFormValid: (state, action) => {
      state.isFormValid = action.payload;
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const { updateFormField, setErrors, setFormValid, resetForm } = formSlice.actions;
export default formSlice.reducer;