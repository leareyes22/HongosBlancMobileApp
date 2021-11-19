import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon, VStack, Pressable, Text, Modal } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const CosechaDetailsModal = (props: any) => {
  const [showModal, setShowModal] = useState(false);

  function onOpen() {
    setShowModal(true);
  }

  function onClose() {
    setShowModal(false);
  }

  return (
    <>
      <Pressable
        w="70px"
        bg="#1892D7"
        justifyContent="center"
        onPress={onOpen}
        _pressed={{
          opacity: 0.5,
        }}
        _disabled={{
          backgroundColor: 'grey',
        }}>
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="info" />} color="black" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Detalles
          </Text>
        </VStack>
      </Pressable>

      <Modal isOpen={showModal} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Detalles</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Text>
                {'Fecha: ' +
                  moment(props.cosecha.fecha_cosechada).format(
                    'DD/MM/YYYY hh:mm',
                  )}
              </Text>
              <Text>{'Sala: ' + props.cosecha.sala}</Text>
              <Text>{'Personal: ' + props.cosecha.personal}</Text>
              <Text>{'Turno: ' + props.cosecha.turno}</Text>
              <Text>{'Producto: ' + props.cosecha.producto}</Text>
              <Text>{'Kg cosechados: ' + props.cosecha.kg_cosechados}</Text>
              <Text>{'Observaciones: ' + props.cosecha.observaciones}</Text>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default observer(CosechaDetailsModal);
