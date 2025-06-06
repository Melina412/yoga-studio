import { create } from 'zustand';
import type { LoginStore, ResponseStore, AuthStore, CalendarStore, EventStore } from './types';

export const useLoginStore = create<LoginStore>((set) => ({
  login: false,
  desiredRole: null,
  setLogin: (value) => set({ login: value }),
  setDesiredRole: (value) => set({ desiredRole: value }),
}));

export const useResponseStore = create<ResponseStore>((set) => ({
  loginResponse: null,
  checkTokenResponse: null,
  checkRefreshTokenResponse: null,
  setLoginResponse: (res) => set({ loginResponse: res }),
  setCheckTokenResponse: (res) => set({ checkTokenResponse: res }),
  setCheckRefreshTokenResponse: (res) => set({ checkRefreshTokenResponse: res }),
}));

export const useAuthStore = create<AuthStore>((set) => ({
  authorized: false,
  role: null,
  setAuthorized: (value) => set({ authorized: value }),
  setRole: (value) => set({ role: value }),
}));

export const useCalendarStore = create<CalendarStore>((set) => ({
  selectedEventId: null,
  setSelectedEventId: (id) => set({ selectedEventId: id }),
}));

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
}));
