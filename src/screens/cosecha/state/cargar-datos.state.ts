// eslint-disable-next-line no-unused-vars
import CreateCosechaDTO, {
  emptyCreateCosechaDTO,
} from '../../../models/cosecha';
import CosechaStore from '../../../stores/cosecha.store';

const createLocalObservable = () => ({
  cosecha: emptyCreateCosechaDTO,

  submitted: false,

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
  setCosecha(cosecha: CreateCosechaDTO) {
    this.cosecha = cosecha;
  },
  submitHandler() {
    CosechaStore.createCosecha({
      ...CosechaStore.cosecha.data,
      fecha_cosechada: new Date(),
    });
    this.setSubmitted(true);
    setTimeout(() => {
      this.setSubmitted(false);
    }, 5000);
    this.setCosecha(emptyCreateCosechaDTO);
  },
});

export default createLocalObservable;
