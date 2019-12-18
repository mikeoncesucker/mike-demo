import React from "react";
import { connect } from "react-redux";
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from "bizcharts";
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
    /*
     * 把模块中的数据初始化的方法替换
     * 删除依赖
     * 暂且手动初始化数据
     */

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
            height={300}
            data={data}
            scale={cols}
            padding={padding ? [5, 80, 140, 80] : [35, 60, 60, 30]}
            forceFit
          >
            <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
            <Axis name="percentage" />
            {!padding && <Legend position="bottom-center" marker="square" />}
            <Tooltip
              showTitle={false}
              itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
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
            >
              <Label
                content="percentage"
                textStyle={
                  padding && {
                    fill: "rgba(255,255,255,0.65)" // 文本的颜色
                  }
                }
                formatter={(val, item) => {
                  const Eng = item.point;
                  return locale === "zh"
                    ? `${Eng.orderSourceZh}:${val}`
                    : `${Eng.orderSourceEn}:${val}`;
                }}
              />
            </Geom>
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
                    height : window.innerHeight,
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

const mapState2Props = ({ 
  intl: { locale } 
}: any) => ({
  locale
});
export default connect(mapState2Props)(Donut);
