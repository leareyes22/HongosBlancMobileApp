export interface SalaDTO {
  id: number;
  nombre: string;
  estado: string;
}

export const emptySalaDTO: SalaDTO = {
  id: -1,
  nombre: '',
  estado: '',
};

export const salasOffline: Array<SalaDTO> = [
  { id: 1, nombre: 'Sala 1', estado: 'Rasgado de cobertura' },
  { id: 2, nombre: 'Sala 2', estado: 'Rasgado de cobertura' },
  { id: 3, nombre: 'Sala 3', estado: 'Puesta de tierra de cobertura' },
  { id: 4, nombre: 'Sala 4', estado: 'Incubación post rasgado' },
  { id: 5, nombre: 'Sala 5', estado: 'Cosecha' },
];
