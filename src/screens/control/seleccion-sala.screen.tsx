import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Select,
  Text,
  VStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SessionStore from '../../stores/session.store';

const SeleccionSalaScreen = ({ navigation }: any) => {
  const [sala, setSala] = useState('');
  const [turno, setTurno] = useState('');

  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <VStack space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Control
        </Heading>
        <Text
          mb={2}
          _dark={{
            color: '#000000',
            bold: true,
          }}>
          {'Usuario: ' + SessionStore.username}
        </Text>
        <FormControl mb={1}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Sala
          </FormControl.Label>
          <Select
            borderColor="primary.900"
            selectedValue={sala}
            minWidth={200}
            placeholder="Seleccione una sala"
            // eslint-disable-next-line react/jsx-no-bind
            onValueChange={itemValue => {
              setSala(itemValue);
            }}
            _selectedItem={{
              bg: 'primary.700',
              endIcon: <CheckIcon size={5} />,
            }}
            mt={1}
            _dark={{
              color: '#000000',
            }}>
            <Select.Item label="Sala 1" value="1" />
            <Select.Item label="Sala 2" value="2" />
            <Select.Item label="Sala 3" value="3" />
            <Select.Item label="Sala 4" value="4" />
          </Select>
        </FormControl>
        <FormControl mb={5}>
          <Text
            _dark={{
              color: '#000000',
            }}>
            {'Estado de sala: ' + 'Activa'}
          </Text>
        </FormControl>
        <FormControl mb={5}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Turno
          </FormControl.Label>
          <Select
            borderColor="primary.900"
            selectedValue={turno}
            minWidth={200}
            placeholder="Seleccione un turno"
            // eslint-disable-next-line react/jsx-no-bind
            onValueChange={itemValue => {
              setTurno(itemValue);
            }}
            _selectedItem={{
              bg: 'primary.700',
              endIcon: <CheckIcon size={5} />,
            }}
            mt={1}
            _dark={{
              color: '#000000',
            }}>
            <Select.Item label="Mañana" value="1" />
            <Select.Item label="Tarde" value="2" />
          </Select>
        </FormControl>
      </VStack>
      <HStack space={250}>
        <IconButton
          bg="primary.800"
          variant="solid"
          icon={
            <MaterialCommunityIcons
              name="arrow-left"
              color={'#000000'}
              size={26}
            />
          }
          flex={1}
          // eslint-disable-next-line react/jsx-no-bind
          onPress={() => navigation.goBack()}
        />
        <IconButton
          bg="primary.800"
          variant="solid"
          icon={
            <MaterialCommunityIcons
              name="arrow-right"
              color={'#000000'}
              size={26}
            />
          }
          flex={1}
          // eslint-disable-next-line react/jsx-no-bind
          onPress={() => navigation.navigate('Temperaturas')}>
          Cargar Datos
        </IconButton>
      </HStack>
    </Box>
  );
};

export default observer(SeleccionSalaScreen);
