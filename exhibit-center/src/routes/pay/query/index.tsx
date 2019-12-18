import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import moment from "moment";
import {
  Button,
  Input,
  Table,
  Select,
  DatePicker,
  Row,
  Col,
  Tooltip
} from "antd";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
export interface PayQuery {
  classes: any;
  match: any;
  history: any;
  locale: any;
  listData: any;
  PayMethod: any;
  eventTypeList: any;
  getList: Function;
  payDetail: Function;
  paymentAmounts: Function;
  getStatBySystem: Function;
  getPayMethod: Function;
  payPageState: any;
  putPayPageState: Function;
}

const styles: any = (theme: any) => {
  const color = (color: string) => ({
    color: color,
    "& span": {
      background: color
    }
  });
  return {
    root: {
      margin: "20px",
      backgroundColor: "#FFFFFF",
      padding: "20px"
    },
    searchBox: {
      "& span": {
        paddingRight: "2px"
      },
      marginBottom: "10px",
      "& .ant-select, & input": {
        width: "160px",
        marginRight: "10px",
        marginBottom: "5px"
      },
      "& .ant-calendar-picker": {
        marginRight: "10px"
      }
    },
    gridIcon: {
      "& span": {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        display: "inline-block",
        marginRight: "4px"
      },
      "&.red": color("red")
    },
    inputbox: {
      "& input": {
        width: "68%"
      }
    },
    ENSpan: {
      display: "block"
    },
    datePickerInput: {
      "& input": "160px"
    },
    col: {
      maxWidth: 150,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      cursor: "pointer",
      WebkitLineClamp: 3,
      display: "inherit"
    }
  };
};

