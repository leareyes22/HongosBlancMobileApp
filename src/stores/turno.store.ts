import { getReasonPhrase, StatusCodes } from 'http-status-codes';
// eslint-disable-next-line no-unused-vars
import { action, makeAutoObservable } from 'mobx';
// eslint-disable-next-line no-unused-vars
import { TurnoDTO, emptyTurnoDTO, turnosOffline } from '../models/turno';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
import API from '../util/api';
import SessionStore from './session.store';

class TurnoStore {
  turno: UIWrapper<TurnoDTO> = initialUIWrapper(emptyTurnoDTO);
  turnosList: UIWrapper<Array<TurnoDTO>> = initialUIWrapper([]);

  constructor() {
    makeAutoObservable(this);
  }

  async getTurnosListFromAPI() {
    this.setTurnosListWrapper(this.setLoading(this.turnosList));
    if (SessionStore.isOnline) {
      try {
        const r = await API.get(`/turno/list`);
        if (r.status === StatusCodes.OK) {
          this.setTurnosList(r.data);
        } else {
          this.setTurnosListWrapper(this.setError(this.turnosList, r.status));
        }
      } catch (e) {
        this.setTurnosListWrapper(
          this.setError(this.turnosList, e.response.status),
        );
      }
    } else {
      try {
        this.setTurnosList(turnosOffline);
      } catch (e) {
        this.setTurnosListWrapper(
          this.setError(this.turnosList, e.response.status),
        );
      }
    }
  }

  async getTurnoFromAPI(id: number) {
    this.setTurnoWrapper(this.setLoading(this.turno));
    try {
      const r = await API.get(`/turno/${id}`);
      if (r.status === StatusCodes.OK) {
        this.setTurno(r.data);
      } else {
        this.setTurnoWrapper(this.setError(this.turno, r.status));
      }
    } catch (e) {
      this.setTurnoWrapper(this.setError(this.turno, e.response.status));
    }
  }

  setTurno(turno: TurnoDTO) {
    this.turno = {
      data: turno,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setTurnoWrapper(wrapper: UIWrapper<TurnoDTO>) {
    this.turno = wrapper;
  }

  setTurnosList(turnosList: Array<TurnoDTO>) {
    this.turnosList = {
      data: turnosList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setTurnosListWrapper(wrapper: UIWrapper<Array<TurnoDTO>>) {
    this.turnosList = wrapper;
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

export default new TurnoStore();
