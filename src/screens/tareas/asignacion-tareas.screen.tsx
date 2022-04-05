import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Alert,
  Button,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  ScrollView,
  Select,
  Spinner,
  TextArea,
  VStack,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import createLocalObservable from './state/asignacion-tareas.state';
import moment from 'moment';
import UsuarioStore from '../../stores/usuario.store';
import SalaStore from '../../stores/sala.store';
import TareaStore from '../../stores/tareas.store';
// eslint-disable-next-line no-unused-vars
import { SalaDTO } from '../../models/sala';
// eslint-disable-next-line no-unused-vars
import { UsuarioDTO } from '../../models/usuario-list';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AsignacionTareasScreen = () => {
  const localObservable = useLocalObservable(createLocalObservable);

  useEffect(() => {
    UsuarioStore.getEmpleadosListFromAPI();
    SalaStore.getSalasListFromAPI();
  }, []);

  const loadTaskButtonDisabled =
    localObservable.tarea.descripcion === '' ||
    localObservable.tarea.id_personal_asignado === -1 ||
    localObservable.tarea.id_sala === -1;

  return (
    <ScrollView flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <VStack space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Asignación de tareas
        </Heading>
        <FormControl mb={1} isRequired>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Fecha planificada
          </FormControl.Label>
          <Button
            // eslint-disable-next-line react/jsx-no-bind
            onPress={() =>
              localObservable.setShowFechaPlanificadaDatePicker(true)
            }
            bg="primary.900"
            _text={{ color: 'white' }}>
            {'Fecha planificada: ' +
              moment(localObservable.tarea.fecha_planificada).format(
                'DD/MM/YYYY',
              )}
          </Button>
          {localObservable.showFechaPlanificadaDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={localObservable.tarea.fecha_planificada}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={localObservable.fechaPlanificadaHandler}
              minimumDate={new Date()}
            />
          )}
        </FormControl>
        <FormControl
          mb={1}
          isRequired
          isInvalid={localObservable.descripcionError}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Descripción
          </FormControl.Label>
          <TextArea
            borderColor="primary.900"
            _dark={{
              color: '#000000',
            }}
            onChangeText={localObservable.descripcionHandler}
            placeholder="Ingrese la descripción..."
            maxLength={250}
            value={localObservable.tarea.descripcion}
          />
        </FormControl>
        <FormControl mb={1} isRequired isInvalid={localObservable.idSalaError}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Sala
          </FormControl.Label>
          <Select
            borderColor="primary.900"
            selectedValue={localObservable.tarea.id_sala.toString()}
            minWidth={200}
            placeholder="Seleccione una sala"
            // eslint-disable-next-line react/jsx-no-bind
            onValueChange={localObservable.salaHandler}
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
          <FormControl.ErrorMessage>
            Debe ingresar un valor.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          mb={1}
          isRequired
          isInvalid={localObservable.idPersonalAsignadoError}>
          <FormControl.Label
            _text={{
              color: '#000000',
              bold: true,
            }}>
            Personal asignado
          </FormControl.Label>
          <Select
            borderColor="primary.900"
            selectedValue={localObservable.tarea.id_personal_asignado.toString()}
            minWidth={200}
            placeholder="Seleccione un usuario"
            // eslint-disable-next-line react/jsx-no-bind
            onValueChange={localObservable.personalAsignadoHandler}
            _selectedItem={{
              bg: 'primary.700',
              endIcon: <CheckIcon size={5} />,
            }}
            mt={1}
            _dark={{
              color: '#000000',
            }}>
            {UsuarioStore.usuariosList.data.map(
              (value: UsuarioDTO, index: number) => {
                return (
                  <Select.Item
                    key={index}
                    label={value.username}
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
        <Button
          bg="primary.800"
          startIcon={
            <MaterialCommunityIcons name="upload" color={'#000000'} size={26} />
          }
          disabled={localObservable.submitted || loadTaskButtonDisabled}
          onPress={localObservable.submitHandler}>
          Cargar tarea
        </Button>
        {localObservable.submitted && TareaStore.tarea.loading && (
          <HStack space={2}>
            <Heading color="primary.600">Cargando tarea...</Heading>
            <Spinner color="primary.600" />
          </HStack>
        )}
        {localObservable.submitted && !TareaStore.tarea.hasError && (
          <Alert status={'success'} w="100%">
            <Alert.Icon />
            <Alert.Title flexShrink={1}>
              La tarea se ha cargado exitosamente.
            </Alert.Title>
          </Alert>
        )}
        {localObservable.submitted && TareaStore.tarea.hasError && (
          <Alert status={'error'} w="100%">
            <Alert.Icon />
            <Alert.Title flexShrink={1}>
              Ha ocurrido un error. Contacte a soporte.
            </Alert.Title>
          </Alert>
        )}
      </VStack>
    </ScrollView>
  );
};

export default observer(AsignacionTareasScreen);
