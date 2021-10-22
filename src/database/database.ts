import {
  enablePromise,
  openDatabase,
  // eslint-disable-next-line no-unused-vars
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
// eslint-disable-next-line no-unused-vars
import CreateControlDTO, { emptyCreateControlDTO } from '../models/control';
// eslint-disable-next-line no-unused-vars
import CreateCosechaDTO from '../models/cosecha';
// eslint-disable-next-line no-unused-vars
import TemperaturaCamaDTO from '../models/temperatura-cama';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'Hongos-Blanc.db', location: 'default' });
};

export const createControlSalaTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query =
    'CREATE TABLE IF NOT EXISTS control_sala(id INTEGER PRIMARY KEY AUTOINCREMENT, fecha_control CHAR(255), temperatura_aire REAL NOT NULL, humedad_relativa REAL NOT NULL, co2 INTEGER NOT NULL, observaciones CHAR(255), id_sala INTEGER NOT NULL, id_personal INTEGER NOT NULL, id_turno integer NOT NULL, synced INTEGER NOT NULL)';

  await db.executeSql(query);
};

export const createTemperaturaTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query =
    'CREATE TABLE IF NOT EXISTS temperatura(id INTEGER PRIMARY KEY AUTOINCREMENT, id_control INTEGER NOT NULL, nro_cama INTEGER NOT NULL, t1 REAL NOT NULL, t2 REAL NOT NULL, t3 REAL NOT NULL, t4 REAL NOT NULL, t5 REAL NOT NULL, t6 REAL NOT NULL, synced INTEGER NOT NULL)';

  await db.executeSql(query);
};

export const createFotoControlTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query =
    'CREATE TABLE IF NOT EXISTS foto_control(id INTEGER PRIMARY KEY AUTOINCREMENT, foto_uri CHAR NOT NULL, name CHAR(255), id_control INTEGER NOT NULL, synced INTEGER NOT NULL)';

  await db.executeSql(query);
};

export const createCosechaTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query =
    'CREATE TABLE IF NOT EXISTS cosecha(id INTEGER PRIMARY KEY AUTOINCREMENT, fecha_cosechada CHAR(255), id_producto INTEGER NOT NULL, kg_cosechados REAL NOT NULL, observaciones CHAR(255), id_sala INTEGER NOT NULL, id_personal INTEGER NOT NULL, id_turno INTEGER NOT NULL, synced INTEGER NOT NULL)';

  await db.executeSql(query);
};

export const getControlItems = async (db: SQLiteDatabase): Promise<any[]> => {
  try {
    const controlItems: any[] = [];
    const results = await db.executeSql(
      'SELECT * FROM control_sala WHERE synced = 1',
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        controlItems.push(result.rows.item(index));
      }
    });
    return controlItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get controlItems !!!');
  }
};

export const addControl = async (
  db: SQLiteDatabase,
  control: CreateControlDTO,
  controlImages: Array<any>,
) => {
  const insertQuery =
    'INSERT INTO control_sala (temperatura_aire, fecha_control, humedad_relativa, co2, observaciones, id_sala, id_personal, id_turno, synced) VALUES ' +
    `(${control.temperatura_aire}, '${control.fecha_control.toISOString()}', ${
      control.humedad_relativa
    }, ${control.co2}, '${control.observaciones}', ${control.id_sala}, ${
      control.id_personal
    }, ${control.id_turno}, 0)`;

  db.executeSql(insertQuery).then((results: any) => {
    console.log('Id del control creado: ' + results[0].insertId);
    addTemperaturas(db, control.temperaturas, results[0].insertId);
    addImages(db, controlImages, results[0].insertId);
  });
};

export const addTemperaturas = async (
  db: SQLiteDatabase,
  temperaturas: Array<TemperaturaCamaDTO>,
  controlId: number,
) => {
  for (let i = 0; i < temperaturas.length; i++) {
    const insertQuery =
      'INSERT INTO temperatura (id_control, nro_cama, t1, t2, t3, t4, t5, t6, synced) VALUES ' +
      `(${controlId}, ${temperaturas[i].nro_cama}, ${temperaturas[i].t1}, '${temperaturas[i].t2}', ${temperaturas[i].t3}, ${temperaturas[i].t4}, ${temperaturas[i].t5}, ${temperaturas[i].t6}, 0)`;

    db.executeSql(insertQuery).then((results: any) => {
      console.log('Id de la temperatura creada: ' + results[0].insertId);
    });
  }
};

export const addImages = async (
  db: SQLiteDatabase,
  controlImages: Array<any>,
  controlId: number,
) => {
  for (let i = 0; i < controlImages.length; i++) {
    const insertQuery =
      'INSERT INTO foto_control (foto_uri, name, id_control, synced) VALUES ' +
      `('${controlImages[i].uri}', '${controlImages[i].name}', ${controlId}, 0)`;

    db.executeSql(insertQuery).then((results: any) => {
      console.log('Id de la foto creada: ' + results[0].insertId);
    });
  }
};

