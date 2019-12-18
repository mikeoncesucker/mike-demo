import { withStyles } from "@material-ui/styles";
import { Divider, Select, Icon } from "antd";
import React from "react";
import { connect } from "react-redux";
import ExhLoop from "./exh_loop";
import ExhBar from "./exh_bar";
import LineBarCharts from "./linebar_charts";
import { FormattedMessage } from "react-intl";

export interface exhProps {
  classes: any;
  match: any;
  history: any;
  locale: any;
  getOrderList: any;
  list: any;
  getExhList: any;
  exhAnalysisInfo: any;
  exhOverviewInfo: any;
  exhAnalysis: any;
  exhOverview: any;
  exhList: any;
}

const { Option } = Select;
const styles: any = (theme: any) => ({
  title: {
    fontSize: "16px",
    color: "#33353D"
  },
  root: {
    margin: "20px 20px 0 20px",
    backgroundColor: "#FFFFFF",
    "& .HeaderInfoBox": {
      display: "flex",
      height: 70,
      marginLeft: 30,
      "& .headerDivider": {
        margin: "25px 64px 0",
        height: "2.5em"
      }
    }
  },
  DonutPanelGroup: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px"
  },
  rootDonutPanel: {
    width: "50%",
    height: 350,
    backgroundColor: "#FFFFFF"
  },
  boldNum: {
    fontSize: "30px",
    color: "#33353D"
  },
  chartsOption: {
    display: "flex",
    justifyContent: "space-between"
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
  }
});

class Orderanal extends React.Component<exhProps, any> {
  constructor(props: Readonly<exhProps>) {
    super(props);
    this.state = {
      exhYear: 2019,
      exhNameList: [],
      exhName: null,
      totalCounts: null,
      totalAmounts: null,
      orderExpoAnalysisItemsVos: null,
      orderExpoAnalysisTrendsVos: null,
      exhOverviewYear: 2019,
      exhOverviewData: null,
      selectYear: 2019,
      selectMonth: "",
      currYear: 2019,
      currMonth: null,
      exhTotalTimes: null,
      exhTotalAmount: null,
      exhTotalAmountPrecent: null,
      maxTotalAmount: null,
      expoGeneral: null,
      defaultExhName: ""
    };
  }

  componentDidMount() {
    const { getExhList, exhAnalysis, exhOverview } = this.props;
    const { exhYear, exhName } = this.state;
    const date = new Date();
    const currYear = date.getFullYear();
    const currMonth = date.getMonth() + 1;

    this.setState({
      currYear: currYear,
      currMonth: currMonth
    });
    getExhList({
      params: {
        year: exhYear
      },
      cb: (type: any, data: any) => {
        const { exhList } = this.props;
        this.setState(
          {
            exhNameList: exhList,
            defaultExhName: exhList.length && exhList[0]
          },
          () => {
            this.getOrderAnalyseData();
          }
        );
      }
    });

    exhAnalysis({
      params: {
        expoName: exhName
      },
      cb: (type: any, data: any) => {}
    });

    exhOverview({
      params: {
        year: 2019
      },
      cb: (type: any, data: any) => {
        this.setState({
          exhTotalTimes: data && data.data.data.expoCounts,
          exhTotalAmount: data && data.data.data.expoAmounts,
          exhTotalAmountPrecent: data && data.data.data.percentage,
          maxTotalAmount: data && data.data.data.expoHisAmounts,
          expoGeneral: data && data.data.data.orderExpoGeneralVos
        });
      }
    });
  }

  // 金额格式化
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  chooseYear: any = () => {
    const { getExhList, locale } = this.props;
    const { exhYear } = this.state;
    getExhList({
      params: {
        year: exhYear
      },
      cb: (type: any, data: any) => {
        const { exhList } = this.props;
        this.setState({
          exhNameList: exhList,
          defaultExhName: locale === "en" ? "Please select" : "请选择"
        });
      }
    });
  };

