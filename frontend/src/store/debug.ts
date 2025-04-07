import { useAuthStore, useResponseStore } from './store';

const debugStore = () => {
  console.log('%c ******************** debugStore() ******************** ', 'background-color: #bada55; color: #222;');

  console.log('%clogin:', 'background-color: #222; color: #bada55;', useAuthStore.getState().login);
  console.log('%cloginResponse:', 'background-color: #222; color: #bada55;', useResponseStore.getState().loginResponse);

  console.log('%c ****************************************************** ', 'background-color: #bada55; color: #222;');
};

export default debugStore;
