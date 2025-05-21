import { useLoginStore, useResponseStore, useAuthStore } from './store';

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

  console.log('%c ****************************************************** ', 'background-color: #bada55; color: #222;');
};

export default debugStore;
