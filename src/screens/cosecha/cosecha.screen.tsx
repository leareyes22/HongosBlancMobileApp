import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Heading, VStack } from 'native-base';

const CosechaScreen = () => {
  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <VStack space={2} mt={5}>
        <Heading size="lg" color="primary.800">
          Cosecha
        </Heading>
      </VStack>
    </Box>
  );
};

export default observer(CosechaScreen);
