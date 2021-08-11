import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SessionStore {
  username: string = '';
  role: string = '';
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
    AsyncStorage.setItem('username', info.username);
    AsyncStorage.setItem('role', info.role);
    this.username = info.username;
    this.role = info.role;
    if (this.username !== null && this.role !== null) {
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

  setLoggedIn(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
  }

  logout() {
    this.username = '';
    this.role = '';
    this.isLoggedIn = false;
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('username');
    AsyncStorage.removeItem('role');
  }
}

export default new SessionStore();
