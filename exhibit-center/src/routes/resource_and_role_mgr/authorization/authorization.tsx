import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Button, Table, Divider, Popconfirm, Tooltip, Input } from "antd";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export interface AuthorizationProps {
  classes: any;
  match: any;
  history: any;
  queryRoleList: any;
  roleList: any;
  roleTotal: any;
  deleteRole: any;
  location: any;
  locale: any;
  resetRoleLists: Function;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "30px 20px",
    '& .ant-table-body': {
      overflowX: 'hidden !important'
    }
  },
  searchBox: {
    marginBottom: "10px",
    "& .ant-select, & input": {
      width: "150px",
      marginRight: "10px"
    },
    "& button:first-child": {
      float: "right"
    }
  },
  table: {
    "& td": {
      maxWidth: "100px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden"
    }
  },
});

class Authorization extends React.Component<AuthorizationProps, any> {
  constructor(props: Readonly<AuthorizationProps>) {
    super(props);
    this.state = {
      roleName: "",
      pageIndex: 1,
      pageSize: 10
    };
  }

  doSearch = () => {
    const { queryRoleList } = this.props;
    queryRoleList({
      identifier: sessionStorage.getItem("roleIdentifier"),
      params: {
        name: this.state.roleName,
        pageIndex: 1,
        pageSize: 10
      },
      cb: null
    });
  };

  confirmDelete = (identifier: any, id: any) => {
    const { deleteRole, queryRoleList, } = this.props;
    const { pageIndex, pageSize } = this.state;
    deleteRole({
      identifier,
      id,
      cb: () => {
        queryRoleList({
          identifier: sessionStorage.getItem("roleIdentifier"),
          params: {
            pageIndex,
            pageSize
          },
          cb: () => {
            if (this.props.roleList.length === 0) {
              queryRoleList({
                identifier: sessionStorage.getItem("roleIdentifier"),
                params: {
                  pageIndex: pageIndex - 1,
                  pageSize
                },
                cb: null
              });
            }
          }
        });
      }
    });
  };

  onPageChange = (pageIndex: any, pageSize: any) => {
    const { queryRoleList } = this.props;
    queryRoleList({
      identifier: sessionStorage.getItem("roleIdentifier"),
      params: {
        pageIndex,
        pageSize
      },
      cb: null
    });
    this.setState({
      pageIndex,
      pageSize
    });
  };

  onShowSizeChange = (pageIndex: any, pageSize: any) => {
    const { queryRoleList, } = this.props;
    queryRoleList({
      identifier: sessionStorage.getItem("roleIdentifier"),
      params: {
        pageIndex,
        pageSize
      },
      cb: null
    });
    this.setState({
      pageIndex,
      pageSize
    });
  };

  componentWillMount() {
    const { queryRoleList, location } = this.props;

    if (location.state) {
      sessionStorage.setItem("roleIdentifier", location.state.identifier);
      sessionStorage.setItem("roleId", location.state.id);
      sessionStorage.setItem("sysName", location.state.sysName);
      sessionStorage.setItem("path", location.state.path);
    }
    queryRoleList({
      identifier: sessionStorage.getItem("roleIdentifier"),
      params: {
        pageIndex: 1,
        pageSize: 10
      },
      cb: null
    });
  }

  componentWillUnmount() {
    const { resetRoleLists } = this.props;
    resetRoleLists();
  }

