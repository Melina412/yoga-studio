import { create } from 'zustand';
import type { AuthStore, ResponseStore } from '../frontend.types';

export const useAuthStore = create<AuthStore>((set) => ({
  login: false,
  setLogin: (value) => set({ login: value }),
}));

export const useResponseStore = create<ResponseStore>((set) => ({
  loginResponse: null,
  setLoginResponse: (res) => set({ loginResponse: res }),
}));
