import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input';
import SessionStore from '../../stores/session.store';
import SalaStore from '../../stores/sala.store';

const TemperaturasScreen = ({ navigation }: any) => {
  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
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
          Temperaturas cama 1
        </Heading>
        <HStack mx="auto" space={100}>
          <NumericInput
            //value={this.state.value}
            onChange={value => console.log(value)}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            minValue={0.0}
            step={0.1}
            valueType="real"
            rounded
            textColor="black"
            rightButtonBackgroundColor="#f59e0b"
            leftButtonBackgroundColor="#d97706"
          />
          <NumericInput
            //value={this.state.value}
            onChange={value => console.log(value)}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            minValue={0.0}
            step={0.1}
            valueType="real"
            rounded
            textColor="black"
            rightButtonBackgroundColor="#f59e0b"
            leftButtonBackgroundColor="#d97706"
          />
        </HStack>
        <HStack mx="auto" space={100}>
          <NumericInput
            //value={this.state.value}
            onChange={value => console.log(value)}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            minValue={0.0}
            step={0.1}
            valueType="real"
            rounded
            textColor="black"
            rightButtonBackgroundColor="#f59e0b"
            leftButtonBackgroundColor="#d97706"
          />
          <NumericInput
            //value={this.state.value}
            onChange={value => console.log(value)}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            minValue={0.0}
            step={0.1}
            valueType="real"
            rounded
            textColor="black"
            rightButtonBackgroundColor="#f59e0b"
            leftButtonBackgroundColor="#d97706"
          />
        </HStack>
        <HStack mx="auto" space={100}>
          <NumericInput
            //value={this.state.value}
            onChange={value => console.log(value)}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            minValue={0.0}
            step={0.1}
            valueType="real"
            rounded
            textColor="black"
            rightButtonBackgroundColor="#f59e0b"
            leftButtonBackgroundColor="#d97706"
          />
          <NumericInput
            //value={this.state.value}
            onChange={value => console.log(value)}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            minValue={0.0}
            step={0.1}
            valueType="real"
            rounded
            textColor="black"
            rightButtonBackgroundColor="#f59e0b"
            leftButtonBackgroundColor="#d97706"
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
