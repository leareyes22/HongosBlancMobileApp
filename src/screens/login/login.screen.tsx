import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Box, Button, FormControl, Image, Input, VStack } from 'native-base';
import createLocalObservable from './login.state';
const logo = require('../../assets/Logo-HongosBlanc.png');

const LoginScreen = () => {
  const localObservable = useLocalObservable(createLocalObservable);

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
        </VStack>
      </VStack>
    </Box>
  );
};

export default observer(LoginScreen);
