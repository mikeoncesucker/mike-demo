import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import moment from "moment";
import { apiGateway, common } from "../message";

import { Divider, Badge, Icon, Table } from "antd";

export interface ApiListBySysteChartProps {
  classes: any;
  intl: any;

  apiListBySystem: any;
  failList: any;
  getApiListBySystem: Function;
  getFailListByShortName: Function;
}
const styles: any = (theme: any) => ({
  root: {
    position: "relative",
    "& .itemList": {
      display: "flex",
      height: "100%",
      flexWrap: "wrap",
      padding: ".2rem .29rem .1rem .4rem",
      overflow: "scroll",
      maxHeight: "440px",
      fontSize: '.15rem',
      "&::-webkit-scrollbar": {
        display: "none",
        "-ms-overflow-style": "none"
      }
    },
    "& .item": {
      width: "100%",
      color: "#80A6FB",
      "& p": {
        margin: 0
      },
      "& .title span": {
        display: "inline-block",
        width: ".19rem",
        height: ".1rem",
        marginRight: ".1rem",
        borderRadius: "2px"
      },
      "& .value": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        fontSize: "12px",
        color: "#9193BF",
        "& p": {
          marginTop: '10px',
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis"
        },
        "& p:nth-child(2)": {
          cursor: "pointer"
        },
        "& p:nth-child(2):hover": {
          textDecoration: "underline"
        },
        "& .ant-badge-status-text": {
          marginLeft: "2px"
        },
        "& .big": {
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontSize: ".21rem",
          color: "#fff"
        }
      }
    },
    "& .failPopup": {
      position: "absolute",
      top: "10px",
      right: "63px",
      width: "726px",
      height: "379px",
      padding: "21px",
      background: "#11183D",
      border: "1px solid #000921",
      borderRadius: "4px",
      zIndex: 9999,
      "& .header": {
        display: "flex",
        justifyContent: "space-between",
        color: "#8D8FBB",
        marginBottom: "20px",
        "& .title": {
          fontSize: "12px",
          color: "#80A6FB"
        },
        "& .border": {
          width: "2px",
          height: "12px",
          background: "#14FEF8",
          borderRadius: "2px",
          marginRight: "12px"
        }
      },
      "& .ant-table-wrapper": {
        height: "90%",
        overflow: "auto",
        overflowX: "hidden"
      },
      "& .items": {
        width: '16.66%',
        border: "1px solid #343C71",
        borderTop: "none",
        borderLeft: "none",
        background: "transparent",
        padding: "8px 14px",
        color: "#8D8FBB",
        fontSize: "12px",
        fontWeight: "normal",
        wordWrap: "break-word",
        wordBreak: "normal"
      },
      "& .ant-table-thead > tr:first-child > th:last-child": {
        borderRadius: 0
      },
      "& table tr": {
        display: "flex"
      },
      "& table": {
        border: "1px solid #343C71 !important",
        borderRight: "none !important",
        borderBottom: "none !important"
      },
      "& .ant-table-tbody>tr:hover td": {
        backgroundColor: "transparent"
      },
      "& .noData": {
        height: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        color: "#8D8FBB"
      }
    }
  }
});

