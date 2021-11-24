import { Box, Button, Image, VStack } from 'native-base';
import React from 'react';
const logo = require('../../assets/Logo-HongosBlanc.png');

const SeleccionTareasScreen = ({ navigation }: any) => {
  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <Box alignItems="center" mt="10" mb="10">
        <Image alt="Alternate Text" source={logo} size="2xl" />
      </Box>
      <VStack space={4}>
        <Button
          bg="primary.900"
          _text={{ color: 'white' }}
          // eslint-disable-next-line react/jsx-no-bind
          onPress={() => {
            //navigation.navigate('ListadoControles');
          }}>
          Asignación de tareas
        </Button>
        <Button
          bg="primary.900"
          _text={{ color: 'white' }}
          // eslint-disable-next-line react/jsx-no-bind
          onPress={() => {
            //navigation.navigate('ListadoCosechas');
          }}>
          Listado de tareas
        </Button>
      </VStack>
    </Box>
  );
};

export default SeleccionTareasScreen;
