export interface CreateTareaDTO {
  fecha_generada: Date;
  descripcion: string;
  fecha_planificada: Date;
  id_sala: number;
  id_personal_asignado: number;
  id_personal_creador: number;
}

export const emptyCreateTareaDTO: CreateTareaDTO = {
  fecha_generada: new Date(),
  descripcion: '',
  fecha_planificada: new Date(),
  id_sala: -1,
  id_personal_asignado: -1,
  id_personal_creador: -1,
};
