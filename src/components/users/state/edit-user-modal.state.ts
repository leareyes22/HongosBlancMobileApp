import { emptyEditUsuario } from '../../../models/edit-usuario';
import UsuarioStore from '../../../stores/usuario.store';

const createLocalObservable = () => ({
  usuario: emptyEditUsuario,

  usernameRequiredError: false,

  passwordRequiredError: false,

  rolRequiredError: false,

  init(user: any) {
    this.setUserId(user.id);
    this.setUsername(user.username);
    this.setIdRol(user.id_rol);
  },
  setUserId(userId: number) {
    this.usuario.id = userId;
  },
  setUsername(username: string) {
    this.usuario.username = username;
  },
  setPassword(password: string) {
    this.usuario.password = password;
  },
  setIdRol(id_rol: number) {
    this.usuario.id_rol = id_rol;
  },
  editHandler() {
    if (
      this.usuario.username !== '' &&
      this.usuario.password !== '' &&
      this.usuario.id_rol !== -1
    ) {
      UsuarioStore.editUser(this.usuario);
      this.resetErrors();
    }
    if (this.usuario.username === '') {
      this.setUsernameRequiredError(true);
    }
    if (this.usuario.password === '') {
      this.setPasswordRequiredError(true);
    }
    if (this.usuario.id_rol === -1) {
      this.setRolRequiredError(true);
    }
  },
  setUsernameRequiredError(hasError: boolean) {
    this.usernameRequiredError = hasError;
  },
  setPasswordRequiredError(hasError: boolean) {
    this.passwordRequiredError = hasError;
  },
  setRolRequiredError(hasError: boolean) {
    this.rolRequiredError = hasError;
  },
  resetErrors() {
    this.rolRequiredError = false;
    this.passwordRequiredError = false;
    this.usernameRequiredError = false;
  },
});

export default createLocalObservable;
