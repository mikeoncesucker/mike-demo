import { withStyles } from "@material-ui/styles";
import { DatePicker, Divider, Radio, Select, Icon, Tooltip } from "antd";
import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Donut from "./donut_charts";
import LineCharts from "./line_charts";
import moment from "moment";
import { Link } from "react-router-dom";
import emitter from "../../util/events";
export interface OrderanalProps {
  classes: any;
  match: any;
  trend: any;
  amount: any;
  total: any;
  getOrderTrendByTime: Function;
  getOrderAmountByTime: Function;
  getOrderTotalByTime: Function;
  getRingWith: Function;
  resetTrends: Function;
  resetAmounts: Function;
  resetTotals: Function;
  locale: any;
}

const { Option } = Select;
const { RangePicker } = DatePicker;
const styles: any = (theme: any) => ({
  rootHeader: {
    backgroundColor: "#FFFFFF",
    padding: "0px 20px 22px",
    "& .headerDivider": {
      margin: "25px 64px 0",
      height: "2.5em"
    }
  },
  title: {
    fontSize: "16px",
    color: "#33353D"
  },
  root: {
    margin: "20px",
    backgroundColor: "#FFF",
    padding: "30px 20px 0",
  },
  DonutPanelGroup: {
    margin: "0 20px 20px"
  },
  rootDonutPanel: {
    width: "49%",
    backgroundColor: "#FFF",
    padding: "30px 20px 0"
  },
  boldNum: {
    fontSize: "30px",
    color: "#33353D"
  },
  radioItem: {
    marginLeft: "30px",
    "& .ant-radio-button-wrapper": {
      minWidth: "82px",
      textAlign: "center"
    }
  },
  selected: {
    display: "inline-block !important"
  },
  unselected: {
    display: "none !important"
  },
  increase: {
    paddingLeft: "30px",
    color: "#5E616F",
    "& span i": {
      display: "inline-block",
      width: "12px",
      height: "12px",
      margin: "0 8px 0 5px",
      borderRadius: "2px"
    }
  },
  inputcontent: {
    "& .ant-select-selection--multiple": {
      height: "32px",
      overflow: "hidden"
    }
  },
  spansource: {
    "& span": {
      verticalAlign: "middle"
    }
  },
  ringWithAmount: {
    justifyContent: "space-evenly",
    height: "140px",
    fontSize: "14px",
    color: "#5E616E",
    "& .arrowUp": {
      color: "#FC5B5B"
    },
    "& .arrowDown": {
      color: "#02B583"
    },
    "& .arrow": {
      margin: '0 4px',
    },
    "& .number": {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#33353D",
    },
    "& .textOver": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: 'ellipsis',
      cursor: "pointer"
    }
  }
});

