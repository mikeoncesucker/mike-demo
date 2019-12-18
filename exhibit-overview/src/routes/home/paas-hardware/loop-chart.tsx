import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  Guide,
} from "bizcharts";
import DataSet from "@antv/data-set";

import { paasHardware } from "../message";

export interface LoopCharts {
  data: any;
  intl: any
}
class Charts extends React.Component<any, any> {
  render() {
    const { total, data } = this.props.data;
    const { formatMessage } = this.props.intl;
    if (data === undefined || data.length === 0) {
      return <div></div>;
    }
    const { DataView } = DataSet;
    const { Html } = Guide;
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "run",
      dimension: "shortName",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: (val: any) => {
          val = (val * 100).toFixed(2) + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Chart
          height={300}
          data={dv}
          scale={cols}
          padding={[-20, 200, 0, 30]}
          forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend
            textStyle={{
              textAlign: 'start', 
              fill: '#D1D8E9',
              fontSize: '12', 
              fontWeight: '500', 
            }}
            position="right"
            offsetY={-110}
            offsetX={50}
          />
          <Tooltip
            showTitle={false}
            g2-tooltip={{
              backgroundColor: "#000B49",
              opacity: 0.8,
              boxShadow: "0px 9px 33px 0px rgba(32,31,67,0.06)",
              borderRadius: "3px",
              border: "1px solid rgba(62,116,255,1)",
              color: "#B9BBDD"
            }}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html={
                  `<div style=&quot;text-align: center;width: 4em;&quot;>
                    <span style=color:#fff;font-size:27px;>${total}</span>
                    <br><span style=color:#fff;font-size:12px;>${formatMessage(paasHardware.paasHardware_service_number)}</span>
                  </div>`
              }
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={['shortName', ['#1346E7', '#49B6C0', '#A702E5', '#D26A88', '#FFE700', '#5BB682']]}
            tooltip={[
              "shortName*percent",
              (shortName, percent) => {
                percent = (parseFloat(percent) * 100).toFixed(2) + "%";
                return {
                  name: shortName,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              textStyle={{
                fill: '#9DDAFF', 
                fontSize: '12', 
                fontWeight: '500', 
              }}
              content="percent"
              formatter={(val, shortName) => {
                return shortName.point.run + formatMessage(paasHardware.paasHardware_records)
              }}
            />
          </Geom>
        </Chart>
      </div>
    )
  }
}
export default (Charts);