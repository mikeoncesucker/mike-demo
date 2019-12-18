import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  Col,
  Row,
  Divider,
  Button,
  InputNumber,
  Radio,
  Input,
  Checkbox,
  message
} from "antd";

export interface PasswordProps {
  classes: any;
  match: any;
  getPasswordPolicies: Function;
  putPasswordPolicies: Function;
  resetPasswordPoliciess: Function;
  password_policies: any;
  resourcesLabel: any;
  locale: any;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "30px 20px",
    '& .warn': {
      display: 'inline-block',
      paddingLeft: '10px',
      color: 'red'
    }
  },
  row: {
    padding: "15px 30px 0"
  },
  label: {
    textAlign: "end"
  },
  desc: {
    color: "#999BA2"
  },
  radio: {
    display: "block !important",
    height: "30px",
    lineHeight: "30px"
  },
  checkbox: {
    width: "100%",
    "& .ant-col": {
      marginBottom: "12px"
    }
  }
});

class Password extends React.Component<PasswordProps, any> {
  constructor(props: Readonly<PasswordProps>) {
    super(props);
    this.state = {
      minLength: null,
      lifetime: null,
      format: [],
      failCount: null,
      type: null,
      resetCredential: null
    };
  }

  componentDidMount() {
    const { getPasswordPolicies } = this.props;
    getPasswordPolicies({
      params: {},
      cb: () => {
        const { password_policies } = this.props;
        password_policies &&
          this.setState({
            minLength: password_policies.minLength,
            lifetime: password_policies.lifetime,
            format: password_policies.format,
            failCount: password_policies.failCount,
            type: password_policies.type,
            resetCredential: password_policies.resetCredential,
            id: password_policies.id
          });
      }
    });
  }

  isShowByResourcesLabel = (label: string) => {
    const { resourcesLabel } = this.props;
    return resourcesLabel && resourcesLabel.indexOf(label) > -1;
  };

  save = () => {
    const { putPasswordPolicies, locale } = this.props;

    putPasswordPolicies({
      body: this.state,
      cb: (res: any) => {
        if (res.status === 200 && res.data.code === "200") {
          message.success(locale === "zh" ? "修改成功" : "Modify successfully");
        } else {
          message.error(locale === "zh" ? "修改失败" : "Modify failed");
        }
      }
    });
  };

