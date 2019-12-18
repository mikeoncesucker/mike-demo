import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Label,
  Legend,
  Shape,
  Util,
  PathUtil
} from "bizcharts";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import DataSet from "@antv/data-set";
export interface Custom {
  data: any;
  innerContent: any;
  locale: any;
  classes: any;
  labelEng: any;
  value: any;
  DataView: Function;
}

class Charts extends React.Component<any, any> {
  defaultLabelRender = (val: string) => {
    return val
  }

  render() {
    const {
      data = [],
      labelEng,
      locale
    } = this.props;
    let shape: any = Shape
    shape.registerShape("interval", "smoothInterval", {
      getPoints: function (cfg: any) {

        const width = cfg.size;
        const x = cfg.x; // 最小值的点出现高度为0的情况

        const end = cfg.y === 0 ? 0.1 : cfg.y; // 实现层叠效果，并且多加四个控制点(1,2,4,5)来调整贝塞尔曲线的弧度
        return [
          {
            x: x - width,
            y: cfg.y0
          },
          {
            x: x - 0.105,
            y: end / 30
          },
          {
            x: x - 0.025,
            y: (end * 3) / 9
          },

          {
            x: x + 0.02,
            y: end
          },

          {
            x: x + 0.065,
            y: (end * 3) / 9
          },

          {
            x: x + 0.145,
            y: end / 30
          },
          {
            x: x + width + 0.04,
            y: cfg.y0
          }
        ];
      },

      drawShape(cfg: any, container: any) {
        // 将归一化后的数据转换为画布上的坐标
        const points = cfg.points;
        let data: any = [],
          prePoint: any = null;
        const first = points[0];
        Util.each(points, function (point: any) {
          if (
            !prePoint ||
            !(prePoint.x === point.x && prePoint.y === point.y)
          ) {
            data.push(point.x);
            data.push(point.y);
            prePoint = point;
          }
        });
        const spline = PathUtil.catmullRomToBezier(data);
        let path =
          "M" + first.x + " " + first.y + PathUtil.parsePathArray(spline);
        path = this.parsePath(path, false);
        return container.addShape("path", {
          attrs: {
            fill: cfg.color || "#00D9DF",
            path: path
          }
        });
      }

    });

    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: labelEng,
      as: "percent"
    });
    const COLORS = [
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8441",
      "#EE3B61",
      "#FF6590",
      "#9575DE",
      "#8EA4F1",
      "#C6E8D2",
      "#FFDB91",
      "#FF9054"
    ];

    return (
      <div>
        {data && data.length !== 0 ?
          (<Chart
            height={250}
            source={data}
            forceFit
            padding={[20, 30, 90, 10]}
            data={dv}
          >
            <Legend 
            useHtml={true}
            position="bottom"
            g2-legend = {{
              maxWidth: 300,
              overflow: 'visible',
            }}
            g2-legend-list= {{
              textAlign: 'left'
            }}
            itemTpl={(item, color, isShow, index: any) => {
              return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="min-width: 160px;font-weight:400;cursor: pointer;font-size: 14px;">
              <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px; margin-top: -12px;background-color: {color};"></i>
              <span class="g2-legend-text"  style="max-width: 250px;display: inline-block;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;" >${item}</span>
              </li>`
            }}
          />
            <Tooltip
              showTitle={false}
              crosshairs={{
                type: "y"
              }}
            />
            <Axis
              name="label"
              tickLine={null}
              line={null}
              title={null}
              visible={false}
            />
            <Axis name="count" visible={false} />
            <Geom
              type="interval"
              position="label*count"
              shape={"smoothInterval"}
              color={[labelEng, COLORS]}
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
            >
              <Label content="count" offset={10} />
            </Geom>
          </Chart>) : (
            <p
              style={
                {
                  minHeight: "200px",
                  color: "red",
                  textAlign: "center",
                  lineHeight: "200px"
                }
              }
            >
              <FormattedMessage id="order.noData" defaultMessage="No data" />
            </p>
          )}
      </div>
    );
  }
}

const mapState2Props = ({ intl: { locale } }: any) => ({
  locale
});
export default (connect(mapState2Props)(Charts));
