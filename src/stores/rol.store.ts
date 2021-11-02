import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line no-unused-vars
import RolDTO from '../models/rol';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
import API from '../util/api';

class RolStore {
  rol: UIWrapper<RolDTO> = initialUIWrapper({
    id: -1,
    nombre: '',
    descripcion: '',
  });
  rolesList: UIWrapper<Array<RolDTO>> = initialUIWrapper([]);

  constructor() {
    makeAutoObservable(this);
  }

  async getRolFromAPI(id_rol: number) {
    this.setRolWrapper(this.setLoading(this.rolesList));
    try {
      const r = await API.get(`/rol/${id_rol}`);
      if (r.status === StatusCodes.OK) {
        this.setRol(r.data);
      } else {
        this.setRolWrapper(this.setError(this.rolesList, r.status));
      }
    } catch (e) {
      this.setRolWrapper(this.setError(this.rol, e.response.status));
    }
  }

  async getRolesListFromAPI() {
    this.setRolesListWrapper(this.setLoading(this.rolesList));
    try {
      const r = await API.get('/rol/list');
      if (r.status === StatusCodes.OK) {
        this.setRolesList(r.data);
      } else {
        this.setRolesListWrapper(this.setError(this.rolesList, r.status));
      }
    } catch (e) {
      this.setRolesListWrapper(
        this.setError(this.rolesList, e.response.status),
      );
    }
  }

  setRol(rol: RolDTO) {
    this.rol = {
      data: rol,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setRolWrapper(wrapper: UIWrapper<RolDTO>) {
    this.rol = wrapper;
  }

  setRolesList(rolesList: Array<RolDTO>) {
    this.rolesList = {
      data: rolesList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setRolesListWrapper(wrapper: UIWrapper<Array<RolDTO>>) {
    this.rolesList = wrapper;
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

export default new RolStore();
