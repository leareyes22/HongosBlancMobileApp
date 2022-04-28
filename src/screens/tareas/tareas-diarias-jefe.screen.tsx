import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native';
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
} from 'native-base';
import TareaStore from '../../stores/tareas.store';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SessionStore from '../../stores/session.store';
import { SwipeListView } from 'react-native-swipe-list-view';
import TareaJefeModal from '../../components/tarea/tarea-jefe-modal.component';

const TareasDiariasJefeScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  function onOpenDate() {
    setShowDatePicker(true);
  }

  function onDateChange(event: any, selectedDate: any) {
    setShowDatePicker(false);
    setDate(selectedDate);
    TareaStore.getTareasDiariasJefeListFromAPI(
      selectedDate,
      SessionStore.user_id,
    );
  }

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

  const renderHiddenItem = (data: any) => (
    <HStack flex={1} pl="80%">
      <TareaJefeModal tarea={data.item} />
    </HStack>
  );

  useEffect(() => {
    setDate(new Date());
    TareaStore.getTareasDiariasJefeListFromAPI(
      new Date(),
      SessionStore.user_id,
    );
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#d6d3d1', height: '100%' }}>
      <VStack p={2} space={2} mt={5} pb={'90px'}>
        <Heading size="lg" color="primary.800">
          Tareas diarias creadas
        </Heading>
        {TareaStore.tareasDiariasJefeList.loading && (
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
        {!TareaStore.tareasDiariasJefeList.loading &&
          TareaStore.tareasDiariasJefeList.hasData && (
            <SwipeListView
              data={TareaStore.tareasDiariasJefeList.data}
              // eslint-disable-next-line react/jsx-no-bind
              renderItem={renderItem}
              // eslint-disable-next-line react/jsx-no-bind
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-70}
              previewRowKey={'1'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              // eslint-disable-next-line react/jsx-no-bind
              keyExtractor={item => String(item.id)}
            />
          )}
        {TareaStore.tareasDiariasJefeList.hasData &&
          TareaStore.tareasDiariasJefeList.data.length === 0 && (
            <Text pl={2} pr={2} fontSize="lg" color="primary.800">
              {'No posee tareas creadas para este día.'}
            </Text>
          )}
      </VStack>
    </SafeAreaView>
  );
};

export default observer(TareasDiariasJefeScreen);
