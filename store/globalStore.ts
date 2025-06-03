import { create } from 'zustand';

export interface GlobalStoreType {
    loading: boolean,
    setLoading: (loading: boolean) => void
}

export const GlobalStore = create<GlobalStoreType>((set) => ({
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),
}))