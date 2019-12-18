import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Form, Row, Col, Input, Button, Modal } from "antd";
import { FormattedMessage } from "react-intl";

export interface EditProps {
  classes: any;
  history: any;
  match: any;
  form: any;
  addBusiSys: any;
  editBusiSys: any;
  querySysById: any;
  resetSysInfos: Function;
  sysInfo: any;
  location: any;
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
    this.state = {};
  }

  showModal = () => {
    this.setState({
      visible: true
    });
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
    const { editBusiSys, location } = this.props;
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        let params = {
          createdAt: "",
          description: values.description,
          id: values.id,
          name: values.name,
          path: values.path,
          identifier: sessionStorage.getItem("roleIdentifier"),
          privateKey: "",
          publicKey: "",
          status: 0,
          updatedAt: ""
        };
        if (location.state) {
          editBusiSys({
            id: sessionStorage.getItem("roleId"),
            params,
            cb: () => {
              this.goBack();
            }
          });
        } else {
          const { addBusiSys } = this.props;
          addBusiSys({
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
    const { querySysById, location } = this.props;
    if (location.state) {
      querySysById({ id: sessionStorage.getItem("roleId"), cb: null });
    }
  }

  componentWillUnmount() {
    const { resetSysInfos } = this.props;
    resetSysInfos();
  }

  render() {
    const { classes, form, sysInfo, location } = this.props;
    const { getFieldDecorator } = form;
    let formData = [];
    if (location.state) {
      formData = Object.assign({}, sysInfo);
    }
    return (
      <div className={classes.root}>
        <p className={classes.title}>
          <FormattedMessage id="role.baseInfo" defaultMessage="Basic information" />
        </p>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="role.businessSystemName"
                    defaultMessage="Business system name"
                  />
                }
              >
                {getFieldDecorator("name", {
                  initialValue: formData.name,
                  rules: [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="role.inputBusinessSystemName"
                          defaultMessage="Please enter business system name"
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
                    id="role.businessSystemId"
                    defaultMessage="Business system ID"
                  />
                }
              >
                {getFieldDecorator("id", {
                  initialValue: formData.id,
                  rules: [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="role.inputBusinessSystemId"
                          defaultMessage="Please enter business system ID"
                        />
                      )
                    }
                  ]
                })(<Input disabled={location.state !== undefined} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="role.resourceEnterAddress"
                    defaultMessage="Resource access address"
                  />
                }
              >
                {getFieldDecorator("path", {
                  initialValue: formData.path,
                  rules: [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="role.inputUsername"
                          defaultMessage="Please enter resource enter address!"
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
                    id="role.businessSystemDescription"
                    defaultMessage="Resource access address"
                  />
                }
              >
                {getFieldDecorator("description", {
                  initialValue: formData.description,
                  rules: [
                    {
                      required: false,
                      message: (
                        <FormattedMessage
                          id="role.businessSystemDescription"
                          defaultMessage="Please enter business system description!"
                        />
                      )
                    }
                  ]
                })(<Input.TextArea rows={4} />)}
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
                  defaultMessage="The editing content will restore the default after exiting"
                />
              </p>
            </Modal>
            <Button type="primary" onClick={this.showModal}>
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

const mapState2Props = ({ resource_and_role: { sysInfo } }: any) => ({
  sysInfo
});

const mapDispatch2Props = ({
  resource_and_role: { addBusiSys, editBusiSys, querySysById, resetSysInfos }
}: any) => ({
  addBusiSys,
  editBusiSys,
  querySysById,
  resetSysInfos
});

export default Form.create()(
  withStyles(styles)(
    connect(
      mapState2Props,
      mapDispatch2Props
    )(Edit)
  )
);