  render() {
    const { classes, match, roleList, roleTotal, locale } = this.props;
    const width = locale === "en" ? 420 : "";    
    const columns = [
      {
        title: (
          <FormattedMessage id="role.roleName" defaultMessage="Role name" />
        ),
        dataIndex: "name",
        key: "name",
        render: (name: any) => {
          return (
            <Tooltip title={name} placement="topLeft">
              <span>{name}</span>
            </Tooltip>
          );
        }
      },
      {
        title: (
          <FormattedMessage id="role.id" defaultMessage="Role ID" />
        ),
        dataIndex: "id",
        key: "id",
        render: (id: any) => {
          return (
            <Tooltip title={id} placement="topLeft">
              <span>{id}</span>
            </Tooltip>
          );
        }
      },
      {
        title: (
          <FormattedMessage
            id="role.Description"
            defaultMessage="Role desciption"
          />
        ),
        dataIndex: "description",
        key: "description",
        render: (desc: any) => {
          return (
            <Tooltip title={desc} placement="topLeft">
              <span>{desc}</span>
            </Tooltip>
          );
        }
      },
      {
        title: (
          <FormattedMessage id="role.Action" defaultMessage="Action" />
        ),
        dataIndex: "action",
        key: "action",
        width,
        render: (text: any, record: any) => {
          return (
            <div>
              <Link
                to={{
                  pathname: `${match.path}/roleAuthorization`,
                  state: {
                    id: record.id,
                    roleName: record.name
                  }
                }}
              >
                <FormattedMessage
                  id="role.roleAuthorization"
                  defaultMessage="Role authorization"
                />
              </Link>
              {record.name !== "系统管理员" && (
                <span>
                  <Divider type="vertical" />
                  <Link
                    to={{
                      pathname: `${match.path}/resourceAuthorization`,
                      state: {
                        id: record.id,
                        roleName: record.name
                      }
                    }}
                  >
                    <FormattedMessage
                      id="role.resourceAuthorization"
                      defaultMessage="Resource authorization"
                    />
                  </Link>
                  <Divider type="vertical" />
                  <Link
                    to={{
                      pathname: `${match.path}/edit`,
                      state: {
                        id: record.id,
                        roleName: record.name
                      }
                    }}
                  >
                    <FormattedMessage
                      id="role.revise"
                      defaultMessage="Edit"
                    />
                  </Link>
                  <Divider type="vertical" />
                  <Popconfirm
                    title={
                      <div>
                        <FormattedMessage
                          id="role.confirmDelete"
                          defaultMessage="Confirm to delete this role?"
                          tagName="p"
                        />
                        <FormattedMessage
                          id="role.recovered"
                          defaultMessage="Role data can't be restored after deletion"
                        >
                          {text => (
                            <span style={{ color: "#999BA2" }}>{text}</span>
                          )}
                        </FormattedMessage>
                      </div>
                    }
                    okText={
                      <FormattedMessage id="action.confirm" defaultMessage="Confirm" />
                    }
                    cancelText={
                      <FormattedMessage id="action.cancel" defaultMessage="Cancel" />
                    }
                    onConfirm={this.confirmDelete.bind(
                      this,
                      sessionStorage.getItem("roleIdentifier"),
                      record.id
                    )}
                  >
                    <Link to="./" style={{ color: "red" }}>
                      <FormattedMessage
                        id="role.delete"
                        defaultMessage="Delete"
                      />
                    </Link>
                  </Popconfirm>
                </span>
              )}
            </div>
          );
        }
      }
    ];

    return (
      <div className={classes.root}>
        <p>
          <FormattedMessage
            id="role.authorizeBusinessSystems"
            defaultMessage="Authorize business system"
          />
        </p>
        <p>
          {sessionStorage.getItem("sysName")} /{" "}
          <span>{sessionStorage.getItem("path")}</span>
        </p>
        <div className={classes.searchBox}>
          <Link
            to={{
              pathname: `${match.path}/create`
            }}
          >
            <Button type="primary" icon="plus">
              <FormattedMessage id="role.new" defaultMessage="Create" />
            </Button>
          </Link>
          <span>
            <FormattedMessage id="role.roleName" defaultMessage="Role name: " />
          </span>
          <Input
            placeholder=""
            onChange={ev => {
              this.setState({ roleName: ev.target.value });
            }}
          />
          <Button type="primary" onClick={this.doSearch}>
            <FormattedMessage id="role.search" defaultMessage="Search" />
          </Button>
        </div>
        <Table
          dataSource={roleList}
          columns={columns}
          // scroll={{ x: true }}
          className={classes.table}
          rowKey={(row: any) => row.id}
          pagination={{
            total: roleTotal,
            showSizeChanger: true,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
            showQuickJumper: {
              goButton: (
                <Button style={{ marginLeft: "10px" }}>
                  <FormattedMessage id="role.jump" defaultMessage="Jump" />
                </Button>
              )
            },
            showTotal: value => {
              return (
                <span>
                  <FormattedMessage
                    id="role.total"
                    defaultMessage={`Total ${value} items`}
                    values={{ value }}
                  />
                </span>
              );
            }
          }}
        />
      </div>
    );
  }
}

const mapState2Props = ({
  resource_and_role: { roleList, roleTotal },
  intl: { locale },
}: any) => ({
  roleList,
  roleTotal,
  locale,
});

const mapDispatch2Props = ({
  resource_and_role: { queryRoleList, deleteRole, resetRoleLists },
}: any) => ({
  queryRoleList,
  deleteRole,
  resetRoleLists,
});

export default withStyles(styles)(
  connect(mapState2Props, mapDispatch2Props)(Authorization)
);
