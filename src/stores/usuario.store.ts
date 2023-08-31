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
import { emptyUsuario, UsuarioDTO } from '../models/usuario-list';
import API from '../util/api';

class UsuarioStore {
  usuario: UIWrapper<CreateUsuarioDTO> = initialUIWrapper(emptyCreateUsuario);
  usuariosList: UIWrapper<Array<UsuarioDTO>> = initialUIWrapper([]);

  usuarioFinded: UIWrapper<UsuarioDTO> = initialUIWrapper(emptyUsuario);
  userImage: UIWrapper<any> = initialUIWrapper({} as any);

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

  async uploadUserImage(image: any, id_personal: number) {
    this.setUserImageWrapper(this.setLoading(this.userImage));
    try {
      const r = await API.post(`/user/image/${id_personal}`, image);
      if (r.status === StatusCodes.OK) {
        this.getUserImage(id_personal);
        this.setUserImageWrapper(this.unsetLoading(this.userImage));
      } else {
        this.setUserImageWrapper(this.setError(this.userImage, r.status));
      }
    } catch (e) {
      this.setUserImageWrapper(
        this.setError(this.userImage, e.response.status),
      );
    }
  }

  async getUsuario(id_personal: number) {
    this.setUsuarioFindedWrapper(this.setLoading(this.usuarioFinded));
    try {
      const r = await API.get(`/user/${id_personal}`);
      if (r.status === StatusCodes.OK) {
        this.setUsuarioFinded(r.data);
      } else {
        this.setUsuarioFindedWrapper(
          this.setError(this.usuarioFinded, r.status),
        );
      }
    } catch (e) {
      this.setUsuarioFindedWrapper(
        this.setError(this.usuarioFinded, e.response.status),
      );
    }
  }

  async getUserImage(id_personal: number) {
    this.setUserImageWrapper(this.setLoading(this.userImage));
    try {
      const r = await API.get(`/user/image/${id_personal}`);
      if (r.status === StatusCodes.OK) {
        this.setUserImage(r.data);
      } else {
        this.setUserImageWrapper(this.setError(this.userImage, r.status));
      }
    } catch (e) {
      this.setUserImageWrapper(
        this.setError(this.userImage, e.response.status),
      );
    }
  }

  async deleteUser(userId: number) {
    this.setUsuarioWrapper(this.setLoading(this.usuario));
    try {
      const r = await API.delete(`/user/${userId}`);
      if (r.status === StatusCodes.OK) {
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
      const r = await API.get('/users/list');
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

  async getEmpleadosListFromAPI() {
    this.setUsuariosListWrapper(this.setLoading(this.usuariosList));
    try {
      const r = await API.get('/empleado/list');
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

  setUsuarioFinded(user: UsuarioDTO) {
    this.usuarioFinded = {
      data: user,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setUsuarioFindedWrapper(wrapper: UIWrapper<UsuarioDTO>) {
    this.usuarioFinded = wrapper;
  }

  setUserImage(userImage: any) {
    this.userImage = {
      data: userImage,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setUserImageWrapper(wrapper: UIWrapper<any>) {
    this.userImage = wrapper;
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
