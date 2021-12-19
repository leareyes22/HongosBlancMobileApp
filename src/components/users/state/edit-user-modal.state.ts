import { emptyEditUsuario } from '../../../models/edit-usuario';
import UsuarioStore from '../../../stores/usuario.store';

const createLocalObservable = () => ({
  usuario: emptyEditUsuario,

  usernameRequiredError: false,

  passwordRequiredError: false,

  emailRequiredError: false,

  nombreRequiredError: false,

  apellidoRequiredError: false,

  rolRequiredError: false,

  init(user: any) {
    this.setUserId(user.id);
    this.setUsername(user.username);
    this.setIdRol(user.id_rol);
    this.setEmail(user.email);
    this.setNombre(user.nombre);
    this.setApellido(user.apellido);
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
  setEmail(email: string) {
    this.usuario.email = email;
  },
  setNombre(nombre: string) {
    this.usuario.nombre = nombre;
  },
  setApellido(apellido: string) {
    this.usuario.apellido = apellido;
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
    if (this.usuario.email === '') {
      this.setEmailRequiredError(true);
    }
    if (this.usuario.nombre === '') {
      this.setNombreRequiredError(true);
    }
    if (this.usuario.apellido === '') {
      this.setApellidoRequiredError(true);
    }
    if (this.usuario.id_rol === -1) {
      this.setRolRequiredError(true);
    }
  },
  setUsernameRequiredError(hasError: boolean) {
    this.usernameRequiredError = hasError;
  },
  setEmailRequiredError(hasError: boolean) {
    this.emailRequiredError = hasError;
  },
  setNombreRequiredError(hasError: boolean) {
    this.nombreRequiredError = hasError;
  },
  setApellidoRequiredError(hasError: boolean) {
    this.apellidoRequiredError = hasError;
  },
  setPasswordRequiredError(hasError: boolean) {
    this.passwordRequiredError = hasError;
  },
  setRolRequiredError(hasError: boolean) {
    this.rolRequiredError = hasError;
  },
  resetErrors() {
    this.setRolRequiredError(false);
    this.setPasswordRequiredError(false);
    this.setUsernameRequiredError(false);
    this.setEmailRequiredError(false);
    this.setNombreRequiredError(false);
    this.setApellidoRequiredError(false);
  },
});

export default createLocalObservable;
