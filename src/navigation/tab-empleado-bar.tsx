import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CosechaNavigationStack from '../screens/cosecha/cosecha-navigation-stack';
import TareasStack from '../screens/tareas/tareas-navigation-stack';
import ControlNavigationStack from '../screens/control/control-navigation-stack';

const TabEmpleado = createMaterialBottomTabNavigator();

function TabEmpleadoBar() {
  return (
    <TabEmpleado.Navigator
      initialRouteName="Tareas"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#b45309' }}>
      <TabEmpleado.Screen
        name="Tareas"
        component={TareasStack}
        options={{
          tabBarLabel: 'Tareas',
          // eslint-disable-next-line react/display-name
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="file-document-edit"
              color={'#FFFFFF'}
              size={26}
            />
          ),
        }}
      />
      <TabEmpleado.Screen
        name="Control"
        component={ControlNavigationStack}
        options={{
          tabBarLabel: 'Control',
          // eslint-disable-next-line react/display-name
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="monitor-eye"
              color={'#FFFFFF'}
              size={26}
            />
          ),
        }}
      />
      <TabEmpleado.Screen
        name="Cosecha"
        component={CosechaNavigationStack}
        options={{
          tabBarLabel: 'Cosecha',
          // eslint-disable-next-line react/display-name
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="shopping"
              color={'#FFFFFF'}
              size={26}
            />
          ),
        }}
      />
    </TabEmpleado.Navigator>
  );
}

export default TabEmpleadoBar;
