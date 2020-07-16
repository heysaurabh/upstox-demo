import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import io from "socket.io-client";

const socketURL = "http://kaboom.rksv.net/watch";
const socket = io(socketURL);

class LiveChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: {
          id: "realtime",
          type: "candlestick",
          height: 350,
        },
        title: {
          text: "Live Chart Data",
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
    this.subscribeData();
  }

  componentWillUnmount() {
    this.unsubscribeData();
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

  subscribeData() {
    socket.emit("sub", { state: !0 });
    socket.on("data", (data, callback) => {
      this.setState({
        series: this.formatResponseData([data]),
      });
      callback(1);
    });
  }

  unsubscribeData() {
    socket.emit("unsub", { state: 0 });
  }
  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
          height={450}
        />
      </div>
    );
  }
}

export default LiveChartComponent;
