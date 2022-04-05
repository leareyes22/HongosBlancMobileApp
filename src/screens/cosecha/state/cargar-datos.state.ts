// eslint-disable-next-line no-unused-vars
import CreateCosechaDTO, {
  emptyCreateCosechaDTO,
} from '../../../models/cosecha';
import { emptyProductoDTO } from '../../../models/producto';
import CosechaStore from '../../../stores/cosecha.store';
import ProductoStore from '../../../stores/producto.store';

const createLocalObservable = () => ({
  cosecha: emptyCreateCosechaDTO,

  submitted: false,

  kgCosechadosError: false,
  observacionesError: false,
  productoError: false,

  kgCosechadosHandler(kgCosechados: number) {
    this.cosecha.kg_cosechados = kgCosechados;
    CosechaStore.setKgCosechados(kgCosechados);
  },
  observacionesHandler(observaciones: string) {
    this.cosecha.observaciones = observaciones;
    CosechaStore.setObservaciones(observaciones);
  },
  setSubmitted(submitted: boolean) {
    this.submitted = submitted;
  },
  setProducto(itemValue: any) {
    this.cosecha.id_producto = itemValue;
    CosechaStore.setProducto(itemValue);
  },
  setCosecha(cosecha: CreateCosechaDTO) {
    this.cosecha = cosecha;
  },
  submitHandler() {
    this.resetErrors();
    if (this.cosecha.kg_cosechados <= 0.0) {
      this.setKgCosechadosError(true);
      return;
    } else if (this.cosecha.id_producto === -1) {
      this.setProductoError(true);
      return;
    } else if (this.cosecha.observaciones === '') {
      this.setObservacionesError(true);
      return;
    }
    CosechaStore.createCosecha({
      ...CosechaStore.cosecha.data,
      fecha_cosechada: new Date(),
    });
    this.setSubmitted(true);
    setTimeout(() => {
      this.setSubmitted(false);
    }, 5000);
    this.setCosecha(emptyCreateCosechaDTO);
    ProductoStore.setProducto(emptyProductoDTO);
    CosechaStore.setCosecha(emptyCreateCosechaDTO);
  },
  setKgCosechadosError(error: boolean) {
    this.kgCosechadosError = error;
  },
  setObservacionesError(error: boolean) {
    this.observacionesError = error;
  },
  setProductoError(error: boolean) {
    this.productoError = error;
  },
  resetErrors() {
    this.setKgCosechadosError(false);
    this.setProductoError(false);
    this.setObservacionesError(false);
  },
});

export default createLocalObservable;
