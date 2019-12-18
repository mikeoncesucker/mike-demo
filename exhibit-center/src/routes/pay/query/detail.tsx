import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import ColumnTable from "../../../compontents/column_table";
import { Table } from "antd";
import moment from "moment";
import { FormattedMessage } from "react-intl";

const styles: any = (theme: any) => {
  return {
    root: {
      margin: "20px",
      padding: "26px 20px",
      background: "#fff"
    },
    title: {
      fontSize: "16px",
      color: "#33353D"
    }
  };
};

class Detail extends React.Component<any, any> {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.props.payDetail({ id });
    }
  }
  componentWillUnmount() {
    this.props.setDetail({ detail: {} });
  }
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { classes, detail } = this.props;
    const column: any = [
      [
        {
          name: (
            <FormattedMessage
              id="order.orderNumber"
              defaultMessage="Order number"
            />
          ),
          value: detail.orderNumber || ""
        },
        {
          name: (
            <FormattedMessage
              id="order.exhibitionName"
              defaultMessage="Exhibition name"
            />
          ),
          value: detail.expoName || ""
        },
        {
          name: (
            <FormattedMessage id="pay.PayNum" defaultMessage="Number of payments" />
          ),
          value: detail.customerNum || ""
        }
      ],
      [
        {
          name: <FormattedMessage id="pay.payer" defaultMessage="Payer" />,
          value: detail.payName || ""
        },
        {
          name: (
            <FormattedMessage
              id="pay.arrivalAmount"
              defaultMessage="Arrival Amount(¥)"
            />
          ),
          value: (detail.bookValue && "￥"+this.formatNum(detail.bookValue)) || ""
        },
        {
          name: (
            <FormattedMessage
              id="pay.businessType"
              defaultMessage="Business Type"
            />
          ),
          value: detail.busType || ""
        }
      ],
      [
        {
          name: <FormattedMessage id="pay.payDate" defaultMessage="Payment Date" />,
          value: detail.payDate
            ? moment(detail.payDate).format("YYYY-MM-DD HH:mm:ss")
            : ""
        },
        {
          name: (
            <FormattedMessage
              id="pay.contractStatus"
              defaultMessage="Contract Status"
            />
          ),
          value: detail.contractStatus || ""
        }
      ]
    ];
    const columns = [
      {
        title: <FormattedMessage id="pay.payNum" defaultMessage="Payment number" />,
        dataIndex: "payCode"
      },
      {
        title: (
          <FormattedMessage
            id="order.productName"
            defaultMessage="Product name"
          />
        ),
        dataIndex: "goodsName"
      },
      {
        title: (
          <FormattedMessage
            id="order.productsNumber"
            defaultMessage="Number of Products"
          />
        ),
        dataIndex: "goodsNumber"
      },
      {
        title: (
          <FormattedMessage
            id="order.commodityPrice"
            defaultMessage="Commodity price"
          />
        ),
        dataIndex: "price",
        render: (message: any) => {
          return "￥ " + this.formatNum(message);
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
        title: (
          <FormattedMessage
            id="order.exhibitionHall"
            defaultMessage="Exhibition hall"
          />
        ),
        dataIndex: "pavilionNumber"
      },
      {
        title: (
          <FormattedMessage
            id="order.positionNumber"
            defaultMessage="Position number"
          />
        ),
        dataIndex: "boothNumber"
      },
      {
        title: (
          <FormattedMessage id="pay.discount" defaultMessage="Discount/Addition" />
        ),
        dataIndex: "discount",
        render: (message: any) => {
          if(message > 0){
            return ("+￥ " + this.formatNum(message));
          } else if (message < 0) {
            return ("-￥ " + this.formatNum(message*-1));
          } else {
            return message;
          }
          
        }

      }
    ];
    const data = detail.list || [];
    return (
      <div>
        <div className={classes.root}>
          <h3 className={classes.title}>
            <b>
              <FormattedMessage
                id="org.info"
                defaultMessage="Basic Information"
              />
            </b>
          </h3>
          <div>
            <ColumnTable column={column} />
          </div>
        </div>
        <div className={classes.root}>
          <h3 className={classes.title}>
            <b>
              <FormattedMessage
                id="pay.orderItemDescription"
                defaultMessage="Order Item Description"
              />
            </b>
          </h3>
          <div>
            <Table pagination={false} columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    );
  }
}

const mapState2Props = (state: any) => {
  return state.pay;
};
const mapDispatchToProps = (dispatch: any) => {
  return dispatch.pay;
};

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatchToProps
  )(Detail)
);
