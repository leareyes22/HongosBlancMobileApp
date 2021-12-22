import React from 'react';
import { observer } from 'mobx-react-lite';
import { createStackNavigator } from '@react-navigation/stack';
import SeleccionTareasScreen from './seleccion-tareas.screen';
import AsignacionTareasScreen from './asignacion-tareas.screen';
import SessionStore from '../../stores/session.store';
import TareasDiariasEmpleadoScreen from './tareas-diarias-empleado.screen';
import TareasSemanalesEmpleadoScreen from './tareas-semanales-empleado.screen';

const TareasStackNav = createStackNavigator();

const TareasStack = () => {
  return (
    <TareasStackNav.Navigator initialRouteName="SeleccionScreen">
      <TareasStackNav.Screen
        options={{ headerShown: false }}
        name="SeleccionScreen"
        component={SeleccionTareasScreen}
      />
      <TareasStackNav.Screen
        options={{ headerShown: false }}
        name="AsignacionTareas"
        component={AsignacionTareasScreen}
      />
      {SessionStore.role === 'empleado' && (
        <TareasStackNav.Screen
          options={{ headerShown: false }}
          name="TareasDiarias"
          component={TareasDiariasEmpleadoScreen}
        />
      )}
      {SessionStore.role === 'empleado' && (
        <TareasStackNav.Screen
          options={{ headerShown: false }}
          name="TareasSemanales"
          component={TareasSemanalesEmpleadoScreen}
        />
      )}
    </TareasStackNav.Navigator>
  );
};

export default observer(TareasStack);