  getOverviewInfo: any = () => {
    const { exhOverview } = this.props;
    const { exhOverviewYear } = this.state;
    exhOverview({
      params: {
        year: exhOverviewYear
      },
      cb: (type: any, data: any) => {
        const { exhOverviewInfo } = this.props;
        this.setState({
          exhOverviewData: exhOverviewInfo
        });
      }
    });
  };

  getExhTimesData = () => {
    const { exhOverview } = this.props;
    exhOverview({
      params: {
        year: this.state.selectYear,
        month: this.state.selectMonth
      },
      cb: (type: any, data: any) => {
        this.setState({
          exhTotalTimes: data.data.data.expoCounts,
          exhTotalAmount: data.data.data.expoAmounts,
          exhTotalAmountPrecent: data.data.data.percentage,
          maxTotalAmount: data.data.data.expoHisAmounts,
          expoGeneral: data.data.data.orderExpoGeneralVos
        });
      }
    });
  };

  getOrderAnalyseData = () => {
    const { exhAnalysis } = this.props;
    exhAnalysis({
      params: {
        expoName: this.state.defaultExhName
      },
      cb: (type: any, data: any) => {
        const { exhAnalysisInfo } = this.props;
        if (exhAnalysisInfo.data.orderExpoAnalysisItemsVos) {
          for (
            let i = 0;
            i < exhAnalysisInfo.data.orderExpoAnalysisItemsVos.length;
            i++
          ) {
            exhAnalysisInfo.data.orderExpoAnalysisItemsVos[i].percentage *= 1;
          }
        }

        this.setState({
          totalCounts: exhAnalysisInfo.data.totalCounts,
          totalAmounts: exhAnalysisInfo.data.totalAmounts,
          orderExpoAnalysisItemsVos:
            exhAnalysisInfo.data.orderExpoAnalysisItemsVos,
          orderExpoAnalysisTrendsVos:
            exhAnalysisInfo.data.orderExpoAnalysisTrendsVos
        });
      }
    });
  };

  // 选择会展名称后的函数
  selectExhName = (value: any) => {
    this.setState({ exhName: value, defaultExhName: value }, () => {
      this.getOrderAnalyseData();
    });
  };

  setCurrYear = (val: any) => {
    const currDate = new Date();

    let currMonth = currDate.getMonth() + 1;
    let year = currDate.getFullYear();
    this.setState(
      {
        currMonth: val * 1 === year ? currMonth : 12,
        selectYear: val * 1
      },
      () => {
        this.getExhTimesData();
      }
    );
  };

  setCurrMonth = (val: any) => {
    this.setState(
      {
        selectMonth: val * 1
      },
      () => {
        this.getExhTimesData();
      }
    );
  };

