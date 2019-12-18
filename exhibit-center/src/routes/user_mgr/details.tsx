import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Tree, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";

export interface DetailsProps {
  classes: any;
  location: any;
  match: any;
  getUserByUserId: Function;
  user: any;
  bisiness: any;
  getBisiness: Function;
  role: any;
  getRoleByBisiness: Function;
  getResourcesByRole: Function;
  resetUsers: Function;
  resetBisinesss: Function;
  getRoleByUserId: Function;
  resetRoles: Function;
  resetResourcess: Function;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "30px 20px"
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
      },
      "& .value": {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
      }
    }
  },
  tdContent: {
    height: "350px",
    overflow: "auto",
    "& > ul": {
      transform: "translateX(-30px)"
    }
  },
  item: {
    backgroundColor: "rgba(8,171,248,0.2)"
  }
});

class Details extends React.Component<DetailsProps, any> {
  constructor(props: Readonly<DetailsProps>) {
    super(props);
    this.state = {
      businessSystem: null,
      businessSystemList: null,
      role: null,
      roleList: [],
      expandedKeys: [],
      autoExpandParent: true,
      resources: []
    };
  }

  onExpand = (expandedKeys: any) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  renderTreeNodes = (data: any) =>
    data.map((item: any) => {
      if (item.children) {
        return (
          <Tree.TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode title={item.name} key={item.id} />;
    });

  componentWillMount() {
    const { location, getUserByUserId } = this.props;
    if (location.state) {
      sessionStorage.setItem("userId", location.state.id);
    }

    getUserByUserId({
      userId: sessionStorage.getItem("userId"),
      cb: (data: any) => {
        this.getBisiness(data);
      }
    });
  }

  getBisiness = (user: any) => {
    const { getBisiness } = this.props;
    getBisiness({
      userId: user.id,
      cb: (data: any) => {
        if (data.code === "200") {
          this.getRoleByUserId(data.data[0]);
          this.setState({
            businessSystem: data.data[0].identifier,
            businessSystemList: data.data
          });
        }
      }
    });
  };

  getRoleByUserId = (bisiness: any) => {
    const { getRoleByUserId, user } = this.props;
    getRoleByUserId({
      userId: user ? user.id : null,
      bisiness: bisiness.identifier,
      cb: (data: any) => {
        if (data) {
          this.getResourcesByRole(this.state.businessSystem, data[0].id);
          this.setState({
            role: data[0].id,
            roleList: data || []
          });
        }
      }
    });
  };

  getResourcesByRole = (bisiness: string, roleId: string) => {
    const { getResourcesByRole } = this.props;
    getResourcesByRole({
      bisiness,
      roleId,
      cb: (data: any) => {
        this.setState({
          resources: data.data.children || [],
        });
      }
    });
  };

  componentWillUnmount() {
    const { resetUsers, resetBisinesss, resetRoles } = this.props;
    resetUsers();
    resetBisinesss();
    resetRoles();
  }

  render() {
    const { classes, user } = this.props;
    const { businessSystemList, roleList, resources } = this.state;
    if (!user) return <div />;
    return (
      <div>
        <div className={classes.root}>
          <p className={classes.title}>
            <FormattedMessage
              id="user.detail.basicInformation"
              defaultMessage="Basic information"
            />
          </p>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td>
                  <div className="lable">
                    <FormattedMessage
                      id="user.detail.userName"
                      defaultMessage="User name"
                    />
                  </div>
                  <div className="value">
                    <Tooltip title={user.name}>{user.name}</Tooltip>
                  </div>
                </td>
                <td>
                  <div className="lable">
                    <FormattedMessage
                      id="user.detail.userAccount"
                      defaultMessage="User account"
                    />
                  </div>
                  <div className="value">
                    <Tooltip title={user.account} placement="topLeft">
                      {user.account}
                    </Tooltip>
                  </div>
                </td>
                <td>
                  <div className="lable">
                    <FormattedMessage
                      id="user.detail.sex"
                      defaultMessage="Gender"
                    />
                  </div>
                  <div className="value">{user.gender}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="lable">
                    <FormattedMessage
                      id="user.detail.cellphoneNumber"
                      defaultMessage="Telephone"
                    />
                  </div>
                  <div className="value">{user.mobile}</div>
                </td>
                <td>
                  <div className="lable">
                    <FormattedMessage
                      id="user.detail.birthdate"
                      defaultMessage="Date of birth"
                    />
                  </div>
                  <div className="value">{user.birthday}</div>
                </td>
                <td>
                  <div className="lable">
                    <FormattedMessage
                      id="user.detail.IdNumber"
                      defaultMessage="ID number"
                    />
                  </div>
                  <div className="value">{user.idcard}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="lable">
                    <FormattedMessage
                      id="user.detail.quarters"
                      defaultMessage="Position"
                    />
                  </div>
                  <div className="value">{user.work}</div>
                </td>
                <td>
                  <div className="lable">
                    <FormattedMessage
                      id="user.detail.organisation"
                      defaultMessage="Organization"
                    />
                  </div>
                  <div className="value">
                    {user.organization && user.organization.name}
                  </div>
                </td>
                <td>
                  <div className="lable">
                    <FormattedMessage
                      id="user.detail.organizationLeader"
                      defaultMessage="Organization leader"
                    />
                  </div>
                  <div className="value">
                    {(user.organization && user.organization.manager.name) ||
                      "--"}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="lable">
                    <FormattedMessage
                      id="user.detail.hireDate"
                      defaultMessage="Entry date"
                    />
                  </div>
                  <div className="value">{user.entryDate}</div>
                </td>
                <td>
                  <div className="lable">
                    <FormattedMessage
                      id="user.detail.accountStatus"
                      defaultMessage="Account status"
                    />
                  </div>
                  <div className="value">
                    {user.status ? (
                      <span>
                        <span
                          style={{
                            display: "inline-block",
                            backgroundColor: "#27DA99",
                            borderRadius: "50%",
                            width: "6px",
                            height: "6px",
                            margin: "0 2px 2px"
                          }}
                        />
                        <FormattedMessage
                          id="user.detail.enable"
                          defaultMessage="Enabled"
                        />
                      </span>
                    ) : (
                      <span>
                        <span
                          style={{
                            display: "inline-block",
                            backgroundColor: "orange",
                            borderRadius: "50%",
                            width: "6px",
                            height: "6px",
                            margin: "0 2px 2px"
                          }}
                        />
                        <FormattedMessage
                          id="user.detail.disable"
                          defaultMessage="Disabled"
                        />
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classes.root}>
          <p className={classes.title}>
            <FormattedMessage
              id="user.detail.roleInformation"
              defaultMessage="Role information"
            />
          </p>

          <table
            className={classes.table}
            style={{
              tableLayout: "fixed"
            }}
          >
            <thead>
              <tr>
                <th>
                  <FormattedMessage
                    id="user.detail.businessSystem"
                    defaultMessage="Business system"
                  />
                </th>
                <th>
                  <FormattedMessage
                    id="user.detail.role"
                    defaultMessage="Role"
                  />
                </th>
                <th>
                  <FormattedMessage
                    id="user.detail.resourceAuthority"
                    defaultMessage="Resource permissions"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={classes.tdContent}>
                    {!businessSystemList ? (
                      <FormattedMessage
                        id="user.detail.notAccessibleAccessibleBusinessSystem"
                        defaultMessage="No results found"
                      />
                    ) : (
                      businessSystemList.map((value: any) => {
                        return (
                          <div
                            style={{
                              height: "54px",
                              lineHeight: "54px",
                              borderBottom: "1px solid rgba(204,204,204,1)",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              cursor: "pointer"
                            }}
                            key={value.id}
                            className={
                              this.state.businessSystem === value.identifier
                                ? classes.item
                                : undefined
                            }
                            onClick={() => {
                              this.setState({
                                businessSystem: value.identifier,
                                roleList: [],
                                resources: []
                              });
                              this.getRoleByUserId(value);
                            }}
                          >
                            <Tooltip title={value.name}>{value.name}</Tooltip>
                          </div>
                        );
                      })
                    )}
                  </div>
                </td>
                <td>
                  <div className={classes.tdContent}>
                    {roleList.length === 0 && (
                      <div>
                        <FormattedMessage
                          id="user.detail.noData"
                          defaultMessage="NO data"
                        />
                      </div>
                    )}
                    {roleList.map((value: any, index: number) => {
                      return (
                        <div
                          style={{
                            height: "54px",
                            lineHeight: "54px",
                            borderBottom: "1px solid rgba(204,204,204,1)",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            cursor: "pointer"
                          }}
                          key={index}
                          className={
                            this.state.role === value.id
                              ? classes.item
                              : undefined
                          }
                          onClick={() => {
                            this.setState({ role: value.id, resources: [] });
                            this.getResourcesByRole(
                              this.state.businessSystem,
                              value.id
                            );
                          }}
                        >
                          <Tooltip title={value.name}>{value.name}</Tooltip>
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td>
                  <div className={classes.tdContent}>
                    {resources.length === 0 && (
                      <div>
                        <FormattedMessage
                          id="user.detail.noData"
                          defaultMessage="NO data"
                        />
                      </div>
                    )}
                    <Tree
                      onExpand={this.onExpand}
                      expandedKeys={this.state.expandedKeys}
                      autoExpandParent={this.state.autoExpandParent}
                    >
                      {this.renderTreeNodes(resources)}
                    </Tree>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapState2Props = ({
  user: { user },
  bisiness: { bisiness, role }
}: any) => ({
  user,
  bisiness,
  role
});

const mapDispatch2Props = ({
  user: { getUserByUserId, resetUsers, getRoleByUserId },
  bisiness: {
    getBisiness,
    getRoleByBisiness,
    getResourcesByRole,
    resetBisinesss,
    resetRoles,
    resetResourcess
  }
}: any) => ({
  getUserByUserId,
  getRoleByUserId,
  getBisiness,
  getRoleByBisiness,
  getResourcesByRole,
  resetUsers,
  resetBisinesss,
  resetRoles,
  resetResourcess
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Details)
);
