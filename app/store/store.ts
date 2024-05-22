import { configureStore } from "@reduxjs/toolkit";
import shiftsSlice from "../slice/shiftsSlice";
import cancelSlice from "../slice/cancelSlice";
import bookSlice from "../slice/bookSlice";

export const store = configureStore({
    reducer: {
        shift: shiftsSlice,
        cancel: cancelSlice,
        book: bookSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
