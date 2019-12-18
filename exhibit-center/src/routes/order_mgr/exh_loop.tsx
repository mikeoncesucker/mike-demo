import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Coord,
  Legend,
  Guide,
} from "bizcharts";
import DataSet from "@antv/data-set";

export interface ExhLoopProps {
  data: [];
  locale: any;
  totalCounts: null;
}

class ExhLoop extends React.Component<ExhLoopProps, any> {
  constructor(props: Readonly<ExhLoopProps>) {
    super(props);
    this.state = {};
  }
  // 金额格式化
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { Html } = Guide;
    const { DataView } = DataSet;
    const data = this.props.data || [];
    const { locale } = this.props; 
    const totalCounts = this.props.totalCounts || 0;
    const totalCountsHtml = `<div style=color:#8c8c8c;font-size:1em;display:flex;flex-direction:column;justify-content:center;align-items:center;width:10em;height:10em;>${ locale === "en" ? "Number of orders" : "订单数量(单)" }<br><div style=color:#262626;font-size:2.5em;>${totalCounts}</div></div>`;
    const dv = new DataView();
    if (JSON.stringify(data).indexOf('"item"') !== -1) {
      dv.source(data).transform({
        type: "percent",
        field: "percentage",
        dimension: "item",
        as: "percent"
      });
    } else {
      dv.source(data).transform({
        type: "percent",
        field: "percentage",
        dimension: "source",
        as: "percent"
      });
    }
    const cols = {
      percent: {
        formatter: (val: any) => {
          val = (val * 100).toFixed(0) + "%";
          return val;
        }
      }
    };

    return (
      <div>
        {data.length ? (
          <Chart
            height={330}
            data={dv}
            scale={cols}
            padding={ locale === "en" ? [30, 0, 30, -300] : [30, 0, 30, -250] }
            forceFit
          >
            <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
            <Axis name="percent" />
            <Legend
              position="right-center"
              offsetX={ locale === "en" ? -150 : -135 }
              marker="square"
              useHtml={true}
              itemTpl={(item: any, color: any, isShow: any, index: any) => {
                let _enWidth = (locale === "en" ? 270 : 230);
                let _itemWidth = (locale === "en" ? "32%" : "23%");
                let _item =
                  data[index] &&
                  ((data[index]["item"] === "0" && ( locale === "en" ? "Commodity&nbsp;Lease&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : "租赁商品")) ||
                    (data[index]["item"] === "1" && ( locale === "en" ? "Service&nbsp;Lease&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : "租赁服务")) ||
                    (data[index]["item"] === "2" && ( locale === "en" ? "Commodity&nbsp;Purchase" : "购买商品")) ||
                    (data[index]["item"] === "3" && ( locale === "en" ? "Service&nbsp;Purchase&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : "购买服务")) ||
                    (data[index]["item"] === "9" && ( locale === "en" ? "Others" : "其他&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")) ||
                    data[index]["item"]);
                let _percentage =
                  data[index] && data[index]["percentage"] + "%";
                let _amounts =
                  data[index] && "￥" + this.formatNum(data[index]["amounts"]);
                return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="min-width: ${_enWidth}px;cursor: pointer;font-size: 10px;display: flex;justify-content: center;align-items: center;">
                        <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>
                        <span class="g2-legend-text"><span  style="color:#5E616F; display: inline-block; width: ${_itemWidth};overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: bottom;" title=${_item}>${_item}</span><span style="color:#999BA1"> | ${_percentage}</span><span style="color: #5E616F;float:right">    ${_amounts}</span></span>
                        </li>`;
              }}
            />
            <Guide>
              <Html
                position={["50%", "50%"]}
                html={totalCountsHtml}
                alignX="middle"
                alignY="middle"
              />
            </Guide>
            <Geom
              type="intervalStack"
              select={false}
              active={false}
              position="percent"
              color={
                JSON.stringify(data).indexOf('"item"') !== -1
                  ? "item"
                  : "source"
              }
              style={{
                lineWidth: 1,
                stroke: "#fff"
              }}
            ></Geom>
          </Chart>
        ) : (
          <p
            style={{
              minHeight: "300px",
              color: "red",
              textAlign: "center",
              lineHeight: "300px"
            }}
          >
            <span>{locale === "en" ? "No Data" : "暂无数据"}</span>
          </p>
        )}
      </div>
    );
  }
}

export default ExhLoop;
