export interface LineChart {
  series: LineChartSeries[];
  name: string;
}

export interface LineChartSeries {
  name: string;
  value: number;
}
