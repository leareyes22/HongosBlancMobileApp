import React, { useEffect, useState } from 'react';
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
import SalaStore from '../../stores/sala.store';
import TurnoStore from '../../stores/turno.store';
// eslint-disable-next-line no-unused-vars
import { emptySalaDTO, SalaDTO } from '../../models/sala';
import ControlStore from '../../stores/control.store';
import { emptyTurnoDTO } from '../../models/turno';

const SeleccionSalaScreen = ({ navigation }: any) => {
  const [sala, setSala] = useState('');
  const [turno, setTurno] = useState('');

  useEffect(() => {
    SalaStore.getSalasListFromAPI();
    SalaStore.setSala(emptySalaDTO);
    TurnoStore.setTurno(emptyTurnoDTO);
    setSala('');
    setTurno('');
  }, []);

  useEffect(() => {}, [ControlStore.controlImage]);

  function handleSalaSelect(itemValue: any) {
    setSala(itemValue);
    SalaStore.getSalaFromAPI(itemValue);
    ControlStore.setSala(itemValue);
  }

  function handleTurnoSelect(itemValue: any) {
    setTurno(itemValue);
    TurnoStore.getTurnoFromAPI(itemValue);
    ControlStore.setTurno(itemValue);
  }

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
            onValueChange={handleSalaSelect}
            _selectedItem={{
              bg: 'primary.700',
              endIcon: <CheckIcon size={5} />,
            }}
            mt={1}
            _dark={{
              color: '#000000',
            }}>
            {SalaStore.salasList.data.map((value: SalaDTO, index: number) => {
              return (
                <Select.Item
                  key={index}
                  label={value.nombre}
                  value={value.id.toString()}
                />
              );
            })}
          </Select>
        </FormControl>
        <FormControl mb={1}>
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
            onValueChange={handleTurnoSelect}
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
        <FormControl mb={5}>
          <Text
            _dark={{
              color: '#000000',
            }}>
            {'Descripción: ' + TurnoStore.turno.data.descripcion}
          </Text>
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
          disabled={sala === '' || turno === ''}
          flex={1}
          // eslint-disable-next-line react/jsx-no-bind
          onPress={() => {
            ControlStore.setPersonal(1);
            navigation.navigate('Temperaturas');
          }}>
          Cargar Datos
        </IconButton>
      </HStack>
    </Box>
  );
};

export default observer(SeleccionSalaScreen);
