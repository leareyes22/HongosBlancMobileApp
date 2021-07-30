import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SessionStore {
  admin: boolean = false;

  isLoggedIn: boolean = false;
  loading: boolean = false;
  loginError: boolean = false;
  loginErrorCode: number = -1;

  constructor() {
    makeAutoObservable(this);
    /*const admin = AsyncStorage.getItem('admin');
    if (admin !== null) {
      this.isLoggedIn = true;
    }*/
  }

  setAuthenticationInfo(info: any) {
    AsyncStorage.setItem('token', info.token);
    AsyncStorage.setItem('admin', info.admin);
    this.admin = info.admin;
    if (this.admin !== null) {
      this.isLoggedIn = true;
    }
    this.loginError = false;
  }

  setError(errorCode: number) {
    this.loginError = true;
    this.loginErrorCode = errorCode;
  }

  getToken() {
    return AsyncStorage.getItem('token');
  }

  logout() {
    //this.user = emptyUser;
    this.admin = false;
    this.isLoggedIn = false;
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('admin');
  }
}

export default new SessionStore();
