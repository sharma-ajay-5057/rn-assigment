import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../apiservice/client';
import URL from '../apiservice/endPoint';

export const fetchBookData = createAsyncThunk(
  'users/fetchBookData',
  async (params, thunkApi) => {
    try {
      const response = await client.post(`${URL.CANCEL}/${params?.id}/book}`,{});
      return await response?.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);

const bookSlice = createSlice({
  name: 'shift book',
  initialState: {
    data: null,
    loading: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchBookData.pending, state => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(fetchBookData.fulfilled, (state, action) => {
      state.loading = false;
      state.isError = false;
      state.data = action?.payload;
    });
    builder.addCase(fetchBookData.rejected, (state, action) => {
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

export default bookSlice.reducer;
