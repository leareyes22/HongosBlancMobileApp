import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Alert,
  Heading,
  HStack,
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

const renderItem = ({ item }: any) => (
  <HStack
    bg="primary.100"
    shadow={9}
    pl="3"
    pr="3"
    py="2"
    alignItems="center"
    space={3}>
    <Text color="#000000" _dark={{ color: '#000000' }} bold pb="5">
      {moment(item?.fecha_control).format('DD/MM/YYYY hh:mm')}
    </Text>
    <Spacer />
    <Text fontSize="sm" color="primary.700" _dark={{ color: '#000000' }} bold>
      {item.id}
    </Text>
  </HStack>
);

const renderHiddenItem = (data: any) => (
  <HStack flex={1} pl="65%">
    <ControlFotosModal controlId={data.item.id} />
    <ControlDetailsModal control={data.item} />
  </HStack>
);

const ListadoControlesScreen = () => {
  useEffect(() => {
    ControlStore.getControlListFromAPI();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#d6d3d1', height: '100%' }}>
      <VStack space={2} mt={5} pb={'90px'}>
        <Heading pl={2} size="lg" color="primary.800">
          Listado de controles
        </Heading>
        <ControlFilterModal />
        {ControlStore.controlList.loading ? (
          <HStack space={2} mt={5} alignItems="center" ml="5">
            <Heading color="primary.600">Cargando controles...</Heading>
            <Spinner color="primary.600" />
          </HStack>
        ) : null}
        {(!ControlStore.controlList.hasData ||
          ControlStore.controlList.data.length === 0) &&
        !ControlStore.controlList.loading ? (
          <Alert status={'warning'} w="100%" alignItems="center" mt={5}>
            <Alert.Icon />
            <Alert.Title flexShrink={1}>
              No se han encontrado controles.
            </Alert.Title>
          </Alert>
        ) : null}
        {!ControlStore.controlList.loading &&
        ControlStore.controlList.hasData ? (
          <SwipeListView
            removeClippedSubviews={true}
            windowSize={1}
            data={ControlStore.controlList.data}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-130}
            previewRowKey={'1'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            keyExtractor={item => String(item.id)}
          />
        ) : null}
      </VStack>
    </SafeAreaView>
  );
};

export default observer(ListadoControlesScreen);
