import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import {
  Button,
  Input,
  Table,
  Tooltip,
  Select,
  DatePicker,
} from "antd";

export interface LogProps {
  classes: any;
  match: any;
  history: any;
  locale: any;
  logList: any;
  sysList: any;
  logPageState: any;
  user: any;
  getOperationLogList: Function;
  querySysList: Function;
  putLogPageState: Function;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "30px 20px"
  },
  searchBox: {
    marginBottom: "10px",
    "& .ant-select, & input": {
      width: "160px",
      marginRight: "10px",
      marginLeft: "10px",
      marginBottom: "5px"
    },
    "& button:first-child": {
      float: "right"
    },
    "& button": {
      marginLeft: "10px",
    },
    "& .ant-calendar-picker": {
      marginLeft: "10px",
      " & input": {
        marginLeft: "5px",
        width: "153px"
      }
    },
  },
  table: {
    "& td": {
      maxWidth: "200px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden"
    }
  }

});

class Log extends React.Component<LogProps, any> {
  constructor(props: Readonly<LogProps>) {
    super(props);
    this.state = {
      userName: null,
      account: null,
      operation: null,
      identifier: null,
      startTime: null,
      endTime: null,
      pageIndex: 1,
      pageSize: 10,
    };
  }

  onChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  doSearch = () => {
    this.setState({
      pageIndex: 1
    },()=> {
      this.getOperationLog();
    });
    
  };

  getOperationLog = () => {
    const { getOperationLogList } = this.props;
    getOperationLogList({
      params: this.state,
      cb: () => {
        const { putLogPageState } = this.props;
        putLogPageState({
          logPageState: {
            ...this.state
          }
        });
      }
    })
  };

  pageIndexChange = (page: number) => {
    const { getOperationLogList } = this.props;
    this.setState({
      pageIndex: page
    },()=> {
      getOperationLogList({
        params: this.state,
        cb: () => {
          const { putLogPageState } = this.props;
          putLogPageState({
            logPageState: {
              ...this.state
            }
          });
        }
      })
    });
  };

