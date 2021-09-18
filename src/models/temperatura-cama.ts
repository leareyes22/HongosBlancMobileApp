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
  t1: 17.0,
  t2: 17.0,
  t3: 17.0,
  t4: 17.0,
  t5: 17.0,
  t6: 17.0,
};
