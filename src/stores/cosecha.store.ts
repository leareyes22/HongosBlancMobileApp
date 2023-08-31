import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { makeAutoObservable } from 'mobx';
import { addCosecha, getDBConnection } from '../database/database';
// eslint-disable-next-line no-unused-vars
import CreateCosechaDTO, {
  // eslint-disable-next-line no-unused-vars
  CosechaFilterCriteria,
  emptyCreateCosechaDTO,
  // eslint-disable-next-line no-unused-vars
  ListCosechaDTO,
} from '../models/cosecha';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
import API from '../util/api';
import SessionStore from './session.store';

class CosechaStore {
  cosecha: UIWrapper<CreateCosechaDTO> = initialUIWrapper(
    emptyCreateCosechaDTO,
  );
  cosechaList: UIWrapper<Array<ListCosechaDTO>> = initialUIWrapper([]);

  //Filter criteria
  cosechaListFilterCriteria: CosechaFilterCriteria = {};

  constructor() {
    makeAutoObservable(this);
  }

  async createCosecha(cosecha: CreateCosechaDTO) {
    this.setCosechaWrapper(this.setLoading(this.cosecha));
    if (SessionStore.isOnline) {
      try {
        const r = await API.post(`/cosecha`, cosecha);
        if (r.status === StatusCodes.OK) {
          this.setCosechaWrapper(this.unsetLoading(this.cosecha));
        } else {
          this.setCosechaWrapper(this.setError(this.cosecha, r.status));
        }
      } catch (e) {
        this.setCosechaWrapper(this.setError(this.cosecha, e.response.status));
      }
    } else {
      try {
        const db = await getDBConnection();
        addCosecha(db, cosecha);
        this.setCosechaWrapper(this.unsetLoading(this.cosecha));
      } catch (e) {
        this.setCosechaWrapper(this.setError(this.cosecha, e.response.status));
      }
    }
  }

  async getCosechaListFromAPI() {
    this.setCosechaListWrapper(this.setLoading(this.cosechaList));
    try {
      const r = await API.get(`/cosecha/list`, {
        params: {
          ...this.cosechaListFilterCriteria,
        },
      });
      if (r.status === StatusCodes.OK) {
        this.setCosechaList(r.data);
      } else {
        this.setCosechaListWrapper(this.setError(this.cosechaList, r.status));
      }
    } catch (e) {
      this.setCosechaListWrapper(
        this.setError(this.cosechaList, e.response.status),
      );
    }
  }

  setCosecha(cosecha: CreateCosechaDTO) {
    this.cosecha = {
      data: cosecha,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setCosechaWrapper(wrapper: UIWrapper<CreateCosechaDTO>) {
    this.cosecha = wrapper;
  }

  setCosechaList(cosechaList: Array<ListCosechaDTO>) {
    this.cosechaList = {
      data: cosechaList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setCosechaListWrapper(wrapper: UIWrapper<Array<ListCosechaDTO>>) {
    this.cosechaList = wrapper;
  }

  setPersonal(idPersonal: number) {
    this.cosecha.data.id_personal = idPersonal;
  }

  setSala(idSala: number) {
    this.cosecha.data.id_sala = idSala;
  }

  setTurno(idTurno: number) {
    this.cosecha.data.id_turno = idTurno;
  }

  setObservaciones(observaciones: string) {
    this.cosecha.data.observaciones = observaciones;
  }

  setKgCosechados(kgCosechados: number) {
    this.cosecha.data.kg_cosechados = kgCosechados;
  }

  setProducto(producto: number) {
    this.cosecha.data.id_producto = producto;
  }

  setCosechaListFilterCriteria(filterCriteria: CosechaFilterCriteria) {
    this.cosechaListFilterCriteria = filterCriteria;
    this.getCosechaListFromAPI();
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

export default new CosechaStore();
