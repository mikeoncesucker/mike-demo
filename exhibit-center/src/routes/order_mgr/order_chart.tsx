import { withStyles } from "@material-ui/styles";
import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from "bizcharts";
import Axios from "axios";
import store from "store";
import emitter from "../../util/events";

export interface OrderanalProps {
  classes: any;
  match: any;
  trend: any;
  amount: any;
  total: any;
  location: any;
  getOrderAmountByTime: Function;
  getOrderTotalByTime: Function;
  resetTrends: Function;
  resetAmounts: Function;
  resetTotals: Function;
  locale: any;
  getUser: any;
  resetUsers: Function;
  putLocale: Function;
}

const styles: any = (theme: any) => ({

});

const GetQueryValue = (queryName: string): string => {
  var query = decodeURI(window.location.href.substring(1));
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === queryName) { return pair[1]; }
  }
  return "";
}

class Orderanal extends React.Component<OrderanalProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: null
    };
  }


  componentDidMount() {
    const { getOrderTotalByTime } = this.props;
    const { getUser, putLocale } = this.props;
    Axios.defaults.headers.common["accessToken"] =  store.get("accessToken")
    // 'e77c4346-5030-4cc0-b978-f16b5dc84169_fca96d188663477cb0c00c7f8605b6b5'  
    getUser({
      cb: (data: any) => {
        if (data) {
          emitter.emit("userId", data.id);
          putLocale({
            locale: data.language !== "english" ? "zh" : "en"
          });
        }
      }
    });
    getOrderTotalByTime({
      params: { time: "week" },
      cb: (type: object, data: any) => {
        this.setState({
          data
        });
      }
    });
  }

  componentWillUnmount() {
    const { resetTrends, resetAmounts, resetTotals } = this.props;
    resetTrends();
    resetAmounts();
    resetTotals();
  }

  // 金额格式化
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const { classes, locale } = this.props;
    const { data } = this.state;
    const loopChart = data && data.orderTotalsBySource
    const cols = {
      percentage: {
        formatter: (val: any) => (val += "%")
      }
    };
    // 百分比数据数字化
    if (data) {
      for (let i = 0; i < data.orderTotalsBySource.length; i++) {
        data.orderTotalsBySource[i].percentage *= 1;
      }
    }

    return (
      <div style={{ height: '100%', backgroundColor: '#' + GetQueryValue("bgColor") }}>
        <div className={classes.DonutPanelGroup}>
          <div className={classes.rootDonutPanel}>
            {locale && (<div style={{ display: "flex", alignItems: "center",color: '#fff',padding: '12px 20px 0' }}>
              <FormattedMessage id="order.total.weekanal" defaultMessage="Number of last week">
                {txt => <p className={classes.title}>{txt}</p>}
              </FormattedMessage>
            </div>)}
            {locale && (<div style={{ marginTop: "-12px", paddingLeft: '20px' ,color: '#fff'}}>
              <FormattedMessage id="order.totals" defaultMessage="Total number" /> ：<span>{data && data.totals}</span>
            </div>)}
            {(locale && data) ? (
              <div>
                <Chart
                  height={window.innerHeight}
                  data={loopChart}
                  scale={cols}
                  padding={[-10, 80, 60, -130]}
                  forceFit
                >
                  <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                  <Axis name="percentage" />
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
                    g2-legend = {{
                      maxWidth: 200,
                      overflow: 'visible'
                    }}
                    itemTpl={(item, color, isShow, index: any) => {
                      let orderPercent = loopChart[index] && loopChart[index].percentage.toFixed(2) + " %";
                      return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" 
                      data-value="{originValue}" className="flex between colcenter" style="min-width: ${locale === "zh" ? "180px" : "130px"};
                        color: #FFFFFF;font-weight:400; cursor: pointer;font-size: 14px;max-width: 80%">
                        <div style="display: inline-block">
                            <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};margin-top:-10px"></i>
                            <span style="color: #fff;max-width: 80px;display: inline-block;overflow: hidden; text-overflow: ellipsis;white-space: nowrap">${item}</span>
                        </div>
                         <span style="float: right; color: #fff">${orderPercent}</span>
                       </li>`;
                    }}
                  />

                  <Geom
                    type="intervalStack"
                    position="percentage"
                    color={locale === "zh" ? "orderSourceZh" : "orderSourceEn"}
                  ></Geom>
                </Chart>
              </div>
            ) : (
                locale && <p
                  style={{
                    // height: '100%',
                    minHeight: "200px",
                    color: "#ffffff",
                    textAlign: "center",
                    lineHeight: "200px"
                  }}
                >
                  <FormattedMessage id="order.noData" defaultMessage="No data" />
                </p>
              )}
          </div>
        </div>
      </div>
    );
  }
}
const mapState2Props = ({
  order_analyse: { trend, amount, total },
  intl: { locale }
}: any) => ({
  trend,
  amount,
  total,
  locale
});
const mapDispatch2Props = ({
  order_analyse: {
    getOrderAmountByTime,
    getOrderTotalByTime,
    resetTrends,
    resetAmounts,
    resetTotals
  },
  app: { getUser, resetUsers },
  intl: { putLocale }
}: any) => ({
  getOrderAmountByTime,
  getOrderTotalByTime,
  resetTrends,
  resetAmounts,
  resetTotals,
  getUser,
  resetUsers,
  putLocale
});
export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Orderanal)
);
