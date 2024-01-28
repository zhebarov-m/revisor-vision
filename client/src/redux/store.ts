import { configureStore } from '@reduxjs/toolkit'
import {favoriteSlice} from "./slices/FavoritesSlice.ts";

export const store = configureStore({
    reducer: {
        catalog: favoriteSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
