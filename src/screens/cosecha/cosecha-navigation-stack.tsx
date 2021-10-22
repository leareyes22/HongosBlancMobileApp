import React from 'react';
import { observer } from 'mobx-react-lite';
import { createStackNavigator } from '@react-navigation/stack';
import SeleccionSalaScreen from './seleccion-sala.screen';
import CargarDatosScreen from './cargar-datos.screen';

const CosechaStackNav = createStackNavigator();

const CosechaStack = () => {
  return (
    <CosechaStackNav.Navigator initialRouteName="SeleccionSala">
      <CosechaStackNav.Screen
        options={{ headerShown: false }}
        name="SeleccionSala"
        component={SeleccionSalaScreen}
      />
      <CosechaStackNav.Screen
        options={{ headerShown: false }}
        name="CargarDatos"
        component={CargarDatosScreen}
      />
    </CosechaStackNav.Navigator>
  );
};

export default observer(CosechaStack);
