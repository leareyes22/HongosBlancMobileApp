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
  Text,
  TextArea,
  VStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input';
import createLocalObservable from './state/cargar-datos.state';
// eslint-disable-next-line no-unused-vars
import { SalaDTO } from '../../models/sala';
import ProductoStore from '../../stores/producto.store';
import CosechaStore from '../../stores/cosecha.store';
// eslint-disable-next-line no-unused-vars
import ProductoDTO from '../../models/producto';

const CargarDatosScreen = ({ navigation }: any) => {
  const localObservable = useLocalObservable(createLocalObservable);

  const [producto, setProducto] = useState('');

  function handleProductoSelect(itemValue: any) {
    setProducto(itemValue);
    ProductoStore.getProductoFromAPI(itemValue);
    CosechaStore.setProducto(itemValue);
  }

  useEffect(() => {
    ProductoStore.getProductosListFromAPI();
  }, []);

  useEffect(() => {}, [
    CosechaStore.cosecha.loading,
    CosechaStore.cosecha.hasError,
  ]);

  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <VStack space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Cargar datos
        </Heading>
        <FormControl
          mb={1}
          isRequired
          isInvalid={localObservable.cosecha.kg_cosechados === 0.0}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Cantidad cosechada (kg)
          </FormControl.Label>
          <NumericInput
            value={localObservable.cosecha.kg_cosechados}
            totalWidth={240}
            totalHeight={50}
            onChange={localObservable.kgCosechadosHandler}
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
          isInvalid={CosechaStore.cosecha.data.id_producto === -1}>
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
            placeholder="Seleccione un producto"
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
            {ProductoStore.productosList.data.map(
              (value: ProductoDTO, index: number) => {
                return (
                  <Select.Item
                    key={index}
                    label={value.nombre}
                    value={value.id.toString()}
                  />
                );
              },
            )}
          </Select>
          <FormControl.ErrorMessage>
            Debe ingresar un valor.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mb={1}>
          <Text
            _dark={{
              color: '#000000',
            }}>
            {'Descripción: ' + ProductoStore.producto.data.descripcion}
          </Text>
        </FormControl>
        <FormControl
          mb={1}
          isRequired
          isInvalid={localObservable.cosecha.observaciones === ''}>
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
          <FormControl.ErrorMessage>
            Debe ingresar un valor.
          </FormControl.ErrorMessage>
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
            onPress={() => navigation.navigate('SeleccionSala')}
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
            disabled={
              producto === '' || localObservable.cosecha.kg_cosechados === 0
            }
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
  const shouldRender = props.submitted && CosechaStore.cosecha.loading;
  if (!shouldRender) {
    return null;
  }
  return (
    <HStack space={2}>
      <Heading color="primary.600">Cargando cosecha...</Heading>
      <Spinner color="primary.600" />
    </HStack>
  );
};

const SuccessMessage = (props: any) => {
  const shouldRender =
    props.submitted &&
    !CosechaStore.cosecha.hasError &&
    !CosechaStore.cosecha.loading;
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
  const shouldRender = props.submitted && CosechaStore.cosecha.hasError;
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
