import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  VStack,
} from 'native-base';
import createLocalObservable from './state/login.state';
const logo = require('../../assets/Logo-HongosBlanc.png');
import SessionStore from '../../stores/session.store';

const LoginScreen = () => {
  const localObservable = useLocalObservable(createLocalObservable);

  useEffect(() => {}, [SessionStore.loginError]);

  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <Box alignItems="center">
        <Image alt="Alternate Text" source={logo} size="2xl" />
      </Box>
      <VStack space={2} mt={5}>
        <FormControl isInvalid={localObservable.usernameRequiredError}>
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
            _invalid={{
              borderColor: 'red',
            }}
          />
          <FormControl.ErrorMessage>
            Debe ingresar un nombre de usuario.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={localObservable.passwordRequiredError}>
          <FormControl.Label
            _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
            Contraseña
          </FormControl.Label>
          <Input
            onChangeText={localObservable.setPassword}
            type="password"
            borderColor="primary.900"
            _dark={{
              color: '#000000',
            }}
            _invalid={{
              borderColor: 'red',
            }}
          />
          <FormControl.ErrorMessage>
            Debe ingresar una contraseña.
          </FormControl.ErrorMessage>
        </FormControl>
        <VStack space={2}>
          <Button
            bg="primary.900"
            _text={{ color: 'white' }}
            // eslint-disable-next-line react/jsx-no-bind
            onPress={localObservable.loginHandler}>
            Iniciar sesión
          </Button>
          <LoadingMessage />
          <ErrorMessage />
        </VStack>
      </VStack>
    </Box>
  );
};

const LoadingMessage = () => {
  const shouldRender = SessionStore.loading;
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

const ErrorMessage = () => {
  const shouldRender = !SessionStore.loading && SessionStore.loginError;
  if (!shouldRender) {
    return null;
  }
  return (
    <Alert status={'error'} w="100%">
      <Alert.Icon />
      {SessionStore.loginErrorCode === 500 && (
        <Alert.Title flexShrink={1}>
          Ha ocurrido un error. Contacte a soporte.
        </Alert.Title>
      )}
      {SessionStore.loginErrorCode === 401 && (
        <Alert.Title flexShrink={1}>
          Usuario o contraseña incorrectos. Intente nuevamente.
        </Alert.Title>
      )}
    </Alert>
  );
};

export default observer(LoginScreen);
