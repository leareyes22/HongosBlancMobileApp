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
import CosechaStore from '../../stores/cosecha.store';
import CosechaDetailsModal from '../../components/cosecha/cosecha-details.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import CosechaFilterModal from '../../components/cosecha/cosecha-filter.component';

const ListadoCosechasScreen = () => {
  useEffect(() => {
    CosechaStore.getCosechaListFromAPI();
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
    <HStack flex={1} pl="83%">
      <CosechaDetailsModal cosecha={data.item} />
    </HStack>
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#d6d3d1', height: '100%' }}>
      <VStack space={2} mt={5}>
        <Heading pl={2} size="lg" color="primary.800">
          Listado de cosechas
        </Heading>
        <CosechaFilterModal />
        {CosechaStore.cosechaList.loading && (
          <HStack space={2} mt={5} alignItems="center" ml="5">
            <Heading color="primary.600">Cargando cosechas...</Heading>
            <Spinner color="primary.600" />
          </HStack>
        )}
        {(!CosechaStore.cosechaList.hasData ||
          CosechaStore.cosechaList.data.length === 0) &&
          !CosechaStore.cosechaList.loading && (
            <Alert status={'warning'} w="100%" alignItems="center" mt={5}>
              <Alert.Icon />
              <Alert.Title flexShrink={1}>
                No se han encontrado cosechas.
              </Alert.Title>
            </Alert>
          )}
        {!CosechaStore.cosechaList.loading && CosechaStore.cosechaList.hasData && (
          <SwipeListView
            data={CosechaStore.cosechaList.data}
            // eslint-disable-next-line react/jsx-no-bind
            renderItem={renderItem}
            // eslint-disable-next-line react/jsx-no-bind
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-60}
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

export default observer(ListadoCosechasScreen);
