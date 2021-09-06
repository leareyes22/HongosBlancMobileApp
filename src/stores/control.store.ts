import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line no-unused-vars
import CreateControlDTO, { emptyCreateControlDTO } from '../models/control';
// eslint-disable-next-line no-unused-vars
import TemperaturaCamaDTO from '../models/temperatura-cama';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
import API from '../util/api';

class ControlStore {
  control: UIWrapper<CreateControlDTO> = initialUIWrapper(
    emptyCreateControlDTO,
  );
  controlList: UIWrapper<Array<CreateControlDTO>> = initialUIWrapper([]);

  constructor() {
    makeAutoObservable(this);
  }

  async createControl(control: CreateControlDTO) {
    this.setControlWrapper(this.setLoading(this.control));
    console.log(control);
    try {
      const r = await API.post(`/control`, control);
      if (r.status === StatusCodes.OK) {
        this.setControl(control);
      } else {
        this.setControlWrapper(this.setError(this.control, r.status));
      }
    } catch (e) {
      this.setControlWrapper(this.setError(this.control, e.response.status));
    }
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

  setControlList(controlList: Array<CreateControlDTO>) {
    this.controlList = {
      data: controlList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setControlListWrapper(wrapper: UIWrapper<Array<CreateControlDTO>>) {
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

export default new ControlStore();
