import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { makeAutoObservable } from 'mobx';
import { emptyCreateTareaDTO } from '../models/tarea';
//import { adtTarea, getDBConnection } from '../database/database';
// eslint-disable-next-line no-unused-vars
import { CreateTareaDTO } from '../models/tarea';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
import API from '../util/api';

class TareaStore {
  tarea: UIWrapper<CreateTareaDTO> = initialUIWrapper(emptyCreateTareaDTO);
  tareaList: UIWrapper<Array<CreateTareaDTO>> = initialUIWrapper([]);

  //Filter criteria
  //tareaListFilterCriteria:tTareaFilterCriteria = {};

  constructor() {
    makeAutoObservable(this);
  }

  async createTarea(tarea: CreateTareaDTO) {
    this.setTareaWrapper(this.setLoading(this.tarea));
    try {
      const r = await API.post(`/tarea`, tarea);
      if (r.status === StatusCodes.OK) {
        this.setTareaWrapper(this.unsetLoading(this.tarea));
      } else {
        this.setTareaWrapper(this.setError(this.tarea, r.status));
      }
    } catch (e) {
      this.setTareaWrapper(this.setError(this.tarea, e.response.status));
    }
  }

  /*async getTareaListFromAPI() {
    this.setTareaListWrapper(this.setLoading(thistTareaList));
    try {
      const r = await API.get(`tTarea/list`, {
        params: {
          ...thisTareaListFilterCriteria,
        },
      });
      if (r.status === StatusCodes.OK) {
        this.setTareaList(r.data);
      } else {
        this.setTareaListWrapper(this.setError(thistTareaList, r.status));
      }
    } catch (e) {
      this.setTareaListWrapper(
        this.setError(thistTareaList, e.response.status),
      );
    }
  }*/

  setTarea(tarea: CreateTareaDTO) {
    this.tarea = {
      data: tarea,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setTareaWrapper(wrapper: UIWrapper<CreateTareaDTO>) {
    this.tarea = wrapper;
  }

  /*setTareaListtTareaList: Array<CreateTareaDTO>) {
    thistTareaList = {
      data:tTareaList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setTareaListWrapper(wrapper: UIWrapper<Array<CreattTareaDTO>>) {
    thistTareaList = wrapper;
  }

  setTareaListFilterCriteria(filterCriteria:tTareaFilterCriteria) {
    thistTareaListFilterCriteria = filterCriteria;
    this.getTareaListFromAPI();
  }*/

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

export default new TareaStore();
