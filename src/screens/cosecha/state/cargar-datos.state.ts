import { emptyCreateCosechaDTO } from '../../../models/cosecha';
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
  submitHandler() {
    CosechaStore.createCosecha({
      ...CosechaStore.cosecha.data,
      fecha_cosechada: new Date(),
    });
    this.setSubmitted(true);
  },
});

export default createLocalObservable;
