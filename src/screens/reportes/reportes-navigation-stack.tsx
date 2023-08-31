import React from 'react';
import { observer } from 'mobx-react-lite';
import { createStackNavigator } from '@react-navigation/stack';
import GraficosScreen from './graficos.screen';
import SeleccionReportesScreen from './seleccion-reportes.screen';
import ListadoControlesScreen from './listado-controles.screen';
import ListadoCosechasScreen from './listado-cosechas.screen';

const ReportesStackNav = createStackNavigator();

const ReportesStack = () => {
  return (
    <ReportesStackNav.Navigator initialRouteName="SeleccionScreen">
      <ReportesStackNav.Screen
        options={{ headerShown: false }}
        name="SeleccionScreen"
        component={SeleccionReportesScreen}
      />
      <ReportesStackNav.Screen
        options={{ headerShown: false }}
        name="ListadoControles"
        component={ListadoControlesScreen}
      />
      <ReportesStackNav.Screen
        options={{ headerShown: false }}
        name="ListadoCosechas"
        component={ListadoCosechasScreen}
      />
      <ReportesStackNav.Screen
        options={{ headerShown: false }}
        name="Graficos"
        component={GraficosScreen}
      />
    </ReportesStackNav.Navigator>
  );
};

export default observer(ReportesStack);
