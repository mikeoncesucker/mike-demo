import React from "react";

import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { injectIntl } from "react-intl";
import { apiGateway, common } from "../message";
import moment from "moment";

import styles from "./style";

import PieChart from "./pieChart";
import TrendChart from "./trendChart";
import ApiListBySysteChart from "./apiListBySysteChart";
import DispatchChart from "./dispatchChart";

import title_line from "../../../resource/title_line.png";

interface ApiGateawayProps {
  history: any;
  location: any;
  match: any;
  intl: any;
  classes: any;

  apiList: any;
  getApiList: Function;
}


class ApiGateaway extends React.Component<ApiGateawayProps, any> {
  getApiList: any = null;

  constructor(props: Readonly<ApiGateawayProps>) {
    super(props);
    this.state = {
      leave: false,
      apiList: null,
      apiListToShowScroll: []
    };
  }

  componentWillMount() {
    const { getApiList } = this.props;
    this.getApiList = setInterval(() => {
      getApiList({
        cb: (data: any) => {
          const res = data.data || [];
          const { apiListToShowScroll } = this.state;
          this.setState({
            apiList: res,
            apiListToShowScroll: res.concat(apiListToShowScroll).slice(0, 15)
          });
        }
      });
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.getApiList);
  }
  borderRadius = () => {
    return (
      <div className="border">
        <div className="border1"></div>
        <div className="border2"></div>
        <div className="border3"></div>
        <div className="border4"></div>
      </div>
    );
  };

  render() {
    const { classes, intl } = this.props;
    const { apiList, apiListToShowScroll } = this.state;
    const { formatMessage } = intl;
    const columns = [
      {
        title: formatMessage(apiGateway.api_module_name),
        key: "moduleName",
        dataIndex: "moduleName"
      },
      {
        title: formatMessage(apiGateway.api_path_name),
        key: "moduleUrl",
        dataIndex: "moduleUrl"
      },
      {
        title: formatMessage(apiGateway.api_request_method),
        key: "requestMethod",
        dataIndex: "requestMethod"
      },
      {
        title:formatMessage(apiGateway.api_start_time),
        key: "invokeTime",
        dataIndex: "invokeTime"
      },
      {
        title: formatMessage(apiGateway.api_response_time)+"(μs)",
        key: "responseTime",
        dataIndex: "responseTime"
      },
      {
        title: formatMessage(apiGateway.api_response_code),
        key: "code",
        dataIndex: "code"
      }
    ];
    return (
      <div className={classes.root}>
        <div className={classes.apiOverview}>
          <div className="overview">
            {this.borderRadius()}
            <div className={classes.title}>
              { formatMessage(apiGateway.api_situation) }
              <img className={classes.title_line} src={title_line} alt="" />
            </div>
            {apiList && <DispatchChart apiList={apiList}  intl={intl} />}
          </div>
          <div className="sysCensus">
            <div className={classes.title} style={{ paddingLeft: '.4rem'}}>
            { formatMessage(apiGateway.api_all_system_calls) }<span
                style={{
                  color: "#b7bec5",
                  fontSize: "12px",
                  marginLeft: "6px"
                }}
              >
               { formatMessage(common.last_week) }
                </span>
              <img className={classes.title_line} src={title_line} alt="" />
            </div>
            {this.borderRadius()}
            <ApiListBySysteChart intl={intl} />
          </div>
        </div>
        <div className={classes.detailTrend}>
          <div className={classes.detail}>
            {this.borderRadius()}
            <div className={classes.title}>
              { formatMessage(apiGateway.api_details) }
              <img className={classes.title_line} src={title_line} alt="" />
            </div>
            <div className="table">
              <ul className="header">
                {columns.map((item, key) => {
                  return <li key={key}>{item.title}</li>;
                })}
              </ul>
              <div className="content">
                <ul className="itemList">
                  {apiListToShowScroll.length > 0 ? (
                    apiListToShowScroll.map((item: any, key: number) => {
                      return (
                        <li className="item" key={key}>
                          <span>{item.moduleName}</span>
                          <span>{item.moduleUrl}</span>
                          <span>{item.requestMethod}</span>
                          <span>
                            {moment(item.invokeTime).format("M/D HH:mm:ss")}
                          </span>
                          <span>{item.responseTime}</span>
                          <span>{item.code}</span>
                        </li>
                      );
                    })
                  ) : (
                      <div
                        style={{
                          textAlign: "center"
                        }}
                      >
                        {formatMessage(common.no_data)}
                    </div>
                    )}
                </ul>
              </div>
            </div>
          </div>
          <div className={classes.trend}>
            <div className="lineChart">
              {this.borderRadius()}
              <div className={classes.title}>
              {formatMessage(apiGateway.api_calls_trend)}
                <img className={classes.title_line} src={title_line} alt="" />
              </div>
              <TrendChart intl={intl}/>
            </div>
            <div className="loopChart">
              {this.borderRadius()}
              <div className={classes.title}>
              {formatMessage(apiGateway.api_percentage_analysis)}
                <span
                  style={{
                    color: "#b7bec5",
                    fontSize: "12px",
                    marginLeft: "6px"
                  }}
                >
                  { formatMessage(common.last_week) }
                </span>
                <img className={classes.title_line} src={title_line} alt="" />
              </div>
              <PieChart intl={intl}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState2Props = ({ apiGateway: { apiList } }: any) => ({
  apiList
});

const mapDispatch2Props = ({ apiGateway: { getApiList } }: any) => ({
  getApiList
});

export default withStyles(styles)(
  connect(mapState2Props, mapDispatch2Props)(injectIntl(ApiGateaway))
);