class User extends React.Component<PayQuery, any> {
  constructor(props: PayQuery) {
    super(props);
    this.state = {
      orderNumber: "",
      startTime: "",
      endTime: "",
      expoName: "",
      payWay: "all",
      pageIndex: 1,
      pageSize: 10,
      payCode: ""
    };
  }
  componentDidMount() {
    // 设置页面查询条件
    const { payPageState } = this.props;
    this.props.getPayMethod();
    this.setState({ ...payPageState }, () => {
      this.getList();
    });
    document.body.addEventListener("keyup", this.enterPress);
  }
  componentWillUnmount() {
    document.body.removeEventListener("keyup", this.enterPress);
  }
  disabledDate = (current: any) => {
    return current > moment().startOf("day");
  };
  getList = () => {
    const { putPayPageState } = this.props;
    this.props.getList({
      params: {
        ...this.state,
        payWay: this.state.payWay === "all" ? "" : this.state.payWay
      }
    });
    // 设置页面查询条件
    putPayPageState({
      payPageState: {
        ...this.state
      }
    });
  };
  onChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };
  onPageChange = (pageIndex: any, pageSize: any) => {
    this.setState({ pageIndex, pageSize }, () => this.getList());
  };
  onSearch = () => {
    this.setState({ pageIndex: 1 }, () => {
      this.getList();
    });
  };
  enterPress = (e: any) => {
    let code = e.charCode || e.keyCode;
    if (code === 13) {
      this.onSearch();
    }
  };

  render() {
    const { classes, match, listData, locale, PayMethod } = this.props;
    const { pageIndex, pageSize, startTime, endTime, payWay } = this.state;
    const total = listData.totalRecords;
    const columns = [
      {
        title: (
          <FormattedMessage
            id="order.orderNumber"
            defaultMessage="Order number"
          />
        ),
        dataIndex: "orderNumber",
        render: (message: any, record: any) => {
          return (
            <Link to={`${match.path}/detail/${record.orderNumber}`}>
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
            defaultMessage="Exhibition Name"
          />
        ),
        dataIndex: "expoName",
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
          <FormattedMessage id="pay.payNum" defaultMessage="Payment Number" />
        ),
        dataIndex: "payCode",
        render: (message: any) => {
          return (
            <Tooltip placement="topLeft" title={message}>
              <span className={`${classes.col}`}>{message}</span>
            </Tooltip>
          );
        }
      },
      {
        title: <FormattedMessage id="pay.payer" defaultMessage="Payer" />,
        dataIndex: "payName",
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
            id="pay.amountArrival"
            defaultMessage="Arrival Amount(¥)"
          />
        ),
        dataIndex: "bookValue",
        render: (value: string) => {
          return "￥" + (value + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },
      {
        title: (
          <FormattedMessage
            id="pay.paymentMethod"
            defaultMessage="Payment Method"
          />
        ),
        dataIndex: "payWay"
      },
      {
        title: <FormattedMessage id="pay.payDate" defaultMessage="Payment Date" />,
        dataIndex: "payDate",
        render: (text: string) => {
          return moment(text).format("YYYY-MM-DD HH:mm:ss");
        }
      },
      {
        title: <FormattedMessage id="order.operate" defaultMessage="Action" />,
        render: (text: string, record: any) => (
          <Link to={`${match.path}/detail/${record.orderNumber}`}>
            <FormattedMessage id="order.view" defaultMessage="View" />
          </Link>
        )
      }
    ];
    const data = listData.data || [];
    const pagination = {
      showSizeChanger: true,
      showQuickJumper: {
        goButton: (
          <Button style={{ marginLeft: "10px" }}>
            <FormattedMessage id="order.skip" defaultMessage="Jump" />
          </Button>
        )
      },
      showTotal: (total: number) => {
        return (
          <FormattedMessage
            id="pay.total"
            defaultMessage={`Total ${total} items`}
            values={{ total }}
          />
        );
      },
      total,
      pageSize: Number(pageSize),
      current: Number(pageIndex),
      onChange: this.onPageChange,
      onShowSizeChange: this.onPageChange
    };
    return (
      <div className={classes.root}>
        <div className={classes.searchBox}>
          <Row>
            <Col span={6}>
              <div className={classes.inputbox}>
                <span className={locale !== "zh" ? classes.ENSpan : null}>
                  <FormattedMessage
                    id="order.orderNumber"
                    defaultMessage="Order number"
                  />
                </span>
                <FormattedMessage
                  id="order.pleaseEnterOrderNumber"
                  defaultMessage="Please enter order number"
                >
                  {text => (
                    <Input
                      placeholder={text.toString()}
                      value={this.state.orderNumber}
                      onChange={this.onChange("orderNumber")}
                      maxLength={36}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Col>

            <Col span={6}>
              <div className={classes.inputbox}>
                <span className={locale !== "zh" ? classes.ENSpan : null}>
                  <FormattedMessage
                    id="order.exhibitionName"
                    defaultMessage="Exhibition name"
                  />
                </span>
                <FormattedMessage
                  id="order.pleaseEnterExhibitionName"
                  defaultMessage="Please enter exhibition name"
                >
                  {text => (
                    <Input
                      placeholder={text.toString()}
                      onChange={this.onChange("expoName")}
                      maxLength={36}
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
                    id="pay.payNum"
                    defaultMessage="Payment Number"
                  />
                </span>
                <FormattedMessage
                  id="pay.inputPayNum"
                  defaultMessage="Please enter payment number"
                >
                  {text => (
                    <Input
                      placeholder={text.toString()}
                      onChange={this.onChange("payCode")}
                      maxLength={36}
                      value={this.state.payCode}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Col>
            <Col span={6}>
              <span className={locale !== "zh" ? classes.ENSpan : null}>
                <FormattedMessage
                  id="pay.paymentMethod"
                  defaultMessage="Payment Method"
                />
              </span>
              <Select
                value={payWay}
                style={{ width: "68%" }}
                getPopupContainer={triggerNode => triggerNode}
                onChange={(value: any) => {
                  this.setState({ payWay: value });
                }}
              >
                <Select.Option value="all">
                  <FormattedMessage id="pay.all" defaultMessage="all" />
                </Select.Option>
                {PayMethod.map((item: any, index: number) => {
                  return (
                    <Select.Option key={index} value={item.label}>
                      {locale === "zh" ? item.label : item.english}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <span className={locale !== "zh" ? classes.ENSpan : null}>
            <FormattedMessage id="pay.payDate" defaultMessage="Payment Date" />
          </span>
          <DatePicker.RangePicker
            value={
              startTime && endTime ? [moment(startTime), moment(endTime)] : []
            }
            showTime
            className={classes.datePickerInput}
            style={{ width: 380 }}
            disabledDate={this.disabledDate}
            onChange={(date, dateString) => {
              this.setState({
                startTime: dateString[0],
                endTime: dateString[1]
              });
            }}
            getCalendarContainer={(triggerNode): any => triggerNode.parentNode}
          />
          <Button type="primary" onClick={this.onSearch}>
            <FormattedMessage id="action.search" defaultMessage="Search" />
          </Button>
        </div>
        <Table
          rowKey="id"
          pagination={pagination}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
}

const mapState2Props = ({
  pay: { listData, detail, chartData, PayMethod },
  intl: { locale },
  pageState: { payPageState },
}: any) => ({
  listData,
  detail,
  chartData,
  PayMethod,
  locale,
  payPageState,
});

const mapDispatch2Props = ({
  pay: { getList, payDetail, paymentAmounts, getStatBySystem, getPayMethod },
  pageState: { putPayPageState },
}: any) => ({
  getList,
  payDetail,
  paymentAmounts,
  getStatBySystem,
  getPayMethod,
  putPayPageState
});
export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(User)
);
