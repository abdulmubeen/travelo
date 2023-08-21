import { configureStore } from "@reduxjs/toolkit";
import {
  persistCombineReducers,
  persistStore,
  PAUSE,
  PERSIST,
  PURGE,
  FLUSH,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import packsSlice from "./slices/packsSlice.js";
import userSlice from "./slices/userSlice.js";
import cartSlice from "./slices/cartSlice.js";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistCombineReducers(persistConfig, {
  allpacks: packsSlice,
  user: userSlice,
  cartDetails: cartSlice,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistedStore = persistStore(store);
export default store;
