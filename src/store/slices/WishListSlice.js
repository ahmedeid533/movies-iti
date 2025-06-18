import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    value: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.value.find((item) => item.id == action.payload.id)
        ? null
        : state.value.push(action.payload);
    },
    removeFromWishlsit: (state, action) => {
      state.value = state.value.filter(
        (movie) => movie.id != action.payload.id
      );
    },
    deleteAllFromWishlist: (state) => {
			state.value = [];
    },
  },
});

export const { addToWishlist, removeFromWishlsit, deleteAllFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
