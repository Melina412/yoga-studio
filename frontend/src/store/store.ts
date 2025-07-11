import { create } from 'zustand';
import type { LoginStore, ResponseStore, AuthStore, EventStore, TriggerStore } from './types';
import { getRoleFromLocation } from '../utils/utils';

export const useLoginStore = create<LoginStore>((set) => ({
  login: false,
  requestedLocation: null,
  requestedRole: null,
  setLogin: (value) => set({ login: value }),
  setRequestedLocation: (location) => {
    set({ requestedLocation: location }), set({ requestedRole: getRoleFromLocation(location) });
  },
}));

export const useResponseStore = create<ResponseStore>((set) => ({
  loginResponse: null,
  checkTokenResponse: null,
  checkRefreshTokenResponse: null,
  addBookingResponse: null,
  myBookingsResponse: null,
  setLoginResponse: (res) => set({ loginResponse: res }),
  setCheckTokenResponse: (res) => set({ checkTokenResponse: res }),
  setCheckRefreshTokenResponse: (res) => set({ checkRefreshTokenResponse: res }),
  setAddBookingResponse: (res) => set({ addBookingResponse: res }),
  setMyBookingsResponse: (res) => set({ myBookingsResponse: res }),
}));

export const useAuthStore = create<AuthStore>((set) => ({
  authorized: false,
  role: null,
  setAuthorized: (value) => set({ authorized: value }),
  setRole: (value) => set({ role: value }),
}));

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),

  selectedEventId: null,
  setSelectedEventId: (id) => set({ selectedEventId: id }),
}));

export const useTriggerStore = create<TriggerStore>((set) => ({
  triggerGetMyBookings: false,
  setTriggerGetMyBookings: (value) => set({ triggerGetMyBookings: value }),
}));
