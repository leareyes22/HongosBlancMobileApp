export default interface TemperaturaCamaDTO {
  nro_cama: number;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  t5: number;
  t6: number;
}

export const emptyTemperaturaCamaDTO: TemperaturaCamaDTO = {
  nro_cama: 1,
  t1: 0.0,
  t2: 0.0,
  t3: 0.0,
  t4: 0.0,
  t5: 0.0,
  t6: 0.0,
};
