import type { EventType, ResponseType } from '../frontend.types';

// Zustand types

export interface LoginStore {
  login: boolean;
  requestedLocation: string | null;
  requestedRole: string | null;
  setLogin: (value: boolean) => void;
  setRequestedLocation: (value: string | null) => void;
}

export interface ResponseStore {
  loginResponse: ResponseType;
  checkTokenResponse: ResponseType;
  checkRefreshTokenResponse: ResponseType;
  addBookingResponse: ResponseType;
  myBookingsResponse: ResponseType;
  setLoginResponse: (res: ResponseType) => void;
  setCheckTokenResponse: (res: ResponseType) => void;
  setCheckRefreshTokenResponse: (res: ResponseType) => void;
  setAddBookingResponse: (res: ResponseType) => void;
  setMyBookingsResponse: (res: ResponseType) => void;
}

export interface AuthStore {
  authorized: boolean;
  role: 'admin' | 'staff' | 'customer' | null;
  setAuthorized: (value: boolean) => void;
  setRole: (value: 'admin' | 'staff' | 'customer' | null) => void;
}

// export interface CalendarStore {
//   selectedEventId: string | null;
//   setSelectedEventId: (id: string | null) => void;
// }

// export interface EventStore {
//   events: EventType[];
//   setEvents: (events: EventType[]) => void;

//   selectedEventId: string | null;
//   setSelectedEventId: (id: string | null) => void;

//   selectedEvent: () => EventType | null;
// }

export interface EventStore {
  events: EventType[];
  setEvents: (events: EventType[]) => void;

  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;

  // selectedEvent: () => EventType | null;
  // setSelectedEvent: () => EventType | null;
}

export interface TriggerStore {
  triggerGetMyBookings: boolean;
  setTriggerGetMyBookings: (value: boolean) => void;
}
