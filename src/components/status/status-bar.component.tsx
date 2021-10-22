import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, HStack, Text } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';
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
import { Alert } from 'react-native';

const StatusBar = () => {
  const syncDataCallBack = useCallback(async () => {
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
    }
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!_.isNull(state.isConnected)) {
        SessionStore.setIsOnline(state.isConnected);
        if (
          SessionStore.isLoggedIn &&
          state.isConnected &&
          state.isWifiEnabled
        ) {
          Alert.alert(
            'Usted posee conexión a internet',
            'Se van a sincronizar los datos al servidor.',
            [
              {
                text: 'Confirmar',
                onPress: () => syncDataCallBack(),
              },
            ],
          );
        }
        if (SessionStore.isLoggedIn && !state.isConnected) {
          Alert.alert(
            'Usted no posee conexión a internet',
            'Los datos se sincronizarán cuando posea conexión.',
            [
              {
                text: 'OK',
              },
            ],
          );
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [syncDataCallBack]);

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
      {SessionStore.isOnline && (
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
      {!SessionStore.isOnline && (
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
