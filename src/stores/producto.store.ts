import { getReasonPhrase, StatusCodes } from 'http-status-codes';
// eslint-disable-next-line no-unused-vars
import { action, makeAutoObservable } from 'mobx';
// eslint-disable-next-line no-unused-vars
import ProductoDTO, { emptyProductoDTO } from '../models/producto';
// eslint-disable-next-line no-unused-vars
import { initialUIWrapper, UIWrapper } from '../models/ui-wrapper';
import API from '../util/api';

class ProductoStore {
  producto: UIWrapper<ProductoDTO> = initialUIWrapper(emptyProductoDTO);
  productosList: UIWrapper<Array<ProductoDTO>> = initialUIWrapper([]);

  constructor() {
    makeAutoObservable(this);
  }

  async getProductosListFromAPI() {
    this.setProductosListWrapper(this.setLoading(this.productosList));
    try {
      const r = await API.get(`/producto/list`);
      if (r.status === StatusCodes.OK) {
        this.setProductosList(r.data);
      } else {
        this.setProductosListWrapper(
          this.setError(this.productosList, r.status),
        );
      }
    } catch (e) {
      this.setProductosListWrapper(
        this.setError(this.productosList, e.response.status),
      );
    }
  }

  async getProductoFromAPI(id: number) {
    this.setProductoWrapper(this.setLoading(this.producto));
    try {
      const r = await API.get(`/producto/${id}`);
      if (r.status === StatusCodes.OK) {
        this.setProducto(r.data);
      } else {
        this.setProductoWrapper(this.setError(this.producto, r.status));
      }
    } catch (e) {
      this.setProductoWrapper(this.setError(this.producto, e.response.status));
    }
  }

  setProducto(producto: ProductoDTO) {
    this.producto = {
      data: producto,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setProductoWrapper(wrapper: UIWrapper<ProductoDTO>) {
    this.producto = wrapper;
  }

  setProductosList(productosList: Array<ProductoDTO>) {
    this.productosList = {
      data: productosList,
      firstLoad: false,
      loading: false,
      hasData: true,
      hasError: false,
    };
  }

  setProductosListWrapper(wrapper: UIWrapper<Array<ProductoDTO>>) {
    this.productosList = wrapper;
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

export default new ProductoStore();
