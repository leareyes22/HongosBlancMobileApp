import React, { useEffect, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Icon,
  VStack,
  Pressable,
  Text,
  Modal,
  FormControl,
  Input,
  Button,
  Select,
  CheckIcon,
} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import createLocalObservable from './state/edit-user-modal.state';
import RolStore from '../../stores/rol.store';
// eslint-disable-next-line no-unused-vars
import RolDTO from '../../models/rol';
import sessionStore from '../../stores/session.store';

const EditUserModal = (props: any) => {
  const [showModal, setShowModal] = useState(false);

  const localObservable = useLocalObservable(createLocalObservable);

  function onOpen() {
    setShowModal(true);
  }

  function onClose() {
    setShowModal(false);
  }

  function onSubmit() {
    localObservable.editHandler();
  }

  function handleRolSelect(itemValue: any) {
    localObservable.setIdRol(itemValue);
  }

  useEffect(() => {
    RolStore.getRolesListFromAPI();
    localObservable.init(props.user);
  }, []);

  return (
    <>
      <Pressable
        w="70px"
        ml="auto"
        bg="coolGray.200"
        justifyContent="center"
        _pressed={{
          opacity: 0.5,
        }}
        onPress={onOpen}>
        <VStack alignItems="center" space={2}>
          <Icon
            as={<FontAwesome5 name="user-edit" color={'#000000'} size={26} />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            Editar
          </Text>
        </VStack>
      </Pressable>

      <Modal isOpen={showModal} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Editar usuario</Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={localObservable.usernameRequiredError}>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                value={localObservable.usuario.username}
                onChangeText={localObservable.setUsername}
              />
              <FormControl.ErrorMessage>
                Debe ingresar un nombre de usuario.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              mt="3"
              isInvalid={localObservable.passwordRequiredError}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={localObservable.usuario.password}
                onChangeText={localObservable.setPassword}
              />
              <FormControl.ErrorMessage>
                Debe ingresar una contraseña.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              mt="3"
              isInvalid={localObservable.usuario.id_rol === -1}>
              <FormControl.Label>Rol</FormControl.Label>
              <Select
                isDisabled={
                  sessionStore.username === localObservable.usuario.username
                }
                selectedValue={localObservable.usuario.id_rol.toString()}
                minWidth={200}
                placeholder="Seleccione un rol"
                onValueChange={handleRolSelect}
                _selectedItem={{
                  bg: 'primary.700',
                  endIcon: <CheckIcon size={5} />,
                }}
                mt={1}>
                {RolStore.rolesList.data.map((value: RolDTO, index: number) => {
                  return (
                    <Select.Item
                      key={index}
                      label={value.nombre}
                      value={value.id.toString()}
                    />
                  );
                })}
              </Select>
              <FormControl.ErrorMessage>
                Debe seleccionar un rol.
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                Cancelar
              </Button>
              <Button bg="primary.700" onPress={onSubmit}>
                Guardar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default observer(EditUserModal);
