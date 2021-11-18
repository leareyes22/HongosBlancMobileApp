import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Icon,
  VStack,
  Pressable,
  Text,
  Modal,
  Image,
  Heading,
  Box,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ControlStore from '../../stores/control.store';

const ControlFotosModal = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const [controlImages, setControlImages] = useState([]);

  function onOpen() {
    setShowModal(true);
  }

  function onClose() {
    setShowModal(false);
  }

  async function setData() {
    let images = await ControlStore.getControlImages(props.controlId);
    setControlImages(images);
  }

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      <Pressable
        w="70px"
        bg="coolGray.400"
        justifyContent="center"
        onPress={onOpen}
        _pressed={{
          opacity: 0.5,
        }}
        _disabled={{
          backgroundColor: 'grey',
        }}>
        <VStack alignItems="center" space={2}>
          <Icon
            as={<MaterialIcons name="photo-camera" />}
            color="white"
            size="xs"
          />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Fotos
          </Text>
        </VStack>
      </Pressable>

      <Modal isOpen={showModal} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Fotos</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              {controlImages.length > 0 &&
                controlImages.map((img: string, index: number) => {
                  return (
                    <Box key={index} alignItems="center">
                      <Heading>{'Cama ' + (index + 1)}</Heading>
                      <Image
                        source={{
                          uri: controlImages[index],
                        }}
                        alt="Alternate Text"
                        size={'xl'}
                        borderRadius="12px"
                      />
                    </Box>
                  );
                })}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default observer(ControlFotosModal);
