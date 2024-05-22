import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../apiservice/client';
import URL from '../apiservice/endPoint';

export const fetchShiftsData = createAsyncThunk(
  'users/fetchShiftData',
  async (params, thunkApi) => {
    try {
      const response = await client.get(`${URL.SHIFTS}`);
      return await response?.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);

const shiftsSlice = createSlice({
  name: 'shift',
  initialState: {
    data: null,
    loading: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchShiftsData.pending, state => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(fetchShiftsData.fulfilled, (state, action) => {
      state.loading = false;
      state.isError = false;
      state.data = action?.payload;
    });
    builder.addCase(fetchShiftsData.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
  reducers: {
    resetUsers: state => {
      state.data = null;
    },
  },
});

export default shiftsSlice.reducer;
