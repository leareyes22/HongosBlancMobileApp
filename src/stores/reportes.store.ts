import { getReasonPhrase, StatusCodes } from 'http-status-codes';
// eslint-disable-next-line no-unused-vars
import { action, makeAutoObservable } from 'mobx';
// eslint-disable-next-line no-unused-vars
import {
  emptyGroupCantControles,
  emptyGroupCantCosechas,
  emptyGroupCosechasKg,
  emptyGroupCosechasPorProducto,
  emptyGroupDataControles,
  // eslint-disable-next-line no-unused-vars
  GroupCantControlesDTO,
  // eslint-disable-next-line no-unused-vars
  GroupCantCosechasDTO,
  // eslint-disable-next-line no-unused-vars
  GroupCosechasKgDTO,
  // eslint-disable-next-line no-unused-vars
  GroupCosechasPorProductoDTO,
  // eslint-disable-next-line no-unused-vars
  GroupDataControlesDTO,
} from '../models/reportes';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
import API from '../util/api';

class ReporteStore {
  cantCosechasUltimoAño: UIWrapper<GroupCantCosechasDTO> = initialUIWrapper(
    emptyGroupCantCosechas,
  );
  cantControlesUltimoAño: UIWrapper<GroupCantControlesDTO> = initialUIWrapper(
    emptyGroupCantControles,
  );
  percentCosechasPorProducto: UIWrapper<GroupCosechasPorProductoDTO> =
    initialUIWrapper(emptyGroupCosechasPorProducto);
  cantCosechasKg6meses: UIWrapper<GroupCosechasKgDTO> =
    initialUIWrapper(emptyGroupCosechasKg);
  controlesData6meses: UIWrapper<GroupDataControlesDTO> = initialUIWrapper(
    emptyGroupDataControles,
  );

  constructor() {
    makeAutoObservable(this);
  }

  async getControlesData6mesesFromAPI() {
    this.setControlesData6mesesWrapper(
      this.setLoading(this.controlesData6meses),
    );
    try {
      const r = await API.get(`/reportes/controles_data`);
      if (r.status === StatusCodes.OK) {
        this.setControlesData6meses(r.data);
      } else {
        this.setControlesData6mesesWrapper(
          this.setError(this.controlesData6meses, r.status),
        );
      }
    } catch (e) {
      this.setControlesData6mesesWrapper(
        this.setError(this.controlesData6meses, e.response.status),
      );
    }
  }

  async getCantControlesUltimoAñoFromAPI() {
    this.setCantControlesUltimoAñoWrapper(
      this.setLoading(this.cantControlesUltimoAño),
    );
    try {
      const r = await API.get(`/reportes/controles_turno`);
      if (r.status === StatusCodes.OK) {
        this.setCantControlesUltimoAño(r.data);
      } else {
        this.setCantControlesUltimoAñoWrapper(
          this.setError(this.cantControlesUltimoAño, r.status),
        );
      }
    } catch (e) {
      this.setCantControlesUltimoAñoWrapper(
        this.setError(this.cantControlesUltimoAño, e.response.status),
      );
    }
  }

  async getCantCosechasUltimoAñoFromAPI() {
    this.setCantCosechasUltimoAñoWrapper(
      this.setLoading(this.cantCosechasUltimoAño),
    );
    try {
      const r = await API.get(`/reportes/cosechas_turno`);
      if (r.status === StatusCodes.OK) {
        this.setCantCosechasUltimoAño(r.data);
      } else {
        this.setCantCosechasUltimoAñoWrapper(
          this.setError(this.cantCosechasUltimoAño, r.status),
        );
      }
    } catch (e) {
      this.setCantCosechasUltimoAñoWrapper(
        this.setError(this.cantCosechasUltimoAño, e.response.status),
      );
    }
  }

  async getPercentCosechasPorProductoFromAPI() {
    this.setPercentCosechasPorProductoWrapper(
      this.setLoading(this.percentCosechasPorProducto),
    );
    try {
      const r = await API.get(`/reportes/cosechas_producto`);
      if (r.status === StatusCodes.OK) {
        this.setPercentCosechasPorProducto(r.data);
      } else {
        this.setPercentCosechasPorProductoWrapper(
          this.setError(this.percentCosechasPorProducto, r.status),
        );
      }
    } catch (e) {
      this.setPercentCosechasPorProductoWrapper(
        this.setError(this.percentCosechasPorProducto, e.response.status),
      );
    }
  }

  async getCantCosechasKg6mesesFromAPI() {
    this.setCantCosechasKg6mesesWrapper(
      this.setLoading(this.cantCosechasKg6meses),
    );
    try {
      const r = await API.get(`/reportes/cosechas_kg`);
      if (r.status === StatusCodes.OK) {
        this.setCantCosechasKg6meses(r.data);
      } else {
        this.setCantCosechasKg6mesesWrapper(
          this.setError(this.cantCosechasKg6meses, r.status),
        );
      }
    } catch (e) {
      this.setCantCosechasKg6mesesWrapper(
        this.setError(this.cantCosechasKg6meses, e.response.status),
      );
    }
  }

  setCantControlesUltimoAño(cantControles: GroupCantControlesDTO) {
    this.cantControlesUltimoAño = {
      data: cantControles,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setCantControlesUltimoAñoWrapper(wrapper: UIWrapper<GroupCantControlesDTO>) {
    this.cantControlesUltimoAño = wrapper;
  }

  setControlesData6meses(controlesData6meses: GroupDataControlesDTO) {
    this.controlesData6meses = {
      data: controlesData6meses,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setControlesData6mesesWrapper(wrapper: UIWrapper<GroupDataControlesDTO>) {
    this.controlesData6meses = wrapper;
  }

  setCantCosechasUltimoAño(cantCosechasUltimoAño: GroupCantCosechasDTO) {
    this.cantCosechasUltimoAño = {
      data: cantCosechasUltimoAño,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setCantCosechasUltimoAñoWrapper(wrapper: UIWrapper<GroupCantCosechasDTO>) {
    this.cantCosechasUltimoAño = wrapper;
  }

  setCantCosechasKg6meses(cantCosechasKg6meses: GroupCosechasKgDTO) {
    this.cantCosechasKg6meses = {
      data: cantCosechasKg6meses,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setCantCosechasKg6mesesWrapper(wrapper: UIWrapper<GroupCosechasKgDTO>) {
    this.cantCosechasKg6meses = wrapper;
  }

  setPercentCosechasPorProducto(
    percentCosechasPorProducto: GroupCosechasPorProductoDTO,
  ) {
    this.percentCosechasPorProducto = {
      data: percentCosechasPorProducto,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setPercentCosechasPorProductoWrapper(
    wrapper: UIWrapper<GroupCosechasPorProductoDTO>,
  ) {
    this.percentCosechasPorProducto = wrapper;
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

export default new ReporteStore();
