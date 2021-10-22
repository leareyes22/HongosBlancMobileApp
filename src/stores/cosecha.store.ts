import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { makeAutoObservable } from 'mobx';
import { addCosecha, getDBConnection } from '../database/database';
// eslint-disable-next-line no-unused-vars
import CreateCosechaDTO, { emptyCreateCosechaDTO } from '../models/cosecha';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
import API from '../util/api';
import SessionStore from './session.store';

class CosechaStore {
  cosecha: UIWrapper<CreateCosechaDTO> = initialUIWrapper(
    emptyCreateCosechaDTO,
  );
  cosechaList: UIWrapper<Array<CreateCosechaDTO>> = initialUIWrapper([]);

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

  setCosechaList(cosechaList: Array<CreateCosechaDTO>) {
    this.cosechaList = {
      data: cosechaList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setCosechaListWrapper(wrapper: UIWrapper<Array<CreateCosechaDTO>>) {
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
