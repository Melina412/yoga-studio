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
  _id?: string | undefined;
  title: string | undefined;
  date?: string | undefined;
  start?: string | undefined;
  end?: string | undefined;
  location?: string | undefined;
  trainer?: string | undefined;
  info?: string | undefined;
  classId?: string | undefined;
  className?: string | undefined;
  status: string | undefined;
  recurring: boolean | undefined;
  daysOfWeek?: number[] | undefined;
  startTime?: string | undefined;
  endTime?: string | undefined;
  startRecur?: string | undefined;
  endRecur?: string | undefined;
  groupId?: string | undefined;
};

export interface EventStore {
  events: EventType[];
  setEvents: (events: EventType[]) => void;
}
