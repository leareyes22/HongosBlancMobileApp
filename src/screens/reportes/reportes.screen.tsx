import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Dimensions } from 'react-native';
import { Box, Heading, VStack } from 'native-base';
import {
  LineChart,
  ProgressChart,
  StackedBarChart,
} from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import controlStore from '../../stores/control.store';

const data = {
  labels: ['P1', 'P2'], // optional
  data: [0.4, 0.6],
};

const data2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Rainy Days'], // optional
};

const data3 = {
  labels: ['Test1', 'Test2'],
  legend: ['L1', 'L2', 'L3'],
  data: [
    [60, 60, 60],
    [30, 30, 60],
  ],
  barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
};

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const ReportesScreen = () => {
  /*useEffect(() => {
    controlStore.syncControls();
  }, []);*/

  return (
    <ScrollView>
      <Box flex={1} p={2} w="100%" mx="auto" bg="primary.100">
        <VStack space={2} mt={5}>
          <Heading size="lg" color="primary.800">
            Reportes
          </Heading>
          <Box alignItems="center">
            <ProgressChart
              data={data}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          </Box>
          <Box alignItems="center">
            <LineChart
              data={data2}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
          </Box>
          <Box alignItems="center">
            <StackedBarChart
              hideLegend={false}
              data={data3}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default observer(ReportesScreen);
