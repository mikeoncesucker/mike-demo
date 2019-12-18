import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
} from "bizcharts";

export interface ExhLoopProps {
  data: [];
  locale: any;
}

class ExhBar extends React.Component<ExhLoopProps, any> {
  constructor(props: Readonly<ExhLoopProps>) {
    super(props);
    this.state = {};
  }
  //金额格式化
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const data = this.props.data || [];
    const { locale } = this.props;
    const dv = data.map((val: any) => {
      val.time = val.time.trim() + " ";
      return val;
    });
    return (
      <div>
        {data.length ? (
          <Chart 
          height={350} 
          padding={[20, 10, 100, 90]} 
          data={dv} 
          scale=
          {{
            counts: {
              minTickInterval:1
            },
          }}
          forceFit>
            <Coord transpose />
            <Axis
              name="time"
              label={{
                offset: 12
              }}
            />
            <Axis 
            name="counts"
            line= {{
              fill: '#dedede',
            }}
            />
            <Tooltip
              containerTpl={`<div class="g2-tooltip" style="color:#999BA1;">${
                this.props.locale === "en" ? "Time" : "时间"
              }:
             <span class="g2-tooltip-title" style="white-space:nowrap;vertical-align:middle;width:200px;overflow:hidden;display:inline-block;"></span>
             <table class="g2-tooltip-list"></table>
             </div>`}
              itemTpl={
                "<li data-index={index}>" +
                '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
                "{name}: {value}" +
                "</li>"
              }
            />
            <Legend />
            <Geom
              type="interval"
              color="#FF9C6E"
              size="20"
              position="time*counts"
              tooltip={[
                "time*counts*amounts*orderExpoAnalysisSourcesVos",
                (time, counts, amounts, orderExpoAnalysisSourcesVos) => {
                  let orderExpoAnalysisSourcesVosString = "";
                  orderExpoAnalysisSourcesVos.forEach(
                    (val: any) => {
                      let sourceName =
                        (val.source === "1" &&
                          (locale === "en" ? "EI" : "现场订单系统")) ||
                        (val.source === "2" &&
                          (locale === "en" ? "EB" : "会展场馆管理系统")) ||
                        (val.source === "3" &&
                          (locale === "en" ? "EP" : "门禁制证系统")) ||
                        (val.source === "4" &&
                          (locale === "en" ? "SP" : "智慧停车")) ||
                        val.source;
                      orderExpoAnalysisSourcesVosString =
                        orderExpoAnalysisSourcesVosString +
                        "<br/>" +
                        "<span style='color: #999BA1'>" +
                        sourceName +
                        "</span>" +
                        `: ${
                          this.props.locale === "en"
                            ? "Number of orders"
                            : "订单数量"
                        }: ` +
                        val.counts +
                        `, ${
                          this.props.locale === "en"
                            ? "Amount of order"
                            : "订单金额"
                        }: ￥` +
                        this.formatNum(val.amounts);
                    }
                  );
                  amounts = `${counts}  ${
                    this.props.locale === "en" ? "PCS" : "单"
                  }, 
                  ${
                    this.props.locale === "en"
                      ? "Total amount"
                      : "订单总金额"
                  }: ￥${this.formatNum(
                    amounts
                  )} ${orderExpoAnalysisSourcesVosString}`;
                  return {
                    name:
                      this.props.locale === "en"
                        ? "Total number"
                        : "订单总数量",
                    value: amounts
                  };
                }
              ]}
            />
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

export default ExhBar;
