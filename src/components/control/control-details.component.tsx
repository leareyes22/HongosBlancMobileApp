import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon, VStack, Pressable, Text, Modal, Box } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ControlStore from '../../stores/control.store';
import moment from 'moment';

const ControlDetailsModal = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const [controlTemperaturas, setControlTemperaturas] = useState([]);

  function onOpen() {
    setShowModal(true);
  }

  function onClose() {
    setShowModal(false);
  }

  useEffect(() => {
    ControlStore.getControlTemperaturas(props.control.id).then(temperaturas => {
      setControlTemperaturas(temperaturas);
    });
  }, []);

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
                  moment(props.control.fecha_control).format(
                    'DD/MM/YYYY hh:mm',
                  )}
              </Text>
              <Text>{'Sala: ' + props.control.sala}</Text>
              <Text>{'Personal: ' + props.control.personal}</Text>
              <Text>{'Turno: ' + props.control.turno}</Text>
              <Text>
                {'Temperatura del aire (°C): ' + props.control.temperatura_aire}
              </Text>
              <Text>
                {'Humedad relativa (%): ' + props.control.humedad_relativa}
              </Text>
              <Text>{'CO2 (ppm): ' + props.control.co2}</Text>
              <Text>{'Observaciones: ' + props.control.observaciones}</Text>
              {controlTemperaturas.length > 0
                ? controlTemperaturas.map((temp: any, index: number) => {
                    return (
                      <Box key={index} alignItems="flex-start">
                        <Text>
                          {'Temperatura promedio cama ' +
                            temp.nro_cama +
                            ': ' +
                            temp.temp_prom}
                        </Text>
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

export default observer(ControlDetailsModal);
