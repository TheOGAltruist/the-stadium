import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { authApi } from "./auth/authApi";
import { productApi } from "./products/productsApi";
import { adminApi } from "./admin/adminApi";
import { userApi } from "./user/userApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      adminApi.middleware,
      userApi.middleware
    ),
});

export default store;
