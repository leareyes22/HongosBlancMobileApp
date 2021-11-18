export interface GroupCantCosechasDTO {
  turnos: Array<string>;
  cant_cosechas: Array<number>;
}

export const emptyGroupCantCosechas: GroupCantCosechasDTO = {
  turnos: [],
  cant_cosechas: [],
};

export interface GroupCantControlesDTO {
  turnos: Array<string>;
  cant_controles: Array<number>;
}

export const emptyGroupCantControles: GroupCantControlesDTO = {
  turnos: [],
  cant_controles: [],
};

export interface GroupCosechasPorProductoDTO {
  productos: Array<string>;
  porcentajes: Array<number>;
}

export const emptyGroupCosechasPorProducto: GroupCosechasPorProductoDTO = {
  productos: ['', ''],
  porcentajes: [0, 0],
};

export interface GroupCosechasKgDTO {
  meses: Array<string>;
  totales_kg: Array<number>;
}

export const emptyGroupCosechasKg: GroupCosechasKgDTO = {
  meses: [],
  totales_kg: [],
};

export interface GroupDataControlesDTO {
  meses: Array<string>;
  temps_aire_prom: Array<number>;
  hums_rel_prom: Array<number>;
  co2s_prom: Array<number>;
}

export const emptyGroupDataControles: GroupDataControlesDTO = {
  meses: [],
  temps_aire_prom: [],
  hums_rel_prom: [],
  co2s_prom: [],
};
