// eslint-disable-next-line no-unused-vars
import TemperaturaCamaDTO, {
  emptyTemperaturaCamaDTO,
} from '../../../models/temperatura-cama';
import ControlStore from '../../../stores/control.store';

const createLocalObservable = () => ({
  nroCamaActual: 1,

  tempActual: emptyTemperaturaCamaDTO,

  temperaturas: new Array<TemperaturaCamaDTO>(),

  showCam: false,

  photoHasTaken: false,

  increaseNroCamaActual() {
    this.setNroCamaActual(this.nroCamaActual + 1);
    this.pushTemp(this.tempActual);
    this.setTempActual({
      ...emptyTemperaturaCamaDTO,
      nro_cama: this.nroCamaActual,
    });
  },
  pushTemp(temp: TemperaturaCamaDTO) {
    this.temperaturas.push(temp);
  },
  setTempActual(tempActual: TemperaturaCamaDTO) {
    this.tempActual = tempActual;
  },
  setNroCamaActual(num: number) {
    this.nroCamaActual = num;
    console.log(this.nroCamaActual);
  },
  setShowCam(showCam: boolean) {
    this.showCam = showCam;
    console.log(this.showCam);
  },
  async setFoto(data: any) {
    ControlStore.pushControlImage(data, this.nroCamaActual);
    this.photoHasTaken = true;
  },
  t1Handler(value: number) {
    this.tempActual.t1 = value;
  },
  t2Handler(value: number) {
    this.tempActual.t2 = value;
  },
  t3Handler(value: number) {
    this.tempActual.t3 = value;
  },
  t4Handler(value: number) {
    this.tempActual.t4 = value;
  },
  t5Handler(value: number) {
    this.tempActual.t5 = value;
  },
  t6Handler(value: number) {
    this.tempActual.t6 = value;
  },
  saveTemperaturas() {
    ControlStore.setTemperaturas(this.temperaturas);
  },
});

export default createLocalObservable;
