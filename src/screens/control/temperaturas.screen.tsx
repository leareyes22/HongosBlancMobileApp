import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Button,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input';
import SessionStore from '../../stores/session.store';
import SalaStore from '../../stores/sala.store';
import createLocalObservable from './state/temperaturas.state';
import CameraModal from '../../components/camera/camera-modal.component';
import ControlStore from '../../stores/control.store';

const TemperaturasScreen = ({ navigation }: any) => {
  const localObservable = useLocalObservable(createLocalObservable);

  const nextDisabled =
    localObservable.tempActual.t1 === 0.0 ||
    localObservable.tempActual.t2 === 0.0 ||
    localObservable.tempActual.t3 === 0.0 ||
    localObservable.tempActual.t4 === 0.0 ||
    localObservable.tempActual.t5 === 0.0 ||
    localObservable.tempActual.t6 === 0.0;

  return (
    <ScrollView flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <VStack space={2}>
        <Text
          _dark={{
            color: '#000000',
          }}>
          {'Usuario: ' + SessionStore.username}
        </Text>
        <Text
          _dark={{
            color: '#000000',
          }}>
          {'Sala: ' + SalaStore.sala.data.nombre}
        </Text>
        <Text
          _dark={{
            color: '#000000',
          }}>
          {'Estado: ' + SalaStore.sala.data.estado}
        </Text>
      </VStack>
      <VStack space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          {'Temperaturas cama ' + localObservable.nroCamaActual}
        </Heading>
        <FormControl isInvalid={nextDisabled}>
          <HStack mx="auto" space={100}>
            <NumericInput
              initValue={localObservable.tempActual.t1}
              value={localObservable.tempActual.t1}
              onChange={localObservable.t1Handler}
              minValue={17.0}
              maxValue={27.0}
              step={0.1}
              editable={false}
              valueType="real"
              rounded
              textColor="black"
              rightButtonBackgroundColor="#f59e0b"
              leftButtonBackgroundColor="#d97706"
            />
            <NumericInput
              initValue={localObservable.tempActual.t2}
              value={localObservable.tempActual.t2}
              onChange={localObservable.t2Handler}
              minValue={17.0}
              maxValue={27.0}
              step={0.1}
              editable={false}
              valueType="real"
              rounded
              textColor="black"
              rightButtonBackgroundColor="#f59e0b"
              leftButtonBackgroundColor="#d97706"
            />
          </HStack>
          <HStack mx="auto" space={100}>
            <NumericInput
              initValue={localObservable.tempActual.t3}
              value={localObservable.tempActual.t3}
              onChange={localObservable.t3Handler}
              minValue={17.0}
              maxValue={27.0}
              step={0.1}
              editable={false}
              valueType="real"
              rounded
              textColor="black"
              rightButtonBackgroundColor="#f59e0b"
              leftButtonBackgroundColor="#d97706"
            />
            <NumericInput
              initValue={localObservable.tempActual.t4}
              value={localObservable.tempActual.t4}
              onChange={localObservable.t4Handler}
              minValue={17.0}
              maxValue={27.0}
              step={0.1}
              editable={false}
              valueType="real"
              rounded
              textColor="black"
              rightButtonBackgroundColor="#f59e0b"
              leftButtonBackgroundColor="#d97706"
            />
          </HStack>
          <HStack mx="auto" space={100}>
            <NumericInput
              initValue={localObservable.tempActual.t5}
              value={localObservable.tempActual.t5}
              onChange={localObservable.t5Handler}
              minValue={17.0}
              maxValue={27.0}
              step={0.1}
              editable={false}
              valueType="real"
              rounded
              textColor="black"
              rightButtonBackgroundColor="#f59e0b"
              leftButtonBackgroundColor="#d97706"
            />
            <NumericInput
              initValue={localObservable.tempActual.t6}
              value={localObservable.tempActual.t6}
              onChange={localObservable.t6Handler}
              minValue={17.0}
              maxValue={27.0}
              step={0.1}
              editable={false}
              valueType="real"
              rounded
              textColor="black"
              rightButtonBackgroundColor="#f59e0b"
              leftButtonBackgroundColor="#d97706"
            />
          </HStack>
          <FormControl.ErrorMessage>
            Debe completar todos los campos.
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          bg="primary.800"
          mx="auto"
          // eslint-disable-next-line react/jsx-no-bind
          onPress={() => localObservable.setShowCam(true)}
          disabled={localObservable.photoHasTaken}
          startIcon={
            <MaterialCommunityIcons name="camera" color={'#000000'} size={26} />
          }>
          Tomar foto
        </Button>
        <CameraModal
          showCam={localObservable.showCam}
          setShowCam={localObservable.setShowCam}
          setFoto={localObservable.setFoto}
        />
        {ControlStore.controlImage !== '' && (
          <VStack space={2} alignItems="center" safeAreaTop my={6}>
            <Image
              source={{
                uri: ControlStore.controlImage,
              }}
              alt="Alternate Text"
              size={'xl'}
            />
          </VStack>
        )}
        <HStack ml={5} mr={5} space={150}>
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
            disabled={nextDisabled}
            flex={1}
            // eslint-disable-next-line react/jsx-no-bind
            onPress={() => {
              if (localObservable.nroCamaActual === 6) {
                localObservable.pushTemp(localObservable.tempActual);
                localObservable.saveTemperaturas();
                navigation.navigate('CargarDatos');
              } else {
                localObservable.increaseNroCamaActual();
              }
            }}
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default observer(TemperaturasScreen);
