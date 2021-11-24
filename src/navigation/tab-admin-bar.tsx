import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CosechaNavigationStack from '../screens/cosecha/cosecha-navigation-stack';
import ReportesStack from '../screens/reportes/reportes-navigation-stack';
import TareasStack from '../screens/tareas/tareas-navigation-stack';
import ControlNavigationStack from '../screens/control/control-navigation-stack';

const TabAdmin = createMaterialBottomTabNavigator();

function TabAdminBar() {
  return (
    <TabAdmin.Navigator
      initialRouteName="Reportes"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#b45309' }}>
      <TabAdmin.Screen
        name="Reportes"
        component={ReportesStack}
        options={{
          tabBarLabel: 'Reportes',
          // eslint-disable-next-line react/display-name
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="chart-histogram"
              color={'#FFFFFF'}
              size={26}
            />
          ),
        }}
      />
      <TabAdmin.Screen
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
      <TabAdmin.Screen
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
      <TabAdmin.Screen
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
    </TabAdmin.Navigator>
  );
}

export default TabAdminBar;
