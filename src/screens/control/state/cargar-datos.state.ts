// eslint-disable-next-line no-unused-vars
import CreateControlDTO, {
  emptyCreateControlDTO,
} from '../../../models/control';
import ControlStore from '../../../stores/control.store';

const createLocalObservable = () => ({
  control: emptyCreateControlDTO,

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
  setControl(control: CreateControlDTO) {
    this.control = control;
  },
  submitHandler() {
    ControlStore.createControl({
      ...ControlStore.control.data,
      fecha_control: new Date(),
    });
    this.setSubmitted(true);
    setTimeout(() => {
      this.setSubmitted(false);
    }, 5000);
    this.setControl(emptyCreateControlDTO);
  },
});

export default createLocalObservable;
