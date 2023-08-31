// eslint-disable-next-line no-unused-vars
import TemperaturaCamaDTO from './temperatura-cama';

export default interface CreateControlDTO {
  id?: number;
  fecha_control: Date;
  temperatura_aire: number;
  humedad_relativa: number;
  co2: number;
  observaciones: string;
  id_sala: number;
  id_personal: number;
  id_turno: number;
  temperaturas: Array<TemperaturaCamaDTO>;
}

export const emptyCreateControlDTO: CreateControlDTO = {
  id: undefined,
  fecha_control: new Date(),
  temperatura_aire: 0.0,
  humedad_relativa: 0.0,
  co2: 0,
  observaciones: 'N/A.',
  id_sala: -1,
  id_personal: -1,
  id_turno: -1,
  temperaturas: [],
};

export interface ListControlDTO {
  id?: number;
  fecha_control: Date;
  temperatura_aire: number;
  humedad_relativa: number;
  co2: number;
  observaciones: string;
  sala: string;
  personal: string;
  turno: string;
}

export const emptyListControlDTO: ListControlDTO = {
  id: undefined,
  fecha_control: new Date(),
  temperatura_aire: 0.0,
  humedad_relativa: 0.0,
  co2: 0,
  observaciones: '',
  sala: '',
  personal: '',
  turno: '',
};

export interface ControlFilterCriteria {
  desde?: Date;
  hasta?: Date;
  sala?: number;
  personal?: number;
  turno?: number;
}
