import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Table, Descriptions, Button } from "antd";
import { FormattedMessage } from "react-intl";
const columns = [
  {
    title: <FormattedMessage id="user.name" defaultMessage="Name" />,
    dataIndex: "name",
    key: "name"
  },
  {
    title: <FormattedMessage id="user.account" defaultMessage="Account" />,
    dataIndex: "account",
    key: "account"
  },
  {
    title: <FormattedMessage id="user.work" defaultMessage="Position" />,
    dataIndex: "work",
    key: "work"
  },
  {
    title: <FormattedMessage id="user.mobile" defaultMessage="Telephone" />,
    dataIndex: "mobile",
    key: "mobile"
  },
  {
    title: <FormattedMessage id="user.entryDate" defaultMessage="Entry Date" />,
    dataIndex: "entryDate",
    key: "entryDate"
  }
];

export interface DetailsProps {
  classes: any;
  match: any;
  location: any;
  org: any;
  getOrgById: Function;
  resetOrgs: Function;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "30px 20px",
    "& .ant-descriptions-title": {
      fontSize: "16px",
      color: "#33353D",
      fontWeight: "400"
    }
  }
});
class Details extends React.Component<DetailsProps, any> {
  constructor(props: Readonly<DetailsProps>) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { location, getOrgById } = this.props;
    if (location.state) {
      sessionStorage.setItem("orgId", location.state.id);
    }
    getOrgById({
      orgId: sessionStorage.getItem("orgId"),
      cb: null
    });
  }

  componentWillUnmount() {
    const { resetOrgs } = this.props;
    resetOrgs();
  }

  render() {
    const { classes, org } = this.props;

    if (!org) return <div />;
    return (
      <div>
        <div className={classes.root}>
          <Descriptions
            title={
              <FormattedMessage
                id="org.info"
                defaultMessage="Basic Information"
              />
            }
            bordered
          >
            <Descriptions.Item
              label={<FormattedMessage id="org.title" defaultMessage="Name" />}
            >
              {org.name}
            </Descriptions.Item>
            {/* <Descriptions.Item
              label={<FormattedMessage id="org.code" defaultMessage="coding" />}
            >
              <Tooltip title={org.id} placement="topLeft">
                {org.id}
              </Tooltip>
            </Descriptions.Item> */}
            <Descriptions.Item
              label={
                <FormattedMessage
                  id="org.abbreviation"
                  defaultMessage="Abbreviation"
                />
              }
            >
              {org.shortName}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <FormattedMessage id="org.phone" defaultMessage="Telephone" />
              }
            >
              {org.mobile}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <FormattedMessage id="org.leader" defaultMessage="Organization leader" />
              }
            >
              {org.manager ? org.manager.name : null}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <FormattedMessage
                  id="org.parent.leader"
                  defaultMessage="Parent organization name"
                />
              }
            >
              {org.parentId !== "0" ? org.parentName : null}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <FormattedMessage
                  id="org.description"
                  defaultMessage="Organization description"
                />
              }
              span={3}
            >
              {org.description}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className={classes.root}>
          <p className={classes.title}>
            <FormattedMessage
              id="org.membershipList"
              defaultMessage="Member List"
            />
          </p>

          <Table
            dataSource={org.users}
            columns={columns}
            pagination={{
              pageSize: 5,
              total: org.users.length,
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
      </div>
    );
  }
}

const mapState2Props = ({ org: { org } }: any) => ({
  org
});

const mapDispatch2Props = ({ org: { getOrgById, resetOrgs } }: any) => ({
  getOrgById,
  resetOrgs
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Details)
);
