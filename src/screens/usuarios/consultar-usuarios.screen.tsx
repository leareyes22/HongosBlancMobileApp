import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import UsuarioStore from '../../stores/usuario.store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import SessionStore from '../../stores/session.store';
import EditUserModalComponent from '../../components/users/edit-user-modal.component';

const ConsultarUsuariosScreen = () => {
  useEffect(() => {
    UsuarioStore.getUsuariosListFromAPI();
  }, []);

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    Alert.alert('El usuario será eliminado', '¿Está seguro?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => {
          UsuarioStore.deleteUser(rowKey);
          closeRow(rowMap, rowKey);
          const newData = [...UsuarioStore.usuariosList.data];
          const prevIndex = UsuarioStore.usuariosList.data.findIndex(
            item => item.id === rowKey,
          );
          newData.splice(prevIndex, 1);
          UsuarioStore.setUsuariosList(newData);
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
                {item.username}
              </Text>
              <Text color="#000000" _dark={{ color: '#000000' }}>
                {item.rol}
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
    <HStack flex={1} pl="3">
      <EditUserModalComponent user={data.item}/>
      <Pressable
        w="70px"
        bg="red.500"
        justifyContent="center"
        disabled={data.item.id === SessionStore.user_id}
        // eslint-disable-next-line react/jsx-no-bind
        onPress={() => deleteRow(rowMap, data.item.id)}
        _pressed={{
          opacity: 0.5,
        }}
        _disabled={{
          backgroundColor: 'grey',
        }}>
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Borrar
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#d6d3d1' }}>
      <VStack space={2} mt={5}>
        <Heading pl={2} size="lg" color="primary.800">
          Consultar Usuarios
        </Heading>
        <SwipeListView
          data={UsuarioStore.usuariosList.data}
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
      </VStack>
    </ScrollView>
  );
};

export default observer(ConsultarUsuariosScreen);
