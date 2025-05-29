export type ResponseType = { success: boolean; message: string; data?: any } | null;

// Zustand

export interface LoginStore {
  login: boolean;
  setLogin: (value: boolean) => void;
}

export interface ResponseStore {
  loginResponse: ResponseType;
  checkTokenResponse: ResponseType;
  setLoginResponse: (res: ResponseType) => void;
  setCheckTokenResponse: (res: ResponseType) => void;
}

export interface AuthStore {
  authorized: boolean;
  setAuthorized: (value: boolean) => void;
}

export interface CalendarStore {
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
}

export type EventType = {
  id: string;
  title: string;
  date: string;
  start: string;
  end: string;
  info?: string;
  color?: string;
  description?: string;
};

export interface EventStore {
  events: EventType[];
  setEvents: (events: EventType[]) => void;
}
