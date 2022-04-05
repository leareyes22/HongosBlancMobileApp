import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Alert,
  Box,
  Heading,
  HStack,
  Pressable,
  Spacer,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import ControlStore from '../../stores/control.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import ControlFotosModal from '../../components/fotos/control-fotos.component';
import ControlDetailsModal from '../../components/control/control-details.component';
import ControlFilterModal from '../../components/control/control-filter.compontent';

const ListadoControlesScreen = () => {
  useEffect(() => {
    ControlStore.getControlListFromAPI();
  }, []);

  const renderItem = ({ item }: any) => (
    <Box>
      <Pressable bg="primary.100" shadow={9}>
        <Box pl="3" pr="3" py="2">
          <HStack alignItems="center" space={3}>
            <VStack>
              <Text color="#000000" _dark={{ color: '#000000' }} bold pb="5">
                {moment(item.fecha_control)
                  .locale('es')
                  .format('DD/MM/YYYY hh:mm')}
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
    <HStack flex={1} pl="65%">
      <ControlFotosModal controlId={data.item.id} />
      <ControlDetailsModal control={data.item} />
    </HStack>
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#d6d3d1', height: '100%' }}>
      <VStack space={2} mt={5} pb={'90px'}>
        <Heading pl={2} size="lg" color="primary.800">
          Listado de controles
        </Heading>
        <ControlFilterModal />
        {ControlStore.controlList.loading && (
          <HStack space={2} mt={5} alignItems="center" ml="5">
            <Heading color="primary.600">Cargando controles...</Heading>
            <Spinner color="primary.600" />
          </HStack>
        )}
        {(!ControlStore.controlList.hasData ||
          ControlStore.controlList.data.length === 0) &&
          !ControlStore.controlList.loading && (
            <Alert status={'warning'} w="100%" alignItems="center" mt={5}>
              <Alert.Icon />
              <Alert.Title flexShrink={1}>
                No se han encontrado controles.
              </Alert.Title>
            </Alert>
          )}
        {!ControlStore.controlList.loading && ControlStore.controlList.hasData && (
          <SwipeListView
            data={ControlStore.controlList.data}
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
      </VStack>
    </SafeAreaView>
  );
};

export default observer(ListadoControlesScreen);
