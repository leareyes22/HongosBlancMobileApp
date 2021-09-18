import ControlStore from '../../../stores/control.store';

const createLocalObservable = () => ({
  /*cosecha: emptyCreateCosechaDTO,

  submitted: false,

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
  submitHandler() {
    ControlStore.createControl({
      ...ControlStore.control.data,
      fecha_control: new Date(),
    });
    this.setSubmitted(true);
  },*/
});

export default createLocalObservable;
