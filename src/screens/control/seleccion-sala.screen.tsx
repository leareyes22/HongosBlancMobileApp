import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  VStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SeleccionSalaScreen = ({ navigation }: any) => {
  const [value, setValue] = useState('');

  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <VStack space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Control
        </Heading>
        <FormControl>
          <FormControl.Label
            _text={{
              color: '#000000',
            }}>
            Usuario
          </FormControl.Label>
          <Input
            borderColor="primary.900"
            _dark={{
              color: '#000000',
            }}
          />
        </FormControl>
        <FormControl mb={5}>
          <FormControl.Label
            _text={{
              color: '#000000',
            }}>
            Sala
          </FormControl.Label>
          <Select
            borderColor="primary.900"
            selectedValue={value}
            minWidth={200}
            placeholder="Seleccione una sala"
            // eslint-disable-next-line react/jsx-no-bind
            onValueChange={itemValue => {
              setValue(itemValue);
            }}
            _selectedItem={{
              bg: 'primary.700',
              endIcon: <CheckIcon size={5} />,
            }}
            mt={1}
            _dark={{
              color: '#000000',
            }}>
            <Select.Item label="Sala 1" value="1" />
            <Select.Item label="Sala 2" value="2" />
            <Select.Item label="Sala 3" value="3" />
            <Select.Item label="Sala 4" value="4" />
          </Select>
        </FormControl>
        <FormControl mb={5}>
          <FormControl.Label
            _text={{
              color: '#000000',
            }}>
            Estado de sala
          </FormControl.Label>
          <Input
            borderColor="primary.900"
            _dark={{
              color: '#000000',
            }}
          />
        </FormControl>
        <FormControl mb={5}>
          <FormControl.Label
            _text={{
              color: '#000000',
            }}>
            Día de sala
          </FormControl.Label>
          <Input
            borderColor="primary.900"
            _dark={{
              color: '#000000',
            }}
          />
        </FormControl>
      </VStack>
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
          onPress={() => navigation.goBack()}
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
          onPress={() => navigation.navigate('Temperaturas')}>
          Cargar Datos
        </IconButton>
      </HStack>
    </Box>
  );
};

export default observer(SeleccionSalaScreen);
