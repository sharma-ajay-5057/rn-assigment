import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AvailableShifts from '../app/screen/AvailableShifts/index';
import { fetchShiftsData } from '../app/slice/shiftsSlice';
import { Store, AnyAction } from '@reduxjs/toolkit';

jest.mock('../app/slice/shiftsSlice', () => ({
  fetchShiftsData: jest.fn(() => ({ type: 'FETCH_SHIFTS_DATA' })),
}));

jest.mock('react-native/Libraries/Settings/Settings', () => ({
    settings: jest.fn(),
  }));
  
  jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'ios',
    select: () => {},
  }));
  
  jest.mock('../app/slice/shiftsSlice', () => ({
    fetchShiftsData: jest.fn(() => ({ type: 'FETCH_SHIFTS_DATA' })),
  }));
  
  // Mocking Dimensions module with a default width
  jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
    get: jest.fn().mockReturnValue({ width: 375, height: 667 }), // Adjust width and height as needed
  }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AvailableShifts Component', () => {
  let store: Store<unknown, AnyAction>;

  beforeEach(() => {
    store = mockStore({
      shift: {
        data: [
          { id: '1', area: 'Helsinki' },
          { id: '2', area: 'Helsinki' },
          { id: '3', area: 'Tempere' },
          { id: '4', area: 'Turku' },
        ],
      },
    });
    fetchShiftsData;
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <AvailableShifts />
      </Provider>
    );

    expect(screen).toBeTruthy();
  });

  it('dispatches fetchShiftsData on mount', () => {
    render(
      <Provider store={store}>
        <AvailableShifts />
      </Provider>
    );

    expect(fetchShiftsData).toHaveBeenCalled();
  });

  it('displays the correct number of shifts for each area', async () => {
    render(
      <Provider store={store}>
        <AvailableShifts />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Helsinki (2)')).toBeTruthy();
      expect(screen.getByText('Tempere (1)')).toBeTruthy();
      expect(screen.getByText('Turku (1)')).toBeTruthy();
    });
  });

  it('switches tabs when headers are pressed', async () => {
    render(
      <Provider store={store}>
        <AvailableShifts />
      </Provider>
    );

    const helsinkiHeader = await screen.findByText('Helsinki (2)');
    const tempereHeader = await screen.findByText('Tempere (1)');
    const turkuHeader = await screen.findByText('Turku (1)');

    fireEvent.press(tempereHeader);
    expect(screen.toJSON()).toMatchSnapshot();

    fireEvent.press(turkuHeader);
    expect(screen.toJSON()).toMatchSnapshot();

    fireEvent.press(helsinkiHeader);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('synchronizes header with content scroll', async () => {
    render(
      <Provider store={store}>
        <AvailableShifts />
      </Provider>
    );

    const itemScrollView = screen.getByTestId('itemScrollView');
    fireEvent.scroll(itemScrollView, {
      nativeEvent: {
        contentOffset: {
          x: 375, // Mocking width value here
        },
      },
    });

    await waitFor(() => {
      const tempereHeader = screen.getByText('Tempere (1)');
      expect(tempereHeader.props.style).toContainEqual({ fontWeight: 'bold' });
    });
  });
});