  render() {
    const { classes, password_policies, resourcesLabel } = this.props;
    const { minLength, lifetime, failCount, type, resetCredential } = this.state;
    if (!password_policies || !resourcesLabel || !minLength) return <div></div>;
    const _selectArr: any = [];
    for (let value in password_policies.format) {
      if (password_policies.format[value]) {
        _selectArr.push(value);
      }
    }
    return (
      <div className={classes.root}>
        <span>
          <FormattedMessage
            id="password.passwordRules"
            defaultMessage="Password rules"
          />
        </span>
        <Row className={classes.row}>
          <Col span={5} className={classes.label}>
            <FormattedMessage
              id="password.minimumPasswordLength"
              defaultMessage="Minimum password length"
            />
          </Col>
          <Col span={17} offset={1}>
            <InputNumber
              min={1}
              max={32}
              defaultValue={password_policies.minLength}
              parser={(value: any) => value.replace(/[^\d]/g, "")}
              onChange={value => {
                this.setState({ minLength: value })
              }}
            />
            <FormattedMessage
              id="password.aCharacter"
              defaultMessage="Characters"
            />
            {
              !minLength && <FormattedMessage
                id="password.length.null"
                defaultMessage="Minimum password length can't be empty"
              >
                {(txt) => (
                  <span className="warn">{txt}</span>
                )}
              </FormattedMessage>
            }
             
            <p className={classes.desc}>
              <FormattedMessage
                id="password.text.limitPasswordLength"
                defaultMessage="Password length should be between 8 and 32."
              />
            </p>
          </Col>
        </Row>

        <Row className={classes.row}>
          <Col span={5} className={classes.label}>
            <FormattedMessage
              id="password.thePasswordContainsAtLeastOne"
              defaultMessage="Password should contain at least"
            />
          </Col>
          <Col span={17} offset={1}>
            <Checkbox.Group
              className={classes.checkbox}
              onChange={(value: Array<any>) => {
                this.setState({
                  format: {
                    lowercase: value.indexOf("lowercase") > -1,
                    capital: value.indexOf("capital") > -1,
                    digit: value.indexOf("digit") > -1,
                    symbol: value.indexOf("symbol") > -1
                  }
                });
              }}
              defaultValue={_selectArr}
            >
              <Row>
                <Col span={24}>
                  <Checkbox value="lowercase">
                    <FormattedMessage
                      id="password.lowercase"
                      defaultMessage="Lowercase letters"
                    />
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Checkbox value="capital">
                    <FormattedMessage
                      id="passworld.capital"
                      defaultMessage="Uppercase letters"
                    />
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Checkbox value="digit">
                    <FormattedMessage
                      id="passworld.number"
                      defaultMessage="Digital number"
                    />
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Checkbox value="symbol">
                    <FormattedMessage
                      id="password.specialCharacterSpaceDivision"
                      defaultMessage="Special characters (no space)"
                    />
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
        </Row>

        <Row className={classes.row}>
          <Col span={5} className={classes.label}>
            <FormattedMessage
              id="password.passwordValidity"
              defaultMessage="Password validity"
            />
          </Col>
          <Col span={17} offset={1}>
            <InputNumber
              min={0}
              max={12}
              parser={(value: any) => value.replace(/[^\d]/g, "")}
              defaultValue={password_policies.lifetime}
              onChange={value => this.setState({ lifetime: value })}
            />
            <FormattedMessage id="password.month" defaultMessage="Months" />
            {
              (!lifetime && lifetime!== 0) && <FormattedMessage
              id="password.validity.null"
              defaultMessage="Password validity can't be empty"
            >
              {(txt) => (
                <span className="warn">{txt}</span>
              )}
            </FormattedMessage>
            }
            <p className={classes.desc}>
              <FormattedMessage
                id="password.text.limitPasswordExpiration"
                defaultMessage="
                Set password expiration date, 0 means valid forever, max 12 months. Before expiration, send 5 times notification to user: 1 month before, 1 week before, last 3 days."
              />
            </p>
          </Col>
        </Row>

        <Row className={classes.row}>
          <Col span={5} className={classes.label}>
            <FormattedMessage
              id="password.maxRetries"
              defaultMessage="Max retry count"
            />
          </Col>
          <Col span={17} offset={1}>
            <InputNumber
              min={0}
              defaultValue={password_policies.failCount}
              parser={(value: any) => value.replace(/[^\d]/g, "")}
              onChange={value => this.setState({ failCount: value })}
            />{" "}
            <FormattedMessage id="password.times" defaultMessage="Times" />
            {
              (!failCount && failCount!== 0) && <FormattedMessage
                id="password.repeat.null"
                defaultMessage="Max retry count can't be empty"
              >
                {(txt) => (
                  <span className="warn">{txt}</span>
                )}
              </FormattedMessage>
            }
           
            <p className={classes.desc}>
              <FormattedMessage
                id="password.text.limitTheNumberOfPasswordRetryErrors"
                defaultMessage="Max password retry cound, default 10, account will be locked after retry cound, 0 means no limit."
              />
            </p>
          </Col>
        </Row>

        <Row className={classes.row}>
          <Col span={5} className={classes.label}>
            <FormattedMessage
              id="password.resetPasswordPolicy"
              defaultMessage="Reset password policy"
            />
          </Col>
          <Col span={17} offset={1}>
            <Radio.Group
              onChange={(e: any) => {
                this.setState({
                  type: e.target.value
                });
              }}
              defaultValue={password_policies.type}
            >
              <Radio className={classes.radio} value={"AUTO_GENERATE"}>
                <FormattedMessage
                  id="password.randomPassword"
                  defaultMessage="Random password"
                />
              </Radio>
              <Radio className={classes.radio} value={"MANUAL_GENERATE"}>
                <FormattedMessage
                  id="password.fixedPassword"
                  defaultMessage="Fixed password"
                />
                {type === "MANUAL_GENERATE" && (
                  <Input
                    style={{ width: 100, marginLeft: 10 }}
                    maxLength={32}
                    onChange={(e: any) =>
                      this.setState({
                        resetCredential: e.target.value
                      })
                    }
                    defaultValue={resetCredential}
                  />
                )}
                {
                  type === "MANUAL_GENERATE" && !resetCredential && <FormattedMessage
                    id="password.reset.null"
                    defaultMessage="Fixed password can't be empty"
                  >
                    {(txt) => (
                      <span className="warn">{txt}</span>
                    )}
                  </FormattedMessage>
                }
              </Radio>
            </Radio.Group>

            <p className={classes.desc}>
              <FormattedMessage
                id="password.text.limitPasswordLength"
                defaultMessage="Password length should be between 8 and 32."
              />
            </p>
          </Col>
        </Row>

        {this.isShowByResourcesLabel("credential_update") && (
          <div>
            <Divider dashed />
            <Button type="primary" 
              disabled={!minLength||(!lifetime && lifetime!== 0)||(!failCount && failCount!==0)|| (type==="MANUAL_GENERATE"&& !resetCredential)}
              onClick={this.save}>
              <FormattedMessage
                id="action.applicationModify"
                defaultMessage="Application modify"
              />
            </Button>
          </div>
        )}
      </div>
    );
  }
}
const mapState2Props = ({
  password_policies: { 
    password_policies, 
    putPasswordPolicies 
  },
  app: { resourcesLabel },
  intl: { locale }
}: any) => ({
  password_policies,
  putPasswordPolicies,
  resourcesLabel,
  locale
});

const mapDispatch2Props = ({
  password_policies: {
    getPasswordPolicies,
    putPasswordPolicies,
    resetPasswordPoliciess
  }
}: any) => ({
  getPasswordPolicies,
  putPasswordPolicies,
  resetPasswordPoliciess
});

export default withStyles(styles)(
  connect(mapState2Props, mapDispatch2Props)(Password)
);

