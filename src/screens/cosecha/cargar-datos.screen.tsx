import React, { useEffect, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Alert,
  Box,
  Button,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Select,
  Spinner,
  TextArea,
  VStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input';
import createLocalObservable from './state/cargar-datos.state';
import ControlStore from '../../stores/control.store';
import SalaStore from '../../stores/sala.store';
// eslint-disable-next-line no-unused-vars
import { SalaDTO } from '../../models/sala';

const CargarDatosScreen = ({ navigation }: any) => {
  const localObservable = useLocalObservable(createLocalObservable);

  const [producto, setProducto] = useState('');

  function handleProductoSelect(itemValue: any) {
    setProducto(itemValue);
    //SalaStore.getSalaFromAPI(itemValue);
    //ControlStore.setSala(itemValue);
  }

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
          //</VStack>isInvalid={localObservable.control.temperatura_aire === 0}>
        >
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Cantidad Cosechada
          </FormControl.Label>
          <NumericInput
            //value={localObservable.control.temperatura_aire}
            totalWidth={240}
            totalHeight={50}
            onChange={() => console.log('cosecha')}
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
            Producto
          </FormControl.Label>
          <Select
            borderColor="primary.900"
            selectedValue={producto}
            minWidth={200}
            placeholder="Seleccione una sala"
            // eslint-disable-next-line react/jsx-no-bind
            onValueChange={handleProductoSelect}
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
        <FormControl
          mb={1}
          isRequired
          >
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Porcentaje de CO2
          </FormControl.Label>
          <NumericInput
            totalWidth={240}
            totalHeight={50}
            onChange={() => console.log('cosecha')}
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
          isRequired>
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
            onChangeText={() => console.log('cosecha')}
            placeholder="Ingrese las observaciones..."
            maxLength={250}
          />
        </FormControl>
        <LoadingMessage submitted={true} />
        <SuccessMessage submitted={true} />
        <ErrorMessage submitted={true} />
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
            disabled={true}
            //onPress={localObservable.submitHandler}
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
        La cosecha se ha cargado exitosamente.
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
