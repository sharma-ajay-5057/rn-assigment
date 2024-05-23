import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyShifts from '../app/screen/MyShifts/index';
import { fetchShiftsData } from '../app/slice/shiftsSlice';
import { fetchCancelData } from '../app/slice/cancelSlice';
import { fetchBookData } from '../app/slice/bookSlice';
import { Store, AnyAction } from '@reduxjs/toolkit';

jest.mock('../app/slice/shiftsSlice', () => ({
  fetchShiftsData: jest.fn(() => ({ type: 'FETCH_SHIFTS_DATA' })),
}));
jest.mock('../app/slice/cancelSlice', () => ({
  fetchCancelData: jest.fn(() => ({ type: 'FETCH_CANCEL_DATA' })),
}));
jest.mock('../app/slice/bookSlice', () => ({
  fetchBookData: jest.fn(() => ({ type: 'FETCH_BOOK_DATA' })),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('MyShifts Component', () => {
  let store: Store<unknown, AnyAction>;

  beforeEach(() => {
    store = mockStore({
      shift: {
        data: [],
      },
    });
    fetchShiftsData();
    fetchCancelData();
    fetchBookData();
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MyShifts />
      </Provider>
    );

    expect(screen).toBeTruthy();
  });

  it('dispatches fetchShiftsData on mount', () => {
    render(
      <Provider store={store}>
        <MyShifts />
      </Provider>
    );

    expect(fetchShiftsData).toHaveBeenCalled();
  });

  it('renders sections correctly', async () => {
    const shiftsData = [
      {
        id: '1',
        startTime: new Date().toISOString(),
        endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(),
        area: 'Area 1',
        booked: true,
      },
      {
        id: '2',
        startTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(new Date().getTime() + 26 * 60 * 60 * 1000).toISOString(),
        area: 'Area 2',
        booked: false,
      },
    ];

    store = mockStore({
      shift: {
        data: shiftsData,
      },
    });

    render(
      <Provider store={store}>
        <MyShifts />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Today/)).toBeTruthy();
      expect(screen.getByText(/Tomorrow/)).toBeTruthy();
      expect(screen.getByText(/Area 1/)).toBeTruthy();
      expect(screen.getByText(/Area 2/)).toBeTruthy();
    });
  });

  it('dispatches bookData on Book button press', async () => {
    const shiftsData = [
      {
        id: '1',
        startTime: new Date().toISOString(),
        endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(),
        area: 'Area 1',
        booked: true,
      },
    ];

    store = mockStore({
      shift: {
        data: shiftsData,
      },
    });

    render(
      <Provider store={store}>
        <MyShifts />
      </Provider>
    );

    const bookButton = await screen.findByText('Book');
    fireEvent.press(bookButton);
    expect(fetchBookData).toHaveBeenCalledWith({ id: '1' });
  });

  it('dispatches cancelData on Cancel button press', async () => {
    const shiftsData = [
      {
        id: '1',
        startTime: new Date().toISOString(),
        endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(),
        area: 'Area 1',
        booked: false,
      },
    ];

    store = mockStore({
      shift: {
        data: shiftsData,
      },
    });

    render(
      <Provider store={store}>
        <MyShifts />
      </Provider>
    );

    const cancelButton =  await screen.findByText('Cancel');
    fireEvent.press(cancelButton);
    expect(fetchCancelData).toHaveBeenCalledWith({ id: '1' });
  });
});

