import React from "react";
import moment from "moment";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import { cockpit, paasHardware } from "../message";
import { injectIntl } from "react-intl";

export interface LoopCharts {
  labelRender: any;
  data: any;
  colorCallback: any;
  innerContent: any;
  locale: any;
  classes: any;
  label: any;
  DataView: Function;
}
class Charts extends React.Component<any, any> {
  render() {
    const lineCols = {
      time: {
        tickCount: 5
      }
    };
    let lineData = [];
    let used: any,
      total: any = "";
    const { field, data, intl } = this.props;
    const { formatMessage } = intl;

    const offset = field === "network" ? 65 : 50;
    switch (field) {
      case "memory":
        lineData = data.memoryTotal
          .concat(data.memoryUser)
          .map((item: any, key: number) => {
            return {
              time: moment(item.time).format("HH:mm"),
              data: item.data,
              type: key < data.memoryTotal.length ? "total" : "used"
            };
          });
        used = formatMessage(cockpit.service);
        total = formatMessage(cockpit.total);
        break;
      case "network":
        lineData = data.network_sent
          .concat(data.network_receive)
          .map((item: any, key: number) => {
            return {
              time: moment(item.time).format("HH:mm"),
              data: item.data,
              type: key < data.network_sent.length ? "total" : "used"
            };
          });
        used = formatMessage(paasHardware.receive);
        total = formatMessage(paasHardware.send);
        break;
      case "file":
        lineData = data.fileTotal
          .concat(data.fileUser)
          .map((item: any, key: number) => {
            return {
              time: moment(item.time).format("HH:mm"),
              data: item.data,
              type: key < data.fileTotal.length ? "total" : "used"
            };
          });
        used = formatMessage(cockpit.used);
        total = formatMessage(cockpit.total);
        break;
      default:
        break;
    }
    return (
      <div>
        {lineData.length ? (
          <Chart
            height={220}
            data={lineData}
            scale={lineCols}
            padding={[60, 25, 30, 75]}
            forceFit
          >
            <Legend
              position="top-right"
              itemFormatter={val => {
                const obj: any = { used, total };
                return obj[val];
              }}
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
                offset,
                textStyle: {
                  textAlign: "start",
                  fill: "#9193BF",
                  fontSize: "12",
                  fontWeight: "400",
                  rotate: 0
                },
                formatter: val => {
                  if (field === "network") {
                    return `${val}MB/s`;
                  } else {
                    return `${val}GB`;
                  }
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
              color={["type", ["#32F0FF", "#A147FF"]]}
              tooltip={[
                "data*type*time",
                (data, type, time) => {
                  let name: any = type === "used" ? `${used}` : `${total}`;
                  let value: any;
                  if (field === "network") {
                    value = `${data}MB/s`;
                  } else {
                    value = `${data}GB`;
                  }
                  return {
                    name,
                    value,
                    title: time
                  };
                }
              ]}
            />
            <Geom
              type="area"
              position="time*data"
              color={["type", ["#32F0FF", "#A147FF"]]}
              opacity={0.2}
              tooltip={false}
            />
          </Chart>
        ) : (
          <p style={{ lineHeight: "192px", color: "#80A6FB" }}>
            {formatMessage(paasHardware.noData)}
          </p>
        )}
      </div>
    );
  }
}
export default injectIntl(Charts);

