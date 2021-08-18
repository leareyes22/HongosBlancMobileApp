// eslint-disable-next-line no-unused-vars
import TemperaturaCamaDTO, {
  emptyTemperaturaCamaDTO,
} from '../../../models/temperatura-cama';

const createLocalObservable = () => ({
  nroCamaActual: 1,

  tempActual: emptyTemperaturaCamaDTO,

  temperaturas: new Array<TemperaturaCamaDTO>(),

  increaseNroCamaActual() {
    this.nroCamaActual++;
  },
  pushTemp(temp: TemperaturaCamaDTO) {
    this.temperaturas.push(temp);
  },
  setTempActual(tempActual: TemperaturaCamaDTO) {
    this.tempActual = tempActual;
  },
});

export default createLocalObservable;
