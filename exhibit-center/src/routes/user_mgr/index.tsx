import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  Button,
  Input,
  Icon,
  Table,
  Divider,
  Switch,
  Tooltip,
  Popconfirm,
  Select,
  DatePicker,
  message,
  Result
} from "antd";

import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import moment from "moment";

export interface UserProps {
  classes: any;
  match: any;
  history: any;
  userList: any;
  resourcesLabel: any;
  orgList: any;
  locale: any;
  userPageState: any;
  getUserList: Function;
  getOrgList: Function;
  putUserStatus: Function;
  resetUserPassword: Function;
  resetUserLists: Function;
  resetOrgLists: Function;
  putUserPageState: Function;
}

const styles: any = (theme: any) => {
  const screenWidth = window.screen.width;
  const maxWidth = screenWidth > 1280 ? "200px":"150px";

  return{
    root: {
      margin: "20px",
      backgroundColor: "#FFFFFF",
      padding: "30px 20px"
    },
    searchBox: {
      marginBottom: "10px",
      "& .ant-select, & input": {
        width: "150px",
        marginRight: "10px"
      },
      "& button:first-child": {
        float: "right"
      },
      "& .ant-calendar-picker": {
        marginRight: "10px",
        " & input": {
          width: "100px"
        }
      }
    },
    table: {
      "& td": {
        maxWidth: maxWidth,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
      }
    }
  } 
};

class User extends React.Component<UserProps, any> {
  constructor(props: Readonly<UserProps>) {
    super(props);
    this.state = {
      status: 1,
      account: null,
      name: null,
      orgId: null,
      gender: null,
      entryDate: [],
      entryStartDate: null,
      entryEndDate: null,
      pageIndex: 1
    };
  }

  goToCreate = () => {
    const { history, match } = this.props;
    history.push({
      pathname: `${match.path}/create`,
      state: {
        edit: "false"
      }
    });
  };

  onChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  doSearch = () => {
    this.setState({
      entryStartDate: this.state.entryDate[0],
      entryEndDate: this.state.entryDate[1],
      pageIndex: 1
    });
    this.getUser();
  };

  getUser = () => {
    const { getUserList } = this.props;
    const params = {
      status: this.state.status,
      account: this.state.account,
      name: this.state.name,
      orgId: this.state.orgId,
      gender: this.state.gender,
      entryStartDate: this.state.entryDate[0],
      entryEndDate: this.state.entryDate[1]
    };
    getUserList({
      params,
      cb: () => {
        const { putUserPageState } = this.props;
        putUserPageState({
          userPageState: {
            ...this.state
          }
        });
      }
    });
  };

  pageIndexChange = (page: number) => {
    this.setState({
      pageIndex: page
    });
    const { getUserList } = this.props;
    const params = {
      status: this.state.status,
      account: this.state.account,
      name: this.state.name,
      orgId: this.state.orgId,
      gender: this.state.gender,
      entryStartDate: this.state.entryDate[0],
      entryEndDate: this.state.entryDate[1],
      pageIndex: page
    };
    getUserList({
      params,
      cb: () => {
        const { putUserPageState } = this.props;
        putUserPageState({
          userPageState: {
            ...this.state
          }
        });
      }
    });
  };

  resetUserPassword = (userId: string) => {
    const { resetUserPassword, locale } = this.props;
    resetUserPassword({
      userId,
      cb: (data: any) => {
        if (data.code === "200")
          message.success(
            locale === "zh" ? "重置密码成功" : "reset password successed"
          );
      }
    });
  };

  putUserStatus = (event: any, item: any, value: any) => {
    const { putUserStatus } = this.props;
    putUserStatus({
      userId: item.id,
      status: value ? 1 : 0,
      cb: () => {
        this.getUser();
      }
    });
  };

  isShowByResourcesLabel = (label: string) => {
    const { resourcesLabel } = this.props;
    return resourcesLabel.indexOf(label) > -1;
  };

