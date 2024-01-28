import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Photos {
    id: string;
    albumId: string;
    title: string;
    url: string;
}
export interface FavoriteState {
    favorites: Photos[],
    photo: Photos
}

const initialState: FavoriteState = {
    favorites: [],
    photo: {
        id: '',
        albumId: '',
        title: '',
        url: ''
    }
}


export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<Photos>) => {
            state.favorites.push(action.payload);
        },
        removeFromFavorites: (state, action: PayloadAction<Photos>) => {
            state.favorites = state.favorites.filter(photo => photo.id !== action.payload.id);
        },
        setModalPhoto: (state, action: PayloadAction<Photos>) => {
            state.photo = action.payload;
        }
    }
})


export const { addToFavorites, removeFromFavorites, setModalPhoto } = favoriteSlice.actions

export default favoriteSlice.reducer
