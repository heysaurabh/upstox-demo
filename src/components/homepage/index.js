import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class HomePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: {
          type: "candlestick",
          height: 350,
        },
        title: {
          text: "Historical Data",
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  }
  componentDidMount() {
    this.fetchHistoricalData();
  }

  fetchHistoricalData() {
    fetch("http://kaboom.rksv.net/api/historical")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            series: this.formatResponseData(result),
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }
  formatResponseData(data) {
    if (data.length > 0) {
      const chartData = data.slice(0, 50).map((dataItem) => {
        let item = [];
        dataItem
          .split(",")
          .slice(0, 5)
          .forEach((x) => {
            item.push(Number(x));
          });

        return item;
      });
      return [{ data: chartData }];
    }
    return [];
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="candlestick"
        height={450}
      />
    );
  }
}

export default HomePageComponent;
