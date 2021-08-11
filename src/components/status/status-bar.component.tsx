import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, HStack, Text } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';

const StatusBar = () => {
  //This should be in Session Store
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!_.isNull(state.isConnected)) {
        setOnline(state.isConnected);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <HStack
      shadow={9}
      bg="primary.700"
      px={1}
      py={3}
      justifyContent="space-between"
      alignItems="center">
      <Text color="white" fontSize={25} marginLeft={2}>
        Hongos Blanc
      </Text>
      {online && (
        <Box
          bg="#2980b9"
          borderColor="#000000"
          borderRadius="md"
          border={1}
          p={2}
          marginRight={2}
          _text={{
            fontSize: 'md',
            fontWeight: 'bold',
            color: 'white',
          }}>
          <Text fontSize={15}>Con conexión</Text>
        </Box>
      )}
      {!online && (
        <Box
          bg="grey"
          borderColor="#000000"
          borderRadius="md"
          border={1}
          p={2}
          marginRight={2}
          _text={{
            fontSize: 'md',
            fontWeight: 'bold',
            color: 'white',
          }}>
          <Text fontSize={15}>Sin conexión</Text>
        </Box>
      )}
    </HStack>
  );
};

export default observer(StatusBar);
