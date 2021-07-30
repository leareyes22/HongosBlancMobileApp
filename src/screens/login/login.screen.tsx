import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, FormControl, Image, Input, VStack } from 'native-base';
import SessionStore from '../../stores/session.store';
const logo = require('../../assets/Logo-HongosBlanc.png');

const LoginScreen = () => {
  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <Box alignItems="center">
        <Image alt="Alternate Text" source={logo} size="2xl" />
      </Box>
      <VStack space={2} mt={5}>
        <FormControl>
          <FormControl.Label
            _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
            Nombre de usuario
          </FormControl.Label>
          <Input borderColor="primary.900" />
        </FormControl>
        <FormControl mb={5}>
          <FormControl.Label
            _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
            Contraseña
          </FormControl.Label>
          <Input type="password" borderColor="primary.900" />
        </FormControl>
        <VStack space={2}>
          <Button
            bg="primary.900"
            _text={{ color: 'white' }}
            // eslint-disable-next-line react/jsx-no-bind
            onPress={() => {
              SessionStore.setLoggedIn(true);
            }}>
            Iniciar sesión
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default observer(LoginScreen);
