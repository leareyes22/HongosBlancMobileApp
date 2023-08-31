import {
  // eslint-disable-next-line no-unused-vars
  CreateUsuarioDTO,
  emptyCreateUsuario,
} from '../../../models/create-usuario';
import UsuarioStore from '../../../stores/usuario.store';
import RolStore from '../../../stores/rol.store';

const createLocalObservable = () => ({
  usuario: emptyCreateUsuario,

  repeatPassword: '',

  submitted: false,

  matchError: false,

  emptyPasswordError: false,

  emptyRepeatPasswordError: false,

  usernameError: false,

  emailError: false,

  rolError: false,

  nombreError: false,

  apellidoError: false,

  success: true,

  setUsername(username: string) {
    this.usuario.username = username;
  },
  setPassword(password: string) {
    this.usuario.password = password;
  },
  setRepeatPassword(repeatPassword: string) {
    this.repeatPassword = repeatPassword;
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
  handleRolSelect(itemValue: any) {
    this.setIdRol(itemValue);
    RolStore.getRolFromAPI(itemValue);
  },
  setIdRol(id_rol: number) {
    this.usuario.id_rol = id_rol;
  },
  submitHandler() {
    this.resetErrors();
    if (this.usuario.username === '') {
      this.setUsernameError(true);
      return;
    } else if (this.usuario.nombre === '') {
      this.setNombreError(true);
      return;
    } else if (this.usuario.apellido === '') {
      this.setApellidoError(true);
      return;
    } else if (this.usuario.email === '') {
      this.setEmailError(true);
      return;
    } else if (this.usuario.password === '') {
      this.setEmptyPasswordError(true);
      return;
    } else if (this.repeatPassword !== this.usuario.password) {
      this.setMatchError(true);
      return;
    } else if (this.usuario.id_rol === -1) {
      this.setRolError(true);
      return;
    }
    UsuarioStore.registerUser(this.usuario);
    this.setSubmitted(true);
    setTimeout(() => {
      this.setSubmitted(false);
    }, 5000);
    this.setRepeatPassword('');
    this.setUsuario(emptyCreateUsuario);
  },
  setSuccess(success: boolean) {
    this.success = success;
  },
  setUsernameError(error: boolean) {
    this.usernameError = error;
  },
  setNombreError(error: boolean) {
    this.nombreError = error;
  },
  setApellidoError(error: boolean) {
    this.apellidoError = error;
  },
  setEmailError(error: boolean) {
    this.emailError = error;
  },
  setSubmitted(submitted: boolean) {
    this.submitted = submitted;
  },
  setMatchError(matchError: boolean) {
    this.matchError = matchError;
  },
  setEmptyPasswordError(error: boolean) {
    this.emptyPasswordError = error;
  },
  setEmptyRepeatPasswordError(error: boolean) {
    this.emptyRepeatPasswordError = error;
  },
  setRolError(error: boolean) {
    this.rolError = error;
  },
  setUsuario(user: CreateUsuarioDTO) {
    this.usuario = user;
  },
  resetErrors() {
    this.setUsernameError(false);
    this.setNombreError(false);
    this.setApellidoError(false);
    this.setEmailError(false);
    this.setMatchError(false);
    this.setEmptyPasswordError(false);
    this.setEmptyRepeatPasswordError(false);
    this.setRolError(false);
  },
});

export default createLocalObservable;
