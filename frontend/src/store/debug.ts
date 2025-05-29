import { useLoginStore, useResponseStore, useAuthStore, useCalendarStore, useEventStore } from './store';

const debugStore = () => {
  console.log('%c ******************** debugStore() ******************** ', 'background-color: #bada55; color: #222;');

  console.log('%clogin:', 'background-color: #222; color: #bada55;', useLoginStore.getState().login);
  console.log('%cloginResponse:', 'background-color: #222; color: #bada55;', useResponseStore.getState().loginResponse);
  console.log(
    '%ccheckTokenResponse:',
    'background-color: #222; color: #bada55;',
    useResponseStore.getState().checkTokenResponse
  );
  console.log('%cauthorized:', 'background-color: #222; color: #bada55;', useAuthStore.getState().authorized);
  console.log(
    '%cselectedEventId:',
    'background-color: #222; color: #bada55;',
    useCalendarStore.getState().selectedEventId
  );
  console.log('%cevents:', 'background-color: #222; color: #bada55;', useEventStore.getState().events);

  console.log('%c ****************************************************** ', 'background-color: #bada55; color: #222;');
};

export default debugStore;
