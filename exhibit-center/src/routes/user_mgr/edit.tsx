import { withStyles } from "@material-ui/styles";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import moment from "moment";
import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

export interface EditProps {
  classes: any;
  history: any;
  location: any;
  match: any;
  form: any;
  user: any;
  orgList: any;
  locale: any;
  createUser: Function;
  putUser: Function;
  getUserByUserId: Function;
  getOrgList: Function;
  resetOrgLists: Function;
  resetUsers: Function;
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
  },
  datePicker: {
    width: "100%"
  }
});

class Edit extends React.Component<EditProps, any> {
  constructor(props: Readonly<EditProps>) {
    super(props);
    this.state = {
      formData: {
        name: null,
        account: null,
        gender: null,
        mobile: null,
        birthday: new Date(),
        idcard: null,
        work: null,
        organization: {
          name: null,
          id: null
        },
        entryDate: new Date(),
        status: 1
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
    const { createUser, putUser, history } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        values.organization = {
          id: values.organization
        };
        if (sessionStorage.getItem("edit") === "true") {
          putUser({
            userId: sessionStorage.getItem("id"),
            body: values,
            cb: (data: any) => {
              if (data.code === "200") {
                history.push("./");
              }
            }
          });
        } else {
          createUser({
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
    const { location, getUserByUserId, getOrgList } = this.props;
    if (location.state) {
      sessionStorage.setItem("edit", location.state.edit);
      sessionStorage.setItem("id", location.state.id);
    }
    if (sessionStorage.getItem("edit") === "true") {
      getUserByUserId({
        userId: sessionStorage.getItem("id"),
        cb: (data: any) => {
          this.setState({
            formData: data
          });
        }
      });
    }
    getOrgList({
      cb: null
    });
  }

  componentWillUnmount() {
    const { resetOrgLists, resetUsers } = this.props;
    resetOrgLists();
    resetUsers();
  }

  render() {
    const { formData } = this.state;
    const { classes, form, orgList, locale } = this.props;
    const { getFieldDecorator } = form;
    
    if (!orgList) return <div />;
    return (
      <div className={classes.root}>
        <p className={classes.title}>
          <FormattedMessage
            id="order.basicInformation"
            defaultMessage="Basic information"
          />
        </p>

        <Form onSubmit={this.handleSubmit} className="login-form">
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="user.detail.userName"
                    defaultMessage="User name"
                  />
                }
              >
                {getFieldDecorator("name", {
                  initialValue: formData.name || "",
                  rules: [
                    {
                      max: 20,
                      message: (
                        <FormattedMessage
                          id="user.edit.nameVerify"
                          defaultMessage="Name max length is 20"
                        />
                      )
                    },
                    {
                      required: true,
                      whitespace: true,
                      message: (
                        <FormattedMessage
                          id="user.edit.pleaseEnterUserName"
                          defaultMessage="Please enter user name"
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
                    id="user.userAccount"
                    defaultMessage="User account"
                  />
                }
              >
                {getFieldDecorator("account", {
                  initialValue: formData.account,
                  rules: [
                    {
                      pattern:
                        "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$",
                      message: (
                        <FormattedMessage
                          id="user.edit.accountVerify"
                          defaultMessage="Account is not valid, please enter email."
                        />
                      )
                    },
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="user.edit.pleaseEnteranAccount"
                          defaultMessage="Please enter account name"
                        />
                      )
                    }
                  ]
                })(
                  <Input 
                  disabled={sessionStorage.getItem("edit") === "true"} 
                  maxLength={50}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage id="user.detail.sex" defaultMessage="Gender" />
                }
              >
                {getFieldDecorator("gender", {
                  initialValue: formData.gender,
                  rules: [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="user.text.pleaseSelectGender"
                          defaultMessage="Please select gender"
                        />
                      )
                    }
                  ]
                })(
                  <Select
                    placeholder={
                      <FormattedMessage
                        id="user.text.pleaseSelectGender"
                        defaultMessage="Please select gender"
                      />
                    }
                    getPopupContainer={triggerNode => triggerNode}
                  >
                    <Select.Option value="男">
                      <FormattedMessage id="user.man" defaultMessage="Male" />
                    </Select.Option>
                    <Select.Option value="女">
                      <FormattedMessage
                        id="user.woman"
                        defaultMessage="Female"
                      />
                    </Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="user.detail.cellphoneNumber"
                    defaultMessage="Telephone"
                  />
                }
              >
                {getFieldDecorator("mobile", {
                  initialValue: formData.mobile,
                  rules: [
                    {
                      pattern:
                        "^[1](([3|5|8][\\d])|([4][4,5,6,7,8,9])|([6][2,5,6,7])|([7][^9])|([9][1,8,9]))[\\d]{8}$",
                      message: (
                        <FormattedMessage
                          id="user.edit.phoneVerify"
                          defaultMessage="Please input 11-digit number"
                        />
                      )
                    },
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="user.edit.pleaseEnteranCellphoneNumber"
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
                    id="user.detail.birthdate"
                    defaultMessage="Date of birth"
                  />
                }
              >
                {getFieldDecorator("birthday", {
                  initialValue: moment(formData.birthday || null, "YYYY/MM/DD"),
                  rules: [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="user.edit.pleaseSelectaDate"
                          defaultMessage="Please select date"
                        />
                      )
                    }
                  ]
                })(
                  <DatePicker
                    className={classes.datePicker}
                    locale={locale}
                    getCalendarContainer={(triggerNode): any =>
                      triggerNode.parentNode
                    }
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage
                    id="user.detail.IdNumber"
                    defaultMessage="ID number"
                  />
                }
              >
                {getFieldDecorator("idcard", {
                  initialValue: formData.idcard,
                  rules: [
                    {
                      pattern:
                        "^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X|x)$",
                      message: (
                        <FormattedMessage
                          id="role.idcardVerify"
                          defaultMessage="Please input 18-digit ID number"
                        />
                      )
                    },
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="user.edit.pleaseEnterIdentificationNumber"
                          defaultMessage="Please enter ID number"
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
                    id="user.detail.quarters"
                    defaultMessage="Position"
                  />
                }
              >
                {getFieldDecorator("work", {
                  initialValue: formData.work,
                  rules: [
                    {
                      max: 30,
                      message: (
                        <FormattedMessage
                          id="user.edit.workVerify"
                          defaultMessage="Position max length is 30"
                        />
                      )
                    },
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="user.edit.pleaseEnteraPost"
                          defaultMessage="Please enter position"
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
                    id="user.organization"
                    defaultMessage="Organization"
                  />
                }
              >
                {getFieldDecorator("organization", {
                  initialValue: formData.organization.id,
                  rules: [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="user.edit.pleaseSelectOrganization"
                          defaultMessage="Please select organization"
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
                        id="user.text.pleaseSelectOrganization"
                        defaultMessage="Please select organization"
                      />
                    }
                    onChange={(value: any) => {
                      this.setState({ organization: { id: value } });
                    }}
                    getPopupContainer={triggerNode => triggerNode}
                    notFoundContent={null}
                    filterOption={(input: any, option: any) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {orgList
                      .filter((item: any) => item.id !== "0")
                      .map((item: any) => {
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
                    id="user.edit.entryTime"
                    defaultMessage="Entry Date"
                  />
                }
              >
                {getFieldDecorator("entryDate", {
                  initialValue: moment(formData.entryDate, "YYYY/MM/DD"),
                  rules: [
                    {
                      required: false,
                      message: (
                        <FormattedMessage
                          id="user.edit.pleaseSelectTime"
                          defaultMessage="Please select time"
                        />
                      )
                    }
                  ]
                })(
                  <DatePicker
                    locale={locale}
                    className={classes.datePicker}
                    getCalendarContainer={(triggerNode): any =>
                      triggerNode.parentNode
                    }
                  />
                )}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label={
                  <FormattedMessage id="user.state" defaultMessage="Status" />
                }
              >
                {getFieldDecorator("status", {
                  initialValue: formData.status,
                  rules: [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="user.text.pleaseSelectState"
                          defaultMessage="Please select status"
                        />
                      )
                    }
                  ]
                })(
                  <Select
                    placeholder={
                      <FormattedMessage
                        id="user.text.pleaseSelectState"
                        defaultMessage="Please select status"
                      />
                    }
                    disabled={true}
                    getPopupContainer={triggerNode => triggerNode}
                  >
                    <Select.Option value={1}>
                      <FormattedMessage
                        id="user.detail.enable"
                        defaultMessage="Enabled"
                      />
                    </Select.Option>
                    <Select.Option value={0}>
                      <FormattedMessage
                        id="user.detail.disable"
                        defaultMessage="Disabled"
                      />
                    </Select.Option>
                  </Select>
                )}
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
                    id="user.edit.OKtoExitEditing"
                    defaultMessage="Confirm to exit editing"
                  />
                }
                visible={this.state.visible}
                onOk={this.hideModal}
                onCancel={this.hide}
                okText={
                  <FormattedMessage
                    id="action.confirm"
                    defaultMessage="Confirm"
                  />
                }
                cancelText={
                  <FormattedMessage
                    id="action.cancel"
                    defaultMessage="Cancel"
                  />
                }
              >
                <p>
                  <FormattedMessage
                    id="user.edit.exitingWillRestoreDefault"
                    defaultMessage="All data will remain unchanged after exiting"
                  />
                </p>
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

const mapState2Props = ({ user: { user }, org: { orgList } }: any) => ({
  user,
  orgList
});

const mapDispatch2Props = ({
  user: { createUser, putUser, getUserByUserId, resetUsers },
  org: { getOrgList, resetOrgLists },
  intl: { locale }
}: any) => ({
  createUser,
  putUser,
  getUserByUserId,
  getOrgList,
  resetOrgLists,
  resetUsers,
  locale
});

export default Form.create()(
  withStyles(styles)(connect(mapState2Props, mapDispatch2Props)(Edit))
);
