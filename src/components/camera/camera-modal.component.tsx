import React from 'react';
import { observer } from 'mobx-react-lite';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Modal, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CameraModal = (props: any) => {
  const takePicture = async function (camera: any) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
    props.setShowCam(false);
  };

  return (
    <Container style={styles.container}>
      <Modal isOpen={props.showCam}>
        <RNCamera style={styles.preview} type={RNCamera.Constants.Type.back}>
          {({ camera, status }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Button
                  bg="primary.800"
                  mx="auto"
                  onPress={() => takePicture(camera)}
                  startIcon={
                    <MaterialCommunityIcons
                      name="camera"
                      color={'#000000'}
                      size={26}
                    />
                  }>
                  Tomar foto
                </Button>
              </View>
            );
          }}
        </RNCamera>
      </Modal>
    </Container>
  );
};

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default observer(CameraModal);
