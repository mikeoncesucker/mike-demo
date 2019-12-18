import React from "react";
import { Chart, Geom, Axis, Legend, Tooltip } from "bizcharts";
export interface LineBarChartsProps {
  data: any;
  locale: any;
}

const styles: any = (theme: any) => ({
  wrapper: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  mainTitle: {
    fontSize: 18,
    color: "#333",
    display: "block",
    padding: 10
  },
  subTitle: {
    fontSize: 14,
    color: "#bbb",
    display: "block",
    padding: 10
  }
});

class LineBarCharts extends React.Component<LineBarChartsProps, any> {
  constructor(props: Readonly<LineBarChartsProps>) {
    super(props);
    this.state = {};
  }

  // 金额格式化
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const data: any = this.props.data || [];
    const { locale } = this.props;
    const dv = data.map((val: any) => {
      // 元
      val.totalAmounts = +(val.totalAmounts);
      val.time = val.time.trim() + " ";
      return val;
    });

    return (
      <div style={styles.wrapper}>
        <Chart
          padding={[50, 100, 100, 80]}
          height={400}
          data={dv}
          scale={{
            totalAmounts: {
              min: 0,
              alias:
                locale === "en"
                  ? "Order Amount(yuan)"
                  : "订单金额(元)",
              formatter: (val: any) => {
                return this.formatNum(val);
              }
            },
            num: {
              min: 0,
              minTickInterval: 1,
              alias: locale === "en" ? "Exhibition Times" : "展会次数(次)"
            },
            time: {
              alias: " ",
              ticks: dv.length > 12 && [0, 5, 10, 15, 20, 25]
            }
          }}
          forceFit
        >
          <Axis name="time" title />
          <Axis name="totalAmounts" grid={null} />
          <Axis name="num" grid={null} />
          <Legend
            position="bottom"
            marker="square"
            offsetY={-window.innerHeight / 80}
          />
          <Tooltip
            containerTpl={`<div class="g2-tooltip" style="color:#999BA1;">${
              locale === "en" ? "Time" : "时间"
            }:
            <span class="g2-tooltip-title" style="white-space:nowrap;vertical-align:middle;width:200px;overflow:hidden;display:inline-block;"></span>
            <table class="g2-tooltip-list"></table>
            </div>`}
            position="top"
            enterable={true}
            itemTpl={
              "<li data-index={index}>" +
              '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
              "{name}: {value}" +
              "</li>"
            }
          />
          <Geom
            type="interval"
            position="time*num"
            size="20"
            color="#07A7F3"
            tooltip={[
              "time*num*totalAmounts*totalCounts*orderExpoGeneralDetailVos",
              (
                time,
                num,
                totalAmounts,
                totalCounts,
                orderExpoGeneralDetailVos
              ) => {
                totalCounts = `${num}${
                  locale === "en"
                    ? " times, total number of exhibition orders"
                    : "次,  展会订单总数量"
                }: ${totalCounts}`;
                return {
                  name: locale === "en" ? "Number of exhibitions" : "展会次数",
                  value: totalCounts
                };
              }
            ]}
          />
          <Geom
            type="line"
            position="time*totalAmounts"
            color="#FC5B5B"
            tooltip={[
              "time*num*totalAmounts*totalCounts*orderExpoGeneralDetailVos",
              (
                time,
                num,
                totalAmounts,
                totalCounts,
                orderExpoGeneralDetailVos
              ) => {
                let orderExpoAnalysisSourcesVosString = "";
                orderExpoGeneralDetailVos.map((val: any) => {
                  orderExpoAnalysisSourcesVosString =
                    orderExpoAnalysisSourcesVosString +
                    "<br/>" +
                    "<span style='color: #999BA1'>" +
                    val.expoName +
                    "</span>" +
                    `, ${locale === "en" ? "Number of orders" : "订单数量"}: ` +
                    val.totalCounts +
                    `, ${locale === "en" ? "Amount of order" : "订单金额"}: ￥` +
                    this.formatNum(val.totalAmounts);
                    return orderExpoAnalysisSourcesVosString;
                });
                num = `${
                  locale === "en"
                    ? "Total amount of exhibition orders (Yuan)"
                    : "展会订单总金额(元)"
                }`;
                totalAmounts = `￥${this.formatNum(totalAmounts)} ${orderExpoAnalysisSourcesVosString}`;
                return {
                  name: num,
                  value: totalAmounts
                };
              }
            ]}
          />
        </Chart>
      </div>
    );
  }
}

export default LineBarCharts;
