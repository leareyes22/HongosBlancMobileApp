import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, Heading, HStack, IconButton, VStack } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CargarDatosScreen = ({ navigation }: any) => {
  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <VStack space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Cargar Datos
        </Heading>
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
            flex={1}>
            Cargar datos
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default observer(CargarDatosScreen);
