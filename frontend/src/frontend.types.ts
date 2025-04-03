import { Dispatch, SetStateAction } from 'react';

export interface LoginProps {
  setLogin: Dispatch<SetStateAction<boolean>>;
}

export type ResponseType = { success: boolean; message: string; data?: any } | null;
