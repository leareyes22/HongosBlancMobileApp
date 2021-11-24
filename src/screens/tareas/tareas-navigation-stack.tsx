import React from 'react';
import { observer } from 'mobx-react-lite';
import { createStackNavigator } from '@react-navigation/stack';
import SeleccionTareasScreen from './seleccion-tareas.screen';

const TareasStackNav = createStackNavigator();

const TareasStack = () => {
  return (
    <TareasStackNav.Navigator initialRouteName="SeleccionScreen">
      <TareasStackNav.Screen
        options={{ headerShown: false }}
        name="SeleccionScreen"
        component={SeleccionTareasScreen}
      />
    </TareasStackNav.Navigator>
  );
};

export default observer(TareasStack);
