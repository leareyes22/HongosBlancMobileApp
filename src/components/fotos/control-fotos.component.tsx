import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Icon,
  VStack,
  Pressable,
  Text,
  Modal,
  Heading,
  Box,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ControlStore from '../../stores/control.store';
import FastImage from 'react-native-fast-image';

const ControlFotosModal = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const [controlImages, setControlImages] = useState([]);

  function onOpen() {
    setShowModal(true);
  }

  function onClose() {
    setShowModal(false);
  }

  useEffect(() => {
    ControlStore.getControlImages(props.controlId).then(images => {
      setControlImages(images);
    });
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
              {controlImages.length > 0
                ? controlImages.map((img: string, index: number) => {
                    return (
                      <Box key={index} alignItems="center">
                        <Heading>{'Cama ' + (index + 1)}</Heading>
                        <FastImage
                          style={{
                            width: 120,
                            height: 120,
                            borderRadius: 12,
                          }}
                          source={{
                            uri: controlImages[index],
                            priority: FastImage.priority.normal,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </Box>
                    );
                  })
                : null}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default observer(ControlFotosModal);
