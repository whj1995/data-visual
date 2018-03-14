import * as React from 'react';
import * as echarts from 'echarts';

let option = {
  series: [
    {
      type: 'pie',
      radius: '55%',
      data: [
        { value: 235, name: '视频' },
        { value: 274, name: '联盟' },
        { value: 310, name: '邮件' }
      ]
    }
  ]
};

export default class NormalPie extends React.Component {
  private chartEle: HTMLDivElement;
  private chart: echarts.ECharts;

  componentDidMount() {
    this.chart = echarts.init(this.chartEle);
    this.chart.setOption(option);
  }

  render() {
    return <div style={{ width: '200px', height: '200px' }} ref={(e) => this.chartEle = e}></div>;
  }
}