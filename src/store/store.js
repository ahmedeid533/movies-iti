import { configureStore } from "@reduxjs/toolkit";
import WishlistReducer from "./slices/WishListSlice";
import languageReducer from "./slices/languageSlice";

const store = configureStore({
  reducer: {
    wishlist: WishlistReducer,
    languages: languageReducer,
  },
});

export default store;
