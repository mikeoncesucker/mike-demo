import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import { dataCenter, common } from "../message";
export interface PlatformLineProps {
  lineChartData: any;
  intl: any;
  getLineChartData: Function;
}

class PlatformLine extends React.Component<PlatformLineProps, any> {
  constructor(props: Readonly<PlatformLineProps>) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getLineChartData({
      params: {},
      cb: null
    })
  }
  render() {
    const { lineChartData, intl } = this.props;
    const {formatMessage } = intl;
    return (
      <div>
        {lineChartData ? (
          <Chart
            height={window.innerWidth/9.5}
            scale={{
              apiCount: {
                alias: formatMessage(dataCenter.center_share_number),
                min: 0,
                minTickInterval: 1
              }
            }}
            data={lineChartData}
            padding="auto"
            forceFit
          >
            <Legend
              position="top-right"
              custom={true}
              items={[
                { value: formatMessage(dataCenter.center_share_number), fill: "#00FFF8", marker: "square" }
              ]}
            />
            <Axis
              name="date"
              label={{
                textStyle: {
                  fill: "#9193BF"
                },
                formatter: val => moment(val).format('MM.DD')
              }}
            />
            <Axis
              grid={{
                lineStyle: {
                  stroke: "#3B437D",
                }
              }}
              name="apiCount"
              label={{
                textStyle: {
                  fill: "#9193BF",
                  fontSize: "14"
                },
                formatter: val => `${val}${formatMessage(common.number)}`
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
              position="date*apiCount"
              size={2}
              color="#00FFF8"
            />
            <Geom
              type="area"
              position="date*apiCount"
              color={"#00FFF8"}
              opacity={0.2}
              tooltip={false}
            />
          </Chart>
        ) : (
          <p
            style={{
              minHeight: "200px",
              color: "#fff",
              textAlign: "center",
              lineHeight: "200px"
            }}
          >
            <span>{formatMessage(common.no_data)}</span>
          </p>
        )}
      </div>
    );
  }
}
const mapState2Props = ({ 
  centerRawData: { lineChartData }
}: any) => ({
  lineChartData
});
const mapDispatch2Props = ({
  centerRawData: {
    getLineChartData,
  }
}: any) => ({
  getLineChartData,
});
export default connect(mapState2Props,mapDispatch2Props)(PlatformLine);
