export interface TurnoDTO {
  id: number;
  nombre: string;
  descripcion: string;
}

export const emptyTurnoDTO: TurnoDTO = {
  id: -1,
  nombre: '',
  descripcion: '',
};

export const turnosOffline: Array<TurnoDTO> = [
  { id: 1, nombre: 'Mañana', descripcion: '6 a 14 hs.' },
  { id: 2, nombre: 'Tarde', descripcion: '14 a 22 hs.' },
];
