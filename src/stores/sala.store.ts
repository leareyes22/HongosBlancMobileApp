import { getReasonPhrase, StatusCodes } from 'http-status-codes';
// eslint-disable-next-line no-unused-vars
import { action, makeAutoObservable } from 'mobx';
// eslint-disable-next-line no-unused-vars
import { SalaDTO, emptySalaDTO } from '../models/sala';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
import API from '../util/api';

class SalaStore {
  sala: UIWrapper<SalaDTO> = initialUIWrapper(emptySalaDTO);
  salasList: UIWrapper<Array<SalaDTO>> = initialUIWrapper([]);

  constructor() {
    makeAutoObservable(this);
  }

  async getSalasListFromAPI() {
    this.setSalasListWrapper(this.setLoading(this.salasList));
    try {
      const r = await API.get(`/sala/list`);
      if (r.status === StatusCodes.OK) {
        this.setSalasList(r.data);
      } else {
        this.setSalasListWrapper(this.setError(this.salasList, r.status));
      }
    } catch (e) {
      this.setSalasListWrapper(
        this.setError(this.salasList, e.response.status),
      );
    }
  }

  async getSalaFromAPI(id: number) {
    this.setSalaWrapper(this.setLoading(this.sala));
    try {
      const r = await API.get(`/sala/${id}`);
      if (r.status === StatusCodes.OK) {
        this.setSala(r.data);
      } else {
        this.setSalaWrapper(this.setError(this.sala, r.status));
      }
    } catch (e) {
      this.setSalaWrapper(this.setError(this.sala, e.response.status));
    }
  }

  setSala(sala: SalaDTO) {
    this.sala = {
      data: sala,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setSalaWrapper(wrapper: UIWrapper<SalaDTO>) {
    this.sala = wrapper;
  }

  setSalasList(salasList: Array<SalaDTO>) {
    this.salasList = {
      data: salasList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setSalasListWrapper(wrapper: UIWrapper<Array<SalaDTO>>) {
    this.salasList = wrapper;
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

export default new SalaStore();
