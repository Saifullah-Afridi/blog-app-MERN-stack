import {
  configureStore,
  combineReducers,
  miniSerializeError,
} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import themeReducer from "./slices/themeSlice";
import postReducer from "./slices/postSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
const rootReducers = combineReducers({
  user: userReducer,
  theme: themeReducer,
  post: postReducer,
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
