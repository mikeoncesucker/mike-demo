import React from "react";
import { withStyles } from "@material-ui/styles";
import { Table, message, Tooltip } from "antd";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

export interface OrderDetailProps {
  classes: any;
  location: any;
  locale: any;
  getOrderDetail: any;
  detail: any;
  resetOrderDetails: Function;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "20px"
  },
  title: {
    fontSize: "16px",
    color: "#33353D"
  },
  table: {
    width: "100%",
    "& th": {
      fontWeight: "normal",
      height: "54px",
      color: "#33353D",
      backgroundColor: "rgba(250,250,252,1)"
    },
    "& thead> tr": {
      height: "54px"
    },
    "& td, & th": {
      width: "33.33%",
      padding: "0",
      border: "1px solid rgba(204,204,204,1)",
      height: "40px",
      lineHeight: "40px",
      textIndent: "15px",
      "& .lable": {
        float: "left",
        width: " 44%",
        backgroundColor: "rgba(250,250,252,1)",
        borderRight: "1px solid rgba(204,204,204,1)"
      }
    }
  },
  tdContent: {
    height: "350px",
    overflow: "auto"
  },
  item: {
    backgroundColor: "rgba(8,171,248,0.2)"
  },
  radiousColor0: {
    color: "#FBB244",
    marginRight: "4px"
  },
  radiousColor1: {
    color: "#02B583",
    marginRight: "4px"
  },
  radiousColor2: {
    color: "#FC5B5B",
    marginRight: "4px"
  },
  radiousColor3: {
    color: "#1890FF",
    marginRight: "4px"
  },
  radiousColor4: {
    color: "#36cfc9",
    marginRight: "4px"
  },
  radiousColor5: {
    color: "#BBBBBB",
    marginRight: "4px"
  },
  value: {
    width: 150,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    cursor: "pointer"
  }
});

