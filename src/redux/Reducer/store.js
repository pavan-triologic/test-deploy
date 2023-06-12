import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import api from "./Api";
import reducer from "./reducer";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    reducer: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
export default store;
