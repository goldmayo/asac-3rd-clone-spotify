import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { combineReducers } from 'redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import libarySlice from '@/ducks/features/library/library'
import { playerSlice } from '@/ducks/features/player/player'
import tokenSlice from '@/ducks/features/token/tokenSlice'
import { lyricsApi } from '@/ducks/service/lyrics-api'
import { playerApi } from '@/ducks/service/player-api'
import { playlistApi } from '@/ducks/service/playlist-api'
import { searchApi } from '@/ducks/service/search-api'
import { userApi } from '@/ducks/service/user-api'

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null)
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: any) {
      return Promise.resolve()
    },
  }
}
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

const persistConfig = {
  key: 'root', //localstorage key
  storage, //로컬스토리지 사용
  whitelist: ['token'], //유지하고 싶은 값을 배열로 전달
  //balcklist: 유지하고 싶지 않은 값을 배열로 전달.
}

const rootReducer = combineReducers({
  //여러 개의 reducer를 하나의 root reducer로 합쳐준다.
  user: tokenSlice.reducer,
  player: playerSlice.reducer,
  library: libarySlice.reducer,
})

const reducer = persistReducer(persistConfig, rootReducer)

//persistReducer: reducer 반환 API. 인자로 받은 config 객체를 reducer 함수에 적용해 enhanced reducer를 반환
const store = configureStore({
  reducer: {
    reducer,
    [userApi.reducerPath]: userApi.reducer,
    [playerApi.reducerPath]: playerApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [lyricsApi.reducerPath]: lyricsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userApi.middleware,
      playerApi.middleware,
      playlistApi.middleware,
      searchApi.middleware,
      lyricsApi.middleware,
    ),
  devTools: process.env.NODE_ENV === 'development',
})
setupListeners(store.dispatch)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
