import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { authApi } from "./auth/authApi";
import { productApi } from "./products/productsApi";
import { adminApi } from "./admin/adminApi";
import { userApi } from "./user/userApi";
import { cartApi } from "./cart/cartApi";
import cartReducer from "./cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      adminApi.middleware,
      userApi.middleware,
      cartApi.middleware
    ),
});

export default store;
