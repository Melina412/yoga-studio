export type ResponseType = { success: boolean; message: string; data?: any } | null;

// Zustand

export interface AuthStore {
  login: boolean;
  setLogin: (value: boolean) => void;
}

export interface ResponseStore {
  loginResponse: ResponseType;
  setLoginResponse: (res: ResponseType) => void;
}
