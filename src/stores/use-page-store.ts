import { create } from "zustand";
import { persist } from "zustand/middleware";

type PageKey = 'articles' | 'categories'

interface PageStates {
  [key: string]: number
}

interface PageState {
  currentPage: PageStates
  setPage: (payload: { key: PageKey; page: number }) => void
  resetPage: (payload: { key: PageKey }) => void
}

export const usePageStore = create<PageState>()(
  persist(
    (set) => ({
      currentPage: {},
      setPage: ({ key, page }) => {
        set((state) => ({ 
          currentPage: { 
            ...state.currentPage, [key]: page 
          } 
        }))
      }, 
      resetPage: ({ key }) => {
        set((state) => ({ 
          currentPage: { 
            ...state.currentPage, [key]: 1 
          } 
        }))
      }
    }), 
    { 
      name: 'page' 
    }
  )
)