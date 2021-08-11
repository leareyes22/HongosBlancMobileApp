import { StatusCodes } from 'http-status-codes';
import { makeAutoObservable } from 'mobx';
import API from '../util/api';
import SessionStore from '../stores/session.store';
// eslint-disable-next-line no-unused-vars
import { Usuario } from '../models/usuario';

class LoginStore {
  constructor() {
    makeAutoObservable(this);
  }

  async login(usuario: Usuario) {
    try {
      const r = await API.post('/authentication/login', usuario);
      if (r.status === StatusCodes.OK) {
        SessionStore.setAuthenticationInfo(r.data);
      } else {
        SessionStore.setError(r.status);
      }
    } catch (e) {
      SessionStore.setError(e.response.status);
    }
  }
}

export default new LoginStore();
