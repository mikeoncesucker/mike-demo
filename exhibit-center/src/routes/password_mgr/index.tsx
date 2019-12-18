import { withStyles } from "@material-ui/styles";
import { Button, Col, Input, message, Row } from "antd";
import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

export interface PasswordProps {
  classes: any;
  match: any;
  putPassword: Function;
  password: any;
  user: any;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "20px"
  },
  content: {
    textAlign: "center",
    marginTop: "40px",
    "&>p": { fontSize: "14px", color: "#33353D" },
    "&>span": {
      fontSize: "24px",
      color: "#33353D",
      marginBottom: "40px",
      display: "block"
    },
    "& button": {
      margin: "40px 0 3 0px"
    }
  },
  label: {
    height: "32px",
    lineHeight: "32px",
    textAlign: "end",
    width: "80px"
  },
  list: {
    marginBottom: "30px"
  }
});

class Password extends React.Component<PasswordProps, any> {
  constructor(props: Readonly<PasswordProps>) {
    super(props);
    this.state = {
      oldPwd: null,
      newPwd: null,
      resetPwd: null,
      showError: false,
      showNull: false
    };
  }
  componentWillMount() {}
  onChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };
  doSave = () => {
    const { oldPwd, newPwd, resetPwd } = this.state;
    const { putPassword, user } = this.props;
    if (!(oldPwd && newPwd && resetPwd)) {
      this.setState({ showNull: true });
    } else if (newPwd !== resetPwd) {
      this.setState({ showNull: false });
      this.setState({ showError: true });
    } else {
      this.setState({ showError: false });
      putPassword({
        userId: user.id,
        body: { oldPassword: oldPwd, newPassword: newPwd },
        cb: (code: any) => {
          if (code === 200) {
            message.success("修改成功", 5);
            window.close();
          } else {
            message.error("修改失败", 0);
          }
        }
      });
    }
  };

  render() {
    const { classes, user } = this.props;
    const { showError, showNull } = this.state;
    if (!user) return <div />;
    return (
      <div className={classes.root}>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8} className={classes.content}>
            <p>{user.name}</p>
            <span>{user.email}</span>
            <Row className={classes.list}>
              <Col span={8} className={classes.label}>
                <FormattedMessage
                  id="password.originalPassword"
                  defaultMessage="Original Password"
                />
              </Col>
              <Col offset={2} span={14}>
                <FormattedMessage
                  id="password.pleaseOriginalPassword"
                  defaultMessage="please original password"
                >
                  {text => (
                    <Input.Password
                      placeholder={text.toString()}
                      onChange={this.onChange("oldPwd")}
                    />
                  )}
                </FormattedMessage>
              </Col>
            </Row>
            <Row className={classes.list}>
              <Col span={8} className={classes.label}>
                <FormattedMessage
                  id="password.newPassword"
                  defaultMessage="New Password"
                />
              </Col>
              <Col offset={2} span={14}>
                <FormattedMessage
                  id="password.pleaseNewPassword"
                  defaultMessage="please new password"
                >
                  {text => (
                    <Input.Password
                      placeholder={text.toString()}
                      onChange={this.onChange("newPwd")}
                    />
                  )}
                </FormattedMessage>
              </Col>
            </Row>
            <Row className={classes.list}>
              <Col span={8} className={classes.label}>
                <FormattedMessage
                  id="password.confirmNewPassword"
                  defaultMessage="Confirm New Password"
                />
              </Col>
              <Col offset={2} span={14}>
                <FormattedMessage
                  id="password.pleaseNewPasswordAgain"
                  defaultMessage="Please New Password Again"
                >
                  {text => (
                    <Input.Password
                      placeholder={text.toString()}
                      onChange={this.onChange("resetPwd")}
                    />
                  )}
                </FormattedMessage>
                <FormattedMessage
                  id="password.keepTheNewPasswordInLine"
                  defaultMessage="Keep the new password in line"
                >
                  {text =>
                    showError && (
                      <p
                        style={{ color: "red", margin: 0, textAlign: "start" }}
                      >
                        {text}
                      </p>
                    )
                  }
                </FormattedMessage>
                <FormattedMessage
                  id="password.originalPasswordAndTheNewPasswordCannotBeEmpty"
                  defaultMessage="Original Password And The New Password Cannot Be Empty"
                >
                  {text =>
                    showNull && (
                      <p
                        style={{ color: "red", margin: 0, textAlign: "start" }}
                      >
                        {text}
                      </p>
                    )
                  }
                </FormattedMessage>
              </Col>
            </Row>
            <FormattedMessage
              id="action.applicationModify"
              defaultMessage="Application Modify"
            >
              {text => (
                <Button type="primary" onClick={this.doSave}>
                  {text}
                </Button>
              )}
            </FormattedMessage>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapState2Props = ({ password: { password }, app: { user } }: any) => ({
  password,
  user
});

const mapDispatch2Props = ({ password: { putPassword } }: any) => ({
  putPassword
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Password)
);