export const addCosecha = async (
  db: SQLiteDatabase,
  cosecha: CreateCosechaDTO,
) => {
  const insertQuery =
    'INSERT INTO cosecha (fecha_cosechada, id_producto, kg_cosechados, observaciones, id_sala, id_personal, id_turno, synced) VALUES ' +
    `('${cosecha.fecha_cosechada.toISOString()}', ${cosecha.id_producto}, ${
      cosecha.kg_cosechados
    }, '${cosecha.observaciones}', ${cosecha.id_sala}, ${
      cosecha.id_personal
    }, ${cosecha.id_turno}, 0)`;

  db.executeSql(insertQuery).then((results: any) => {
    console.log('Id de la cosecha creada: ' + results[0].insertId);
  });
};

export const syncControlItems = async (db: SQLiteDatabase): Promise<any[]> => {
  try {
    var controlItems: any[] = [];
    const results = await db.executeSql(
      'SELECT * FROM control_sala WHERE synced = 0',
    );
    results.forEach(function (result) {
      for (let index = 0; index < result.rows.length; index++) {
        controlItems.push(result.rows.item(index));
      }
    });
    return controlItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get controlItems !!!');
  }
};

export const syncFotoControlItems = async (
  db: SQLiteDatabase,
  id_control: number,
): Promise<any[]> => {
  try {
    var fotoControlItems: any[] = [];
    const results = await db.executeSql(
      `SELECT * FROM foto_control WHERE id_control = ${id_control} AND synced = 0`,
    );
    results.forEach(function (result) {
      for (let index = 0; index < result.rows.length; index++) {
        fotoControlItems.push({
          uri: result.rows.item(index).foto_uri,
          name: result.rows.item(index).name,
          type: 'image/jpg',
        });
      }
    });
    return fotoControlItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get fotoControlItems !!!');
  }
};

export const syncCosechaItems = async (
  db: SQLiteDatabase,
): Promise<CreateCosechaDTO[]> => {
  try {
    var cosechaItems: CreateCosechaDTO[] = [];
    const results = await db.executeSql(
      `SELECT * FROM cosecha WHERE synced = 0`,
    );
    results.forEach(function (result) {
      for (let index = 0; index < result.rows.length; index++) {
        cosechaItems.push({
          fecha_cosechada: new Date(result.rows.item(index).fecha_cosechada),
          id_producto: result.rows.item(index).id_producto,
          kg_cosechados: result.rows.item(index).kg_cosechados,
          observaciones: result.rows.item(index).observaciones,
          id_sala: result.rows.item(index).id_sala,
          id_personal: result.rows.item(index).id_personal,
          id_turno: result.rows.item(index).id_turno,
        });
      }
    });
    return cosechaItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get cosechaItems !!!');
  }
};

export const createControlDTOSync = async (
  db: SQLiteDatabase,
  control: any,
): Promise<CreateControlDTO> => {
  try {
    var controlDTO: CreateControlDTO = emptyCreateControlDTO;
    var temps: any[] = [];

    const results = await db.executeSql(
      `SELECT nro_cama, t1, t2, t3, t4, t5, t6 FROM temperatura WHERE synced = 0 AND id_control = ${control.id}`,
    );

    results.forEach(function (result) {
      for (let index = 0; index < result.rows.length; index++) {
        temps.push(result.rows.item(index));
      }
    });

    controlDTO = {
      ...control,
      temperaturas: temps,
    };

    return controlDTO;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get controlDTO !!!');
  }
};

export const getTemperaturaItems = async (
  db: SQLiteDatabase,
  controlId: number,
): Promise<any[]> => {
  try {
    const temperaturaItems: any[] = [];
    const results = await db.executeSql(
      `SELECT nro_cama, t1, t2, t3, t4, t5, t6 FROM temperatura WHERE synced = 0 AND id_control = ${controlId}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        temperaturaItems.push(result.rows.item(index));
      }
    });
    return temperaturaItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get temperaturaItems for this controlId !!!');
  }
};

export const updateControlItems = async (db: SQLiteDatabase) => {
  try {
    await db.executeSql('UPDATE control_sala SET synced = 1 WHERE synced = 0');
  } catch (error) {
    console.error(error);
    throw Error('Failed to update controlItems !!!');
  }
};

export const updateTemperaturaItems = async (db: SQLiteDatabase) => {
  try {
    await db.executeSql('UPDATE temperatura SET synced = 1 WHERE synced = 0');
  } catch (error) {
    console.error(error);
    throw Error('Failed to update temperaturaItems !!!');
  }
};

export const updateFotoControlItems = async (db: SQLiteDatabase) => {
  try {
    await db.executeSql('UPDATE foto_control SET synced = 1 WHERE synced = 0');
  } catch (error) {
    console.error(error);
    throw Error('Failed to update fotoControlItems !!!');
  }
};

export const updateCosechaItems = async (db: SQLiteDatabase) => {
  try {
    await db.executeSql('UPDATE cosecha SET synced = 1 WHERE synced = 0');
  } catch (error) {
    console.error(error);
    throw Error('Failed to update cosechaItems !!!');
  }
};
