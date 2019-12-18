import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import moment from "moment";
import {
  Select,
  Input,
  Row,
  Col,
  Button,
  Table,
  DatePicker,
  message,
  Tooltip
} from "antd";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const { RangePicker } = DatePicker;

export interface OrderSearchProps {
  classes: any;
  match: any;
  history: any;
  locale: any;
  getOrderList: any;
  list: any;
  resetOrderLists: Function;
  location: any;
  orderPageState: any;
  putOrderPageState: Function;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "30px 20px"
  },
  inputcontent: {
    width: "68%",
    display: "inline-block",
    marginLeft: "5px",
    "& .ant-select-selection--multiple": {
      height: "32px",
      overflow: "hidden"
    }
  },
  inputbox: {
    "& span": {
      marginRight: "2px"
    },
    "& input": {
      width: "68%"
    }
  },
  firstLine: {
    marginBottom: "20px",
    "& .ant-row": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  radiousColor0: {
    color: "rgba(0, 0, 0, 0.65)"
  },
  radiousColor1: {
    color: "rgba(0, 0, 0, 0.65)"
  },
  radiousColor2: {
    color: "rgba(0, 0, 0, 0.65)"
  },
  radiousColor3: {
    color: "rgba(0, 0, 0, 0.65)"
  },
  radiousColor4: {
    color: "rgba(0, 0, 0, 0.65)"
  },
  radiousColor5: {
    color: "#BBBBBB"
  },
  radiousBgColor0: {
    backgroundColor: "#FBB244"
  },
  radiousBgColor1: {
    backgroundColor: "#02B583"
  },
  radiousBgColor2: {
    backgroundColor: "#FC5B5B"
  },
  radiousBgColor3: {
    backgroundColor: "#1890FF"
  },
  radiousBgColor4: {
    backgroundColor: "#36cfc9"
  },
  radiousBgColor5: {
    backgroundColor: "#BBBBBB"
  },
  ENSpan: {
    display: "block"
  },
  CNSpan: {
    display: "inline-block",
    verticalAlign: "top",
    marginTop: "6px"
  },
  col: {
    maxWidth: 200,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    cursor: "pointer",
    WebkitLineClamp: 3,
    display: "inherit"
  },
  table: {
    "& ::-webkit-scrollbar": {
      display: "none",
      "-ms-overflow-style": "none"
    }
  }
});

const { Option } = Select;

class OrderSearch extends React.Component<OrderSearchProps, any> {
  constructor(props: Readonly<OrderSearchProps>) {
    super(props);
    this.state = {
      orderSource: "",
      expoName: "",
      orderNumber: "",
      orderStatus: "",
      startAmounts: "",
      endAmounts: "",
      serviceItem: "",
      startDate: "",
      endDate: "",
      pageIndex: 1,
      pageSize: 10,
      current: 1
    };
  }

  onChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  onSelect = (name: any) => (event: any) => {
    this.setState({ [name]: event });
  };

  onChoose = (name: any) => (event: any) => {
    let eventList = event.join(",");
    this.setState({ [name]: eventList });
  };

  minNumChange = (e: any) => {
    const { value } = e.target;
    this.setState({ startAmounts: value });
  };

  maxNumChange = (e: any) => {
    const { value } = e.target;
    this.setState({ endAmounts: value });
  };

  pageJump = (pageVal: any) => {
    let pageIndex = pageVal.current;
    let pageSize = pageVal.pageSize;
    const { getOrderList } = this.props;
    getOrderList({
      params: { pageIndex: pageIndex, pageSize: pageSize },
      cb: (type: object, data: any) => {}
    });
  };