  render() {
    const { classes, locale } = this.props;
    const {
      exhNameList,
      orderExpoAnalysisItemsVos,
      orderExpoAnalysisTrendsVos,
      totalCounts,
      expoGeneral,
      defaultExhName
    } = this.state;
    const monthArr: any =
      locale === "en"
        ? [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        : [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ];
    return (
      <div>
        <div className={classes.root}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 20px 0 20px",
              marginBottom: 10,
              height: 56,
              borderBottom: "1px solid #dddddd"
            }}
          >
            <FormattedMessage
              id="order.exhibitionTime"
              defaultMessage="Exhibition time："
            ></FormattedMessage>
            <Select
              placeholder={locale === "en" ? "Please select" : "请选择"}
              getPopupContainer={triggerNode => triggerNode}
              style={{ width: 100 }}
              defaultValue={2019}
              onChange={(value: any) => {
                this.setState(
                  {
                    exhYear: value
                  },
                  () => this.chooseYear()
                );
              }}
            >
              <Option value="2019">2019</Option>
              <Option value="2020">2020</Option>
              <Option value="2021">2021</Option>
              <Option value="2022">2022</Option>
            </Select>
            <span style={{ marginLeft: 42 }}>
              <FormattedMessage
                id="order.exhibitionName"
                defaultMessage="Exhibition name"
              />
              ：
            </span>
            <Select
              placeholder={locale === "en" ? "Please select" : "请选择"}
              style={{ width: 200 }}
              getPopupContainer={triggerNode => triggerNode}
              onChange={this.selectExhName}
              value={defaultExhName}
            >
              {exhNameList &&
                exhNameList.map((item: any, index: number) => {
                  return (
                    <Select.Option title={item} key={index} value={item}>
                      {item}
                    </Select.Option>
                  );
                })}
            </Select>
          </div>
          <div className="HeaderInfoBox">
            <div>
              <p>
                <FormattedMessage
                  id="order.totalNumberOfExhibitionOrders"
                  defaultMessage="Total number of exhibition orders"
                />
              </p>
              <b className={classes.boldNum}>{this.state.totalCounts || 0}</b>
            </div>
            <Divider className="headerDivider" type="vertical" />
            <div>
              <p>
                <FormattedMessage
                  id="order.totalAmountofExhibitionOrders"
                  defaultMessage="Total amount of exhibition orders (Yuan)"
                />
              </p>
              <b className={classes.boldNum}>
                {(this.state.totalAmounts &&
                  "￥" + this.formatNum(this.state.totalAmounts)) ||
                  0}
              </b>
            </div>
          </div>

          <div className={classes.DonutPanelGroup}>
            <div className={classes.rootDonutPanel}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "#08ABF8", marginRight: 6 }}>●</span>
                <span style={{ fontSize: 16, color: "#33353D" }}>
                  <FormattedMessage
                    id="order.exhibitionOrderTrendAnalysis"
                    defaultMessage="Trend analysis"
                  />
                </span>
              </div>
              {orderExpoAnalysisTrendsVos && (
                <div
                  style={{
                    margin: "10px 0px -18px 0px",
                    fontSize: 12,
                    color: "rgba(183,183,183,1)"
                  }}
                >
                  <FormattedMessage id="order.time" defaultMessage="Time" />
                </div>
              )}
              <ExhBar data={orderExpoAnalysisTrendsVos} locale={locale} />
              {orderExpoAnalysisTrendsVos && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "-77px"
                  }}
                >
                  <div></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: locale === "en" ? "150px" : "87px"
                    }}
                  >
                    <div
                      style={{
                        display: "inlineBlock",
                        width: "20px",
                        height: "10px",
                        background: "#FF9C6E",
                        borderRadius: "2px"
                      }}
                    ></div>
                    <span style={{ color: "rgba(90,90,90,1)" }}>
                      <FormattedMessage
                        id="order.orderQuantity"
                        defaultMessage="Number of orders"
                      />
                    </span>
                  </div>{" "}
                  <div style={{ fontSize: 12, color: "rgba(183,183,183,1)" }}>
                    <FormattedMessage
                      id="order.number"
                      defaultMessage="Number"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={classes.rootDonutPanel}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "#08ABF8", marginRight: 6 }}>●</span>
                <span style={{ fontSize: 16, color: "#33353D" }}>
                  <FormattedMessage
                    id="order.exhibitionServiceProjectAnalysis"
                    defaultMessage="Services items analysis"
                  />
                </span>
              </div>
              <ExhLoop
                totalCounts={totalCounts}
                data={orderExpoAnalysisItemsVos}
                locale={locale}
              />
            </div>
          </div>
        </div>

        {/* 开展次数概览部分 */}
        <div className={classes.root}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 20px 0 20px",
              marginBottom: 10,
              height: 56,
              borderBottom: "1px solid #dddddd"
            }}
          >
            <b
              style={{
                color: "#33353D",
                fontSize: "17px",
                marginRight: "100px"
              }}
            >
              <FormattedMessage
                id="order.exhibitionTimesOverview"
                defaultMessage="Number of exhibitions overview"
              />
            </b>
            <span>
              <FormattedMessage
                id="order.annualOrder"
                defaultMessage="Annual orders："
              />
            </span>
            <Select
              placeholder="请选择"
              defaultValue="2019"
              getPopupContainer={triggerNode => triggerNode}
              style={{ width: 100 }}
              onChange={this.setCurrYear}
            >
              <Option value="2019">2019</Option>
              <Option value="2020">2020</Option>
              <Option value="2021">2021</Option>
              <Option value="2022">2022</Option>
            </Select>
            <Divider
              className="headerDivider"
              type="vertical"
              style={{ margin: "0 20px" }}
            />
            <span>
              <FormattedMessage
                id="order.MonthlyOrder"
                defaultMessage="Monthly orders："
              />
            </span>
            <Select
              placeholder="请选择"
              style={{ width: 200 }}
              defaultValue=""
              getPopupContainer={triggerNode => triggerNode}
              onChange={this.setCurrMonth}
            >
              <Select.Option key={"year"} value="">
                {locale === "en" ? "Annual" : "全年"}
              </Select.Option>
              {monthArr.map((item: any, key: any) => (
                <Select.Option key={key} value={key + 1}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="HeaderInfoBox">
            <div>
              <p>
                <FormattedMessage
                  id="order.exhibitionsTotalNumber"
                  defaultMessage="Total number of exhibitions"
                />
              </p>
              <b className={classes.boldNum}>{this.state.exhTotalTimes || 0}</b>
            </div>
            <Divider className="headerDivider" type="vertical" />
            <div>
              <p>
                <span>
                  <FormattedMessage
                    id="order.exhibitionTotalAmount"
                    defaultMessage="Total amount of exhibitions"
                  />
                </span>
                <span
                  title={
                    locale === "en" ? "Year-on-year Growth" : "同比去年增长"
                  }
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                    color: "#5E616E",
                    paddingLeft: "10px"
                  }}
                >
                  {this.state.exhTotalAmountPrecent < 0 ? (
                    <span
                      style={{
                        display: "inline-block",
                        color: "#02B583",
                        width: "16px",
                        textAlign: "center"
                      }}
                    >
                      <Icon type="down-square" />
                    </span>
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        color: "red",
                        width: "16px",
                        textAlign: "center"
                      }}
                    >
                      <Icon type="up-square" />
                    </span>
                  )}
                  <span>{this.state.exhTotalAmountPrecent + "%"}</span>
                </span>
              </p>
              <b className={classes.boldNum}>
                {+this.state.exhTotalAmount
                  ? "￥" + this.formatNum(this.state.exhTotalAmount)
                  : 0}
              </b>
            </div>
            <Divider className="headerDivider" type="vertical" />
            <div>
              <p>
                <FormattedMessage
                  id="order.highestTotalAmountHistory"
                  defaultMessage="Top amount in history (Yuan)"
                />
              </p>
              <b className={classes.boldNum}>
                {+this.state.maxTotalAmount
                  ? "￥" + this.formatNum(this.state.maxTotalAmount)
                  : 0}
              </b>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <span
              style={{
                fontSize: "12px",
                color: "#bfbfbf",
                position: "absolute",
                top: "5%",
                left: "3%"
              }}
            >
              {locale === "zh" ? "展会次数(次)" : "Exhibition Times"}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#bfbfbf",
                position: "absolute",
                top: "5%",
                left: "90%"
              }}
            >
              {locale === "zh" ? "订单金额(元)" : "Amount of order"}
            </span>
            <LineBarCharts data={expoGeneral} locale={locale} />
          </div>
        </div>
      </div>
    );
  }
}

const mapState2Props = ({
  exh: { exhList, exhAnalysisInfo, exhOverviewInfo, exhTimesData },
  intl: { locale }
}: any) => ({
  exhList,
  exhAnalysisInfo,
  exhOverviewInfo,
  exhTimesData,
  locale
});

const mapDispatch2Props = ({
  exh: { getExhList, exhAnalysis, exhOverview, exhTimesData }
}: any) => ({
  getExhList,
  exhAnalysis,
  exhOverview,
  exhTimesData
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Orderanal)
);
