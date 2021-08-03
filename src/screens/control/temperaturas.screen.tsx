import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Input,
  VStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TemperaturasScreen = ({ navigation }: any) => {
  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <HStack space={3} mx="auto" alignItems="center">
        <Center
          size={16}
          bg="primary.200"
          rounded="md"
          _text={{
            color: 'black',
          }}
          shadow={3}>
          Usuario
        </Center>
        <Center
          bg="primary.200"
          size={16}
          rounded="md"
          _text={{
            color: 'black',
          }}
          shadow={3}>
          Sala
        </Center>
        <Center
          size={16}
          bg="primary.200"
          rounded="md"
          _text={{
            color: 'black',
          }}
          shadow={3}>
          Estado
        </Center>
      </HStack>
      <VStack space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Temperaturas cama 1
        </Heading>
        <HStack mx="auto" space={180}>
          <Input
            isRequired
            width={100}
            placeholder="1"
            keyboardType="numeric"
            _dark={{
              color: '#000000',
            }}
          />
          <Input
            isRequired
            width={100}
            placeholder="4"
            keyboardType="numeric"
            _dark={{
              color: '#000000',
            }}
          />
        </HStack>
        <HStack mx="auto" space={180}>
          <Input
            isRequired
            width={100}
            placeholder="2"
            keyboardType="numeric"
            _dark={{
              color: '#000000',
            }}
          />
          <Input
            isRequired
            width={100}
            placeholder="5"
            keyboardType="numeric"
            _dark={{
              color: '#000000',
            }}
          />
        </HStack>
        <HStack mx="auto" space={180}>
          <Input
            isRequired
            width={100}
            placeholder="3"
            keyboardType="numeric"
            _dark={{
              color: '#000000',
            }}
          />
          <Input
            isRequired
            width={100}
            placeholder="6"
            keyboardType="numeric"
            _dark={{
              color: '#000000',
            }}
          />
        </HStack>
        <Button
          bg="primary.800"
          mx="auto"
          startIcon={
            <MaterialCommunityIcons name="camera" color={'#000000'} size={26} />
          }>
          Tomar foto
        </Button>
        <HStack space={250}>
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
            flex={1}
            // eslint-disable-next-line react/jsx-no-bind
            onPress={() => navigation.navigate('CargarDatos')}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default observer(TemperaturasScreen);
