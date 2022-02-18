import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Create Thunk Function/Create New Goal @actionname: 'goals/create'
//we want to pass in our token in createGoal which is in local storage which is in our user State
//The thunkAPI object has a getState method that we can use to get anything we want in any part of our state including our auth
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData.token);
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

//let's create the slice
export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message(action.payload);
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
