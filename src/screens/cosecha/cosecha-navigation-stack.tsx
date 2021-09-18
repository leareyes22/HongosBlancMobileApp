import React from 'react';
import { observer } from 'mobx-react-lite';
import { createStackNavigator } from '@react-navigation/stack';
import SeleccionSalaScreen from './seleccion-sala.screen';
import CargarDatosScreen from './cargar-datos.screen';

const ControlStackNav = createStackNavigator();

const ControlStack = () => {
  return (
    <ControlStackNav.Navigator initialRouteName="SeleccionSala">
      <ControlStackNav.Screen
        options={{ headerShown: false }}
        name="SeleccionSala"
        component={SeleccionSalaScreen}
      />
      <ControlStackNav.Screen
        options={{ headerShown: false }}
        name="CargarDatos"
        component={CargarDatosScreen}
      />
    </ControlStackNav.Navigator>
  );
};

export default observer(ControlStack);
