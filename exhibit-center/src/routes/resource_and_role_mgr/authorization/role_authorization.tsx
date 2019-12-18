import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Tree, Input, Col, Row, Icon, Button, Table } from "antd";
import { FormattedMessage } from "react-intl";

export interface RoleAuthorizationProps {
  classes: any;
  match: any;
  history: any;
  queryRoleUsers: any;
  queryOrgUsers: any;
  location: any;
  addRoleUsers: any;
  roleUsers: any;
  queryOrgList: any;
  queryUserByName: any;
  orgList: any;
  resetRoleUserss: Function;
  resetOrgLists: Function;
}

const columns = [
  {
    title: <FormattedMessage id="role.username" defaultMessage="User name" />,
    dataIndex: "name",
    key: "name"
  }
];

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "30px 20px",
    position: "relative",
    "& .ant-table-placeholder": {
      borderBottom: "none"
    },
    "& .ant-row-flex-middle": {
      paddingBottom: "20px"
    }
  },
  search: {
    "& input": {
      borderRadius: "4px 4px 0 0",
      border: "1px solid rgba(232,232,232,1)",
      borderBottom: "none"
    }
  },
  middleCol: {
    textAlign: "center",
    fontSize: "24px"
  },
  tree: {
    border: "1px solid rgba(232,232,232,1)",
    height: "330px",
    overflow: "auto",
    borderRadius: "0 0 0 4px"
  },
  treeSelect: {
    border: "1px solid rgba(232,232,232,1)",
    height: "375px",
    overflow: "auto",
    borderRadius: "4px"
  },
  table: {
    height: "375px",
    borderBottom: "1px solid rgba(232,232,232,1)",
    borderRight: "1px solid rgba(232,232,232,1)",
    "& .ant-table-header": {
      borderTop: "1px solid rgba(232,232,232,1)"
    },
    "& .ant-table-thead  > tr > th": {
      padding: "11px"
    }
  },
  lable: {
    margin: "0 0 10px",
    fontSize: "14px",
    color: "#33353D",
    "& span": {
      color: "#33353D"
    },
    "& a span": {
      color: "rgba(8,171,248,1)"
    }
  },
  total: {
    color: "#999BA2 !important",
    "& span": {
      color: "#999BA2 !important"
    }
  },
  item: {
    display: "inline-block",
    margin: "10px",
    borderRadius: "3px",
    border: "1px solid rgba(204,204,204,1)",
    height: "42px",
    lineHeight: "42px",
    padding: "0 14px",
    cursor: "pointer",
    "& i": {
      display: "block",
      float: "right",
      lineHeight: "45px",
      marginLeft: "10px"
    },
    "&:hover": {
      border: "1px solid rgba(8,171,248,1)",
      color: "rgba(8,171,248,1)"
    }
  },
  btnBox: {
    position: "fixed",
    bottom: "0",
    left: "220px",
    height: "54px",
    width: "calc(100% - 215px)",
    backgroundColor: "#FFFFFF",
    padding: "10px 40px",
    borderTop: "1px solid #CCCCCC",
    "& button": {
      float: "right",
      marginLeft: "20px"
    }
  }
});

let orgListNum: any = 0;

class RoleAuthorization extends React.Component<RoleAuthorizationProps, any> {
  constructor(props: Readonly<RoleAuthorizationProps>) {
    super(props);
    this.state = {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      selectNames: [],
      selectedRowKeys: [],
      selectedRowIds: [],
      selectList: [],
      deleteItem: null
    };
  }

  onExpand = (expandedKeys: any) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  onChange = (e: any) => {
    const { value } = e.target;
    const { queryUserByName } = this.props;

    if (value) {
      queryUserByName({
        params: {
          name: value
        },
        cb: null
      });
    }
  };

  onSelect = (selectedKeys: any, info: any) => {
    const { queryOrgUsers } = this.props;
    queryOrgUsers({ id: selectedKeys[0], cb: null });
  };

  onCheck = (checkedKeys: any, info: any) => {
    if (info.checked) {
      const { queryOrgUsers } = this.props;
      if (checkedKeys.indexOf("0") >= 0) {
        queryOrgUsers({ id: "0", cb: null });
      } else {
        queryOrgUsers({ id: checkedKeys[checkedKeys.length - 1], cb: null });
      }
    }
  };

  onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    const { selectList } = this.state;
    let selectNames: any = [];
    let selectedRowIds: any = [];
    let _selectList: any = [];

    let selectArr = selectList.filter(
      (item: any) => selectedRowKeys.indexOf(item.id) >= 0
    );

    selectArr.forEach((val: any) => {
      selectNames.push(val.name);
      selectedRowIds.push(val.id);
    });

    selectedRows.forEach((val: any) => {
      if (selectNames.indexOf(val.name) === -1) {
        selectNames.push(val.name);
        selectedRowIds.push(val.id);
        _selectList.push(val);
      }
    });

    this.setState({
      selectNames,
      selectedRowKeys,
      selectedRowIds,
      selectList: selectList.concat(_selectList)
    });
  };

  removeItem = (key: any) => {
    const _selectedRowKeys: [] = this.state.selectedRowKeys;
    const _selectNames: [] = this.state.selectNames;
    const _selectedRowIds: [] = this.state.selectedRowIds;
    _selectedRowKeys.splice(key, 1);
    _selectNames.splice(key, 1);
    _selectedRowIds.splice(key, 1);
    this.setState({
      selectedRowKeys: _selectedRowKeys,
      selectNames: _selectNames,
      selectedRowIds: _selectedRowIds
    });
  };

  clearSelect = () => {
    this.setState({
      selectedRowKeys: [],
      selectNames: [],
      selectedRowIds: []
    });
  };

  userAuthorization = () => {
    const { addRoleUsers } = this.props;
    addRoleUsers({
      identifier: sessionStorage.getItem("roleIdentifier"),
      id: sessionStorage.getItem("roleId"),
      params: { userIds: this.state.selectedRowIds },
      cb: () => {
        this.goBack();
      }
    });
  };

  calOrgListNum = (orgList: any) => {
    orgListNum += orgList.children.length;
    orgList.children &&
      orgList.children.forEach((item: any) => {
        if (item.children) {
          this.calOrgListNum(item);
        }
      });
  };

  selectDeleteItem = (value: any) => {
    this.setState({
      deleteItem: value
    });
  };

  componentWillMount() {
    const { queryRoleUsers, queryOrgList, location } = this.props;
    queryOrgList((orgList: any) => {
      orgListNum = 0;
      this.calOrgListNum(orgList);
    });
    if (location.state) {
      sessionStorage.setItem("roleId", location.state.id);
      sessionStorage.setItem("roleName", location.state.roleName);
    }
    queryRoleUsers({
      identifier: sessionStorage.getItem("roleIdentifier"),
      id: sessionStorage.getItem("roleId"),
      cb: () => {
        let _selectNames: any = [];
        let _selectedRowKeys: any = [];
        let _selectList: any = [];
        let _selectedRowIds: any = [];
        const { roleUsers } = this.props;
        roleUsers &&
          roleUsers.length &&
          roleUsers.forEach((val: any, index: any) => {
            _selectNames.push(val.name);
            _selectedRowKeys.push(val.id);
            _selectedRowIds.push(val.id);
            _selectList.push(val);
          });
        this.setState({
          selectNames: _selectNames,
          selectedRowKeys: _selectedRowKeys,
          selectList: _selectList,
          selectedRowIds: _selectedRowIds
        });
      }
    });
  }

  componentWillUnmount() {
    const { resetRoleUserss, resetOrgLists } = this.props;
    resetRoleUserss();
    resetOrgLists();
  }

  goBack = () => {
    const { history, location } = this.props;
    history.push("./", location.state);
  };

  render() {
    const { classes, roleUsers, orgList } = this.props;
    const {
      selectNames,
      searchValue,
      expandedKeys,
      autoExpandParent,
      selectedRowKeys
    } = this.state;

    if (orgList.length === 0) return <div />;
    let orgListArr = [];
    orgListArr.push(orgList);

    const loop = (data: any) =>
      data.length &&
      data.map((item: any) => {
        const index = item.name.indexOf(searchValue);
        const beforeStr = item.name.substr(0, index);
        const afterStr = item.name.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: "#f50" }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.name}</span>
          );
        if (item.children) {
          return (
            <Tree.TreeNode key={item.id} title={title}>
              {loop(item.children)}
            </Tree.TreeNode>
          );
        }
        return <Tree.TreeNode key={item.id} title={title} />;
      });

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const selectNum = selectNames.length;

    return (
      <div className={classes.root}>
        <p>
          <FormattedMessage
            id="role.authorizeBusinessSystem"
            defaultMessage="Authorize business system"
          />
        </p>
        <p>
          {sessionStorage.getItem("sysName")} /{" "}
          <span>{sessionStorage.getItem("path")}</span>
        </p>
        <br />
        <p>
          <FormattedMessage
            id="role.authorizeRole"
            defaultMessage="Authorize role"
          />
        </p>
        <p>
          {sessionStorage.getItem("roleName")} /{" "}
          <span>{sessionStorage.getItem("roleId")}</span>
        </p>
        <br />
        <p className={classes.lable}>
          <FormattedMessage id="role.roleSelect" defaultMessage="roleSelect" />
          &nbsp;
          <span className={classes.total}>
            (
            <FormattedMessage
              id="role.orgListNum"
              defaultMessage={`Total ${orgListNum} items`}
              values={{ orgListNum }}
            />
            )
          </span>
        </p>
        <Row type="flex" align="middle">
          <Col span={14}>
            <FormattedMessage id="role.searchUser" defaultMessage="Search name">
              {text => (
                <Input.Search
                  className={classes.search}
                  placeholder={text.toString()}
                  onChange={this.onChange}
                />
              )}
            </FormattedMessage>
            <Row>
              <Col span={10}>
                <p
                  style={{
                    height: "44px",
                    background: "rgba(250,250,250,1)",
                    margin: 0,
                    padding: "10px 18px",
                    borderTop: "1px solid rgba(232,232,232,1)",
                    borderLeft: "1px solid rgba(232,232,232,1)"
                  }}
                >
                  <FormattedMessage
                    id="role.organization"
                    defaultMessage="Organization"
                  />
                </p>
                <Tree
                  className={classes.tree}
                  onExpand={this.onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onSelect={this.onSelect}
                  onCheck={this.onCheck}
                >
                  {loop(orgListArr)}
                </Tree>
              </Col>
              <Col span={14}>
                <Table
                  dataSource={roleUsers || []}
                  className={classes.table}
                  rowSelection={rowSelection}
                  columns={columns}
                  pagination={false}
                  scroll={{ y: 328 }}
                  rowKey={(row: any) => row.id}
                />
              </Col>
            </Row>
          </Col>
          <Col span={2} className={classes.middleCol}>
            <Icon type="swap" />
          </Col>
          <Col span={8}>
            <p className={classes.lable}>
              <FormattedMessage id="role.selected" defaultMessage="Selected" />
              &nbsp;
              <span className={classes.total}>
                (
                <FormattedMessage
                  id="role.selectNum"
                  defaultMessage={`Total ${selectNum} items`}
                  values={{ selectNum }}
                />
                )
              </span>
              <a href="javasript:;" style={{ float: "right"}} onClick={this.clearSelect}>
                <FormattedMessage id="role.clear" defaultMessage="Clear" />
              </a>
            </p>
            <div className={classes.treeSelect}>
              {selectNames.map((value: React.ReactNode, key: any) => {
                return (
                  <div
                    className={classes.item}
                    key={key}
                    onClick={this.selectDeleteItem.bind(this, value)}
                  >
                    {value}
                    {this.state.deleteItem === value && (
                      <Icon
                        type="close"
                        onClick={this.removeItem.bind(this, key)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
        <div className={classes.btnBox}>
          <Button onClick={this.goBack}>
            <FormattedMessage id="role.cancel" defaultMessage="Cancel" />
          </Button>
          <Button type="primary" onClick={this.userAuthorization}>
            <FormattedMessage
              id="role.applyAuthorization"
              defaultMessage="Apply authorization"
            />
          </Button>
        </div>
      </div>
    );
  }
}

const mapState2Props = ({
  resource_and_role: { roleUsers, orgList }
}: any) => ({
  roleUsers,
  orgList
});

const mapDispatch2Props = ({
  resource_and_role: {
    queryRoleUsers,
    addRoleUsers,
    queryOrgList,
    queryOrgUsers,
    queryUserByName,
    resetRoleUserss,
    resetOrgLists
  }
}: any) => ({
  queryRoleUsers,
  addRoleUsers,
  queryOrgList,
  queryOrgUsers,
  queryUserByName,
  resetRoleUserss,
  resetOrgLists
});

export default withStyles(styles)(
  connect(mapState2Props, mapDispatch2Props)(RoleAuthorization)
);