  componentWillMount() {
    const { getOrgList, getUserList, userPageState } = this.props;
    this.setState(
      {
        ...userPageState
      },
      () => {
        const params = {
          status: this.state.status,
          account: this.state.account,
          name: this.state.name,
          orgId: this.state.orgId,
          gender: this.state.gender,
          entryStartDate: this.state.entryDate[0],
          entryEndDate: this.state.entryDate[1],
          pageIndex: this.state.pageIndex
        };
        getUserList({
          params,
          cb: null
        });
        getOrgList({
          cb: null
        });
      }
    );
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleEnterKey);
  }

  componentWillUnmount() {
    const { resetUserLists, resetOrgLists } = this.props;
    resetUserLists();
    resetOrgLists();
    document.removeEventListener("keypress", this.handleEnterKey);
  }

  handleEnterKey = (e: any) => {
    if (e.keyCode === 13) {
      this.doSearch();
    }
  };

  render() {
    const {
      classes,
      match,
      userList,
      orgList,
      locale,
      resourcesLabel
    } = this.props;

    if (!resourcesLabel) return <div></div>;

    if (resourcesLabel.indexOf("user_get") < 0)
      return (
        <FormattedMessage id="auth.noAuth" defaultMessage="No">
          {(text: any) => {
            return <Result status="warning" title={text} />;
          }}
        </FormattedMessage>
      );
    const columns = [
      {
        title: <FormattedMessage id="user.name" defaultMessage="Name" />,
        dataIndex: "name",
        key: "name",
        render: (name: React.ReactNode, item: any) => (
          <FormattedMessage id="user.detail" defaultMessage="Details">
            {text => {
              return (
                <Tooltip title={name}>
                  {this.isShowByResourcesLabel("user_get") ? (
                    <Link
                      to={{
                        pathname: `${match.path}/details`,
                        state: {
                          id: item.id
                        }
                      }}
                    >
                      {name}
                    </Link>
                  ) : (
                    { name }
                  )}
                </Tooltip>
              );
            }}
          </FormattedMessage>
        )
      },
      {
        title: <FormattedMessage id="user.account" defaultMessage="Account" />,
        dataIndex: "account",
        key: "account",
        render: (account: React.ReactNode, item: any) => (
          <FormattedMessage id="user.detail" defaultMessage="Details">
            {text => {
              return <Tooltip title={account}>{account}</Tooltip>;
            }}
          </FormattedMessage>
        )
      },
      {
        title: <FormattedMessage id="user.gender" defaultMessage="Gender" />,
        dataIndex: "gender",
        key: "gender"
      },
      {
        title: <FormattedMessage id="user.mobile" defaultMessage="Telephone" />,
        dataIndex: "mobile",
        key: "mobile"
      },
      {
        title: (
          <FormattedMessage id="user.entryDate" defaultMessage="Entry Date" />
        ),
        dataIndex: "entryDate",
        key: "entryDate"
      },
      {
        title: <FormattedMessage id="user.work" defaultMessage="Position" />,
        dataIndex: "work",
        key: "work",
        render: (text: any) => {
          return (
            <div
              style={{
                width: "60px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis"
              }}
            >
              <Tooltip title={text}>{text}</Tooltip>
            </div>
          );
        }
      },
      {
        title: (
          <FormattedMessage
            id="user.organization"
            defaultMessage="Organization"
          />
        ),
        dataIndex: "organization",
        key: "organization",
        render: (value: any, item: any) => {
          return value.name;
        }
      },
      {
        title: () => {
          return this.isShowByResourcesLabel("user_disable") ? (
            <FormattedMessage id="user.status" defaultMessage="Status" />
          ) : null;
        },
        dataIndex: "status",
        key: "status",
        render: (value: number, item: any) => {
          return this.isShowByResourcesLabel("user_disable") ? (
            <Switch
              onChange={this.putUserStatus.bind(this, value, item)}
              defaultChecked={!!value}
            />
          ) : null;
        }
      },
      {
        title: () => {
          return this.isShowByResourcesLabel("user_update") ||
            this.isShowByResourcesLabel("user_reset") ? (
            <FormattedMessage id="action.action" defaultMessage="Action" />
          ) : null;
        },
        key: "action",
        render: (text: string, item: any) => {
          return (
            <div>
              {this.isShowByResourcesLabel("user_update") && (
                <Link
                  to={{
                    pathname: `${match.path}/edit`,
                    state: { id: item.id, edit: true }
                  }}
                >
                  <FormattedMessage id="action.edit" defaultMessage="Edit" />
                </Link>
              )}
              {this.isShowByResourcesLabel("user_update") &&
              this.isShowByResourcesLabel("user_reset") ? (
                <Divider type="vertical" />
              ) : null}
              {this.isShowByResourcesLabel("user_reset") && (
                <Popconfirm
                  icon={<Icon type="warning" />}
                  title={
                    <div>
                      <FormattedMessage
                        id="user.text.confirmResetPassword"
                        defaultMessage="Confirm to reset password?"
                        tagName="p"
                      />

                      <span style={{ color: "#999BA2" }}>
                        <FormattedMessage
                          id="user.text.unrecoverableAfterPasswordReset"
                          defaultMessage="Password can't be restored after reset"
                        />
                      </span>
                    </div>
                  }
                  okText={
                    <FormattedMessage
                      id="action.confirm"
                      defaultMessage="Confirm"
                    />
                  }
                  cancelText={
                    <FormattedMessage
                      id="action.cancel"
                      defaultMessage="Cancel"
                    />
                  }
                  onConfirm={this.resetUserPassword.bind(this, item.id)}
                >
                  <Link to="./">
                    <FormattedMessage
                      id="user.resetPassword"
                      defaultMessage="Reset password"
                    />
                  </Link>
                </Popconfirm>
              )}
            </div>
          );
        }
      }
    ];
    if (!(userList && orgList)) return <div />;
    return (
      <div className={classes.root}>
        <div className={classes.searchBox}>
          {this.isShowByResourcesLabel("user_create") && (
            <FormattedMessage id="action.create" defaultMessage="Create">
              {txt => (
                <Button type="primary" icon="plus" onClick={this.goToCreate}>
                  {txt}
                </Button>
              )}
            </FormattedMessage>
          )}
          <FormattedMessage id="user.state" defaultMessage="Status" />：
          <Select
            allowClear
            placeholder={
              <FormattedMessage
                id="user.text.pleaseSelectState"
                defaultMessage="Please select status"
              />
            }
            value={this.state.status}
            defaultValue={locale === "zh" ? "已启用" : "Enabled"}
            onChange={(value: any) => {
              this.setState({ status: value });
            }}
            getPopupContainer={triggerNode => triggerNode}
          >
            <Select.Option value={1}>
              <FormattedMessage id="user.enabled" defaultMessage="Enabled" />
            </Select.Option>
            <Select.Option value={0}>
              <FormattedMessage id="user.disabled" defaultMessage="Disabled" />
            </Select.Option>
          </Select>
          <FormattedMessage
            id="user.userAccount"
            defaultMessage="Account name"
          />
          ：
          <FormattedMessage
            id="user.text.pleaseInputAccount"
            defaultMessage="Please enter account name"
          >
            {text => (
              <Input
                placeholder={text.toString()}
                value={this.state.account}
                onChange={this.onChange("account")}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="user.name" defaultMessage="Name" />：
          <FormattedMessage
            id="user.text.pleaseInputName"
            defaultMessage="Please enter user name"
          >
            {text => (
              <Input
                placeholder={text.toString()}
                value={this.state.name}
                onChange={this.onChange("name")}
              />
            )}
          </FormattedMessage>
          <FormattedMessage
            id="user.organization"
            defaultMessage="Organization"
          />
          ：
          <Select
            allowClear
            showSearch
            placeholder={
              <FormattedMessage
                id="user.text.pleaseSelectOrganization"
                defaultMessage="Please select organization"
              />
            }
            value={this.state.orgId || undefined}
            onChange={(value: any) => {
              this.setState({ orgId: value });
            }}
            getPopupContainer={triggerNode => triggerNode}
            notFoundContent={null}
            filterOption={(input: any, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {orgList &&
              orgList.map((item: any) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
          </Select>
        </div>
        <div className={classes.searchBox}>
          <FormattedMessage id="user.gender" defaultMessage="Gender" />：
          <Select
            allowClear
            placeholder={
              <FormattedMessage
                id="user.text.pleaseSelectGender"
                defaultMessage="Please select gender"
              />
            }
            value={this.state.gender || undefined}
            onChange={(value: any) => {
              this.setState({ gender: value });
            }}
            getPopupContainer={triggerNode => triggerNode}
          >
            <Select.Option value="男">
              <FormattedMessage id="user.man" defaultMessage="Male" />
            </Select.Option>
            <Select.Option value="女">
              <FormattedMessage id="user.woman" defaultMessage="Female" />
            </Select.Option>
          </Select>
          <FormattedMessage id="user.entryDate" defaultMessage="Entry Date" />
          ：
          <DatePicker.RangePicker
            value={
              this.state.entryDate[0] &&
              this.state.entryDate[1] && [
                moment(this.state.entryDate[0] + ""),
                moment(this.state.entryDate[1] + "")
              ]
            }
            locale={locale}
            getCalendarContainer={(triggerNode): any => triggerNode.parentNode}
            onChange={(date, dateString) => {
              this.setState({
                entryDate: dateString
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
          dataSource={userList.data}
          loading={!userList.data}
          rowKey={(row: any) => row.id}
          pagination={{
            total: userList.totalRecords,
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
  user: { userList },
  org: { orgList },
  app: { resourcesLabel },
  intl: { locale },
  pageState: { userPageState }
}: any) => ({
  resourcesLabel,
  userList,
  orgList,
  locale,
  userPageState
});

const mapDispatch2Props = ({
  user: { getUserList, putUserStatus, resetUserPassword, resetUserLists },
  org: { getOrgList, resetOrgLists },
  pageState: { putUserPageState }
}: any) => ({
  getUserList,
  getOrgList,
  putUserStatus,
  resetUserPassword,
  resetUserLists,
  resetOrgLists,
  putUserPageState
});

export default withStyles(styles)(
  connect(mapState2Props, mapDispatch2Props)(User)
);
