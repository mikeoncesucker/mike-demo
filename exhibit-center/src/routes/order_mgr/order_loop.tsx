import React from "react";
import { connect } from "react-redux";
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from "bizcharts";
import { FormattedMessage } from "react-intl";
export interface DonutProps {
  labelRender: any;
  data: any;
  locale: any;
  classes: any;
  label: any;
  value: any;
  DataView: Function;
  padding: any;
}

class Donut extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  // 金额格式化
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const { data, locale, value, padding } = this.props;
    const cols = {
      percentage: {
        formatter: (val: any) => (val += "%")
      }
    };
    return (
      <div>
        {data && data.length !== 0 ? (
          <Chart
            height={window.innerHeight}
            data={data}
            scale={cols}
            padding={[-10, 80, 60, -130]}
            forceFit
          >
            <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
            <Axis name="percentage" />
            {!padding && <Legend position="bottom-center" marker="square" />}
            <Tooltip
              showTitle={false}
              itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
            <Legend
              offsetX={-65}
              offsetY={-13}
              position="right-center"
              marker="circle"
              useHtml={true}
              itemTpl={(item, color, isShow, index: any) => {
                let orderPercent = data[index] && data[index].percentage.toFixed(2) + " %";
                return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="display: flex; justify-content: space-between; align-items: center; min-width: ${
                  locale === "zh" ? "180px" : "130px"
                };color: #FFFFFF;font-weight:400;cursor: pointer;font-size: 14px;">
                <div style="display: inline-block">
                    <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>
                    <span style="color: #fff">${item}</span>
                </div>
             <span style="float: right; color: #fff">${orderPercent}</span>
             
             </li>`;
              }}
            />

            <Geom
              type="intervalStack"
              position="percentage"
              color={locale === "zh" ? "orderSourceZh" : "orderSourceEn"}
              tooltip={[
                "orderSourceZh*percentage*orderSourceEn*amounts*totals",
                (orderSourceZh, percentage, orderSourceEn, amounts, totals) => {
                  percentage = percentage + "%";
                  amounts =
                    locale === "zh"
                      ? "金额:" + this.formatNum(amounts) + "元"
                      : "Amounts:" + this.formatNum(amounts) + " yuan";
                  totals =
                    locale === "zh"
                      ? "订单:" + totals + "单"
                      : "Order:" + totals + " PCS";
                  if (value === "amounts") {
                    return {
                      name: locale === "zh" ? orderSourceZh : orderSourceEn,
                      value: percentage + "<br>" + amounts
                    };
                  } else {
                    return {
                      name: locale === "zh" ? orderSourceZh : orderSourceEn,
                      value: percentage + "<br>" + totals
                    };
                  }
                }
              ]}
              style={{
                lineWidth: 1,
                stroke: "#fff"
              }}
            ></Geom>
          </Chart>
        ) : (
          <p
            style={
              !padding
                ? {
                    minHeight: "300px",
                    color: "red",
                    textAlign: "center",
                    lineHeight: "300px"
                  }
                : {
                    minHeight: "150px",
                    color: "#fff",
                    textAlign: "center",
                    lineHeight: "150px",
                    height: window.innerHeight
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
export default connect(mapState2Props)(Donut);
