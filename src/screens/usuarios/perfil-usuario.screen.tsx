import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import CameraModal from '../../components/camera/camera-modal.component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UsuarioStore from '../../stores/usuario.store';
import SessionStore from '../../stores/session.store';

const PerfilUsuarioScreen = () => {
  const [showCam, setShowCam] = useState(false);

  function onCameraOpen() {
    setShowCam(true);
  }

  function onTakePhoto(data: any) {
    let image = new FormData();
    image.append('image', {
      uri: data.uri,
      name: 'user-picture.jpg',
      type: 'image/jpg',
    });
    UsuarioStore.uploadUserImage(image, SessionStore.user_id);
  }

  useEffect(() => {
    UsuarioStore.getUsuario(SessionStore.user_id);
    UsuarioStore.getUserImage(SessionStore.user_id);
  }, []);

  return (
    <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
      <VStack space={2} mt={5}>
        <Heading pl={2} size="lg" color="primary.800">
          Perfil de usuario
        </Heading>
        {UsuarioStore.userImage.loading && (
          <HStack space={2}>
            <Heading color="primary.600">Cargando foto...</Heading>
            <Spinner color="primary.600" />
          </HStack>
        )}
        {UsuarioStore.userImage.hasData && (
          <Avatar
            pb={2}
            mb={4}
            bg="primary.800"
            alignSelf="center"
            size="2xl"
            source={{ uri: UsuarioStore.userImage.data }}
          />
        )}
        <Button
          bg="primary.800"
          mx="auto"
          onPress={onCameraOpen}
          startIcon={
            <MaterialCommunityIcons name="camera" color={'#000000'} size={26} />
          }>
          Subir foto
        </Button>
        <CameraModal
          showCam={showCam}
          setShowCam={setShowCam}
          setFoto={onTakePhoto}
          header={'Tomar foto'}
          side={'front'}
        />
        <Text pl={2} pr={2} fontSize="lg" color="primary.800">
          {'Nombre: ' + UsuarioStore.usuarioFinded.data.nombre}
        </Text>
        <Text pl={2} pr={2} fontSize="lg" color="primary.800">
          {'Apellido: ' + UsuarioStore.usuarioFinded.data.apellido}
        </Text>
        <Text pl={2} pr={2} fontSize="lg" color="primary.800">
          {'Email: ' + UsuarioStore.usuarioFinded.data.email}
        </Text>
        <Text pl={2} pr={2} fontSize="lg" color="primary.800">
          {'Rol: ' + UsuarioStore.usuarioFinded.data.rol}
        </Text>
      </VStack>
    </Box>
  );
};

export default observer(PerfilUsuarioScreen);