class Orderanal extends React.Component<OrderanalProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      timeRange: "day",
      rangeDateState: [],
      isPicker: false,
      source: "",
      yesterday_counts: '',
      yesterday_amounts: '',
      totalCounts: "",
      totalAmounts: "",
      ringTotalPercentage: "",
      withTotalPercentage: "",
      ringAmountsPercentage: "",
      withAmountsPercentage: ""
    };
  }

  onOk = (date: any) => {
    const {
      getOrderTrendByTime,
      getOrderTotalByTime,
      getOrderAmountByTime,
      getRingWith
    } = this.props;
    const { rangeDateState, source } = this.state;
    let time = "";
    let startDate = rangeDateState[0];
    let endDate = rangeDateState[1];
    getOrderAmountByTime({
      params: {
        time,
        source,
        startDate,
        endDate
      },
      cb: null
    });
    getOrderTotalByTime({
      params: {
        time,
        startDate,
        endDate,
        source
      },
      cb: null
    });

    getOrderTrendByTime({
      params: {
        time,
        startDate,
        endDate,
        source
      },
      cb: null
    });

    getRingWith({
      params: {
        startDate,
        endDate,
        source
      },
      cb: (type: object, data: any) => {
        this.setState({
          totalCounts: data.totalCounts,
          totalAmounts: data.totalAmounts,
          ringTotalPercentage: data.ringTotalsPercentage,
          withTotalPercentage: data.withTotalsPercentage,
          ringAmountsPercentage: data.ringAmountsPercentage,
          withAmountsPercentage: data.withAmountsPercentage
        });
      }
    });
  };

  timeRangeChange = (e: any) => {
    let time = e.target.value;
    const { source } = this.state;
    const {
      getOrderTrendByTime,
      getOrderTotalByTime,
      getOrderAmountByTime,
      getRingWith,
      trend
    } = this.props;

    if (time !== "") {
      trend.orderAmountsVoList = [];
      trend.orderCountsVoList = [];
      getOrderTrendByTime({
        params: {
          time,
          source
        },
        cb: null
      });
      getOrderTotalByTime({
        params: {
          time
        },
        cb: null
      });

      getOrderAmountByTime({
        params: {
          time
        },
        cb: null
      });

      getRingWith({
        params: {
          time,
          source
        },
        cb: (type: object, data: any) => {
          this.setState({
            totalCounts: data.totalCounts,
            totalAmounts: data.totalAmounts,
            ringTotalPercentage: data.ringTotalsPercentage,
            withTotalPercentage: data.withTotalsPercentage,
            ringAmountsPercentage: data.ringAmountsPercentage,
            withAmountsPercentage: data.withAmountsPercentage
          });
        }
      });
    }

    this.setState({
      timeRange: time,
      isPicker: time !== "" ? false : true
    });
  };

  source = (val: any) => {
    let sourceList = val;
    const { getOrderTrendByTime, getRingWith } = this.props;
    const { timeRange, rangeDateState } = this.state;
    let startDate = rangeDateState[0];
    let endDate = rangeDateState[1];
    this.setState({
      source: sourceList
    });
    getOrderTrendByTime({
      params: {
        time: timeRange,
        source: sourceList,
        startDate,
        endDate
      },
      cb: null
    });

    getRingWith({
      params: {
        time: timeRange,
        source: sourceList,
        startDate,
        endDate
      },
      cb: (type: object, data: any) => {
        this.setState({
          totalCounts: data.totalCounts,
          totalAmounts: data.totalAmounts,
          ringTotalPercentage: data.ringTotalsPercentage,
          withTotalPercentage: data.withTotalsPercentage,
          ringAmountsPercentage: data.ringAmountsPercentage,
          withAmountsPercentage: data.withAmountsPercentage
        });
      }
    });
  };

  eventNav = () => {
    let amounts = this.state.yesterday_amounts;
    amounts && emitter.emit("showOrderQuery", "1201");
  };

  componentWillMount() {
    const {
      getOrderTrendByTime,
      getOrderAmountByTime,
      getOrderTotalByTime,
      getRingWith
    } = this.props;

    getRingWith({
      params: {
        time: "day"
      },
      cb: (type: object, data: any) => {
        this.setState({
          totalCounts: data.totalCounts,
          totalAmounts: data.totalAmounts,
          ringTotalPercentage: data.ringTotalsPercentage,
          withTotalPercentage: data.withTotalsPercentage,
          ringAmountsPercentage: data.ringAmountsPercentage,
          withAmountsPercentage: data.withAmountsPercentage
        });
      }
    });

    getOrderTrendByTime({
      params: {},
      cb: null
    });

    getOrderAmountByTime({
      params: {},
      cb: (type: object, data: any) => {
        this.setState({
          yesterday_counts: data.totalAmounts
        });
      }
    });

    getOrderTotalByTime({
      params: {},
      cb: (type: object, data: any) => {
        this.setState({
          yesterday_amounts: data.totals
        });
      }
    });
  }

  disabledDate = (current: any) => {
    const { rangeDateState } = this.state;
    return (
      current > moment() ||
      rangeDateState > moment().add(6, "day")
    );
  };

  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
  };

  componentWillUnmount() {
    const { resetTrends, resetAmounts, resetTotals } = this.props;
    resetTrends();
    resetAmounts();
    resetTotals();
  }
  iconUp = () => {
    return (
      <Icon
        type="up-square"
        className="arrowUp arrow"
      />
    )
  }
  iconDown = () => {
    return (
      <Icon
        type="down-square"
        className="arrowDown arrow"
      />
    )
  }

  render() {
    const { classes, trend, amount, total, locale } = this.props;
    const {
      timeRange,
      isPicker,
      yesterday_amounts,
      yesterday_counts,
      totalAmounts,
      totalCounts,
      withTotalPercentage,
      withAmountsPercentage,
      ringTotalPercentage,
      ringAmountsPercentage,
    } = this.state;
    const rawDate = new Date();
    rawDate.setTime(rawDate.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayString =
      rawDate.getFullYear() +
      "-" +
      (rawDate.getMonth() + 1) +
      "-" +
      rawDate.getDate();

    if (amount) {
      for (let i = 0; i < amount.orderAmountsBySource.length; i++) {
        amount.orderAmountsBySource[i].percentage *= 1;
      }
    }

    if (total) {
      (total.orderTotalsBySource || []).forEach((val: any) => {
        val.percentage *= 1;
      });
    }

    return (
      <div>
        <div className={classes.rootHeader}>
          <div className="flex">
            <div>
              <FormattedMessage
                id="order.total"
                defaultMessage="Number of yesterday orders"
                tagName="p"
              />
              <Link
                to={{
                  pathname: yesterday_amounts
                    ? `/orderSearch`
                    : `/orderAnalyse`,
                  state: {
                    yesterdayString
                  }
                }}
              >
                <b className={classes.boldNum} onClick={this.eventNav}>
                  {yesterday_amounts}
                </b>
              </Link>
            </div>
            <Divider className="headerDivider" type="vertical" />
            <div>
              <FormattedMessage
                id="order.amount"
                defaultMessage="Amount of yesterday orders (Yuan)"
                tagName="p"
              />
              <b className={classes.boldNum}>
                {this.formatNum(yesterday_counts)}
              </b>
            </div>
          </div>
        </div>

        <div className={classes.root}>
          <FormattedMessage
            id="order.trend"
            defaultMessage="Trend analysis"
          >
            {txt => <p className={classes.title}>{txt}</p>}
          </FormattedMessage>
          <div className="flex between">
            <div className={classes.radioItem}>
              <Radio.Group
                defaultValue={timeRange}
                buttonStyle="solid"
                onChange={this.timeRangeChange}
              >
                <FormattedMessage id="order.day" defaultMessage="Yesterday">
                  {txt => <Radio.Button value="day">{txt}</Radio.Button>}
                </FormattedMessage>
                <FormattedMessage id="order.week" defaultMessage="Last 7 days">
                  {txt => <Radio.Button value="week">{txt}</Radio.Button>}
                </FormattedMessage>
                <FormattedMessage id="order.month" defaultMessage="Last 30 days">
                  {txt => <Radio.Button value="month">{txt}</Radio.Button>}
                </FormattedMessage>
                <FormattedMessage
                  id="order.customize"
                  defaultMessage="Customize"
                >
                  {txt => (
                    <Radio.Button
                      value=""
                      className={isPicker && classes.unselected}
                    >
                      {txt}
                    </Radio.Button>
                  )}
                </FormattedMessage>
              </Radio.Group>
              <div className={isPicker ? classes.selected : classes.unselected}>
                <RangePicker
                  locale={this.props.locale}
                  showTime={{ format: "HH:mm:ss" }}
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: 380 }}
                  disabledDate={this.disabledDate}
                  onChange={(date, dateString) => {
                    this.setState({
                      rangeDateState: dateString
                    });
                  }}
                  onOk={this.onOk}
                  getCalendarContainer={(triggerNode): any => triggerNode.parentNode}
                />
              </div>
            </div>
            <div
              className="flex around colcenter"
              style={{
                width: 290,
              }}
            >
              <FormattedMessage
                id="order.source"
                defaultMessage="Source"
              />

              <Select
                showArrow={true}
                className={classes.inputcontent}
                placeholder={
                  <FormattedMessage
                    id="order.select"
                    defaultMessage="Please select"
                  />
                }
                style={{ width: 200 }}
                getPopupContainer={triggerNode => triggerNode}
                onChange={this.source}
              >
                <Option value="">
                  <FormattedMessage
                    id="order.allSources"
                    defaultMessage="All sources"
                  />
                </Option>
                <Option value="1">
                  <FormattedMessage id="pay.EI" defaultMessage="EI" />
                </Option>
                <Option value="2">
                  <FormattedMessage id="pay.EB" defaultMessage="EB" />
                </Option>
                <Option value="3">
                  <FormattedMessage id="pay.EP" defaultMessage="EP" />
                </Option>
                <Option value="4">
                  <FormattedMessage id="pay.SP" defaultMessage="SP" />
                </Option>
              </Select>
            </div>
          </div>
          <div
            className="flex colcenter between"
            style={{
              position: "relative"
            }}
          >
            <div style={{ 
                fontSize: "12px", 
                color: "#bfbfbf", 
                position: "absolute", 
                top: "3%", 
                left: "3%" 
              }}
            >
              {locale === "zh" ? "订单金额(元)" : "Amount of order"}
            </div>
            <div
              style={{ width: "80%" }}
            >
              <LineCharts type={timeRange} trend={trend} />
            </div>
            <div style={{ 
                fontSize: "12px", 
                color: "#bfbfbf", 
                position: "absolute", 
                top: "3%", 
                left: "73%" 
              }}
            >
              {locale === "zh" ? "订单数量(单)" : "Number of orders"}
            </div>

            <div
              className="flex-column between"
              style={{
                width: "20%",
                height: "300px",
              }}
            >
              <div className={`${classes.ringWithAmount} flex-column`}>
                <FormattedMessage
                  id="order.totalAmounts"
                  defaultMessage="Total amount"
                />
                <div className="number textOver">
                  <Tooltip placement="topLeft" title={"￥" + this.formatNum(totalAmounts)}>
                    {"￥" + this.formatNum(totalAmounts)}
                  </Tooltip>
                </div>
                <div className="flex-column">
                  <span>
                    <FormattedMessage
                      id="order.withIncrease"
                      defaultMessage="Year-on-year growth"
                    />
                    {
                      withAmountsPercentage >= 0 ? this.iconUp() : this.iconDown()
                    }
                    {withAmountsPercentage}%
                  </span>
                  <span>
                    <FormattedMessage
                      id="order.ringIncrease"
                      defaultMessage="Month-on-month growth"
                    />
                    { ringAmountsPercentage >= 0 ? this.iconUp() : this.iconDown() }
                    {ringAmountsPercentage}%
                  </span>
                </div>
              </div>
              <div className={`${classes.ringWithAmount} flex-column`}>
                <FormattedMessage
                  id="order.totalNumber"
                  defaultMessage="Total number"
                />
                <span className="number">{totalCounts}</span>
                <div className="flex-column">
                  <span>
                    <FormattedMessage
                      id="order.withIncrease"
                      defaultMessage="Year-on-year growth"
                    />
                    {withTotalPercentage >= 0 ? this.iconUp() : this.iconDown()}
                    {withTotalPercentage}%
                  </span>
                  <span>
                    <FormattedMessage
                      id="order.ringIncrease"
                      defaultMessage="Month-on-month growth"
                    />
                    {ringTotalPercentage >= 0 ? this.iconUp() : this.iconDown()}
                    {ringTotalPercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${classes.DonutPanelGroup} flex between`}>
          <div className={classes.rootDonutPanel}>
            <FormattedMessage
              id="order.amount.anal"
              defaultMessage="Amount analysis"
            >
              {txt => <p className={classes.title}>{txt}</p>}
            </FormattedMessage>
            <div>
              <FormattedMessage
                id="order.amounts"
                defaultMessage="Total amount (Yuan)"
              />
              ：<span>{amount && this.formatNum(amount.totalAmounts)}</span>
            </div>
            {amount && (
              <Donut
                data={amount.orderAmountsBySource}
                label="orderSourceZh"
                value="amounts"
              />
            )}
          </div>
          <div className={classes.rootDonutPanel}>
            <FormattedMessage
              id="order.total.anal"
              defaultMessage="Number analysis"
            >
              {txt => <p className={classes.title}>{txt}</p>}
            </FormattedMessage>
            <div>
              <FormattedMessage
                id="order.totals"
                defaultMessage="Total number"
              />
              ：<span>{total && total.totals}</span>
            </div>
            {total && (
              <Donut
                data={total.orderTotalsBySource}
                label="orderSourceZh"
                value="totals"
              />
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
    getOrderTrendByTime,
    getOrderAmountByTime,
    getOrderTotalByTime,
    getRingWith,
    resetTrends,
    resetAmounts,
    resetTotals
  }
}: any) => ({
  getOrderTrendByTime,
  getOrderAmountByTime,
  getOrderTotalByTime,
  getRingWith,
  resetTrends,
  resetAmounts,
  resetTotals
});
export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Orderanal)
);
