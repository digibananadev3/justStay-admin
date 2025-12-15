import { configureStore } from '@reduxjs/toolkit'
import guestReducer from './slices/guestSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    guest: guestReducer,
    auth: authReducer
  },
})