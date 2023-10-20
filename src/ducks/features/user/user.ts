import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Image } from '@/types/common/images-data-type'

interface userProfile {
  //타입 작성
  name: string
  followers: number
  profileImage: Image | null
}

const initialState: userProfile = {
  name: '',
  followers: 0,
  profileImage: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setFollowers: (state, action: PayloadAction<number>) => {
      state.followers = action.payload
    },
    setProfileImage: (state, action: PayloadAction<Image>) => {
      state.profileImage = action.payload
    },
  },
})

export const { setName, setFollowers, setProfileImage } = userSlice.actions
export default userSlice.reducer
