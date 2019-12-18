import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
  Guide,

} from "bizcharts";
import DataSet from "@antv/data-set";
import { connect } from "react-redux";

export interface LoopCharts {
  labelRender: any;
  dataLink: any;
  colorCallback: any;
  innerContent: any;
  locale: any;
  classes: any;
  label: any;
  value: any;
  DataView: Function;
  content: any;
}
class Charts extends React.Component<any, any> {
  defaultLabelRender = (val: string) => {
    return val
  }

  render() {
    const {
      dataLink = [],
      content,
      locale
    } = this.props;
    const { DataView } = DataSet;
    const { Html } = Guide;
    const numbelNormal = dataLink.normal === 0 ? 10 : dataLink.normal
    const data = [
      {
        name: "正常处理",
        nameEn: "Success",
        count: numbelNormal,
        code: 20,
      },
      {
        name: "超时处理",
        nameEn: "Fail",
        count: dataLink.overtime,
        code: 40,
      }
    ]
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "name",
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
          height={400}
          data={dv}
          scale={cols}
          // scale图表边上的标注
          padding={[0, 0, 240, 0]}
          forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          {/* //legend分类图例的辅助标题 */}
          <Legend
            offsetY={-15}
            offsetX={10}
            position={"bottom-center"}
            useHtml={true}
            itemTpl={(item: any, color: any, isShow: any, index: any) => {
              const normal = item === '正常处理' ? dataLink.normal : dataLink.overtime
              const proNormal = dataLink.normal / dataLink.total ? (dataLink.normal / dataLink.total * 100).toFixed(2) + '%' : '0%'
              const proOvertime = dataLink.overtime / dataLink.total ? (dataLink.overtime / dataLink.total * 100).toFixed(2) + '%' : '0%'
              const proportion = item === '正常处理' ? proNormal : proOvertime
              const loopValue = locale === 'zh' ? item : (item === '正常处理' ? 'Success' : 'Fail')
              return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="width: 120px;font-weight:400;cursor: pointer;font-size: 12px;">
              <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>
              <span class="g2-legend-text">${loopValue} ${normal}${locale === 'zh' ? '件' : 'PCS'} ,${proportion}</span>
              </li>`
              
            }}
          />
          {/* //tooltip鼠标放上去时候显示的字段 */}
          <Tooltip
            showTitle={false}
          />

          {/* guide图表中间的辅助元素(文字或者图片其它的) */}
          <Guide>
            <Html
              position={["55%", "50%"]}
              html={content}
              alignX="middle"
              alignY="middle"
            />
          </Guide>

          {/* //gemo */}
          <Geom
            size={15}
            type="intervalStack"  //图表类型
            position="percent"
            color={["name", ["#09B0FF", "#F1F1F1",]]}
            tooltip={[
              "name*percent*nameEn",
              (name, percent, nameEn) => {
                percent = (percent * 100).toFixed(2) + "%";
                return {
                  name: locale === 'zh' ? name : nameEn,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
          </Geom>
        </Chart>
      </div>
    )
  }
}
const mapState2Props = ({ 
  intl: { locale } 
}: any) => ({
  locale
});
export default (connect(mapState2Props)(Charts));