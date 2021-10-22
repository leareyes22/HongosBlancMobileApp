export default interface CreateCosechaDTO {
  fecha_cosechada: Date;
  id_producto: number;
  kg_cosechados: number;
  observaciones: string;
  id_sala: number;
  id_personal: number;
  id_turno: number;
}

export const emptyCreateCosechaDTO: CreateCosechaDTO = {
  fecha_cosechada: new Date(),
  id_producto: -1,
  kg_cosechados: 0.0,
  observaciones: '',
  id_sala: -1,
  id_personal: -1,
  id_turno: -1,
};
