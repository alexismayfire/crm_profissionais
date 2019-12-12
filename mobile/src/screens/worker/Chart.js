import React from 'react';
import { View, Text, Dimensions, SafeAreaView } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit';

class Chart extends React.Component {
    render(){
        const data = {
            labels: ["Novembro", "Dezembro"],
            datasets: [
              {
                data: [500, 200]
              }
            ]
          };
          const chartConfig = {
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#ffa726",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            //strokeWidth: 2, // optional, default 3
            //barPercentage: 0.5
          };
        return(
            <SafeAreaView>
                <View>
                    <Text>Seus agendamentos</Text>
                    <LineChart
                        data={{
                        labels: ["Novembro", "Dezembro"],
                        datasets: [
                            {
                            data: [
                                /*Math.floor(Math.random() * 10),
                                Math.floor(Math.random() * 10)*/
                                5,
                                2
                            ]
                            }
                        ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        yAxisLabel={""}
                        yAxisSuffix={""}
                        chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                        }}
                        bezier
                        style={{
                        marginVertical: 8,
                        borderRadius: 16
                        }}
                    />
                </View>
                <View>
                <Text>Seus faturamentos</Text>
                <BarChart data={data} width={Dimensions.get("window").width} height={220}
yAxisLabel={'$'} chartConfig={chartConfig} verticalLabelRotation={30} />
                </View>
            </SafeAreaView>
        );
    }
}

export default Chart;