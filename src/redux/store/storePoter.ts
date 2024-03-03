import { configureStore } from '@reduxjs/toolkit'
import gariPoter from '../charactersReducer'

export const store = configureStore({
  reducer: {
    gariPoter,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
