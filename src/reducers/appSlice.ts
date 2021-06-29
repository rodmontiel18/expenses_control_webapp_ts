import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    spinnerVisibility: boolean;
}

const initialState: AppState = {
    spinnerVisibility: true,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSpinnerVisibility: (state, action: PayloadAction<boolean>) => {
            state.spinnerVisibility = action.payload;
        },
    },
});

export const { setSpinnerVisibility } = appSlice.actions;

export default appSlice.reducer;
