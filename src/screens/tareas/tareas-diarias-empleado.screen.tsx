import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, SafeAreaView } from 'react-native';
import {
  Box,
  Button,
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
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SessionStore from '../../stores/session.store';
import { SwipeListView } from 'react-native-swipe-list-view';
import TareaEmpleadoModal from '../../components/tarea/tarea-empleado-modal.component';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TareasDiariasEmpleadoScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  function onOpenDate() {
    setShowDatePicker(true);
  }

  function onDateChange(event: any, selectedDate: any) {
    setShowDatePicker(false);
    setDate(selectedDate);
    TareaStore.getTareasDiariasEmpleadoListFromAPI(
      selectedDate,
      SessionStore.user_id,
    );
  }

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
            TareaStore.getTareasDiariasEmpleadoListFromAPI(
              date,
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
    setDate(new Date());
    TareaStore.getTareasDiariasEmpleadoListFromAPI(
      new Date(),
      SessionStore.user_id,
    );
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#d6d3d1', height: '100%' }}>
      <VStack p={2} space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Tareas diarias asignadas
        </Heading>
        {TareaStore.tareasDiariasEmpleadoList.loading && (
          <HStack space={2} mt={5} alignItems="center" ml="5">
            <Heading color="primary.600">Cargando tareas...</Heading>
            <Spinner color="primary.600" />
          </HStack>
        )}
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}
        <Button
          onPress={onOpenDate}
          bg="primary.900"
          _text={{ color: 'white' }}>
          {'Día: ' + moment(date).format('DD/MM/YYYY')}
        </Button>
        {!TareaStore.tareasDiariasEmpleadoList.loading &&
          TareaStore.tareasDiariasEmpleadoList.hasData && (
            <SwipeListView
              data={TareaStore.tareasDiariasEmpleadoList.data}
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
        {TareaStore.tareasDiariasEmpleadoList.hasData &&
          TareaStore.tareasDiariasEmpleadoList.data.length === 0 && (
            <Text pl={2} pr={2} fontSize="lg" color="primary.800">
              {'No posee tareas asignadas para este día.'}
            </Text>
          )}
      </VStack>
    </SafeAreaView>
  );
};

export default observer(TareasDiariasEmpleadoScreen);
