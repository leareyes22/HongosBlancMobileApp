import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Dimensions } from 'react-native';
import { Box, Heading, HStack, Spinner, VStack } from 'native-base';
import { BarChart, LineChart, ProgressChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import ReportesStore from '../../stores/reportes.store';
import CosechaStore from '../../stores/cosecha.store';
import ControlStore from '../../stores/control.store';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#FFFFFF',
  backgroundGradientFrom: '#fde68a',
  backgroundGradientTo: '#d97706',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 3) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 3) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  strokeWidth: 2,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const GraficosScreen = () => {
  useEffect(() => {
    ReportesStore.getCantControlesUltimoAñoFromAPI();
    ReportesStore.getControlesData6mesesFromAPI();
    ReportesStore.getCantCosechasUltimoAñoFromAPI();
    ReportesStore.getPercentCosechasPorProductoFromAPI();
    ReportesStore.getCantCosechasKg6mesesFromAPI();
  }, [CosechaStore.cosecha, ControlStore.control]);

  const loading =
    ReportesStore.cantControlesUltimoAño.loading ||
    ReportesStore.cantCosechasKg6meses.loading ||
    ReportesStore.cantCosechasUltimoAño.loading ||
    ReportesStore.controlesData6meses.loading ||
    ReportesStore.percentCosechasPorProducto.loading;

  return (
    <ScrollView style={{ backgroundColor: 'primary.100' }}>
      <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
        <VStack space={2} mt={5}>
          {loading && (
            <HStack space={2}>
              <Heading color="primary.600">Cargando gráficos...</Heading>
              <Spinner color="primary.600" />
            </HStack>
          )}
          {!loading && (
            <Box alignItems="center">
              <Heading size="lg" color="primary.800">
                Cantidad de controles por turno en el último año
              </Heading>
              {ReportesStore.cantControlesUltimoAño.hasData && (
                <BarChart
                  fromZero
                  data={{
                    datasets: [
                      {
                        data: ReportesStore.cantControlesUltimoAño.data
                          .cant_controles,
                      },
                    ],
                    labels: ReportesStore.cantControlesUltimoAño.data.turnos,
                  }}
                  width={screenWidth}
                  height={300}
                  chartConfig={chartConfig}
                  verticalLabelRotation={30}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              )}
              <Heading size="lg" color="primary.800">
                Temperatura promedio (°C) de los controles de los últimos 6
                meses en las salas
              </Heading>
              {ReportesStore.controlesData6meses.hasData && (
                <LineChart
                  data={{
                    labels: ReportesStore.controlesData6meses.data.meses,
                    datasets: [
                      {
                        data: ReportesStore.controlesData6meses.data
                          .temps_aire_prom,
                        color: (opacity = 1) => `rgba(226, 0, 0, ${opacity})`,
                      },
                    ],
                  }}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              )}
              <Heading size="lg" color="primary.800">
                Humedad relativa (%) promedio de los controles de los últimos 6
                meses en las salas
              </Heading>
              {ReportesStore.controlesData6meses.hasData && (
                <LineChart
                  data={{
                    labels: ReportesStore.controlesData6meses.data.meses,
                    datasets: [
                      {
                        data: ReportesStore.controlesData6meses.data
                          .hums_rel_prom,
                        color: (opacity = 1) => `rgba(2, 117, 1, ${opacity})`,
                      },
                    ],
                  }}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              )}
              <Heading size="lg" color="primary.800">
                CO2 (ppm) promedio de los controles de los últimos 6 meses en
                las salas
              </Heading>
              {ReportesStore.controlesData6meses.hasData && (
                <LineChart
                  data={{
                    labels: ReportesStore.controlesData6meses.data.meses,
                    datasets: [
                      {
                        data: ReportesStore.controlesData6meses.data.co2s_prom,
                        color: (opacity = 1) => `rgba(0, 0, 153, ${opacity})`,
                      },
                    ],
                  }}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              )}
              <Heading size="lg" color="primary.800">
                Cantidad de cosechas por turno en el último año
              </Heading>
              {ReportesStore.cantCosechasUltimoAño.hasData && (
                <BarChart
                  fromZero
                  data={{
                    datasets: [
                      {
                        data: ReportesStore.cantCosechasUltimoAño.data
                          .cant_cosechas,
                      },
                    ],
                    labels: ReportesStore.cantCosechasUltimoAño.data.turnos,
                  }}
                  width={screenWidth}
                  height={300}
                  chartConfig={chartConfig}
                  verticalLabelRotation={30}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              )}
              <Heading size="lg" color="primary.800">
                Porcentaje de cosechas por producto en el último año
              </Heading>
              {ReportesStore.percentCosechasPorProducto.hasData && (
                <ProgressChart
                  data={{
                    labels:
                      ReportesStore.percentCosechasPorProducto.data.productos,
                    data: ReportesStore.percentCosechasPorProducto.data
                      .porcentajes,
                  }}
                  width={screenWidth}
                  height={220}
                  strokeWidth={16}
                  radius={32}
                  chartConfig={chartConfig}
                  hideLegend={false}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              )}
              <Heading size="lg" color="primary.800">
                Cantidad de Kg. cosechados por mes en los últimos 6 meses
              </Heading>
              {ReportesStore.cantCosechasKg6meses.hasData && (
                <LineChart
                  data={{
                    labels: ReportesStore.cantCosechasKg6meses.data.meses,
                    datasets: [
                      {
                        data: ReportesStore.cantCosechasKg6meses.data
                          .totales_kg,
                      },
                    ],
                  }}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              )}
            </Box>
          )}
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default observer(GraficosScreen);
