import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  guestId: '',
}

export const guestSlice = createSlice({
  name: "guestSlice",
  initialState,
  reducers: {
    setGuestId: (state, action) => {
      state.guestId = action.payload
    }
  }
})

export const { setGuestId } = guestSlice.actions

export default guestSlice.reducer