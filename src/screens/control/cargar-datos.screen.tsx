import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  IconButton,
  TextArea,
  VStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input';
import createLocalObservable from './state/cargar-datos.state';

const CargarDatosScreen = ({ navigation }: any) => {
  const localObservable = useLocalObservable(createLocalObservable);

  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <VStack space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Cargar Datos
        </Heading>
        <FormControl mb={1}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Temperatura del Aire
          </FormControl.Label>
          <NumericInput
            //value={localObservable.tempActual.t1}
            totalWidth={240}
            totalHeight={50}
            onChange={localObservable.tempAireHandler}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            minValue={0.0}
            step={0.1}
            valueType="real"
            rounded
            textColor="black"
            rightButtonBackgroundColor="#f59e0b"
            leftButtonBackgroundColor="#d97706"
          />
          <FormControl.ErrorMessage>
            Debe ingresar un valor.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mb={1}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Humedad Relativa
          </FormControl.Label>
          <NumericInput
            //value={localObservable.tempActual.t1}
            totalWidth={240}
            totalHeight={50}
            onChange={localObservable.humRelativaHandler}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            minValue={0.0}
            step={0.1}
            valueType="real"
            rounded
            textColor="black"
            rightButtonBackgroundColor="#f59e0b"
            leftButtonBackgroundColor="#d97706"
          />
          <FormControl.ErrorMessage>
            Debe ingresar un valor.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mb={1}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Porcentaje de CO2
          </FormControl.Label>
          <NumericInput
            //value={localObservable.tempActual.t1}
            totalWidth={240}
            totalHeight={50}
            onChange={localObservable.porcentajeCO2Handler}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            minValue={0.0}
            step={0.1}
            valueType="real"
            rounded
            textColor="black"
            rightButtonBackgroundColor="#f59e0b"
            leftButtonBackgroundColor="#d97706"
          />
          <FormControl.ErrorMessage>
            Debe ingresar un valor.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mb={1}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Observaciones
          </FormControl.Label>
          <TextArea
            //onChangeText={localObservable.setUsername}
            borderColor="primary.900"
            _dark={{
              color: '#000000',
            }}
            onChangeText={localObservable.observacionesHandler}
            placeholder="Ingrese las observaciones..."
            maxLength={250}
          />
        </FormControl>
        <HStack space={120}>
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
            onPress={() => navigation.navigate('Temperaturas')}
          />
          <Button
            bg="primary.800"
            startIcon={
              <MaterialCommunityIcons
                name="upload"
                color={'#000000'}
                size={26}
              />
            }
            onPress={localObservable.submitHandler}
            flex={1}>
            Cargar datos
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default observer(CargarDatosScreen);
