import React from "react";
import moment from "moment";
import { injectIntl } from "react-intl";

import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
export interface LoopCharts {
  labelRender: any;
  data: any;
  colorCallback: any;
  innerContent: any;
  locale: any;
  classes: any;
  label: any;
  value: any;
  DataView: Function;
}
class Charts extends React.Component<any, any> {
  render() {
    const cpuData = this.props.data.cpu.map((item: any) => {
      return {
        time: moment(item.time).format("HH:mm"),
        data: item.data
      };
    });
    const { title, ip } = this.props;

    const cols = {
      time: {
        tickCount: 5
      }
    };
    return (
      <div>
        <Chart
          height={220}
          data={cpuData}
          scale={cols}
          padding={[60, 25, 30, 75]}
          forceFit
        >
          <Legend
            position="top-right"
            textStyle={{
              textAlign: "start",
              fill: "#9193BF",
              fontSize: "12",
              fontWeight: "400"
            }}
            custom={true}
            items={[{ value: ip, fill: "#A147FF", marker: "hyphen" }]}
          />
          <Axis
            name="time"
            line={{
              stroke: "dddddd",
              fill: "#979797"
            }}
            tickLine={null}
            label={{
              textStyle: {
                fill: "#9193BF",
                fontSize: "12",
                fontWeight: "400",
                textBaseline: "bottom"
              },
              formatter: val => {
                return val;
              }
            }}
          />
          <Axis
            name="data"
            grid={{
              type: "line",
              lineStyle: {
                stroke: "#3B437D",
                lineWidth: 1
              }
            }}
            label={{
              offset: 40,
              textStyle: {
                textAlign: "start",
                fill: "#9193BF",
                fontSize: "12",
                fontWeight: "400",
                rotate: 0
              },
              formatter: val => {
                return `${val}%`;
              }
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
            g2-tooltip={{
              backgroundColor: "#000B49",
              opacity: 0.8,
              boxShadow: "0px 9px 33px 0px rgba(32,31,67,0.06)",
              borderRadius: "3px",
              border: "1px solid rgba(62,116,255,1)",
              color: "#B9BBDD"
            }}
          />
          <Geom
            type="line"
            position="time*data"
            size={2}
            color="#A147FF"
            tooltip={[
              "time*data",
              (time, data) => {
                return {
                  name: title,
                  value: `${data}%`,
                  title: time
                };
              }
            ]}
          />
          <Geom
            type="area"
            position="time*data"
            color="#A147FF"
            opacity={0.3}
            tooltip={false}
          />
        </Chart>
      </div>
    );
  }
}
export default injectIntl(Charts);
