// eslint-disable-next-line no-unused-vars
import { CreateTareaDTO, emptyCreateTareaDTO } from '../../../models/tarea';
import TareasStore from '../../../stores/tareas.store';
import SessionStore from '../../../stores/session.store';

const createLocalObservable = () => ({
  tarea: emptyCreateTareaDTO,

  submitted: false,

  showFechaPlanificadaDatePicker: false,

  setSubmitted(submitted: boolean) {
    this.submitted = submitted;
  },
  setTarea(tarea: CreateTareaDTO) {
    this.tarea = tarea;
  },
  setShowFechaPlanificadaDatePicker(showFechaPlanificadaDatePicker: boolean) {
    this.showFechaPlanificadaDatePicker = showFechaPlanificadaDatePicker;
  },
  fechaPlanificadaHandler(event: any, selectedDate: any) {
    this.setShowFechaPlanificadaDatePicker(false);
    this.tarea.fecha_planificada = selectedDate;
  },
  salaHandler(sala: any) {
    this.tarea.id_sala = parseInt(sala, 10);
  },
  personalAsignadoHandler(personalAsignado: any) {
    this.tarea.id_personal_asignado = parseInt(personalAsignado, 10);
  },
  descripcionHandler(descripcion: string) {
    this.tarea.descripcion = descripcion;
  },
  submitHandler() {
    TareasStore.createTarea({
      ...this.tarea,
      fecha_generada: new Date(),
      id_personal_creador: SessionStore.user_id,
    });
    this.setSubmitted(true);
    setTimeout(() => {
      this.setSubmitted(false);
      this.setTarea(emptyCreateTareaDTO);
    }, 5000);
  },
});

export default createLocalObservable;
