import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Alert,
  Box,
  Button,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  Input,
  Select,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import createLocalObservable from './state/registrar-usuario.state';
import UsuarioStore from '../../stores/usuario.store';
import RolStore from '../../stores/rol.store';
// eslint-disable-next-line no-unused-vars
import RolDTO from '../../models/rol';
import { ScrollView } from 'react-native-gesture-handler';

const RegistrarUsuarioScreen = () => {
  const localObservable = useLocalObservable(createLocalObservable);

  useEffect(() => {
    RolStore.getRolesListFromAPI();
  }, []);

  useEffect(() => {}, [
    UsuarioStore.usuario.loading,
    UsuarioStore.usuario.hasError,
  ]);

  return (
    <ScrollView style={{ backgroundColor: '#d6d3d1' }}>
      <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
        <VStack space={4} mt={5}>
          <Heading size="lg" color="primary.800">
            Registrar usuario
          </Heading>
          <FormControl
            isInvalid={
              localObservable.repeatPassword !==
                localObservable.usuario.password &&
              localObservable.submitted &&
              !localObservable.success
            }>
            <FormControl
              pb="10px"
              isRequired
              isInvalid={
                localObservable.usuario.username === '' &&
                localObservable.submitted &&
                !localObservable.success
              }>
              <FormControl.Label
                _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
                Nombre de usuario
              </FormControl.Label>
              <Input
                onChangeText={localObservable.setUsername}
                borderColor="primary.900"
                _dark={{
                  color: '#000000',
                }}
                value={localObservable.usuario.username}
              />
              <FormControl.ErrorMessage>
                Debe ingresar un nombre de usuario.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              pb="10px"
              isRequired
              isInvalid={
                localObservable.usuario.password === '' &&
                localObservable.submitted &&
                !localObservable.success
              }>
              <FormControl.Label
                _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
                Contraseña
              </FormControl.Label>
              <Input
                type="password"
                onChangeText={localObservable.setPassword}
                borderColor="primary.900"
                _dark={{
                  color: '#000000',
                }}
                value={localObservable.usuario.password}
              />
              <FormControl.ErrorMessage>
                Debe ingresar una contraseña.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              pb="10px"
              isRequired
              isInvalid={
                localObservable.usuario.password === '' &&
                localObservable.submitted &&
                !localObservable.success
              }>
              <FormControl.Label
                _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
                Repetir contraseña
              </FormControl.Label>
              <Input
                type="password"
                onChangeText={localObservable.setRepeatPassword}
                borderColor="primary.900"
                _dark={{
                  color: '#000000',
                }}
                value={localObservable.repeatPassword}
              />
              <FormControl.ErrorMessage>
                Debe repetir la contraseña.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              pb="10px"
              isRequired
              isInvalid={
                localObservable.usuario.email === '' &&
                localObservable.submitted &&
                !localObservable.success
              }>
              <FormControl.Label
                _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
                Email
              </FormControl.Label>
              <Input
                type="text"
                onChangeText={localObservable.setEmail}
                borderColor="primary.900"
                _dark={{
                  color: '#000000',
                }}
                value={localObservable.usuario.email}
              />
              <FormControl.ErrorMessage>
                Debe ingresar un email.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              pb="10px"
              isRequired
              isInvalid={
                localObservable.usuario.nombre === '' &&
                localObservable.submitted &&
                !localObservable.success
              }>
              <FormControl.Label
                _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
                Nombre
              </FormControl.Label>
              <Input
                type="text"
                onChangeText={localObservable.setNombre}
                borderColor="primary.900"
                _dark={{
                  color: '#000000',
                }}
                value={localObservable.usuario.nombre}
              />
              <FormControl.ErrorMessage>
                Debe ingresar un nombre.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              pb="10px"
              isRequired
              isInvalid={
                localObservable.usuario.apellido === '' &&
                localObservable.submitted &&
                !localObservable.success
              }>
              <FormControl.Label
                _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
                Apellido
              </FormControl.Label>
              <Input
                type="text"
                onChangeText={localObservable.setApellido}
                borderColor="primary.900"
                _dark={{
                  color: '#000000',
                }}
                value={localObservable.usuario.apellido}
              />
              <FormControl.ErrorMessage>
                Debe ingresar un apellido.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              pb="10px"
              isRequired
              isInvalid={
                localObservable.usuario.id_rol === -1 &&
                localObservable.submitted &&
                !localObservable.success
              }>
              <FormControl.Label
                _text={{
                  color: 'muted.800',
                  fontSize: 'sm',
                  fontWeight: 600,
                }}>
                Rol
              </FormControl.Label>
              <Select
                borderColor="primary.900"
                selectedValue={localObservable.usuario.id_rol.toString()}
                minWidth={200}
                placeholder="Seleccione un rol"
                onValueChange={localObservable.handleRolSelect}
                _selectedItem={{
                  bg: 'primary.700',
                  endIcon: <CheckIcon size={5} />,
                }}
                mt={1}
                _dark={{
                  color: '#000000',
                }}>
                {RolStore.rolesList.data.map((value: RolDTO, index: number) => {
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
                Debe seleccionar un rol.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl pb="10px">
              <Text
                _dark={{
                  color: '#000000',
                }}>
                {'Descripción: ' +
                  (RolStore.rol.data.descripcion
                    ? RolStore.rol.data.descripcion
                    : '')}
              </Text>
            </FormControl>
            <FormControl.ErrorMessage>
              Las contraseñas deben coincidir.
            </FormControl.ErrorMessage>
          </FormControl>
          <Button
            bg="primary.900"
            _text={{ color: 'white' }}
            onPress={localObservable.submitHandler}>
            Registrar Usuario
          </Button>
          <SuccessMessage
            submitted={localObservable.submitted}
            matchError={localObservable.matchError}
          />
          <ErrorMessage submitted={localObservable.submitted} />
          <LoadingMessage />
        </VStack>
      </Box>
    </ScrollView>
  );
};

const LoadingMessage = () => {
  const shouldRender = UsuarioStore.usuario.loading;
  if (!shouldRender) {
    return null;
  }
  return (
    <HStack space={2}>
      <Heading color="primary.600">Cargando...</Heading>
      <Spinner color="primary.600" />
    </HStack>
  );
};

const SuccessMessage = (props: any) => {
  const shouldRender =
    props.submitted &&
    !props.matchError &&
    !UsuarioStore.usuario.hasError &&
    !UsuarioStore.usuario.loading;
  if (!shouldRender) {
    return null;
  }
  return (
    <Alert status={'success'} w="100%">
      <Alert.Icon />
      <Alert.Title flexShrink={1}>
        El usuario se ha registrado exitosamente.
      </Alert.Title>
    </Alert>
  );
};

const ErrorMessage = (props: any) => {
  const shouldRender =
    props.submitted &&
    !UsuarioStore.usuario.loading &&
    UsuarioStore.usuario.hasError;
  if (!shouldRender) {
    return null;
  }
  return (
    <Alert status={'error'} w="100%">
      <Alert.Icon />
      {UsuarioStore.usuario.errorCode === 500 && (
        <Alert.Title flexShrink={1}>
          Ha ocurrido un error. Contacte a soporte.
        </Alert.Title>
      )}
      {UsuarioStore.usuario.errorCode === 400 && (
        <Alert.Title flexShrink={1}>
          Los datos ingresados son inválidos. Intente nuevamente.
        </Alert.Title>
      )}
    </Alert>
  );
};

export default observer(RegistrarUsuarioScreen);
