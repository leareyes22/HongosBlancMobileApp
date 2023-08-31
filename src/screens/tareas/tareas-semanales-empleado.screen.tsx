import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, SafeAreaView } from 'react-native';
import {
  Box,
  Heading,
  HStack,
  Spinner,
  VStack,
  Pressable,
  Text,
  Spacer,
  Icon,
} from 'native-base';
import TareaStore from '../../stores/tareas.store';
import moment from 'moment';
import SessionStore from '../../stores/session.store';
import { SwipeListView } from 'react-native-swipe-list-view';
import TareaEmpleadoModal from '../../components/tarea/tarea-empleado-modal.component';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TareasSemanalesEmpleadoScreen = () => {
  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const realizarTarea = (rowMap: any, rowKey: any) => {
    Alert.alert('La tarea será marcada como realizada', '¿Está seguro?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => {
          TareaStore.realizarTarea(rowKey).then(() =>
            TareaStore.getTareasSemanalesEmpleadoListFromAPI(
              new Date(),
              SessionStore.user_id,
            ),
          );
          closeRow(rowMap, rowKey);
        },
      },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <Box>
      <Pressable bg="primary.100" shadow={9}>
        <Box pl="3" pr="3" py="2">
          <HStack alignItems="center" space={3}>
            <VStack>
              <Text color="#000000" _dark={{ color: '#000000' }} bold>
                {moment(item?.fecha_planificada).format('DD/MM/YYYY')}
              </Text>
              <Text color="#000000" _dark={{ color: '#000000' }}>
                {item.sala}
              </Text>
              <Text color="#000000" _dark={{ color: '#000000' }}>
                {item.realizada ? 'Realizada' : 'No Realizada'}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="sm"
              color="primary.700"
              _dark={{ color: '#000000' }}
              bold>
              {item.id}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data: any, rowMap: any) => (
    <HStack flex={1} pl="63%">
      <Pressable
        w="70px"
        bg="coolGray.800"
        justifyContent="center"
        disabled={data.item.realizada}
        // eslint-disable-next-line react/jsx-no-bind
        onPress={() => realizarTarea(rowMap, data.item.id)}
        _pressed={{
          opacity: 0.5,
        }}
        _disabled={{
          backgroundColor: 'grey',
        }}>
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="check" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Realizar
          </Text>
        </VStack>
      </Pressable>
      <TareaEmpleadoModal tarea={data.item} />
    </HStack>
  );

  useEffect(() => {
    TareaStore.getTareasSemanalesEmpleadoListFromAPI(
      new Date(),
      SessionStore.user_id,
    );
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#d6d3d1', height: '100%' }}>
      <VStack p={2} space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Tareas semanales asignadas
        </Heading>
        {TareaStore.tareasSemanalesEmpleadoList.loading && (
          <HStack space={2} mt={5} alignItems="center" ml="5">
            <Heading color="primary.600">Cargando tareas...</Heading>
            <Spinner color="primary.600" />
          </HStack>
        )}
        {!TareaStore.tareasSemanalesEmpleadoList.loading &&
          TareaStore.tareasSemanalesEmpleadoList.hasData && (
            <SwipeListView
              data={TareaStore.tareasSemanalesEmpleadoList.data}
              // eslint-disable-next-line react/jsx-no-bind
              renderItem={renderItem}
              // eslint-disable-next-line react/jsx-no-bind
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-130}
              previewRowKey={'1'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              // eslint-disable-next-line react/jsx-no-bind
              keyExtractor={item => String(item.id)}
            />
          )}
        {TareaStore.tareasSemanalesEmpleadoList.hasData &&
          TareaStore.tareasSemanalesEmpleadoList.data.length === 0 && (
            <Text pl={2} pr={2} fontSize="lg" color="primary.800">
              {'No posee tareas asignadas para esta semana.'}
            </Text>
          )}
      </VStack>
    </SafeAreaView>
  );
};

export default observer(TareasSemanalesEmpleadoScreen);