  selectPageJump = (pageInfo: any) => {
    let pageIndex = pageInfo.current;
    let pageSize = pageInfo.pageSize;
    this.setState({
      pageIndex: pageIndex,
      pageSize: pageSize,
      current: pageIndex
    },
    () => {
      // 设置页面查询条件
    const { putOrderPageState } = this.props;
    putOrderPageState({
      orderPageState: {
        ...this.state
      }
    })
  });
    const {
      orderSource,
      expoName,
      orderNumber,
      orderStatus,
      startAmounts,
      endAmounts,
      startDate,
      endDate,
      serviceItem
    } = this.state;
    const { getOrderList } = this.props;
    if (Number(startAmounts) <= Number(endAmounts)) {
      getOrderList({
        params: {
          id: orderNumber,
          startDate: startDate,
          endDate: endDate,
          source: orderSource,
          status: orderStatus,
          expoName: expoName,
          startAmount: startAmounts,
          endAmount: endAmounts,
          pageIndex: pageIndex,
          pageSize: pageSize,
          item: serviceItem
        }
      });
    } else {
      message.config({
        maxCount: 1
      });
      message.warning(
        this.props.locale === "zh"
          ? "最大金额不能小于最小金额"
          : "Maximum amount should not be less than minimum amount"
      );
    }
  };

  doSearch = () => {
    const {
      orderSource,
      expoName,
      orderNumber,
      orderStatus,
      startAmounts,
      endAmounts,
      startDate,
      endDate,
      serviceItem,
      pageSize
    } = this.state;
    // 设置页面查询条件
    const { putOrderPageState } = this.props;
    putOrderPageState({
      orderPageState: {
        ...this.state
      }
    });
    const { getOrderList } = this.props;
    if (Number(startAmounts) <= Number(endAmounts)) {
      this.setState({
        current: 1
      });
      getOrderList({
        params: {
          id: orderNumber,
          startDate: startDate,
          endDate: endDate,
          source: orderSource,
          status: orderStatus,
          expoName: expoName,
          startAmount: startAmounts,
          endAmount: endAmounts,
          item: serviceItem,
          pageSize: pageSize
        }
      });
    } else {
      message.config({
        maxCount: 1
      });
      message.warning(
        this.props.locale === "zh"
          ? "最大金额不能小于最小金额"
          : "Maximum amount should not be less than minimum amount"
      );
    }
  };

  enterPress = (e: any) => {
    let code = e.charCode || e.keyCode;
    if (code === 13) {
      this.doSearch();
    }
  };

