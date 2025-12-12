import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// THAY THẾ sliceRootStoreReducer bằng authSliceReducer
import authSliceReducer from './slices/authSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

// 1. Cấu hình Persist (Áp dụng cho slice auth)
const persistConfig = {
  key: 'auth', // Đổi key thành 'auth' hoặc 'root'
  storage: AsyncStorage,
};

// 2. Tạo Persisted Reducer
// Áp dụng persistReducer cho authSliceReducer
const persistedAuthReducer = persistReducer(
  persistConfig,
  authSliceReducer,
);

// 3. Combine Reducers (Ánh xạ slice auth vào store)
const rootReducer = combineReducers({
  // Sử dụng key 'auth' để truy cập trạng thái xác thực
  auth: persistedAuthReducer,
  // ... các reducers khác (nếu có)
});

export const store = configureStore({
  // ... (Phần cấu hình khác giữ nguyên)
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// THAY ĐỔI: useSelector phải sử dụng RootState mới
export const useAppSelector = useSelector.withTypes<RootState>();
