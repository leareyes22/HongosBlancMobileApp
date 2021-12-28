import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { makeAutoObservable } from 'mobx';
import { Alert } from 'react-native';
import { emptyCreateTareaDTO } from '../models/tarea';
//import { adtTarea, getDBConnection } from '../database/database';
// eslint-disable-next-line no-unused-vars
import { CreateTareaDTO } from '../models/tarea';
// eslint-disable-next-line no-unused-vars
import TareaDTO from '../models/tarea-list';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
import API from '../util/api';

class TareaStore {
  tarea: UIWrapper<CreateTareaDTO> = initialUIWrapper(emptyCreateTareaDTO);
  //Tareas empleado
  tareasDiariasEmpleadoList: UIWrapper<Array<TareaDTO>> = initialUIWrapper([]);
  tareasSemanalesEmpleadoList: UIWrapper<Array<TareaDTO>> = initialUIWrapper(
    [],
  );
  //Tareas jefe o admin
  tareasDiariasJefeList: UIWrapper<Array<TareaDTO>> = initialUIWrapper([]);
  tareasSemanalesJefeList: UIWrapper<Array<TareaDTO>> = initialUIWrapper([]);

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

  async getTareasDiariasEmpleadoListFromAPI(
    fecha: Date,
    id_personal_asignado: number,
  ) {
    this.setTareasDiariasEmpleadoListWrapper(
      this.setLoading(this.tareasDiariasEmpleadoList),
    );
    try {
      const r = await API.get(`/tareas_dia_empleado/list`, {
        params: {
          fecha: fecha,
          personal: id_personal_asignado,
        },
      });
      if (r.status === StatusCodes.OK) {
        this.setTareasDiariasEmpleadoList(r.data);
      } else {
        this.setTareasDiariasEmpleadoListWrapper(
          this.setError(this.tareasDiariasEmpleadoList, r.status),
        );
      }
    } catch (e) {
      this.setTareasDiariasEmpleadoListWrapper(
        this.setError(this.tareasDiariasEmpleadoList, e.response.status),
      );
    }
  }

  async getTareasSemanalesEmpleadoListFromAPI(
    fecha: Date,
    id_personal_asignado: number,
  ) {
    this.setTareasSemanalesEmpleadoListWrapper(
      this.setLoading(this.tareasSemanalesEmpleadoList),
    );
    try {
      const r = await API.get(`/tareas_semana_empleado/list`, {
        params: {
          fecha: fecha,
          personal: id_personal_asignado,
        },
      });
      if (r.status === StatusCodes.OK) {
        this.setTareasSemanalesEmpleadoList(r.data);
      } else {
        this.setTareasSemanalesEmpleadoListWrapper(
          this.setError(this.tareasSemanalesEmpleadoList, r.status),
        );
      }
    } catch (e) {
      this.setTareasSemanalesEmpleadoListWrapper(
        this.setError(this.tareasSemanalesEmpleadoList, e.response.status),
      );
    }
  }

  async getTareasDiariasJefeListFromAPI(
    fecha: Date,
    id_personal_asignado: number,
  ) {
    this.setTareasDiariasJefeListWrapper(
      this.setLoading(this.tareasDiariasJefeList),
    );
    try {
      const r = await API.get(`/tareas_dia_jefe/list`, {
        params: {
          fecha: fecha,
          personal: id_personal_asignado,
        },
      });
      if (r.status === StatusCodes.OK) {
        this.setTareasDiariasJefeList(r.data);
      } else {
        this.setTareasDiariasJefeListWrapper(
          this.setError(this.tareasDiariasJefeList, r.status),
        );
      }
    } catch (e) {
      this.setTareasDiariasJefeListWrapper(
        this.setError(this.tareasDiariasJefeList, e.response.status),
      );
    }
  }

  async getTareasSemanalesJefeListFromAPI(
    fecha: Date,
    id_personal_asignado: number,
  ) {
    this.setTareasSemanalesJefeListWrapper(
      this.setLoading(this.tareasSemanalesJefeList),
    );
    try {
      const r = await API.get(`/tareas_semana_jefe/list`, {
        params: {
          fecha: fecha,
          personal: id_personal_asignado,
        },
      });
      if (r.status === StatusCodes.OK) {
        this.setTareasSemanalesJefeList(r.data);
      } else {
        this.setTareasSemanalesJefeListWrapper(
          this.setError(this.tareasSemanalesJefeList, r.status),
        );
      }
    } catch (e) {
      this.setTareasSemanalesJefeListWrapper(
        this.setError(this.tareasSemanalesJefeList, e.response.status),
      );
    }
  }

  async realizarTarea(id_tarea: number) {
    this.setTareaWrapper(this.setLoading(this.tarea));
    try {
      const r = await API.put(`/realizar_tarea/${id_tarea}`, {});
      if (r.status === StatusCodes.OK) {
        Alert.alert('Atención!', r.data, [
          {
            text: 'OK',
            style: 'default',
          },
        ]);
        this.setTareaWrapper(this.unsetLoading(this.tarea));
      } else {
        this.setTareaWrapper(this.setError(this.tarea, r.status));
      }
    } catch (e) {
      Alert.alert('Error!', e.response.status, [
        {
          text: 'OK',
          style: 'default',
        },
      ]);
      this.setTareaWrapper(this.setError(this.tarea, e.response.status));
    }
  }

  setTareaWrapper(wrapper: UIWrapper<CreateTareaDTO>) {
    this.tarea = wrapper;
  }

  setTarea(tarea: CreateTareaDTO) {
    this.tarea = {
      data: tarea,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setTareasDiariasEmpleadoListWrapper(wrapper: UIWrapper<Array<TareaDTO>>) {
    this.tareasDiariasEmpleadoList = wrapper;
  }

  setTareasDiariasEmpleadoList(tareasDiariasEmpleadoList: Array<TareaDTO>) {
    this.tareasDiariasEmpleadoList = {
      data: tareasDiariasEmpleadoList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setTareasDiariasJefeListWrapper(wrapper: UIWrapper<Array<TareaDTO>>) {
    this.tareasDiariasJefeList = wrapper;
  }

  setTareasDiariasJefeList(tareasDiariasJefeList: Array<TareaDTO>) {
    this.tareasDiariasJefeList = {
      data: tareasDiariasJefeList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setTareasSemanalesEmpleadoListWrapper(wrapper: UIWrapper<Array<TareaDTO>>) {
    this.tareasSemanalesEmpleadoList = wrapper;
  }

  setTareasSemanalesEmpleadoList(tareasSemanalesEmpleadoList: Array<TareaDTO>) {
    this.tareasSemanalesEmpleadoList = {
      data: tareasSemanalesEmpleadoList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setTareasSemanalesJefeListWrapper(wrapper: UIWrapper<Array<TareaDTO>>) {
    this.tareasSemanalesJefeList = wrapper;
  }

  setTareasSemanalesJefeList(tareasSemanalesJefeList: Array<TareaDTO>) {
    this.tareasSemanalesJefeList = {
      data: tareasSemanalesJefeList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  /*setTareaListFilterCriteria(filterCriteria:tTareaFilterCriteria) {
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
