import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PageStates {
  [key: string]: number
}

interface PageState {
  currentPage: PageStates
}

const initialState: PageState = {
  currentPage: {}
}

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<{ key: 'articles' | 'categories'; page: number }>) => {
      state.currentPage[action.payload.key] = action.payload.page;
    },
    resetPage: (state, action: PayloadAction<string>) => {
      delete state.currentPage[action.payload];
    },
  }
})

export const { setPage, resetPage } = pageSlice.actions;
export default pageSlice.reducer