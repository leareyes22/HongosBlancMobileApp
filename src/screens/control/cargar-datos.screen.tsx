import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Spinner,
  TextArea,
  VStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input';
import createLocalObservable from './state/cargar-datos.state';
import ControlStore from '../../stores/control.store';

const CargarDatosScreen = ({ navigation }: any) => {
  const localObservable = useLocalObservable(createLocalObservable);

  useEffect(() => {}, [
    ControlStore.control.loading,
    ControlStore.control.hasError,
  ]);

  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <VStack space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Cargar Datos
        </Heading>
        <FormControl
          mb={1}
          isRequired
          isInvalid={localObservable.control.temperatura_aire === 0}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Temperatura del Aire
          </FormControl.Label>
          <NumericInput
            value={localObservable.control.temperatura_aire}
            totalWidth={240}
            totalHeight={50}
            onChange={localObservable.tempAireHandler}
            minValue={17.0}
            maxValue={27.0}
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
        <FormControl
          mb={1}
          isRequired
          isInvalid={localObservable.control.humedad_relativa === 0}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Humedad Relativa
          </FormControl.Label>
          <NumericInput
            value={localObservable.control.humedad_relativa}
            totalWidth={240}
            totalHeight={50}
            onChange={localObservable.humRelativaHandler}
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
        <FormControl
          mb={1}
          isRequired
          isInvalid={localObservable.control.co2 === 0}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Porcentaje de CO2
          </FormControl.Label>
          <NumericInput
            value={localObservable.control.co2}
            totalWidth={240}
            totalHeight={50}
            onChange={localObservable.porcentajeCO2Handler}
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
        <FormControl
          mb={1}
          isRequired
          isInvalid={localObservable.control.observaciones === ''}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Observaciones
          </FormControl.Label>
          <TextArea
            defaultValue="N/A."
            borderColor="primary.900"
            _dark={{
              color: '#000000',
            }}
            onChangeText={localObservable.observacionesHandler}
            placeholder="Ingrese las observaciones..."
            maxLength={250}
          />
        </FormControl>
        <LoadingMessage submitted={localObservable.submitted} />
        <SuccessMessage submitted={localObservable.submitted} />
        <ErrorMessage submitted={localObservable.submitted} />
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
            disabled={localObservable.submitted}
            onPress={localObservable.submitHandler}
            flex={2}>
            Cargar datos
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

const LoadingMessage = (props: any) => {
  const shouldRender = props.submitted && ControlStore.control.loading;
  if (!shouldRender) {
    return null;
  }
  return (
    <HStack space={2}>
      <Heading color="primary.600">Cargando control...</Heading>
      <Spinner color="primary.600" />
    </HStack>
  );
};

const SuccessMessage = (props: any) => {
  const shouldRender = props.submitted && !ControlStore.control.hasError;
  if (!shouldRender) {
    return null;
  }
  return (
    <Alert status={'success'} w="100%">
      <Alert.Icon />
      <Alert.Title flexShrink={1}>
        El control se ha cargado exitosamente.
      </Alert.Title>
    </Alert>
  );
};

const ErrorMessage = (props: any) => {
  const shouldRender = props.submitted && ControlStore.control.hasError;
  if (!shouldRender) {
    return null;
  }
  return (
    <Alert status={'error'} w="100%">
      <Alert.Icon />
      <Alert.Title flexShrink={1}>
        Ha ocurrido un error. Contacte a soporte.
      </Alert.Title>
    </Alert>
  );
};

export default observer(CargarDatosScreen);
