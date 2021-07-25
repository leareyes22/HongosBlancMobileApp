import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, HStack, Icon, IconButton, StatusBar, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const AppBar = () => {
  const navigation = useNavigation();

  return (
    <Box>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="#6200ee" />
      <HStack
        bg="#6200ee"
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems="center">
        <HStack space={4} alignItems="center">
          <IconButton icon={<Icon size="sm" as="menu" color="white" />} />
          <Text color="white" fontSize={20} fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack space={2}>
          <IconButton icon={<Icon as="favorite" size="sm" color="white" />} />
          <IconButton icon={<Icon as="search" color="white" size="sm" />} />
          <IconButton icon={<Icon as="more-vert" size="sm" color="white" />} />
        </HStack>
      </HStack>
    </Box>
  );
};

export default observer(AppBar);
