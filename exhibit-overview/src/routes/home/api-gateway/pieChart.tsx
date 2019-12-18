import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import DataSet from "@antv/data-set";
import { Chart, Coord, Legend, Axis, Guide, Geom } from "bizcharts";
import { apiGateway } from "../message";
const { Html } = Guide;

export interface PieChartProps {
  classes: any;
  intl: any;
  pieChart: any;
  getPieChart: Function;
}
const styles: any = (theme: any) => ({
  root: {}
});
class PieChart extends React.Component<PieChartProps, any> {
  constructor(props: Readonly<PieChartProps>) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { getPieChart } = this.props;
    getPieChart({
      cb: null
    });
  }
  render() {
    const { classes, pieChart, intl } = this.props;
    const { formatMessage } = intl;
    if (!pieChart) return <div />;

    const loopData = [
      {
        item: formatMessage(apiGateway.api_success),
        count: pieChart.successNum
      },
      {
        item: formatMessage(apiGateway.api_fail),
        count: pieChart.failNum
      }
    ];
    const { DataView } = DataSet;

    const dv = new DataView();
    dv.source(loopData).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const loopcols = {
      percent: {
        formatter: (val: any) => {
          val = (val * 100).toFixed(2);
          return val;
        }
      }
    };
    const fontSize = pieChart.total.toString().length < 8 ? 16 : 16-(pieChart.total.length-8);
    return (
      <div className={classes.root}>
        <Chart
          height={190}
          data={dv}
          scale={loopcols}
          padding={[-10, 250, 20, 30]}
          forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend
            position="right-center"
            offsetY={-5}
            useHtml={true}
            itemTpl={(item: any, color: any, checked: any, index: any) => {
              const percent = (dv.rows[index].percent * 100).toFixed(2) + "%";
              const count = dv.rows[index].count;
              return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">
                      <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>
                      <span class="g2-legend-text">
                        <span style="display: inline-block; width: 25%;">${item}</span>
                        <span title=${count} style="display: inline-block; max-width: 45%; vertical-align: bottom; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${count}</span>
                        <span> | ${percent}</span>
                      </span>
                      </li>`;
            }}
            g2-legend={{
              minWidth: "220px"
            }}
            g2-legend-list-item={{
              width: "220px"
            }}
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html={
                `<div style='color:#D6E5FB;font-size:1em;text-align: center;width: 10em'>
                  <span style='font-size:${fontSize}px'>${pieChart.total}</span></br>${formatMessage(apiGateway.api_totals)}
                </div>`
              }
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
          />
        </Chart>
      </div>
    );
  }
}
const mapState2Props = ({ apiGateway: { pieChart } }: any) => ({
  pieChart
});

const mapDispatch2Props = ({ apiGateway: { getPieChart } }: any) => ({
  getPieChart
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(PieChart)
);
