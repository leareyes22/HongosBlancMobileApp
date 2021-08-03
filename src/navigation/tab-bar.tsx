import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CosechaScreen from '../screens/cosecha/cosecha.screen';
import ReportesScreen from '../screens/reportes/reportes.screen';
import TareasScreen from '../screens/tareas/tareas.screen';
import ControlNavigationStack from '../screens/control/control-navigation-stack';

const Tab = createMaterialBottomTabNavigator();

function TabBar() {
  return (
    <Tab.Navigator
      initialRouteName="Reportes"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#b45309' }}>
      <Tab.Screen
        name="Reportes"
        component={ReportesScreen}
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
      <Tab.Screen
        name="Tareas"
        component={TareasScreen}
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
      <Tab.Screen
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
      <Tab.Screen
        name="Cosecha"
        component={CosechaScreen}
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
    </Tab.Navigator>
  );
}

export default TabBar;
