import { emptyUsuario } from '../../../models/usuario';
import LoginStore from '../../../stores/login.store';

const createLocalObservable = () => ({
  usuario: emptyUsuario,

  usernameRequiredError: false,

  passwordRequiredError: false,

  setUsername(username: string) {
    this.usuario.username = username;
  },
  setPassword(password: string) {
    this.usuario.password = password;
  },
  loginHandler() {
    if (this.usuario.username !== '' && this.usuario.password !== '') {
      LoginStore.login(this.usuario);
    }
    if (this.usuario.username === '') {
      this.setUsernameRequiredError(true);
    }
    if (this.usuario.password === '') {
      this.setPasswordRequiredError(true);
    }
  },
  setUsernameRequiredError(hasError: boolean) {
    this.usernameRequiredError = hasError;
  },
  setPasswordRequiredError(hasError: boolean) {
    this.passwordRequiredError = hasError;
  },
});

export default createLocalObservable;
