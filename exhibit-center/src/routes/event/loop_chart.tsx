import React from 'react';
import { connect } from "react-redux";
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
import { FormattedMessage } from "react-intl";
export interface LoopCharts {
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
  defaultLabelRender = (val: string) => {
    return val
  }
  render() {
    const {
      innerContent = '',
      colorCallback,
      data = [],
      locale
    } = this.props;
    const { DataView } = DataSet;
    const { Html } = Guide;
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "label",
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
        {data && data.length !== 0 ?
          (<Chart
            height={330}
            data={dv}
            scale={cols}
            padding={[0, 60, 100, -160]}
            forceFit
          >
            <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
            <Axis name="percent" />
            <Legend
              offsetX={-80}
              offsetY={-50}
              position="right-center"
              marker="circle"
              useHtml={true}
              itemTpl={(item: any, color: any, isShow: any, index: any) => {
                const dataLoop = data.map((item: any, index: any) => item);
                const value = dataLoop[index] && (locale === 'zh' ? dataLoop[index].label : dataLoop[index].english)
                const count = dataLoop[index] && dataLoop[index].count;
                const slight = dataLoop[index] && (count / (dataLoop[index].total) * 100).toFixed(2) + '%';
                return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="min-width: 160px;font-weight:400;cursor: pointer;font-size: 14px;">
              <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>
              <span class="g2-legend-text">${value} ${count}${locale === 'zh' ? '个' : 'PCS'} | ${slight}</span>
              </li>`
              }}
            />
            <Tooltip
              showTitle={false}
              itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
            />
            {
              innerContent &&
              <Guide>
                <Html
                  position={["50%", "50%"]}
                  html={innerContent}
                  alignX="middle"
                  alignY="middle"
                />
              </Guide>
            }
            <Geom
              type="intervalStack"
              position="percent"
              color={["label", colorCallback]}
              tooltip={[
                "label*percent*english",
                (label, percent, english) => {
                  percent = (percent * 100).toFixed(2) + "%";
                  return {
                    name: locale === 'zh' ? label : english,
                    value: percent
                  };
                }
              ]}
              style={{
                lineWidth: 1,
                stroke: "#fff",
              }}
            >
              <Label
                content="percent"
              />
            </Geom>
          </Chart>) : (
            <p
              style={
                {
                  minHeight: "300px",
                  color: "red",
                  textAlign: "center",
                  marginTop: "20%"
                }
              }
            >
              <FormattedMessage id="order.noData" defaultMessage="No data" />
            </p>
          )}
      </div>
    )
  }
}
const mapState2Props = ({ intl: { locale } }: any) => ({
  locale
});
export default (connect(mapState2Props)(Charts));