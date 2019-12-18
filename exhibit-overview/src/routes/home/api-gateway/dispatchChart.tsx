import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import DataSet from "@antv/data-set";
import { Chart, Coord, Axis, Geom, Label, Tooltip, View } from "bizcharts";
import { apiGateway, common } from "../message";
const Views: any = View;

export interface DispatchChartProps {
  classes: any;
  apiList: any;
  dispatchData: any;
  intl: any;
  getDispatchData: Function;
}
const styles: any = (theme: any) => ({
  root: {
    "& .sysApi": {
      display: "flex",
      alignItems: "center",
      margin: "20px 20px 0",
      "& .sys": {
        flex: "2",
        padding: "10px 20px 10px 0"
      },
      "& .api": {
        flex: "1",
        "&>div": {
          border: "1px solid #7A4D03",
          fontSize: "13px",
          color: "#80A6FB"
        },
        "& .title": {
          height: "37px",
          padding: "0 12px",
          background: "#523403",
          fontSize: "14px",
          color: "#F5A623",
          lineHeight: "37px"
        },
        "& p": {
          margin: "10px 15px"
        }
      }
    }
  }
});
class DispatchChart extends React.Component<DispatchChartProps, any> {
  constructor(props: Readonly<DispatchChartProps>) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { getDispatchData, intl } = this.props;
    const language = intl.locale === 'zh' ? 'chinese' : 'english';
    getDispatchData({
      language,
      cb: null
    });
  }
  render() {
    const { classes, dispatchData, apiList, intl } = this.props;
    const { formatMessage } = intl;
    if (!dispatchData || !apiList) return <div />;

    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(dispatchData.system).transform({
      type: "percent",
      field: "count",
      dimension: "systemName",
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

    const dv1 = new DataView();
    dv1.source(dispatchData, {
      type: "graph",
      edges: (d: any) => d.links
    });
    dv1.transform({
      type: "diagram.arc",
      marginRatio: 0.5
    });

    const dv2 = new DataView();
    dv2.source(dispatchData.nodes).transform({
      type: "proportion",
      field: "value",
      dimension: "moduleName",
      as: "proportion"
    });
    const cols2 = {
      proportion: {
        formatter: (val: any) => {
          val = (val * 100).toFixed(2) + "%";
          return val;
        }
      }
    };
    return (
      <div className={classes.root}>
        <div className="sysApi">
          <div className="sys">
            <Chart height={350} width={350} padding={[20, 40, 20, 40]} forceFit>
              <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
              <Axis name="percent"/>
              <Tooltip
                showTitle={false}
                g2-tooltip={{
                  backgroundColor: "#000B49",
                  opacity: 0.8,
                  boxShadow: "0px 9px 33px 0px rgba(32,31,67,0.06)",
                  borderRadius: "3px",
                  border: "1px solid rgba(62,116,255,1)",
                  color: "#B9BBDD",
                }}
                itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name} {value}</li>'
              />
              <Views data={dv} axis={false} scale={cols}>
                <Geom
                  type="intervalStack"
                  position="percent"
                  color={[
                    "color",
                    value => {
                      return value;
                    }
                  ]}
                  size={20}
                  opacity={0.8}
                  tooltip={[
                    "systemName*percent",
                    (systemName, percent) => {
                      percent = (percent * 100).toFixed(2) + "%";
                      return {
                        name: systemName + ":",
                        value: percent
                      };
                    }
                  ]}
                >
                  <Label
                    content="percent"
                    labelLine={true}
                    textStyle={{
                      fill: "#9193BF"
                    }}
                    formatter={(val) => {
                      return val
                    }}
                  />
                </Geom>
              </Views>

              <Views data={dv1.edges} axis={false} padding={92}>
                <Coord type="polar" reflect="y" />
                <Geom
                  type="edge"
                  position="x*y"
                  shape="arc"
                  color="source"
                  opacity={0.5}
                  tooltip={false}
                />
              </Views>
              <Views data={dv2} axis={false} padding={33} scale={cols2}>
                <Geom
                  type="intervalStack"
                  position="proportion"
                  color="id"
                  size={20}
                  opacity={[
                    "id",
                    d => {
                      if (d === (apiList[0] ? apiList[0].moduleId : null)) {
                        return 0.8;
                      } else {
                        return 0.3;
                      }
                    }
                  ]}
                  tooltip={[
                    "moduleName",
                    moduleName => {
                      return {
                        name: moduleName,
                        value: ""
                      };
                    }
                  ]}
                ></Geom>
              </Views>
            </Chart>
          </div>
          <div className="api">
            <div>
              <div className="title">{formatMessage(apiGateway.api_name)} &#124;{formatMessage(apiGateway.api_module_name)}</div>
              {apiList.length ? (
                apiList.slice(0, 10).map((item: any, index: number) => {
                  return (
                    <p key={index}>
                      {item.systemName} {item.moduleName}
                    </p>
                  );
                })
              ) : (
                <p>{formatMessage(common.no_data)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapState2Props = ({ apiGateway: { dispatchData } }: any) => ({
  dispatchData
});

const mapDispatch2Props = ({ apiGateway: { getDispatchData } }: any) => ({
  getDispatchData
});

export default withStyles(styles)(
  connect(mapState2Props, mapDispatch2Props)(DispatchChart)
);
