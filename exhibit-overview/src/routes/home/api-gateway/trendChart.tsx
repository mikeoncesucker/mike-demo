import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Chart, Legend, Axis, Geom, Tooltip } from "bizcharts";
import { apiGateway, common } from "../message";
import moment from "moment";

export interface TrendChartProps {
  classes: any;
  intl: any;
  trend: any;
  getTrend: Function;
}
const styles: any = (theme: any) => ({
  root: {}
});
class TrendChart extends React.Component<TrendChartProps, any> {
  constructor(props: Readonly<TrendChartProps>) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { getTrend } = this.props;
    getTrend({
      cb: null
    });
  }
  render() {
    const { classes, trend ,intl} = this.props;
    const { formatMessage } = intl;
    if (!trend) return <div />;

    const lineData = trend.concat(trend).map((item: any, key: number) => {
      return {
        date: item.date,
        value: key < trend.length ? item.success : item.fail,
        type: key < trend.length ? 'success' : 'fail'
      }
    });
    const lineCols = {
      date: {
        range: [0, 1]
      }
    };
    return (
      <div className={classes.root}>
        <Chart
          height={190}
          data={lineData}
          scale={lineCols}
          padding={[25, 30, 70, 80]}
          forceFit
        >
          <Legend
            position="top-right"
            itemFormatter={val => {
              const obj: any = { fail: formatMessage(apiGateway.api_fail), success: formatMessage(apiGateway.api_success) };
              return obj[val];
            }}
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
            name="value"
            label={{
              textStyle: {
                fill: "#9193BF"
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
            position="date*value"
            size={2}
            color={["type", ["#32F0FF", "#A147FF"]]}
            tooltip={[
              "value*type",
              (value, type) => {
                return {
                  name: type === "success" ? formatMessage(apiGateway.api_success): formatMessage(apiGateway.api_fail),
                  value: value
                };
              }
            ]}
          />
          <Geom
            type="area"
            position="date*value"
            color={["type", ["#32F0FF", "#A147FF"]]}
            opacity={0.2}
            tooltip={false}
          />
        </Chart>
      </div>
    );
  }
}
const mapState2Props = ({ apiGateway: { trend } }: any) => ({
  trend
});

const mapDispatch2Props = ({ apiGateway: { getTrend } }: any) => ({
  getTrend
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(TrendChart)
);
