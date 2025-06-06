export type ResponseType = { success: boolean; message: string; data?: any } | null;

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
