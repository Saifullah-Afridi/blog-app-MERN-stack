import {
  configureStore,
  combineReducers,
  miniSerializeError,
} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
const rootReducers = combineReducers({
  user: userReducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export const persistor = persistStore(store);