  componentWillMount() {
    const { getOperationLogList, querySysList, logPageState, user } = this.props;
    this.setState(
      {
        ...logPageState
      },
      () => {
        getOperationLogList({
          params: this.state,
          cb: null
        });
        if (user) {
          querySysList({
            params: {
              userId: user.id,
              name: null
            },
            cb: null
          });
        }
      }
    );
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleEnterKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleEnterKey);
  }

  handleEnterKey = (e: any) => {
    if (e.keyCode === 13) {
      this.doSearch();
    }
  };


  render() {
    const { classes, match, sysList, locale, logList } = this.props;
    const { startTime, endTime } = this.state;
    const columns = [
      {
        title: <FormattedMessage id="log.userName" defaultMessage="Name" />,
        dataIndex: "userName",
        key: "userName",
        render: (userName: React.ReactNode, item: any) => (
          <FormattedMessage id="user.detail" defaultMessage="Details">
            {text => {
              return (
                <Tooltip title={userName}>
                  <Link
                    to={{
                      pathname: `${match.path}/details`,
                      state: {
                        item: item
                      }
                    }}
                  >
                    {userName}
                  </Link>
                </Tooltip>
              );
            }}
          </FormattedMessage>
        )
      },
      {
        title: <FormattedMessage id="log.userAccount" defaultMessage="Account" />,
        dataIndex: "account",
        key: "account",
        render: (account: React.ReactNode, item: any) => (
          <FormattedMessage id="user.detail" defaultMessage="Details">
            {text => {
              return (
                <Tooltip title={account}>{account}</Tooltip>
              );
            }}
          </FormattedMessage>
        )
      },
      {
        title: <FormattedMessage id="log.chineseNameOfTheSystem" defaultMessage="Chinese Name Of The System" />,
        dataIndex: "systemName",
        key: "systemName",
        render: (systemName: React.ReactNode, item: any) => (
          <FormattedMessage id="user.detail" defaultMessage="Details">
            {text => {
              return (
                <Tooltip title={systemName}>{systemName}</Tooltip>
              );
            }}
          </FormattedMessage>
        )
      },
      {
        title: <FormattedMessage id="log.instructions" defaultMessage="Instructions" />,
        dataIndex: "operation",
        key: "operation",
        render: (operation: React.ReactNode, item: any) => (
          <FormattedMessage id="user.detail" defaultMessage="Details">
            {text => {
              return (
                <Tooltip title={operation}>{operation}</Tooltip>
              );
            }}
          </FormattedMessage>
        )
      },
      {
        title: <FormattedMessage id="log.userOperationTime" defaultMessage="User Operation Time" />,
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt: React.ReactNode, item: any) => (
          <FormattedMessage id="user.detail" defaultMessage="Details">
            {text => {
              return (
                <Tooltip title={createdAt}>{createdAt}</Tooltip>
              );
            }}
          </FormattedMessage>
        )
      },
      {
        title: <FormattedMessage id="action.action" defaultMessage="Action" />,
        key: "action",
        render: (text: string, item: any) => {
          return (
            <Link
              to={{
                pathname: `${match.path}/details`,
                state: { item: item }
              }}
            >
              <FormattedMessage id="order.view" defaultMessage="View" />
            </Link>
          )
        }
      }
    ];

    return (
      <div className={classes.root}>
        <div className={classes.searchBox}>
          <FormattedMessage id="log.userName" defaultMessage="Name" />
          <FormattedMessage id="log.pleaseInput" defaultMessage="Please enter">
            {text => (
              <Input
                placeholder={text.toString()}
                value={this.state.userName}
                onChange={this.onChange("userName")}
              />
            )}
          </FormattedMessage>

          <FormattedMessage id="log.userAccount" defaultMessage="Account" />
          <FormattedMessage id="log.pleaseInput" defaultMessage="Please enter">
            {text => (
              <Input
                placeholder={text.toString()}
                value={this.state.account}
                onChange={this.onChange("account")}
              />
            )}
          </FormattedMessage>

          <FormattedMessage id="log.instructions" defaultMessage="Instructions" />
          <FormattedMessage id="log.pleaseInput" defaultMessage="Please enter">
            {text => (
              <Input
                placeholder={text.toString()}
                value={this.state.operation}
                onChange={this.onChange("operation")}
              />
            )}
          </FormattedMessage>

          <FormattedMessage id="log.chineseNameOfTheSystem" defaultMessage="Chinese Name Of The System" />
          <Select
            allowClear
            placeholder={
              <FormattedMessage
                id="log.pleaseSelect"
                defaultMessage="Please select"
              />
            }
            value={this.state.identifier || undefined}
            onChange={(value: any) => {
              this.setState({ identifier: value });
            }}
            getPopupContainer={triggerNode => triggerNode}
          >
            {sysList && sysList.map((item: any, index: number) => {
              return <Select.Option value={item.identifier} key={item.id}>{item.name}</Select.Option>
            })
            }
          </Select>
        </div>
        <div className={classes.searchBox}>
          <FormattedMessage id="log.userOperationTime" defaultMessage="User Operation Time" />
          <DatePicker.RangePicker
            value={
              startTime &&
              endTime && [
                moment(startTime),
                moment(endTime)
              ]
            }
            showTime
            style={{ width: 380 }}
            className={classes.datePickerInput}
            locale={locale}
            getCalendarContainer={(triggerNode): any => triggerNode.parentNode}
            onChange={(date, dateString) => {
              this.setState({
                startTime: dateString[0],
                endTime: dateString[1]
              });
            }}
          />
          <FormattedMessage id="action.search" defaultMessage="Search">
            {text => (
              <Button type="primary" onClick={this.doSearch}>
                {text}
              </Button>
            )}
          </FormattedMessage>
        </div>
        <Table
          className={classes.table}
          columns={columns}
          dataSource={logList ? logList.data : []}
          loading={!logList}
          rowKey={(row: any) => row.id}
          pagination={{
            total: logList ? logList.totalRecords : 0,
            onChange: this.pageIndexChange,
            current: this.state.pageIndex,
            showQuickJumper: {
              goButton: (
                <Button style={{ marginLeft: "10px" }}>
                  <FormattedMessage id="user.skip" defaultMessage="Jump" />
                </Button>
              )
            },
            showTotal: value => {
              return (
                <FormattedMessage
                  id="user.total"
                  defaultMessage={`Total ${value} items`}
                  values={{ value }}
                />
              );
            }
          }}
        />
      </div>
    );
  }

}

const mapState2Props = ({
  log: { logList, sysList },
  intl: { locale },
  pageState: { logPageState },
  app: { user },

}: any) => ({
  logList,
  sysList,
  locale,
  logPageState,
  user,
});

const mapDispatch2Props = ({
  log: { getOperationLogList, querySysList },
  pageState: { putLogPageState }

}: any) => ({
  getOperationLogList,
  querySysList,
  putLogPageState
});

export default withStyles(styles)(
  connect(mapState2Props, mapDispatch2Props)(Log)
);

