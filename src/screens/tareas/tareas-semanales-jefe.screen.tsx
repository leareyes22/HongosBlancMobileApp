import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native';
import {
  Box,
  Heading,
  HStack,
  Spinner,
  VStack,
  Pressable,
  Text,
  Spacer,
} from 'native-base';
import TareaStore from '../../stores/tareas.store';
import moment from 'moment';
import SessionStore from '../../stores/session.store';
import { SwipeListView } from 'react-native-swipe-list-view';
import TareaJefeModal from '../../components/tarea/tarea-jefe-modal.component';

const TareasSemanalesJefeScreen = () => {
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
    TareaStore.getTareasSemanalesJefeListFromAPI(
      new Date(),
      SessionStore.user_id,
    );
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#d6d3d1', height: '100%' }}>
      <VStack p={2} space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Tareas semanales creadas
        </Heading>
        {TareaStore.tareasSemanalesJefeList.loading && (
          <HStack space={2} mt={5} alignItems="center" ml="5">
            <Heading color="primary.600">Cargando tareas...</Heading>
            <Spinner color="primary.600" />
          </HStack>
        )}
        {!TareaStore.tareasSemanalesJefeList.loading &&
          TareaStore.tareasSemanalesJefeList.hasData && (
            <SwipeListView
              data={TareaStore.tareasSemanalesJefeList.data}
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
        {TareaStore.tareasSemanalesJefeList.hasData &&
          TareaStore.tareasSemanalesJefeList.data.length === 0 && (
            <Text pl={2} pr={2} fontSize="lg" color="primary.800">
              {'No posee tareas creadas para esta semana.'}
            </Text>
          )}
      </VStack>
    </SafeAreaView>
  );
};

export default observer(TareasSemanalesJefeScreen);