class ApiListBySysteChart extends React.Component<
  ApiListBySysteChartProps,
  any
  > {
  constructor(props: Readonly<ApiListBySysteChartProps>) {
    super(props);
    this.state = {
      failPopup: false,
      system: null,
      failList: []
    };
  }

  componentDidMount() {
    const { getApiListBySystem, intl } = this.props;
    const language = intl.locale === 'zh' ? 'chinese' : 'english';
    getApiListBySystem({
      language,
      cb: null
    });
  }
  failPopup = (shortName: string, system: string) => {
    const { getFailListByShortName } = this.props;
    getFailListByShortName({
      shortName,
      cb: (data: any) => {
        const list = data
          .map((item: any) => {
            return {
              ...item,
              startTime: moment(item.invokeTime).format("M/D HH:mm:ss")
            };
          })
          .reverse();
        this.setState({
          failPopup: true,
          system,
          failList: list
        });
      }
    });
  };
  // 次数格式化
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { classes, apiListBySystem, intl } = this.props;
    const { failPopup, system, failList } = this.state;
    const { formatMessage } = intl;
    const columns = [
      {
        title: formatMessage(apiGateway.api_path_name),
        dataIndex: "moduleUrl",
        className: "items"
      },
      {
        title: formatMessage(apiGateway.api_module_name),
        dataIndex: "moduleName",
        className: "items"
      },
      {
        title:formatMessage(apiGateway.api_request_method),
        dataIndex: "requestMethod",
        className: "items"
      },
      {
        title: formatMessage(apiGateway.api_start_time),
        dataIndex: "startTime",
        className: "items"
      },
      {
        title: formatMessage(apiGateway.api_response_time)+"(μs)",
        dataIndex: "responseTime",
        className: "items"
      },
      {
        title:  formatMessage(apiGateway.api_response_code),
        dataIndex: "code",
        className: "items"
      }
    ];
    if (!apiListBySystem) return <div />;
    return (
      <div className={classes.root}>
        <div className="itemList">
          {apiListBySystem.length > 0 ? (
            apiListBySystem.map((item: any, key: any) => {
              return (
                <div className="item" key={item.system}>
                  <p className="title">
                    <span
                      style={{
                        background: `${item.color}`
                      }}
                    ></span>
                    {item.system}
                  </p>
                  <div className="value">
                    <p>
                      <Badge color="#949EB2"></Badge> {formatMessage(apiGateway.api_successful_calls)}：
                        {this.formatNum(item.successCount)}
                    </p>
                    <p
                      onClick={this.failPopup.bind(
                        this,
                        item.shortName,
                        item.system
                      )}
                    >
                      <Badge color="#263554"></Badge> {formatMessage(apiGateway.api_failed_calls)}：
                        {this.formatNum(item.failCount)}
                    </p>
                    <p>
                      <span className="big">{this.formatNum(item.apiCount)}</span>
                      <br />
                      {formatMessage(apiGateway.api_total_calls)}
                    </p>
                  </div>
                  {key < apiListBySystem.length - 1? (
                    <Divider
                      style={{
                        backgroundColor: "#343C71",
                        margin: ".13rem 0 .2rem"
                      }}
                    />
                  ) : null}
                </div>
              );
            })
          ) : (
              <div
                style={{
                  color: "#80A6FB",
                  textAlign: "center"
                }}
              >
                {formatMessage(common.no_data)}
            </div>
            )}
        </div>
        {failPopup ? (
          <div className="failPopup">
            <div className="header">
              <div style={{ display: "flex" }}>
                <span className="border"></span>
                <span className="title">{system}</span>
              </div>
              <span className="fail"> {formatMessage(apiGateway.api_failure_details)}</span>
              <Icon
                type="close"
                onClick={() => {
                  this.setState({
                    failPopup: false
                  });
                }}
              />
            </div>
            {failList.length ? (
              <Table
                columns={columns}
                dataSource={failList}
                bordered
                pagination={false}
                rowKey={(record: any) => record.id}
              />
            ) : (
                <p className="noData">{formatMessage(common.no_data)}</p>
              )}
          </div>
        ) : null}
      </div>
    );
  }
}
const mapState2Props = ({
  apiGateway: { apiListBySystem, failList }
}: any) => ({
  apiListBySystem,
  failList
});

const mapDispatch2Props = ({
  apiGateway: { getApiListBySystem, getFailListByShortName }
}: any) => ({
  getApiListBySystem,
  getFailListByShortName
});

export default withStyles(styles)(
  connect(mapState2Props, mapDispatch2Props)(ApiListBySysteChart)
);
