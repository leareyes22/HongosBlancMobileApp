import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SessionStore {
  username: string = '';
  user_id: number = -1;
  role: string = '';
  isLoggedIn: boolean = false;
  loading: boolean = false;
  loginError: boolean = false;
  loginErrorCode: number = -1;

  //variable offline para ver si está o no conectado y subir los datos al servidor.
  isOnline = false;

  constructor() {
    makeAutoObservable(this);
    /*const admin = AsyncStorage.getItem('admin');
    if (admin !== null) {
      this.isLoggedIn = true;
    }*/
  }

  setAuthenticationInfo(info: any) {
    AsyncStorage.setItem('user_id', info.user_id.toString());
    AsyncStorage.setItem('token', info.token);
    AsyncStorage.setItem('username', info.username);
    AsyncStorage.setItem('role', info.role);
    this.username = info.username;
    this.user_id = info.user_id;
    this.role = info.role;
    if (this.username !== null && this.user_id !== -1 && this.role !== null) {
      this.isLoggedIn = true;
    }
    this.loginError = false;
  }

  setError(errorCode: number) {
    this.loginError = true;
    this.loginErrorCode = errorCode;
  }

  setIsOnline(isOnline: boolean) {
    this.isOnline = isOnline;
  }

  getToken() {
    return AsyncStorage.getItem('token');
  }

  setLoggedIn(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
  }

  logout() {
    this.username = '';
    this.user_id = -1;
    this.role = '';
    this.isLoggedIn = false;
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('username');
    AsyncStorage.removeItem('user_id');
    AsyncStorage.removeItem('role');
  }
}

export default new SessionStore();