class OrderDetail extends React.Component<OrderDetailProps, any> {
  constructor(props: Readonly<OrderDetailProps>) {
    super(props);
    this.state = {
      expoName: ""
    };
  }
  componentDidMount() {
    const { location, getOrderDetail, locale } = this.props;
    if (location.state) {
      sessionStorage.setItem("orderStorageId", location.state.id);
    }
    getOrderDetail({
      id: sessionStorage.getItem("orderStorageId"),
      cb: (type: any, data: any) => {
        if (data && data.status !== 200) {
          message.config({
            maxCount: 1
          });
          message.error(
            locale === "zh" ? "获取数据失败" : "Failed to retrieve data"
          );
        }
      }
    });
  }
  componentWillUnmount() {
    const { resetOrderDetails } = this.props;
    resetOrderDetails();
  }
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { classes, detail, locale } = this.props;
    const columns: any = [
      {
        title: <FormattedMessage id="order.name" defaultMessage="Name" />,
        dataIndex: "commodityName",
        key: "commodityName"
      },
      {
        title: <FormattedMessage id="order.number" defaultMessage="Number" />,
        dataIndex: "number",
        key: "number"
      },
      {
        title: <FormattedMessage id="order.price" defaultMessage="Price" />,
        dataIndex: "price",
        key: "price",
        render: (message: any) => {
          return "￥ " + this.formatNum(message);
        }
      },
      {
        title: (
          <FormattedMessage
            id="order.exhibitionHall"
            defaultMessage="Exhibition hall"
          />
        ),
        key: "pavilionNumber",
        dataIndex: "pavilionNumber"
      },
      {
        title: (
          <FormattedMessage
            id="order.positionNumber"
            defaultMessage="Position number"
          />
        ),
        key: "boothNumber",
        dataIndex: "boothNumber"
      },
      {
        title: (
          <FormattedMessage
            id="order.discountAddition"
            defaultMessage="Discount/Addition"
          />
        ),
        key: "discount",
        dataIndex: "discount",
        render: (message: any) => {
          if (message > 0) {
            return "+￥ " + this.formatNum(message);
          } else if (message < 0) {
            return "-￥ " + this.formatNum(Math.abs(message));
          } else {
            return message;
          }
        }
      }
    ];
    const data = detail.orderDetails;
    return (
      <div>
        <div className={classes.root}>
          <p className={classes.title}>
            <b>
              <FormattedMessage
                id="order.basicInformation"
                defaultMessage="Basic information"
              />
            </b>
          </p>
          <table className={classes.table}>
            {detail && (
              <tbody>
                <tr>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.orderNumber"
                        defaultMessage="Order number"
                      />
                    </div>
                    <div
                      className="value"
                      style={{
                        width: 130,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        paddingRight: "20px"
                      }}
                    >
                      <Tooltip placement="topLeft" title={detail.orderNumber}>
                        {detail.orderNumber}
                      </Tooltip>
                    </div>
                  </td>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.exhibitionName"
                        defaultMessage="Exhibition name"
                      />
                    </div>
                    <div
                      className="value"
                      style={{
                        minWidth: 60,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        paddingRight: "20px"
                      }}
                    >
                      <Tooltip placement="topLeft" title={detail.expoName}>
                        {detail.expoName}
                      </Tooltip>
                    </div>
                  </td>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.serviceType"
                        defaultMessage="Service type"
                      />
                    </div>
                    <div className="value">
                      {locale === "zh"
                        ? (detail.item === "0" && "租赁商品") ||
                          (detail.item === "1" && "租赁服务") ||
                          (detail.item === "2" && "购买商品") ||
                          (detail.item === "3" && "购买服务") ||
                          (detail.item === "9" && "其他")
                        : (detail.item === "0" && "Commodity Lease") ||
                          (detail.item === "1" && "Service Lease") ||
                          (detail.item === "2" && "Commodity Purchase") ||
                          (detail.item === "3" && "Service Purchase") ||
                          (detail.item === "9" && "Others")}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.orderStatus"
                        defaultMessage="Order status"
                      />
                    </div>
                    <div>
                      <span className={classes[`radiousColor${detail.orderStatus}`]}>●</span>
                      <span className={classes[`radiousColor${detail.orderStatus}`]}>
                        {locale === "zh"
                          ? (detail.orderStatus === "0" && "待定") ||
                            (detail.orderStatus === "1" && "确定") ||
                            (detail.orderStatus === "2" && "部分支付") ||
                            (detail.orderStatus === "3" && "完成") ||
                            (detail.orderStatus === "4" && "已交货") ||
                            (detail.orderStatus === "5" && "取消")
                          : (detail.orderStatus === "0" && "Undefined") ||
                            (detail.orderStatus === "1" && "Confirmed") ||
                            (detail.orderStatus === "2" && "Partial payment") ||
                            (detail.orderStatus === "3" && "Completed") ||
                            (detail.orderStatus === "4" && "Delivered") ||
                            (detail.orderStatus === "5" && "Cancel")}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.clientdName"
                        defaultMessage="Client name"
                      />
                    </div>
                    <div
                      className="value"
                      style={{
                        overflow: "hidden",
                        paddingRight: 20,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer"
                      }}
                    >
                      <Tooltip placement="topLeft" title={detail.customerName}>
                        {detail.customerName}
                      </Tooltip>
                    </div>
                  </td>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.OrderAmount"
                        defaultMessage="Order amount"
                      />
                    </div>
                    <div className="value">{"￥"+this.formatNum(detail.totalAmounts)}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.orderSource"
                        defaultMessage="Order source"
                      />
                    </div>
                    <div className="value">
                      {locale === "zh"
                        ? (detail.orderSource === "1" && "现场订单系统") ||
                          (detail.orderSource === "2" && "会展场馆管理系统") ||
                          (detail.orderSource === "3" && "门禁制证系统") ||
                          (detail.orderSource === "4" && "智慧停车")
                        : (detail.orderSource === "1" && "EI") ||
                          (detail.orderSource === "2" && "EB") ||
                          (detail.orderSource === "3" && "EP") ||
                          (detail.orderSource === "4" && "SP")}
                    </div>
                  </td>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.exhibitionStartTime"
                        defaultMessage="Exhibition start time"
                      />
                    </div>
                    <div className="value">{detail.expoStartDate || "—"}</div>
                  </td>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.exhibitionEndTime"
                        defaultMessage="Exhibition end time"
                      />
                    </div>
                    <div className="value">{detail.expoEndDate || "—"}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.orderCreator"
                        defaultMessage="Order creator"
                      />
                    </div>
                    <div className="value">{detail.createdBy}</div>
                  </td>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.orderCreationTime"
                        defaultMessage="Order create time"
                      />
                    </div>
                    <div className="value">{detail.createdAt}</div>
                  </td>
                  <td>
                    <div className="lable">
                      <FormattedMessage
                        id="order.orderUpdateTime"
                        defaultMessage="Order update time"
                      />
                    </div>
                    <div className="value">{detail.updatedAt || "—"}</div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>

        <div className={classes.root}>
          <p className={classes.title}>
            <b>
              <FormattedMessage
                id="order.productDetails"
                defaultMessage="Details"
              />
            </b>
          </p>
          <Table
            columns={columns}
            pagination={false}
            dataSource={data}
            rowKey={(row: any) => row.commodityName}
          />
        </div>
      </div>
    );
  }
}

const mapState2Props = ({ order: { detail }, intl: { locale } }: any) => ({
  detail,
  locale
});

const mapDispatch2Props = ({
  order: { getOrderDetail, resetOrderDetails }
}: any) => ({
  getOrderDetail,
  resetOrderDetails
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(OrderDetail)
);
