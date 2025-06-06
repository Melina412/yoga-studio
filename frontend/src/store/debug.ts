import { useLoginStore, useResponseStore, useAuthStore, useCalendarStore, useEventStore } from './store';

const textStyle = 'background-color: #222; color: #bada55;';
const bgStyle = 'background-color: #bada55; color: #222;';

const debugStore = () => {
  console.log('%c ******************** debugStore() ******************** ', bgStyle);

  console.log('%c' + 'login', textStyle, useLoginStore.getState().login);
  console.log('%c' + 'loginResponse', textStyle, useResponseStore.getState().loginResponse);
  console.log('%c' + 'checkTokenResponse', textStyle, useResponseStore.getState().checkTokenResponse);
  console.log('%c' + 'checkRefreshTokenResponse', textStyle, useResponseStore.getState().checkRefreshTokenResponse);
  console.log('%c' + 'authorized', textStyle, useAuthStore.getState().authorized);
  console.log('%c' + 'selectedEventId', textStyle, useCalendarStore.getState().selectedEventId);
  console.log('%c' + 'events', textStyle, useEventStore.getState().events);

  console.log('%c ****************************************************** ', bgStyle);
};

export default debugStore;
