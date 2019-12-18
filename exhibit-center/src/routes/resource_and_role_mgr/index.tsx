import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Button, Table, Tooltip, Input } from "antd";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import emitter from "../../util/events";

export interface ResourceAndRoleProps {
  classes: any;
  match: any;
  history: any;
  querySysList: any;
  resetSysLists: Function;
  sysList: any;
  user: any;
  roleAndResourceState: any;
  locale: any;
  setRoleAndResourceState: Function;
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
      maxWidth: "100px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden"
    }
  }
});

class ResourceAndRole extends React.Component<ResourceAndRoleProps, any> {
  eventEmitter: any;
  constructor(props: Readonly<ResourceAndRoleProps>) {
    super(props);
    this.state = {
      systemName: "",
      pageIndex: 1
    };
  }

  goToCreate = () => {
    const { history, match } = this.props;
    history.push(`${match.path}/create`);
  };

  onChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  pageIndexChange = (page: number) => {
    this.setState(
      {
        pageIndex: page
      },
      () => {
        const { setRoleAndResourceState } = this.props;
        setRoleAndResourceState({
          roleAndResourceState: {
            ...this.state
          }
        });
      }
    );
  };

  doSearch = () => {
    const { querySysList, user } = this.props;
    querySysList({
      params: {
        userId: user.id,
        name: this.state.systemName
      },
      cb: () => {
        const { setRoleAndResourceState } = this.props;
        setRoleAndResourceState({
          roleAndResourceState: {
            ...this.state
          }
        });
      }
    });
  };

  componentWillMount() {
    const { querySysList, user, roleAndResourceState } = this.props;
    this.setState(
      {
        ...roleAndResourceState
      },
      () => {
        if (user) {
          querySysList({
            params: {
              userId: user.id,
              name: this.state.systemName
            },
            cb: null
          });
        }
      }
    );
    this.eventEmitter = emitter.addListener("userId", message => {
      querySysList({
        params: { userId: message },
        cb: null
      });
    });

    document.addEventListener("keypress", this.handleEnterKey);
  }

  componentWillUnmount() {
    const { resetSysLists } = this.props;
    resetSysLists();
    document.removeEventListener("keypress", this.handleEnterKey);
  }

  handleEnterKey = (e: any) => {
    if (e.keyCode === 13) {
      this.doSearch();
    }
  };

  render() {
    const { classes, match, sysList, user, locale } = this.props;
    const width = locale === "en" ? 200 : "";    
    if (!user) return <div />;

    const columns = [
      {
        title: (
          <FormattedMessage
            id="role.businessSystemName"
            defaultMessage="BusinessSystemName"
          />
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
          <FormattedMessage
            id="role.businessSystemIdentifier"
            defaultMessage="Business system alias"
          />
        ),
        dataIndex: "identifier",
        key: "identifier",
        render: (identifier: any) => {
          return (
            <Tooltip title={identifier} placement="topLeft">
              <span>{identifier}</span>
            </Tooltip>
          );
        }
      },
      {
        title: (
          <FormattedMessage
            id="role.businessSystemDescription"
            defaultMessage="Resource access address"
          />
        ),
        dataIndex: "description",
        key: "description",
        width: "30%",
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
                  pathname: `${match.path}/authorization`,
                  state: {
                    id: record.id,
                    sysName: record.name,
                    path: record.path,
                    identifier: record.identifier,
                    userId: user.id
                  }
                }}
              >
                <FormattedMessage
                  id="role.authorizationManagement"
                  defaultMessage="Authorization management"
                />
              </Link>
            </div>
          );
        }
      }
    ];
    return (
      <div className={classes.root}>
        <div className={classes.searchBox}>
          <span>
            <FormattedMessage
              id="role.businessSystemName"
              defaultMessage="BusinessSystemName"
            />
            ：
          </span>
          <Input
            placeholder=""
            value={this.state.systemName}
            onChange={ev => {
              this.setState({ systemName: ev.target.value });
            }}
          />
          <Button type="primary" onClick={this.doSearch}>
            <FormattedMessage id="role.search" defaultMessage="Search" />
          </Button>
        </div>
        <Table
          dataSource={sysList}
          columns={columns}
          // scroll={{ x: true }}
          className={classes.table}
          rowKey={(row: any) => row.id}
          pagination={{
            onChange: this.pageIndexChange,
            current: this.state.pageIndex
          }}
        />
      </div>
    );
  }
}

const mapState2Props = ({
  resource_and_role: { sysList },
  app: { user },
  pageState: { roleAndResourceState },
  intl: { locale }
}: any) => ({
  sysList,
  user,
  roleAndResourceState,
  locale
});

const mapDispatch2Props = ({
  resource_and_role: { querySysList, resetSysLists },
  pageState: { setRoleAndResourceState },
}: any) => ({
  querySysList,
  resetSysLists,
  setRoleAndResourceState,
});

export default withStyles(styles)(
  connect(mapState2Props, mapDispatch2Props)(ResourceAndRole)
);
