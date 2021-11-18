import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { makeAutoObservable } from 'mobx';
import { addControl, getDBConnection } from '../database/database';
// eslint-disable-next-line no-unused-vars
import CreateControlDTO, {
  // eslint-disable-next-line no-unused-vars
  ControlFilterCriteria,
  emptyCreateControlDTO,
  // eslint-disable-next-line no-unused-vars
  ListControlDTO,
} from '../models/control';
// eslint-disable-next-line no-unused-vars
import TemperaturaCamaDTO from '../models/temperatura-cama';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
import API from '../util/api';
import SessionStore from './session.store';

class ControlStore {
  control: UIWrapper<CreateControlDTO> = initialUIWrapper(
    emptyCreateControlDTO,
  );
  controlImage: string = '';
  controlImages: Array<any> = [];
  controlList: UIWrapper<Array<ListControlDTO>> = initialUIWrapper([]);

  //Filter criteria
  controlListFilterCriteria: ControlFilterCriteria = {};

  constructor() {
    makeAutoObservable(this);
  }

  async createControl(control: CreateControlDTO) {
    this.setControlWrapper(this.setLoading(this.control));
    if (SessionStore.isOnline) {
      try {
        const r = await API.post(`/control`, control);
        if (r.status === StatusCodes.OK) {
          this.uploadControlImages(r.data.id_control);
        } else {
          this.setControlWrapper(this.setError(this.control, r.status));
        }
      } catch (e) {
        this.setControlWrapper(this.setError(this.control, e.response.status));
      }
    } else {
      try {
        const db = await getDBConnection();
        addControl(db, control, this.controlImages);
        this.setControlWrapper(this.unsetLoading(this.control));
      } catch (e) {
        this.setControlWrapper(this.setError(this.control, e.response.status));
      }
    }
  }

  async uploadControlImages(controlId: number) {
    this.setControlWrapper(this.setLoading(this.control));
    this.controlImages.forEach(async (item: any) => {
      let data = new FormData();
      data.append('image', item);
      try {
        const r = await API.post(`/control/image/${controlId}`, data);
        if (r.status === StatusCodes.OK) {
          this.setControlWrapper(this.unsetLoading(this.control));
        } else {
          this.setControlWrapper(this.setError(this.control, r.status));
        }
      } catch (e) {
        this.setControlWrapper(this.setError(this.control, e.response.status));
      }
    });
    this.setControlImages([]);
  }

  setControlImages(controlImages: Array<string>) {
    this.controlImages = controlImages;
  }

  async getControlImage(id: number) {
    this.setControlWrapper(this.setLoading(this.control));
    try {
      const r = await API.get(`/control/image/${id}`);
      if (r.status === StatusCodes.OK) {
        this.setControlImage(r.data);
      } else {
        this.setControlWrapper(this.setError(this.control, r.status));
      }
    } catch (e) {
      this.setControlWrapper(this.setError(this.control, e.response.status));
    }
  }

  async getControlImages(controlId: number) {
    this.setControlWrapper(this.setLoading(this.control));
    try {
      const r = await API.get(`/control/images/${controlId}`);
      if (r.status === StatusCodes.OK) {
        return r.data;
      } else {
        this.setControlWrapper(this.setError(this.control, r.status));
      }
    } catch (e) {
      this.setControlWrapper(this.setError(this.control, e.response.status));
    }
  }

  async getControlTemperaturas(controlId: number) {
    this.setControlWrapper(this.setLoading(this.control));
    try {
      const r = await API.get(`/control/temperaturas/${controlId}`);
      if (r.status === StatusCodes.OK) {
        return r.data;
      } else {
        this.setControlWrapper(this.setError(this.control, r.status));
      }
    } catch (e) {
      this.setControlWrapper(this.setError(this.control, e.response.status));
    }
  }

  async getControlListFromAPI() {
    this.setControlListWrapper(this.setLoading(this.controlList));
    try {
      const r = await API.get(`/control/list`, {
        params: {
          ...this.controlListFilterCriteria,
        },
      });
      if (r.status === StatusCodes.OK) {
        this.setControlList(r.data);
      } else {
        this.setControlListWrapper(this.setError(this.controlList, r.status));
      }
    } catch (e) {
      this.setControlListWrapper(
        this.setError(this.controlList, e.response.status),
      );
    }
  }

  pushControlImage(data: any, nroCamaActual: number) {
    this.controlImages.push({
      uri: data.uri,
      name: 'picture-cama-' + nroCamaActual + '.jpg',
      type: 'image/jpg',
    });
    this.controlImage = data.uri;
  }

  setControlImage(imageUri: string) {
    this.controlImage = imageUri;
  }

  setControl(control: CreateControlDTO) {
    this.control = {
      data: control,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setControlWrapper(wrapper: UIWrapper<CreateControlDTO>) {
    this.control = wrapper;
  }

  setControlList(controlList: Array<ListControlDTO>) {
    this.controlList = {
      data: controlList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setControlListWrapper(wrapper: UIWrapper<Array<ListControlDTO>>) {
    this.controlList = wrapper;
  }

  setPersonal(idPersonal: number) {
    this.control.data.id_personal = idPersonal;
  }

  setSala(idSala: number) {
    this.control.data.id_sala = idSala;
  }

  setTurno(idTurno: number) {
    this.control.data.id_turno = idTurno;
  }

  setTempAire(tempAire: number) {
    this.control.data.temperatura_aire = tempAire;
  }

  setHumRelativa(humRelativa: number) {
    this.control.data.humedad_relativa = humRelativa;
  }

  setPorcentajeCO2(porcentajeCO2: number) {
    this.control.data.co2 = porcentajeCO2;
  }

  setObservaciones(observaciones: string) {
    this.control.data.observaciones = observaciones;
  }

  setTemperaturas(temperaturas: Array<TemperaturaCamaDTO>) {
    this.control.data.temperaturas = temperaturas;
  }

  setControlListFilterCriteria(filterCriteria: ControlFilterCriteria) {
    this.controlListFilterCriteria = filterCriteria;
    this.getControlListFromAPI();
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

export default new ControlStore();
