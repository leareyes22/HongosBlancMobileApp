import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, HStack, Text } from 'native-base';

const StatusBar = () => {
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
    </HStack>
  );
};

export default observer(StatusBar);
