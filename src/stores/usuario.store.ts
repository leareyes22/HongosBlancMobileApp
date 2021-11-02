import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { makeAutoObservable } from 'mobx';
import { Alert } from 'react-native';
// eslint-disable-next-line no-unused-vars
import { CreateUsuarioDTO, emptyCreateUsuario } from '../models/create-usuario';
// eslint-disable-next-line no-unused-vars
import { EditUsuarioDTO } from '../models/edit-usuario';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
// eslint-disable-next-line no-unused-vars
import { UsuarioDTO } from '../models/usuario-list';
import API from '../util/api';

class UsuarioStore {
  usuario: UIWrapper<CreateUsuarioDTO> = initialUIWrapper(emptyCreateUsuario);
  usuariosList: UIWrapper<Array<UsuarioDTO>> = initialUIWrapper([]);

  constructor() {
    makeAutoObservable(this);
  }

  async registerUser(user: CreateUsuarioDTO) {
    this.setUsuarioWrapper(this.setLoading(this.usuario));
    try {
      const r = await API.post('/user', user);
      if (r.status === StatusCodes.OK) {
        this.getUsuariosListFromAPI();
        this.setUsuarioWrapper(this.unsetLoading(this.usuario));
      } else {
        this.setUsuarioWrapper(this.setError(this.usuario, r.status));
      }
    } catch (e) {
      this.setUsuarioWrapper(this.setError(this.usuario, e.response.status));
    }
  }

  async deleteUser(userId: number) {
    this.setUsuarioWrapper(this.setLoading(this.usuario));
    try {
      const r = await API.delete(`/user/${userId}`);
      if (r.status === StatusCodes.OK) {
        console.log(r.data);
        Alert.alert('Atención!', r.data, [
          {
            text: 'OK',
            style: 'default',
          },
        ]);
        this.getUsuariosListFromAPI();
        this.setUsuarioWrapper(this.unsetLoading(this.usuario));
      } else {
        this.setUsuarioWrapper(this.setError(this.usuario, r.status));
      }
    } catch (e) {
      Alert.alert('Error!', e.response.status, [
        {
          text: 'OK',
          style: 'default',
        },
      ]);
      this.setUsuarioWrapper(this.setError(this.usuario, e.response.status));
    }
  }

  async editUser(user: EditUsuarioDTO) {
    this.setUsuarioWrapper(this.setLoading(this.usuario));
    try {
      const r = await API.put(`/user/${user.id}`, user);
      if (r.status === StatusCodes.OK) {
        console.log(r.data);
        Alert.alert('Atención!', r.data, [
          {
            text: 'OK',
            style: 'default',
          },
        ]);
        this.getUsuariosListFromAPI();
        this.setUsuarioWrapper(this.unsetLoading(this.usuario));
      } else {
        this.setUsuarioWrapper(this.setError(this.usuario, r.status));
      }
    } catch (e) {
      Alert.alert('Error!', e.response.status, [
        {
          text: 'OK',
          style: 'default',
        },
      ]);
      this.setUsuarioWrapper(this.setError(this.usuario, e.response.status));
    }
  }

  async getUsuariosListFromAPI() {
    this.setUsuariosListWrapper(this.setLoading(this.usuariosList));
    try {
      const r = await API.get('/user/list');
      if (r.status === StatusCodes.OK) {
        this.setUsuariosList(r.data);
      } else {
        this.setUsuariosListWrapper(this.setError(this.usuariosList, r.status));
      }
    } catch (e) {
      this.setUsuariosListWrapper(
        this.setError(this.usuariosList, e.response.status),
      );
    }
  }

  setUsuario(user: CreateUsuarioDTO) {
    this.usuario = {
      data: user,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setUsuarioWrapper(wrapper: UIWrapper<CreateUsuarioDTO>) {
    this.usuario = wrapper;
  }

  setUsuariosList(usuariosList: Array<UsuarioDTO>) {
    this.usuariosList = {
      data: usuariosList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setUsuariosListWrapper(wrapper: UIWrapper<Array<UsuarioDTO>>) {
    this.usuariosList = wrapper;
  }

  setLoading(property: UIWrapper<any>) {
    return {
      ...property,
      loading: true,
      hasData: false,
      hasError: false,
      errorMessage: undefined,
      errorCode: undefined,
    };
  }

  unsetLoading(property: UIWrapper<any>) {
    return {
      ...property,
      loading: false,
      hasData: false,
      hasError: false,
      errorMessage: undefined,
      errorCode: undefined,
    };
  }

  setError(property: UIWrapper<any>, errorCode: number) {
    return {
      ...property,
      loading: false,
      hasError: true,
      errorCode: errorCode,
      errorMessage: getReasonPhrase(errorCode),
    };
  }
}

export default new UsuarioStore();
