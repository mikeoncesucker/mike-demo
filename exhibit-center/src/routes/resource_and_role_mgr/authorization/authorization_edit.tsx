import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Form, Row, Col, Input, Button, Modal } from "antd";
import { FormattedMessage } from "react-intl";

export interface authorizationEditProps {
  classes: any;
  history: any;
  location: any;
  form: any;
  addRole: any;
  editRole: any;
  queryRoleById: any;
  roleInfo: any;
  resetRoleInfos: Function;
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

class AuthorizationEdit extends React.Component<authorizationEditProps, any> {
  constructor(props: Readonly<authorizationEditProps>) {
    super(props);
    this.state = {
      formData: {
        name: '',
        description: ''
      }
    };
  }

  showModal = () => {
    const formObj = this.props.form.getFieldsValue();
    const { roleInfo } = this.props;
    let edited: boolean = false;
    for (let key in formObj) {
      if (formObj[key] !== roleInfo[key]) {
        edited = true;
        this.setState({
          visible: true
        });
      }
    }
    if (!edited) {
      this.goBack();
    }
  };

  hideModal = () => {
    this.setState({
      visible: false
    });
  };

  goBack = () => {
    const { history, location } = this.props;
    history.push("./", location.state);
  };

  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { location } = this.props;
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        let params = {
          description: values.description,
          name: values.name
        };
        if (location.pathname.indexOf('edit') > 0) {
          const { editRole } = this.props;
          editRole({
            identifier: sessionStorage.getItem("roleIdentifier"),
            id: sessionStorage.getItem("roleId"),
            params,
            cb: () => {
              this.goBack();
            }
          });
        } else {
          const { addRole } = this.props;
          addRole({
            identifier: sessionStorage.getItem("roleIdentifier"),
            params,
            cb: () => {
              this.goBack();
            }
          });
        }
      }
    });
  };

  componentWillMount() {
    const { queryRoleById, location } = this.props;
    if (location.pathname.indexOf('edit') > 0) {
      if (location.state) {
        sessionStorage.setItem("roleId", location.state.id);
      }
      queryRoleById({
        identifier: sessionStorage.getItem("roleIdentifier"),
        id: sessionStorage.getItem("roleId"),
        cb: null
      });
    }
  }

  componentWillUnmount() {
    const { resetRoleInfos } = this.props;
    resetRoleInfos();
  }

  render() {
    const { classes, form, roleInfo, location } = this.props;
    const { getFieldDecorator } = form;

    let formData = [];
    if (location.state) {
      formData = Object.assign({}, roleInfo);
    }
    return (
      <div className={classes.root}>
        <p>
          <FormattedMessage
            id="role.authorizeBusinessSystem"
            defaultMessage="Authorize business system"
          />
        </p>
        <p>
          {sessionStorage.getItem("sysName")} / <span>{sessionStorage.getItem("path")}</span>
        </p>
        <br />
        <p className={classes.title}>
          <FormattedMessage id="role.baseInfo" defaultMessage="Basic information" />
        </p>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Row gutter={48}>
            <Col span={10}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="role.roleName"
                    defaultMessage="RoleName"
                  />
                }
              >
                {getFieldDecorator("name", {
                  initialValue: formData.name,
                  rules: [
                    {
                      max: 32,
                      message: (
                        <FormattedMessage
                          id="role.nameVerify"
                          defaultMessage="Role name max length is 32"
                        />
                      )
                    },
                    {
                      required: true,
                      whitespace: true,
                      message: (
                        <FormattedMessage
                          id="role.inputRoleName"
                          defaultMessage="Please enter role name"
                        />
                      )
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="role.Description"
                    defaultMessage="Role desciption"
                  />
                }
              >
                {getFieldDecorator("description", {
                  initialValue: formData.description,
                  rules: [
                    {
                      max: 100,
                      message: (
                        <FormattedMessage
                          id="role.descVerify"
                          defaultMessage="Role description max length is 100"
                        />
                      )
                    },
                    {
                      required: false,
                      message: (
                        <FormattedMessage
                          id="role.inputRoleDescription"
                          defaultMessage="please input inputRoleDescription"
                        />
                      )
                    }
                  ]
                })(<Input.TextArea rows={3} />)}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className={classes.button}>
            <Modal
              title={
                <FormattedMessage
                  id="role.confirmExitEditing"
                  defaultMessage="Confirm to exit editing?"
                />
              }
              visible={this.state.visible}
              onOk={this.goBack}
              onCancel={this.hideModal}
              okText={
                <FormattedMessage id="role.confirm" defaultMessage="Confirm" />
              }
              cancelText={
                <FormattedMessage id="role.cancel" defaultMessage="Cancal" />
              }
            >
              <p>
                <FormattedMessage
                  id="role.exitMsg"
                  defaultMessage="All data will remain unchanged after exiting"
                />
              </p>
            </Modal>
            <Button onClick={this.showModal}>
              <FormattedMessage id="role.cancel" defaultMessage="Cancal" />
            </Button>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id="role.confirm" defaultMessage="Confirm" />
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapState2Props = ({ resource_and_role: { roleInfo } }: any) => ({
  roleInfo
});

const mapDispatch2Props = ({
  resource_and_role: { addRole, editRole, queryRoleById, resetRoleInfos }
}: any) => ({
  addRole,
  editRole,
  queryRoleById,
  resetRoleInfos
});

export default Form.create()(
  withStyles(styles)(
    connect(
      mapState2Props,
      mapDispatch2Props
    )(AuthorizationEdit)
  )
);
