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

export interface CosechaFilterCriteria {
  desde?: Date;
  hasta?: Date;
  producto?: number;
  sala?: number;
  personal?: number;
  turno?: number;
}

export default interface ListCosechaDTO {
  id?: number;
  fecha_cosechada: Date;
  producto: string;
  kg_cosechados: number;
  observaciones: string;
  sala: string;
  personal: string;
  turno: string;
}
