// eslint-disable-next-line no-unused-vars
import CreateControlDTO, {
  emptyCreateControlDTO,
} from '../../../models/control';
import ControlStore from '../../../stores/control.store';

const createLocalObservable = () => ({
  control: emptyCreateControlDTO,

  submitted: false,

  tempAireError: false,
  humRelativaError: false,
  CO2Error: false,
  observacionesError: false,

  tempAireHandler(tempAire: number) {
    this.control.temperatura_aire = tempAire;
    ControlStore.setTempAire(tempAire);
  },
  humRelativaHandler(humRelativa: number) {
    this.control.humedad_relativa = humRelativa;
    ControlStore.setHumRelativa(humRelativa);
  },
  porcentajeCO2Handler(porcentajeCO2: number) {
    this.control.co2 = porcentajeCO2;
    ControlStore.setPorcentajeCO2(porcentajeCO2);
  },
  observacionesHandler(observaciones: string) {
    this.control.observaciones = observaciones;
    ControlStore.setObservaciones(observaciones);
  },
  setSubmitted(submitted: boolean) {
    this.submitted = submitted;
  },
  setControl(control: CreateControlDTO) {
    this.control = control;
  },
  submitHandler() {
    this.resetErrors();
    if (
      this.control.temperatura_aire <= 17.0 ||
      this.control.temperatura_aire > 27.0
    ) {
      this.setTempAireError(true);
      return;
    } else if (
      this.control.humedad_relativa <= 0 ||
      this.control.humedad_relativa > 100.0
    ) {
      this.setHumRelativaError(true);
      return;
    } else if (this.control.co2 <= 0.0 || this.control.co2 > 9999) {
      this.setCO2Error(true);
      return;
    } else if (this.control.observaciones === '') {
      this.setObservacionesError(true);
      return;
    }
    ControlStore.createControl({
      ...ControlStore.control.data,
      fecha_control: new Date(),
    });
    this.setSubmitted(true);
    setTimeout(() => {
      this.setSubmitted(false);
    }, 5000);
    this.setControl(emptyCreateControlDTO);
    ControlStore.setControl(emptyCreateControlDTO);
  },
  setTempAireError(error: boolean) {
    this.tempAireError = error;
  },
  setHumRelativaError(error: boolean) {
    this.humRelativaError = error;
  },
  setCO2Error(error: boolean) {
    this.CO2Error = error;
  },
  setObservacionesError(error: boolean) {
    this.observacionesError = error;
  },
  resetErrors() {
    this.setTempAireError(false);
    this.setHumRelativaError(false);
    this.setCO2Error(false);
    this.setObservacionesError(false);
  },
});

export default createLocalObservable;
