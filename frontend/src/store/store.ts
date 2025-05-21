import { create } from 'zustand';
import type { LoginStore, ResponseStore, AuthStore } from '../frontend.types';

export const useLoginStore = create<LoginStore>((set) => ({
  login: false,
  setLogin: (value) => set({ login: value }),
}));

export const useResponseStore = create<ResponseStore>((set) => ({
  loginResponse: null,
  checkTokenResponse: null,
  setLoginResponse: (res) => set({ loginResponse: res }),
  setCheckTokenResponse: (res) => set({ checkTokenResponse: res }),
}));

export const useAuthStore = create<AuthStore>((set) => ({
  authorized: false,
  setAuthorized: (value) => set({ authorized: value }),
}));
