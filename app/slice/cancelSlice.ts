import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../apiservice/client';
import URL from '../apiservice/endPoint';

export const fetchCancelData = createAsyncThunk(
  'users/fetchCancelData',
  async (params, thunkApi) => {
    try {
      const response = await client.post(`${URL.CANCEL}/${params?.id}/cancel}`,{});
      console.log('cancel')
      return await response?.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);

const cancelSlice = createSlice({
  name: 'shift cancel',
  initialState: {
    data: null,
    loading: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchCancelData.pending, state => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(fetchCancelData.fulfilled, (state, action) => {
      state.loading = false;
      state.isError = false;
      state.data = action?.payload;
    });
    builder.addCase(fetchCancelData.rejected, (state, action) => {
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

export default cancelSlice.reducer;
