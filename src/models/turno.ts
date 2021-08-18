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
