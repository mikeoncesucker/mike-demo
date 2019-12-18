import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";

import { common } from "../message";

export interface LoopCharts {
  data: any;
  intl: any;
}
class Charts extends React.Component<any, any> {
  render() {
    const { data, intl } = this.props;
    const { formatMessage } = intl;
    const dataList = data.map((item:any)=> {
      item.restart = parseInt(item.restart)
      return item
    })
    return (
      <div>
        <Chart height={227} data={dataList} padding={[10, 65, 65, 60]} forceFit>
          <Axis name="shortName"
            position={"bottom"}
            line={{
              stroke: 'dddddd',
              fill: '#979797',
            }}
            tickLine={null}
            label={{
              textStyle: {
                fill: '#A0A4AA', 
                fontSize: '12', 
                fontWeight: '400',
                rotate: 10, 
                textBaseline: 'bottom', 
              },
              formatter: (val) => {
                return `${val}`
              }
            }}
          />
          <Axis name="restart"
            grid={{
              type: 'line', 
              lineStyle: {
                stroke: '#3B437D', 
                lineWidth: 1,
              }, 
            }}
            label={{
              offset: intl.locale === "zh" ? 40:50,
              textStyle: {
                textAlign: 'start', 
                fill: '#A0A4AA',
                fontSize: '12', 
                fontWeight: '400', 
                rotate: 0, 
              },
              formatter: val => `${val} ${formatMessage(common.number)}`,
            }} />
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
            crosshairs={{
              type: "y"
            }}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Geom
            color="l(90)  0:#01B4FF 1:#1747FF "
            type="interval"
            position="shortName*restart"
            tooltip={
              ['shortName*restart', (shortName, restart) => {
                return {
                  name: shortName,
                  value: restart
                };
              }]
            }
          />
        </Chart>
      </div>
    );
  }
}
export default (Charts);
