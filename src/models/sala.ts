export interface SalaDTO {
  id: number;
  nombre: string;
  estado: string;
}

export const emptySalaDTO: SalaDTO = {
  id: -1,
  nombre: '',
  estado: '',
}
