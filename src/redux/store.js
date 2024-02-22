import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["isLoading"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/** ของเก่าก่อนใช้ Combine Reducer */
/* export const reduxStore = configureStore({
  reducer: {
    chargerData: chargerSlice,
    stationData: stationSlice,
  },
}); */

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(reduxStore);
