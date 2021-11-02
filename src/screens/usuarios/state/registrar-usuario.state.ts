import {
  // eslint-disable-next-line no-unused-vars
  CreateUsuarioDTO,
  emptyCreateUsuario,
} from '../../../models/create-usuario';
// eslint-disable-next-line no-unused-vars
import RolDTO from '../../../models/rol';
import UsuarioStore from '../../../stores/usuario.store';
import RolStore from '../../../stores/rol.store';

const createLocalObservable = () => ({
  usuario: emptyCreateUsuario,

  repeatPassword: '',

  submitted: false,

  matchError: false,

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
  handleRolSelect(itemValue: any) {
    this.setIdRol(itemValue);
    RolStore.getRolFromAPI(itemValue);
  },
  setIdRol(id_rol: number) {
    this.usuario.id_rol = id_rol;
  },
  submitHandler() {
    this.setSubmitted(true);
    if (this.repeatPassword === this.usuario.password) {
      UsuarioStore.registerUser(this.usuario);
      this.setMatchError(false);
      this.setSuccess(true);
      setTimeout(() => {
        this.setSubmitted(false);
      }, 5000);
      this.setRepeatPassword('');
      this.setUsuario(emptyCreateUsuario);
    } else {
      this.setMatchError(true);
    }
  },
  setSuccess(success: boolean) {
    this.success = success;
  },
  setSubmitted(submitted: boolean) {
    this.submitted = submitted;
  },
  setMatchError(matchError: boolean) {
    this.matchError = matchError;
  },
  setUsuario(user: CreateUsuarioDTO) {
    this.usuario = user;
  },
});

export default createLocalObservable;
