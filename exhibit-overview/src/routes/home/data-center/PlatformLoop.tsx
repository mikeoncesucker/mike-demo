import React from "react";
import { connect } from "react-redux";
import { Chart, Geom, Tooltip, Legend, Coord } from "bizcharts";
import { common } from "../message";

export interface PlatformLoopProps {
  intl: any;
  loopChartData: any;
  getLoopChartData: Function;
}

class PlatformLoop extends React.Component<PlatformLoopProps, any> {
  constructor(props: Readonly<PlatformLoopProps>) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const { intl, getLoopChartData, } = this.props;
   
    const language = intl.locale === 'zh' ? 'chinese' : 'english';
    getLoopChartData({
      language,
      cb: null
    })
  }
  render() {
    const { loopChartData, intl } = this.props;
    const { formatMessage } = intl;
    return (
      <div>
        {loopChartData.length ? (
          <Chart
            height={window.innerWidth/9.5}
            width={window.innerWidth/7}
            data={loopChartData}
            padding="auto"
            forceFit
          >
            <Coord type="theta" innerRadius={0.75} />
            <Legend
              position="right-center"
              useHtml={true}
              itemTpl={(item: any, color: any, checked: any, index: any) => {
                const percent = loopChartData[index].scale;
                return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">
                        <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>
                        <span class="g2-legend-text">
                          <span style="color:#5E616F; display: inline-block; max-width: 1.6rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; vertical-align: bottom;">
                            ${item}
                          </span>
                          <span style="color:#00E999; float: right;">${percent}</span>
                        </span>
                        </li>`;
              }}
              g2-legend={{
                minWidth: "3rem"
              }}
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
              itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
            <Geom
              type="intervalStack"
              position="apiCount"
              color="systemName"
              select={false}
              tooltip={[
                "systemName*apiCount",
                (systemName, apiCount) => {
                  return {
                    name: systemName,
                    value: `${apiCount} ${formatMessage(common.number)}`
                  };
                }
              ]}
            ></Geom>
          </Chart>
        ) : (
          <p
            style={{
              minHeight: "1.5rem",
              color: "#fff",
              textAlign: "center",
              lineHeight: "1.5rem"
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
  centerRawData: { 
    loopChartData
  } 
}: any) => ({
  loopChartData
});

const mapDispatch2Props = ({
  centerRawData: {
    getLoopChartData
  }
}: any) => ({
  getLoopChartData
});
export default connect(mapState2Props,mapDispatch2Props)(PlatformLoop);
