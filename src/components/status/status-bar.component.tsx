import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, HStack, Text } from 'native-base';
import { useNetInfo } from '@react-native-community/netinfo';
import SessionStore from '../../stores/session.store';
import ControlStore from '../../stores/control.store';
import CosechaStore from '../../stores/cosecha.store';
import {
  createControlDTOSync,
  createControlSalaTable,
  createCosechaTable,
  createFotoControlTable,
  createTemperaturaTable,
  getDBConnection,
  syncControlItems,
  syncCosechaItems,
  syncFotoControlItems,
  updateControlItems,
  updateCosechaItems,
  updateFotoControlItems,
  updateTemperaturaItems,
} from '../../database/database';
import TareaStore from '../../stores/tareas.store';
import PushNotification from 'react-native-push-notification';
import _ from 'lodash';

const useInternetReachable = () => {
  const { isInternetReachable } = useNetInfo();
  return isInternetReachable;
};

const StatusBar = () => {
  const isOnline = useInternetReachable();

  const syncDataCallBack = async () => {
    try {
      //Abrir conexión con la BD SQLite y crear tablas.
      const db = await getDBConnection();
      await createControlSalaTable(db);
      await createTemperaturaTable(db);
      await createFotoControlTable(db);
      await createCosechaTable(db);
      //Sincronizar controles.
      const storedControlItems = await syncControlItems(db);
      if (storedControlItems.length) {
        for (let i = 0; i < storedControlItems.length; i++) {
          let controlSyncedDTO = await createControlDTOSync(
            db,
            storedControlItems[i],
          );
          controlSyncedDTO.fecha_control = new Date(
            storedControlItems[i].fecha_control,
          );
          const storedFotoControlItems = await syncFotoControlItems(
            db,
            storedControlItems[i].id,
          );
          ControlStore.setControlImages(storedFotoControlItems);
          if (ControlStore.controlImages.length > 0) {
            ControlStore.createControl(controlSyncedDTO);
          }
        }
        //Acá tenemos que actualizar la columna synced en 1 para saber que ya se sincronizaron los datos.
        //Esto para todas las tablas: control_sala, temperatura, foto_control.
        //Esto va a prevenir que se vuelvan a sincronizar datos que ya estaban sincronizados.
        await updateControlItems(db);
        await updateTemperaturaItems(db);
        await updateFotoControlItems(db);
      } else {
        console.log('No hay controles para sincronizar.');
      }
      //Sincronizar cosechas.
      const storedCosechaItems = await syncCosechaItems(db);
      if (storedCosechaItems.length) {
        for (let i = 0; i < storedCosechaItems.length; i++) {
          CosechaStore.createCosecha(storedCosechaItems[i]);
        }
        //Acá tenemos que actualizar la columna synced en 1 para saber que ya se sincronizaron los datos.
        //Esto para todas las tablas: control_sala, temperatura, foto_control.
        //Esto va a prevenir que se vuelvan a sincronizar datos que ya estaban sincronizados.
        await updateCosechaItems(db);
      } else {
        console.log('No hay cosechas para sincronizar.');
      }
    } catch (error) {
      console.error(error);
      PushNotification.localNotification({
        channelId: 'hongosblanc-channel-id',
        title: 'Notificación de error',
        message:
          'Ha ocurrido un error al intentar sicronizar los datos con el servidor.',
      });
    }
  };

  useEffect(() => {
    if (SessionStore.isLoggedIn && !_.isNull(isOnline)) {
      if (isOnline) {
        syncDataCallBack();
        TareaStore.getTareasDiariasEmpleadoListFromAPI(
          new Date(),
          SessionStore.user_id,
        ).then(() => {
          if (TareaStore.tareasDiariasEmpleadoList.data.length > 0) {
            PushNotification.localNotification({
              channelId: 'hongosblanc-channel-id',
              title: 'Notificación de tareas',
              message:
                'Usted tiene asignadas ' +
                TareaStore.tareasDiariasEmpleadoList.data.length +
                ' tareas para este día. Acceda a la sección de Tareas para más detalles.',
            });
          }
        });
      } else {
        PushNotification.localNotification({
          channelId: 'hongosblanc-channel-id',
          title: 'Notificación de conexión',
          message:
            'Usted no posee conexión a internet, los datos se sincronizarán cuando se conecte nuevamente.',
        });
      }
    }
  }, [isOnline]);

  return (
    <HStack
      shadow={9}
      bg="primary.700"
      px={1}
      py={3}
      justifyContent="space-between"
      alignItems="center">
      <Text color="white" fontSize={25} marginLeft={2}>
        Hongos Blanc
      </Text>
      {SessionStore.isLoggedIn && isOnline && (
        <Box
          bg="#2980b9"
          borderColor="#000000"
          borderRadius="md"
          border={1}
          p={2}
          marginRight={2}
          _text={{
            fontSize: 'md',
            fontWeight: 'bold',
            color: 'white',
          }}>
          <Text fontSize={15}>Con conexión</Text>
        </Box>
      )}
      {SessionStore.isLoggedIn && !isOnline && (
        <Box
          bg="grey"
          borderColor="#000000"
          borderRadius="md"
          border={1}
          p={2}
          marginRight={2}
          _text={{
            fontSize: 'md',
            fontWeight: 'bold',
            color: 'white',
          }}>
          <Text fontSize={15}>Sin conexión</Text>
        </Box>
      )}
    </HStack>
  );
};

export default observer(StatusBar);
