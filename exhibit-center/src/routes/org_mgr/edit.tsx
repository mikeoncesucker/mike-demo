import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Form, Row, Col, Input, Button, Select, Modal } from "antd";
import { FormattedMessage } from "react-intl";

export interface EditProps {
  classes: any;
  history: any;
  location: any;
  match: any;
  form: any;
  orgList: any;
  userList: any;
  org: any;
  getUserList: Function;
  getOrgList: Function;
  createOrg: Function;
  putOrg: Function;
  getOrgById: Function;
  resetUserLists: Function;
  resetOrgLists: Function;
  resetOrgs: Function;
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
  button: {
    "& button": {
      float: "right",
      marginLeft: "12px"
    }
  }
});

class Edit extends React.Component<EditProps, any> {
  constructor(props: Readonly<EditProps>) {
    super(props);
    this.state = {
      formData: {
        name: null,
        shortName: null,
        deacription: null,
        managerId: null,
        mobile: null,
        parentId: null,
        visible: false
      }
    };
  }

  goBack = () => {
    this.setState({
      visible: true
    });
  };
  hide = () => {
    this.setState({
      visible: false
    });
  };
  hideModal = () => {
    const { history } = this.props;
    history.push("./");
  };
  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const { createOrg, history, putOrg, org } = this.props;
        values.manager = {
          id: values.managerId
        };
        delete values.managerId;
        if (sessionStorage.getItem("edit") === "true") {
          putOrg({
            orgId: org.id,
            body: values,
            cb: (data: any) => {
              if (data.code === "200") {
                history.push("./");
              }
            }
          });
        } else {
          createOrg({
            body: values,
            cb: (data: any) => {
              if (data.code === "200") {
                history.push("./");
              }
            }
          });
        }
      }
    });
  };

  componentWillMount() {
    const { location, getUserList, getOrgList, getOrgById } = this.props;

    if (location.state) {
      sessionStorage.setItem("orgId", location.state.id);
      sessionStorage.setItem("edit", location.state.edit);
    }
    if (sessionStorage.getItem("edit") === "true") {
      getOrgById({
        orgId: sessionStorage.getItem("orgId"),
        cb: (data: any) => {
          this.setState({
            formData: data
          });
        }
      });
    }
    getUserList({
      params: {
        pageIndex: 1,
        pageSize: 1000
      },
      cb: null
    });
    getOrgList({
      cb: null
    });
  }

  componentWillUnmount() {
    const { resetUserLists, resetOrgLists, resetOrgs } = this.props;
    resetUserLists();
    resetOrgLists();
    resetOrgs();
  }

  render() {
    const { formData } = this.state;
    const { classes, form, userList, org, orgList } = this.props;
    const { getFieldDecorator } = form;
    if (!org && sessionStorage.getItem("edit") === "true") return <div />;
    if (!userList || !orgList) return <div />;

    return (
      <div className={classes.root}>
        <p className={classes.title}>
          <FormattedMessage id="org.info" defaultMessage="Basic Information" />
        </p>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="org.title"
                    defaultMessage="Organization name"
                  />
                }
              >
                {getFieldDecorator("name", {
                  initialValue: formData.name,
                  rules: [
                    {
                      max: 30,
                      message: (
                        <FormattedMessage
                          id="org.nameVerify"
                          defaultMessage="Organization name max length is 30"
                        />
                      )
                    },
                    {
                      required: true,
                      whitespace: true,
                      message: (
                        <FormattedMessage
                          id="org.name.tip"
                          defaultMessage="Please enter organization name"
                        />
                      )
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>

            {/* <Col span={8}>
              <Form.Item label="组织编码">
                {getFieldDecorator("orgID", {
                  initialValue: formData.orgID,
                  rules: [{ required: true, message: "请输入组织编码！" }]
                })(<Input placeholder="请输入组织编码" />)}
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="org.abbreviation"
                    defaultMessage="Abbreviation"
                  />
                }
              >
                {getFieldDecorator("shortName", {
                  initialValue: formData.shortName,
                  rules: [
                    {
                      max: 20,
                      message: (
                        <FormattedMessage
                          id="org.shortNameVerify"
                          defaultMessage="Organization abbreviation max length is 20"
                        />
                      )
                    },
                    {
                      required: false,
                      message: (
                        <FormattedMessage
                          id="org.shortName.tip"
                          defaultMessage="Please enter organization abbreviation"
                        />
                      )
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="org.phone"
                    defaultMessage="Telephone"
                  />
                }
              >
                {getFieldDecorator("mobile", {
                  initialValue: formData.mobile,
                  rules: [
                    {
                      pattern:
                        "^[1](([3|5|8][\\d])|([4][4,5,6,7,8,9])|([6][2,5,6,7])|([7][^9])|([9][1,8,9]))[\\d]{8}$|^(\\d{3}-)(\\d{8})$|^(\\d{4}-)(\\d{7})$|^(\\d{4}-)(\\d{8})$",
                      message: (
                        <FormattedMessage
                          id="org.officePhoneVerify"
                          defaultMessage="Telephone is not valid (please enter mobile phone or fixed-line xxxx-xxx)"
                        />
                      )
                    },
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="org.phone.tip"
                          defaultMessage="Please enter telephone"
                        />
                      )
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="org.leader"
                    defaultMessage="Organization leader"
                  />
                }
              >
                {getFieldDecorator("managerId", {
                  initialValue: formData.manager && formData.manager.id,
                  rules: [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="org.leader.tip"
                          defaultMessage="Please select organization leader"
                        />
                      )
                    }
                  ]
                })(
                  <Select
                    allowClear
                    showSearch
                    placeholder={
                      <FormattedMessage
                        id="org.leader.tip"
                        defaultMessage="Please select organization leader"
                      />
                    }
                    getPopupContainer={triggerNode => triggerNode}
                    notFoundContent={null}
                    filterOption={(input: any, option: any) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {userList.data.map((item: any) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="org.parent.leader"
                    defaultMessage="Parent organization name"
                  />
                }
              >
                {getFieldDecorator("parentId", {
                  initialValue: formData.parentId,
                  rules: [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="org.parent.leader.tip"
                          defaultMessage="Please select parent organization"
                        />
                      )
                    }
                  ]
                })(
                  <Select
                    allowClear
                    showSearch
                    disabled={sessionStorage.getItem("edit") === "true"}
                    placeholder={
                      <FormattedMessage
                        id="org.parent.leader.tip"
                        defaultMessage="Please select parent organization"
                      />
                    }
                    getPopupContainer={triggerNode => triggerNode}
                    notFoundContent={null}
                    filterOption={(input: any, option: any) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {orgList.map((item: any) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="org.description"
                    defaultMessage="Organization description"
                  />
                }
              >
                {getFieldDecorator("description", {
                  initialValue: formData.description,
                  rules: [
                    {
                      max: 50,
                      message: (
                        <FormattedMessage
                          id="org.descVerify"
                          defaultMessage="Organization description max length is 50"
                        />
                      )
                    },
                    { required: false, message: "请输入组织描述" }
                  ]
                })(<Input.TextArea rows={4} />)}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className={classes.button}>
            <div>
              <Button onClick={this.goBack}>
                <FormattedMessage id="action.cancel" defaultMessage="Cancel" />
              </Button>
              <Modal
                title={
                  <FormattedMessage
                    id="org.exit"
                    defaultMessage="Confirm to exit editing?"
                  />
                }
                visible={this.state.visible}
                onOk={this.hideModal}
                onCancel={this.hide}
                okText={
                  <FormattedMessage id="action.confirm" defaultMessage="Confirm" />
                }
                cancelText={
                  <FormattedMessage
                    id="action.cancel"
                    defaultMessage="Cancel"
                  />
                }
              >
                <FormattedMessage
                  id="org.exit.text"
                  defaultMessage="All data will remain unchanged after exiting"
                  tagName="p"
                />
              </Modal>
            </div>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id="action.confirm" defaultMessage="Confirm" />
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapState2Props = ({
  user: { userList },
  org: { orgList, org }
}: any) => ({
  userList,
  orgList,
  org
});

const mapDispatch2Props = ({
  user: { getUserList, resetUserLists },
  org: { getOrgList, createOrg, putOrg, getOrgById, resetOrgLists, resetOrgs }
}: any) => ({
  getUserList,
  getOrgList,
  getOrgById,
  createOrg,
  putOrg,
  resetUserLists,
  resetOrgLists,
  resetOrgs
});

export default Form.create()(
  withStyles(styles)(
    connect(
      mapState2Props,
      mapDispatch2Props
    )(Edit)
  )
);
