import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReportesStack from '../screens/reportes/reportes-navigation-stack';
import TareasStack from '../screens/tareas/tareas-navigation-stack';

const TabJefe = createMaterialBottomTabNavigator();

function TabJefeBar() {
  return (
    <TabJefe.Navigator
      initialRouteName="Reportes"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#b45309' }}>
      <TabJefe.Screen
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
      <TabJefe.Screen
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
    </TabJefe.Navigator>
  );
}

export default TabJefeBar;
