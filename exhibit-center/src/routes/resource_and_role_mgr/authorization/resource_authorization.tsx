import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Tree, Input, Col, Row, Icon, Button } from "antd";
import { FormattedMessage } from "react-intl";

export interface ResourceAuthorizationProps {
  classes: any;
  match: any;
  history: any;
  queryRoleResources: any;
  location: any;
  roleResource: any;
  addRoleResources: any;
  resetRoleResources: Function;
  queryResourcesList: any;
  resourceList: any;
  user: any;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "30px 20px"
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
    height: "350px",
    overflow: "auto",
    borderRadius: "0 0 4px 4px"
  },
  treeSelect: {
    border: "1px solid rgba(232,232,232,1)",
    height: "350px",
    overflow: "auto",
    borderRadius: "4px"
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
    "& i": {
      display: "none",
      float: "right",
      lineHeight: "45px",
      marginLeft: "10px",
      cursor: "pointer"
    },
    "&:hover": {
      border: "1px solid rgba(8,171,248,1)",
      color: "rgba(8,171,248,1)",
      "& i": {
        display: "block"
      }
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

class ResourceAuthorization extends React.Component<
  ResourceAuthorizationProps,
  any
  > {
  constructor(props: Readonly<ResourceAuthorizationProps>) {
    super(props);
    this.state = {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      selectArr: [],
      resourceIds: [],
      checkedKeys: [],
      totalResource: Number
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
    const { resourceList } = this.props;
    let expandedKeys: any = [];

    if (value) {
      resourceList.map((item: any) => {
        if (item.name.indexOf(value) >= 0) {
          expandedKeys.push(item.id + "");
        }
        item.children &&
          item.children.length &&
          item.children.map((val: any) => {
            if (val.name.indexOf(value) >= 0) {
              expandedKeys.push(val.id + "");
            }
            val.children &&
              val.children.length &&
              val.children.map((v: any) => {
                if (v.name.indexOf(value) >= 0) {
                  expandedKeys.push(v.id + "");
                }
                return expandedKeys;
              });
            return expandedKeys;
          });
        return expandedKeys;
      });
    }

    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    });
  };

  onCheck = (checkedKeys: any, info: any) => {
    const { resourceList } = this.props;
    const _selectNode = checkedKeys.concat(info.halfCheckedKeys);
    const selectArr = this.deal(
      JSON.parse(JSON.stringify(resourceList)),
      (node: any) => _selectNode.indexOf(node.id + "") >= 0
    );
    this.setState({ checkedKeys, selectArr, resourceIds: _selectNode });
  };

  deal = (nodes: any, predicate: any): any => {
    if (!(nodes && nodes.length)) {
      return [];
    }

    const newChildren = [];
    for (const node of nodes) {
      if (predicate(node)) {
        newChildren.push(node);
        node.children = this.deal(node.children, predicate);
      } else {
        newChildren.push(...this.deal(node.children, predicate));
      }
    }
    return newChildren;
  };

  goBack = () => {
    const { history, location } = this.props;
    history.push("./", location.state);
  };

  resourceAuthorization = () => {
    const { addRoleResources } = this.props;
    addRoleResources({
      identifier: sessionStorage.getItem("roleIdentifier"),
      id: sessionStorage.getItem("roleId"),
      params: { resourceIds: this.state.resourceIds },
      cb: () => {
        this.goBack();
      }
    });
  };

  getResourceIds = (val: any, resourceIds: any) => {
    if (val.children && val.children.length) {
      val.children.forEach((val: any, index: any) => {
        resourceIds.push(val.id);
        this.getResourceIds(val, resourceIds);
      });
    }
    return resourceIds;
  };

  componentWillMount() {
    const { queryRoleResources, queryResourcesList, location } = this.props;
    if (location.state) {
      sessionStorage.setItem("roleId", location.state.id);
      sessionStorage.setItem("roleName", location.state.roleName);
    }

    queryResourcesList({
      identifier: sessionStorage.getItem("roleIdentifier"),
      cb: () => {
        const { resourceList } = this.props;
        let totalResource: Number = 0;
        resourceList &&
          resourceList.forEach((val: any) => {
            if (val.children) {
              totalResource += val.children && val.children.length;
            } else {
              totalResource += resourceList.length;
            }
          });
        this.setState({
          totalResource
        });
      }
    });

    queryRoleResources({
      identifier: sessionStorage.getItem("roleIdentifier"),
      id: sessionStorage.getItem("roleId"),
      cb: () => {
        const { roleResource } = this.props;
        let _resourceIds: any = [];
        roleResource &&
          roleResource.length &&
          roleResource.forEach((val: any, index: any) => {
            _resourceIds.push(val.id);
            _resourceIds = this.getResourceIds(val, _resourceIds);
          });
          
        this.setState({
          selectArr: roleResource,
          checkedKeys: this.filter(_resourceIds),
          resourceIds: _resourceIds
        });
      }
    });
  }

  filter = (data: any) => {
    let _arr: any = [];
    data.map((item: string, index: any) => {
      if (_arr.length === 0) {
        _arr.push(item);
      }
      const lestItem = _arr[_arr.length - 1];

      if ((item + "").indexOf(lestItem) !== -1) {
        _arr.pop();
        _arr.push(item);
      } else {
        _arr.push(item);
      }

      return _arr;
    });
    return _arr;
  };

  componentWillUnmount() {
    const { resetRoleResources } = this.props;
    resetRoleResources();
  }

  render() {
    const { classes, resourceList } = this.props;

    if (resourceList && resourceList.length === 0) {
      return <div></div>;
    }
    const {
      searchValue,
      expandedKeys,
      autoExpandParent,
      selectArr,
      checkedKeys,
      resourceIds,
      totalResource
    } = this.state;
    const selectNum = resourceIds.length;
    
    const loop = (data: any) =>
      data &&
      data.length &&
      data.map((item: any) => {
        if (!item.name) return <div></div>;
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
        if (item.children && item.children.length > 0) {
          return (
            <Tree.TreeNode key={item.id} title={title}>
              {loop(item.children)}
            </Tree.TreeNode>
          );
        }
        return <Tree.TreeNode key={item.id} title={title} />;
      });

    return (
      <div className={classes.root}>
        <p>
          <FormattedMessage
            id="role.authorizeBusinessSystems"
            defaultMessage="Authorize business system"
          />
        </p>
        <p>
          {sessionStorage.getItem("sysName")} / <span>{sessionStorage.getItem("path")}</span>
        </p>
        <br />
        <p> 
          <FormattedMessage
            id="role.authorizeRole"
            defaultMessage="Authorize role"
          />
        </p>
        <p>
          {sessionStorage.getItem("roleName")} / <span>{sessionStorage.getItem("roleId")}</span>
        </p>
        <br />
        <p className={classes.lable}>
          <FormattedMessage
            id="role.resourceSelect"
            defaultMessage="ResourceSelect"
          />
          &nbsp;
          <span className={classes.total}>
            (
            <FormattedMessage
              id="role.totalResource"
              defaultMessage={`Total ${totalResource} items`}
              values={{ totalResource }}
            />
            )
          </span>
        </p>
        <Row type="flex" align="middle">
          <Col span={11}>
            <FormattedMessage
              id="role.searchResource"
              defaultMessage="Search resource"
            >
              {text => (
                <Input.Search
                  className={classes.search}
                  placeholder={text.toString()}
                  onChange={this.onChange}
                />
              )}
            </FormattedMessage>
            <Tree
              checkable
              className={classes.tree}
              onExpand={this.onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              checkedKeys={checkedKeys}
              onCheck={this.onCheck}
            >
              {loop(resourceList || [])}
            </Tree>
          </Col>
          <Col span={2} className={classes.middleCol}>
            <Icon type="swap" />
          </Col>
          <Col span={11}>
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
            </p>
            <Tree
              className={classes.tree}
              onExpand={this.onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
            >
              {loop(selectArr)}
            </Tree>
          </Col>
        </Row>
        <div className={classes.btnBox}>
          <Button onClick={this.goBack}>
            <FormattedMessage id="role.cancel" defaultMessage="Cancel" />
          </Button>
          <Button type="primary" onClick={this.resourceAuthorization}>
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
  resource_and_role: { roleResource, resourceList }
}: any) => ({
  roleResource,
  resourceList
});

const mapDispatch2Props = ({
  resource_and_role: {
    queryRoleResources,
    addRoleResources,
    resetRoleResources,
    queryResourcesList
  }
}: any) => ({
  queryRoleResources,
  addRoleResources,
  resetRoleResources,
  queryResourcesList
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(ResourceAuthorization)
);