  componentDidMount() {
    const { getOrderList, location, orderPageState } = this.props;
    if (location.state && location.state.yesterdayString) {
      this.setState(
        {
          startDate: location.state.yesterdayString + " 00:00:00",
          endDate: location.state.yesterdayString + " 23:59:59"
        },
        () => {
          this.doSearch();
        }
      );
    } else {
      this.setState(
        {
          ...orderPageState
        },()=>{
          let {
            orderSource,
            expoName,
            orderNumber,
            orderStatus,
            startAmounts,
            endAmounts,
            startDate,
            endDate,
            serviceItem,
            pageSize,
            pageIndex,
          } = this.state;
          getOrderList({
            params: {
              id: orderNumber,
              startDate: startDate,
              endDate: endDate,
              source: orderSource,
              status: orderStatus,
              expoName: expoName,
              startAmount: startAmounts,
              endAmount: endAmounts,
              item: serviceItem,
              pageSize: pageSize,
              pageIndex: pageIndex,
            },
            cb: (type: any, data: any) => {
              if (data && data.status !== 200) {
                message.config({
                  maxCount: 1
                });
                message.error(
                  this.props.locale === "zh" ? "获取数据失败" : "Failed to retrieve data"
                );
              }
            }
          });
        })
      // let {
      //   orderSource,
      //   expoName,
      //   orderNumber,
      //   orderStatus,
      //   startAmounts,
      //   endAmounts,
      //   startDate,
      //   endDate,
      //   serviceItem,
      //   pageSize
      // } = this.state;

      // getOrderList({
      //   params: {
      //     id: orderNumber,
      //     startDate: startDate,
      //     endDate: endDate,
      //     source: orderSource,
      //     status: orderStatus,
      //     expoName: expoName,
      //     startAmount: startAmounts,
      //     endAmount: endAmounts,
      //     item: serviceItem,
      //     pageSize: pageSize
      //   },
      //   cb: (type: any, data: any) => {
      //     if (data && data.status !== 200) {
      //       message.config({
      //         maxCount: 1
      //       });
      //       message.error(
      //         this.props.locale === "zh" ? "获取数据失败" : "Failed to get data"
      //       );
      //     }
      //   }
      // });
    }
    document.body.addEventListener("keyup", this.enterPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keyup", this.enterPress);
    const { resetOrderLists } = this.props;
    resetOrderLists();
  }

  disabledDate = (current: any) => {
    return current > moment().startOf("day");
  };

  render() {
    const { classes, match, list, locale } = this.props;
    const directionVal = locale === "zh" ? "row" : "column";
    const alignItemsVal = locale === "zh" ? "center" : "baseline";
    const columns: any = [
      {
        title: (
          <FormattedMessage
            id="order.orderNumber"
            defaultMessage="Order number"
          />
        ),
        dataIndex: "orderNumber",
        key: "orderNumber",
        width: 110,
        render: (message: any, item: { orderNumber: String }) => {
          return (
            <Link to={{ pathname: `${match.path}/detail`, state: {id: item.orderNumber }}}>
             <Tooltip placement="topLeft" title={message}>
              <span className={`${classes.col}`}>{message}</span>
            </Tooltip>
          </Link>
           
          );
        }
      },
      {
        title: (
          <FormattedMessage
            id="order.exhibitionName"
            defaultMessage="Exhibition name"
          />
        ),
        dataIndex: "expoName",
        key: "expoName",
        width: 200,
        render: (message: any) => {
          return (
            <Tooltip placement="topLeft" title={message}>
              <span className={`${classes.col}`}>{message}</span>
            </Tooltip>
          );
        }
      },
      {
        title: (
          <FormattedMessage
            id="order.exhibitionStartandEndTime"
            defaultMessage="Exhibition start time and end time"
          />
        ),
        dataIndex: "date",
        key: "date",
        width: 280,
        render: (value: any, item: any) => {
          let expoStartDate = item.expoStartDate
            ? moment(item.expoStartDate).format("YYYY-MM-DD")
            : "";
          let expoEndDate = item.expoEndDate
            ? moment(item.expoEndDate).format("YYYY-MM-DD")
            : "";
          return expoStartDate + " — " + expoEndDate;
        }
      },
      {
        title: (
          <FormattedMessage id="order.orderTime" defaultMessage="Order time" />
        ),
        dataIndex: "createdAt",
        key: "createdAt",
        width: 220
      },
      {
        title: (
          <FormattedMessage
            id="order.serviceBuyer"
            defaultMessage="Service buyer"
          />
        ),
        dataIndex: "customerName",
        key: "customerName",
        width: 200,
        render: (message: any) => {
          return (
            <Tooltip placement="topLeft" title={message}>
              <span className={`${classes.col}`}>{message}</span>
            </Tooltip>
          );
        }
      },
      {
        title: (
          <FormattedMessage
            id="order.serviceItems"
            defaultMessage="Service items"
          />
        ),
        dataIndex: "item",
        key: "item",
        width: 150,
        render: (value: string) => {
          const serviceItems =
            locale === "zh"
              ? (value === "0" && "租赁商品") ||
                (value === "1" && "租赁服务") ||
                (value === "2" && "购买商品") ||
                (value === "3" && "购买服务") ||
                (value === "9" && "其他") ||
                value
              : (value === "0" && "Commodity Lease") ||
                (value === "1" && "Service Lease") ||
                (value === "2" && "Commodity Purchase") ||
                (value === "3" && "Service Purchase") ||
                (value === "9" && "Others") ||
                value;
          return (
            <div>
              <span>{serviceItems}</span>
            </div>
          );
        }
      },
      {
        title: (
          <FormattedMessage
            id="order.orderAmount"
            defaultMessage="Order amount"
          />
        ),
        dataIndex: "totalAmounts",
        key: "totalAmounts",
        // width: 200,
        render: (value: string) => {
          return "￥" + (value + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },
      {
        title: (
          <FormattedMessage
            id="order.sourceSystem"
            defaultMessage="Source system"
          />
        ),
        dataIndex: "orderSource",
        key: "orderSource",
        width: 200,
        render: (value: string) => {
          const orderSource =
            locale === "zh"
              ? (value === "1" && "现场订单系统") ||
                (value === "2" && "会展场馆管理系统") ||
                (value === "3" && "门禁制证系统") ||
                (value === "4" && "智慧停车") ||
                value
              : (value === "1" && "EI") ||
                (value === "2" && "EB") ||
                (value === "3" && "EP") ||
                (value === "4" && "SP") ||
                value;
          return (
            <div>
              <span>{orderSource}</span>
            </div>
          );
        }
      },
      {
        title: (
          <FormattedMessage
            id="order.orderStatus"
            defaultMessage="Order status"
          />
        ),
        dataIndex: "orderStatus",
        key: "orderStatus",
        width: 160,
        render: (value: string) => {
          const colorStatus = value;
          const orderStatus =
            locale === "zh"
              ? (value === "0" && "待定") ||
                (value === "1" && "确定") ||
                (value === "2" && "部分支付") ||
                (value === "3" && "完成") ||
                (value === "4" && "已交货") ||
                (value === "5" && "取消") ||
                value
              : (value === "0" && "Undefined") ||
                (value === "1" && "Confirmed") ||
                (value === "2" && "Partial payment") ||
                (value === "3" && "Completed") ||
                (value === "4" && "Delivered") ||
                (value === "5" && "Cancel") ||
                value;
          return (
            <div className={classes[`radiousColor${colorStatus}`]}>
              <span
                className={classes[`radiousBgColor${colorStatus}`]}
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  marginRight: "5px"
                }}
              />
              <span>{orderStatus}</span>
            </div>
          );
        }
      },
      {
        title: <FormattedMessage id="order.operate" defaultMessage="Action" />,
        key: "edit",
        fixed: "right",
        width: 70,
        render: (text: string, item: { orderNumber: String }, index: any) => (
          <span>
            <Link
              to={{
                pathname: `${match.path}/detail`,
                state: {
                  id: item.orderNumber
                }
              }}
            >
              <FormattedMessage id="order.view" defaultMessage="View" />
            </Link>
          </span>
        )
      }
    ];
    return (
      <div className={classes.root}>
        <div className={classes.firstLine}>
          <Row>
            <Col span={6}>
              <div className={classes.inputbox}>
                <span
                  className={locale !== "zh" ? classes.ENSpan : classes.CNSpan}
                >
                  <FormattedMessage
                    id="order.orderSource"
                    defaultMessage="Order source"
                  />{" "}
                </span>
                <Select
                  showArrow={true}
                  placeholder={
                    <FormattedMessage
                      id="order.isMultiple"
                      defaultMessage="Please select (multiple)"
                    />
                  }
                  mode="multiple"
                  getPopupContainer={triggerNode => triggerNode}
                  className={classes.inputcontent}
                  onChange={this.onChoose("orderSource")}
                  value={this.state.orderSource==="" ? [] : this.state.orderSource.split(",")}
                >
                  <Option value="2">
                    <FormattedMessage id="order.EB" defaultMessage="EB" />
                  </Option>
                  <Option value="1">
                    <FormattedMessage id="order.EI" defaultMessage="EI" />
                  </Option>
                  <Option value="3">
                    <FormattedMessage id="order.EP" defaultMessage="EP" />
                  </Option>
                  <Option value="4">
                    <FormattedMessage id="order.SP" defaultMessage="SP" />
                  </Option>
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div className={classes.inputbox}>
                <span className={locale !== "zh" ? classes.ENSpan : null}>
                  <FormattedMessage
                    id="order.exhibitionName"
                    defaultMessage="Exhibition name"
                  />{" "}
                </span>
                <FormattedMessage
                  id="order.pleaseEnterExhibitionName"
                  defaultMessage="Please enter exhibition name"
                >
                  {text => (
                    <Input
                      className={classes.inputcontent}
                      placeholder={text.toString()}
                      onChange={this.onChange("expoName")}
                      maxLength={32}
                      value={this.state.expoName}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Col>
            <Col span={6}>
              <div className={classes.inputbox}>
                <span className={locale !== "zh" ? classes.ENSpan : null}>
                  <FormattedMessage
                    id="order.orderNumber"
                    defaultMessage="Order number"
                  />{" "}
                </span>
                <FormattedMessage
                  id="order.pleaseEnterOrderNumber"
                  defaultMessage="Please enter order number"
                >
                  {text => (
                    <Input
                      className={classes.inputcontent}
                      placeholder={text.toString()}
                      onChange={this.onChange("orderNumber")}
                      maxLength={36}
                      value={this.state.orderNumber}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Col>
            <Col span={6}>
              <div className={classes.inputbox}>
                <span className={locale !== "zh" ? classes.ENSpan : null}>
                  <FormattedMessage
                    id="order.OrderAmount"
                    defaultMessage="Order amount"
                  />{" "}
                </span>
                <FormattedMessage
                  id="order.minimumAmount"
                  defaultMessage="Minimum amount"
                >
                  {text => (
                    <Input
                      className={classes.inputcontent}
                      style={{ width: "30%" }}
                      placeholder={text.toString()}
                      value={this.state.startAmounts}
                      onChange={this.minNumChange}
                      maxLength={20}
                    />
                  )}
                </FormattedMessage>
                <span
                  style={{ margin: "0px 4px", color: "rgba(0, 0, 0, 0.65)" }}
                >
                  —
                </span>
                <FormattedMessage
                  id="order.maximumAmount"
                  defaultMessage="Maximum amount"
                >
                  {text => (
                    <Input
                      className={classes.inputcontent}
                      style={{ width: "30%" }}
                      placeholder={text.toString()}
                      value={this.state.endAmounts}
                      onChange={this.maxNumChange}
                      maxLength={20}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Col>
          </Row>
        </div>
        <div className={classes.firstLine}>
          <Row>
            <Col span={6}>
              <div className={classes.inputbox}>
                <span className={locale !== "zh" ? classes.ENSpan : null}>
                  <FormattedMessage
                    id="order.orderStatus"
                    defaultMessage="Order status"
                  />{" "}
                </span>
                <Select
                  placeholder={
                    <FormattedMessage
                      id="order.pleaseSelectOrderStatus"
                      defaultMessage="Please select order status"
                    />
                  }
                  getPopupContainer={triggerNode => triggerNode}
                  className={classes.inputcontent}
                  onChange={this.onSelect("orderStatus")}
                  value={this.state.orderStatus}
                >
                  <Option value="">
                    <FormattedMessage
                      id="order.allStatus"
                      defaultMessage="All status"
                    />
                  </Option>
                  <Option value="0">
                    <FormattedMessage
                      id="order.undetermined"
                      defaultMessage="Undefined"
                    />
                  </Option>
                  <Option value="1">
                    <FormattedMessage
                      id="order.confirm"
                      defaultMessage="Confirmed"
                    />
                  </Option>
                  <Option value="2">
                    <FormattedMessage
                      id="order.partialPayment"
                      defaultMessage="Partial payment"
                    />
                  </Option>
                  <Option value="3">
                    <FormattedMessage
                      id="order.completed"
                      defaultMessage="Completed"
                    />
                  </Option>
                  <Option value="4">
                    <FormattedMessage
                      id="order.delivered"
                      defaultMessage="Delivered"
                    />
                  </Option>
                  <Option value="5">
                    <FormattedMessage
                      id="order.cancel"
                      defaultMessage="Cancel"
                    />
                  </Option>
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div
                className={classes.inputbox}
                style={{
                  display: "flex",
                  flexDirection: directionVal,
                  alignItems: alignItemsVal
                }}
              >
                <span className={locale !== "zh" ? classes.ENSpan : null}>
                  <FormattedMessage
                    id="order.serviceItem"
                    defaultMessage="Service item"
                  />{" "}
                </span>
                <Select
                  showArrow={true}
                  placeholder={
                    <FormattedMessage
                      id="order.isMultiple"
                      defaultMessage="Please select (multiple)"
                    />
                  }
                  mode="multiple"
                  getPopupContainer={triggerNode => triggerNode}
                  className={classes.inputcontent}
                  onChange={this.onChoose("serviceItem")}
                  value={this.state.serviceItem==="" ? [] : this.state.serviceItem.split(",")}
                >
                  <Option value="0">
                    <FormattedMessage
                      id="order.commodityLease"
                      defaultMessage="Commodity lease"
                    />
                  </Option>
                  <Option value="2">
                    <FormattedMessage
                      id="order.commodityPurchase"
                      defaultMessage="Commodity purchase"
                    />
                  </Option>
                  <Option value="1">
                    <FormattedMessage
                      id="order.serviceLease"
                      defaultMessage="Service lease"
                    />
                  </Option>
                  <Option value="3">
                    <FormattedMessage
                      id="order.servicePurchase"
                      defaultMessage="Service purchase"
                    />
                  </Option>
                  <Option value="9">
                    <FormattedMessage
                      id="order.others"
                      defaultMessage="Other"
                    />
                  </Option>
                </Select>
              </div>
            </Col>
              
            <Col span={12}>
              <span
                className={locale !== "zh" ? classes.ENSpan : null}
                style={{ marginRight: 4 }}
              >
                <FormattedMessage
                  id="order.orderTime"
                  defaultMessage="Order time"
                />{" "}
              </span>
              <RangePicker
                locale={locale}
                showTime
                style={{ width: '70%'}}
                disabledDate={this.disabledDate}
                value={
                  this.state.startDate && this.state.endDate &&
                  [moment(this.state.startDate+""), moment(this.state.endDate+"")]
                }
                onChange={(date, dateString) => {
                  this.setState({
                    startDate: dateString[0],
                    endDate: dateString[1]
                  });
                }}
                getCalendarContainer={(triggerNode): any => triggerNode.parentNode}
              />
              <Button
                type="primary"
                onClick={this.doSearch}
                style={{ marginLeft: "2%" }}
              >
                <FormattedMessage id="order.search" defaultMessage="Search" />
              </Button>
            </Col>
          </Row>
        </div>

        <Table
          pagination={{
            current: this.state.current,
            pageSize: this.state.pageSize,
            defaultCurrent: 1,
            total: list.totalRecords,
            showSizeChanger: true,
            showQuickJumper: {
              goButton: (
                <Button
                  onClick={this.selectPageJump}
                  style={{ marginLeft: "10px" }}
                >
                  <FormattedMessage id="order.skip" defaultMessage="Jump" />
                </Button>
              )
            },
            showTotal: (value: any) => {
              return (
                <FormattedMessage
                  id="user.total"
                  defaultMessage={`Total ${value} items`}
                  values={{ value }}
                />
              );
            }
          }}
          onChange={this.selectPageJump}
          columns={columns}
          dataSource={list && list.data}
          scroll={{ x: 1700 }}
          className={classes.table}
          rowKey={(row: any) => row.id}
        />
      </div>
    );
  }
}

const mapState2Props = ({ order: { list }, intl: { locale }, pageState: { orderPageState } }: any) => ({
  list,
  locale,
  orderPageState,
});

const mapDispatch2Props = ({
  order: { getOrderList, resetOrderLists },
  pageState: { putOrderPageState },
}: any) => ({
  getOrderList,
  resetOrderLists,
  putOrderPageState,
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(OrderSearch)
);
