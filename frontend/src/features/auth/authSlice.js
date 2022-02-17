import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  usError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Register user
//We're going to have a async thunk functions which is going to deal with
//asynchronous data, deal with our backend
//the function createAsyncThunk takes in a string with the action,
//second is asynchronous function which takes in a user (this user data is going to be passed in from the register page, we're going to dispatch this function from there)
//the second argument is the thunkAPI which has couple things which we will use in the try catch
//in the tries we will make our request, which is in our authService
//we'll handle the error if something goes wrong when we make the request
//we will get the message from the server which could be in multiple places, so
//we'll do couple checks and then the last thing we will call within this catch is going to be
//thunkAPI which has a method called rejectWithValue that will reject and send the error messge
//as the payload, which we will see when we get down to the reducer
/**
 * The last thing we need to do in our slice is when we register, we need to account for the pending,
 * fulfilled and rejected state if there is an error.
 * We do that down in our extraReducers
 */
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Actual slice, we want to be able to dispatch the reset function after we register and set,  to reset
//the values back to false
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

//We can now bring this reset function into components where we want to fire it off
export const { reset } = authSlice.actions;
export default authSlice.reducer;
