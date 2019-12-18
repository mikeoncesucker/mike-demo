import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  Table,
  Divider,
  Button,
  Input,
  Popconfirm,
  message,
  Result
} from "antd";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
export interface OrgProps {
  classes: any;
  match: any;
  history: any;
  getOrgTreeList: Function;
  orgTreeList: any;
  getOrgList: Function;
  orgList: any;
  deleteOrg: Function;
  resetOrgTreeLists: Function;
  resetOrgLists: Function;
  putOrgPageState: Function;
  resourcesLabel: any;
  orgPageState: any;
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
      width: "150px",
      marginRight: "10px"
    },
    "& button:first-child": {
      float: "right"
    }
  },
  table: {
    "& td": {
      // maxWidth: "400px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
      // overflow: "hidden"
    }
  }
});

class Org extends React.Component<OrgProps, any> {
  constructor(props: Readonly<OrgProps>) {
    super(props);
    this.state = {
      orgName: null,
      orgList: null
    };
  }

  goToCreate = () => {
    const { history, match } = this.props;
    history.push({
      pathname: `${match.path}/create`,
      state: { edit: "false" }
    });
  };

  doSearch = () => {
    const { orgName } = this.state;
    if (orgName) {
      this.getOrgList();
    } else {
      this.getOrgTreeList();
    }
  };

  getOrgList = () => {
    const { orgName } = this.state;
    const { getOrgList, putOrgPageState } = this.props;
    getOrgList({
      cb: (data: any) => {
        const _arr = data.data.filter((item: any) => {
          return item.name.indexOf(orgName) > -1;
        });
        this.setState({
          orgList: _arr
        });
        putOrgPageState({
          orgPageState: {
            ...this.state
          }
        });
      }
    });
  };

  getOrgTreeList = () => {
    const { getOrgTreeList } = this.props;
    getOrgTreeList({
      cb: (data: any) => {
        this.setState({
          orgList: data.data.children
        });
      }
    });
  };

  deleteOrg = (orgId: string) => {
    const { deleteOrg } = this.props;
    deleteOrg({
      orgId,
      cb: (data: any) => {
        if (data.code === "200") {
          message.success(data.message);
          this.doSearch();
        }
      }
    });
  };

  isShowByResourcesLabel = (label: string) => {
    const { resourcesLabel } = this.props;
    return resourcesLabel.indexOf(label) > -1;
  };

  componentWillMount() {
    const { orgPageState } = this.props;
    if (orgPageState) {
      this.setState(
        {
          orgName: orgPageState.orgName
        },
        () => {
          this.doSearch();
        }
      );
    } else {
      this.doSearch();
    }
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleEnterKey);
  }

  handleEnterKey = (e: any) => {
    if (e.keyCode === 13) {
      this.doSearch();
    }
  };

  componentWillUnmount() {
    const { resetOrgTreeLists, resetOrgLists } = this.props;
    resetOrgTreeLists();
    resetOrgLists();
    document.removeEventListener("keypress", this.handleEnterKey);
  }

  render() {
    const { match, classes, resourcesLabel } = this.props;
    const { orgList } = this.state;
    if (!resourcesLabel) return <div></div>;

    if (resourcesLabel.indexOf("org_get") < 0)
      return (
        <FormattedMessage id="auth.noAuth" defaultMessage="No Auth">
          {(text: any) => {
            return <Result status="warning" title={text} />;
          }}
        </FormattedMessage>
      );
    const columns = [
      {
        title: <FormattedMessage id="org.title" defaultMessage="Organization name" />,
        dataIndex: "name",
        key: "name",
        render: (name: string, item: any) => {
          return (
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
          );
        }
      },
      {
        title: (
          <FormattedMessage
            id="org.abbreviation"
            defaultMessage="Abbreviation"
          />
        ),
        dataIndex: "shortName",
        key: "shortName"
      },
      {
        title: <FormattedMessage id="org.phone" defaultMessage="Telephone" />,
        dataIndex: "mobile",
        key: "mobile"
      },
      {
        title: <FormattedMessage id="org.leader" defaultMessage="Organization leader" />,
        dataIndex: "manager",
        key: "manager",
        render: (manager: any) => {
          return manager ? manager.name : "-";
        }
      },
      {
        title: () => {
          return this.isShowByResourcesLabel("org_delete") ||
            this.isShowByResourcesLabel("org_update") ? (
            <FormattedMessage id="action.action" defaultMessage="Action" />
          ) : null;
        },
        dataIndex: "action",
        key: "action",
        render: (value: any, item: any) => {
          return (
            <div>
              {this.isShowByResourcesLabel("org_update") && (
                <Link
                  to={{
                    pathname: `${match.path}/edit`,
                    state: {
                      id: item.id,
                      edit: "true"
                    }
                  }}
                >
                  <FormattedMessage id="action.edit" defaultMessage="Edit" />
                </Link>
              )}
              {this.isShowByResourcesLabel("org_delete") &&
              this.isShowByResourcesLabel("org_update") ? (
                <Divider type={"vertical"} />
              ) : null}
              {this.isShowByResourcesLabel("org_delete") && (
                <Popconfirm
                  title={
                    <div>
                      <FormattedMessage
                        id="org.isDelete"
                        defaultMessage="Confirm to delete this organization?"
                        tagName="p"
                      />
                      <FormattedMessage
                        id="org.recovered"
                        defaultMessage="Organization data can't be restored after deletion"
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
                  onConfirm={this.deleteOrg.bind(this, item.id)}
                >
                  <Link to="./" style={{ color: "red" }}>
                    <FormattedMessage
                      id="action.delete"
                      defaultMessage="Delete"
                    />
                  </Link>
                </Popconfirm>
              )}
            </div>
          );
        }
      }
    ];

    return (
      <div className={classes.root}>
        <div className={classes.searchBox} id="area">
          {this.isShowByResourcesLabel("org_create") && (
            <FormattedMessage id="action.create" defaultMessage="Create">
              {text => (
                <Button type="primary" icon="plus" onClick={this.goToCreate}>
                  {text}
                </Button>
              )}
            </FormattedMessage>
          )}

          <FormattedMessage
            id="org.name"
            defaultMessage="Organization name: "
          />

          <FormattedMessage
            id="org.text.orgName"
            defaultMessage="Please enter organization name"
          >
            {text => (
              <Input
                placeholder={text.toString()}
                value={this.state.orgName}
                onChange={(e: any) =>
                  this.setState({
                    orgName: e.target.value
                  })
                }
              />
            )}
          </FormattedMessage>

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
          loading={!orgList}
          dataSource={orgList}
          pagination={false}
          rowKey={(row: any) => row.id}
        />
      </div>
    );
  }
}

const mapState2Props = ({
  org: { orgTreeList, orgList },
  app: { resourcesLabel },
  pageState: { orgPageState }
}: any) => ({
  orgTreeList,
  orgList,
  resourcesLabel,
  orgPageState
});

const mapDispatch2Props = ({
  org: {
    getOrgTreeList,
    getOrgList,
    deleteOrg,
    resetOrgTreeLists,
    resetOrgLists
  },
  pageState: { putOrgPageState }
}: any) => ({
  getOrgTreeList,
  getOrgList,
  deleteOrg,
  resetOrgTreeLists,
  resetOrgLists,
  putOrgPageState
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Org)
);
