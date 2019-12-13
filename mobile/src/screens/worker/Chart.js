import React from 'react';
import { View, Text, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

import { Containers, Spacing } from 'styles';

class Chart extends React.Component {
  render() {
    const data = {
      labels: ['Novembro', 'Dezembro'],
      datasets: [
        {
          data: [500, 200],
        },
      ],
    };

    const chartConfig = {
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#ffa726',
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    const chartWidth = Dimensions.get('window').width - Spacing.MEDIUM * 2;

    return (
      <SafeAreaView style={styles.content}>
        <View>
          <Text>Seus agendamentos</Text>
          <LineChart
            data={{
              labels: ['Novembro', 'Dezembro'],
              datasets: [
                {
                  data: [5, 2],
                },
              ],
            }}
            width={chartWidth} // from react-native
            height={220}
            yAxisLabel={''}
            yAxisSuffix={''}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View>
          <Text>Seus faturamentos</Text>
          <BarChart
            data={data}
            width={chartWidth}
            height={220}
            yAxisLabel={'$'}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    ...Containers.createStyles.content(),
    ...Spacing.mediumMargin,
  },
});

export default Chart;
