import * as React from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import store from 'store';
import { Link } from 'react-router-dom';
import styles from './style.module.less';
import { connect } from 'react-redux';
import Theme from './theme';
import Language from '../../components/language';
import  Footer  from '../../components/footer';
import { injectIntl } from 'react-intl';
import { common_msg } from '../../messages/common';
import { login_msg } from '../../messages/login';
export interface ILoginProps {
  history;
  intl;
  form;
  login;
  setLanguage;
  postCodeForLogin;
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Login extends React.Component<ILoginProps, any> {
  timer;
  constructor(props) {
    super(props);
    this.state = {
      passIcon: 'eye-invisible',
      endtime: 60,
      isSend: false,
      loginCookie: ""
    };
  }
  
  componentDidMount() {
    this.props.form.validateFields()
    this.setState ({
      loginCookie: this.getCookie("login_validation") || ""
    })
  }
  componentWillUnmount() {
		clearInterval(this.timer)
	}
  //获取cookie
  getCookie = (name) => {
    if (document.cookie.length > 0) {
        var begin = document.cookie.indexOf(name + "=");
        if (begin !== -1) {
            begin += name.length + 1;
            var end = document.cookie.indexOf(";", begin);
            if (end === -1) end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return null;
  }
  GetQueryString = (name,token) => {
    let url = window.location.href;
    if(url.indexOf(name) > -1) {
      let str = url.substr(url.indexOf('=')+1);
      if(str.indexOf('?') > -1) {
        return decodeURIComponent(`${str}&accessToken=${token}`);
      }
      return decodeURIComponent(`${str}?accessToken=${token}`)
    }
    return null
  }
  sendCode = () => {
    const { getFieldValue } = this.props.form;
		const { formatMessage } = this.props.intl;
    const account = getFieldValue('account');
		let time = 60;
    if (!account) {
			message.warn(formatMessage(login_msg.placeholder_account))
		}else{
        this.setState({
          isSend: true
        })
        this.props.postCodeForLogin({
          data: {
            account,
            validateType: "mobile",
          },
          cb: (data,res)=> {
            if(res && res.status.code === '200') {
              message.success(formatMessage(login_msg.code_send)+res.data.target, 5);
              this.timer = setInterval(() => {
                this.setState({
                  endtime: --time
                }, () => {
                  if (time === 0) {
                    clearInterval(this.timer);
                    this.setState({
                      isSend: false,
                      endtime: 60
                    })
                  }
                })
              }, 1000)
            }else {
              this.setState({
                isSend: false,
              })
            }
          }
       })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { history, form, intl, login, setLanguage } = this.props;
    let { formatMessage } = intl;
    form.validateFields((err, values) => {
      if (!err) {
        login({
          data: {
            account: values.account,
            password: values.password,
            validatType: "mobile",
            code: values.code
          },
          cb: (err, res) => {
            if (res && res.status.code === '200') {
              store.set('local_language', intl.locale);
              setLanguage({
                language: {
                  language: intl.locale === 'zh' ? 'chinese' : 'english'
                }
              })
              const remind = res.data.remind;
              if (remind) {
                if (remind === '密码30天后失效') {
                  message.warn(formatMessage(login_msg.login_remind_thirty))
                }
                if (remind === '密码7天后失效') {
                  message.warn(formatMessage(login_msg.login_remind_seven))
                }
                if (remind === '密码3天后失效') {
                  message.warn(formatMessage(login_msg.login_remind_three))
                }
                if (remind === '密码2天后失效') {
                  message.warn(formatMessage(login_msg.login_remind_two))
                }
                if (remind === '密码明天失效') {
                  message.warn(formatMessage(login_msg.login_remind_one))
                }
              }
              let url = this.GetQueryString('expiredUrl',res.data.accessToken);
              message.success(formatMessage(common_msg.login_success));
              if (url) {
                window.location.href = url
              } else {
                history.push('./dashboard');
              }
            }
          }
        })
      }
    });
  }
  changePass = () => {
    let { passIcon } = this.state;
    this.setState({
      passIcon: passIcon === 'eye' ? 'eye-invisible' : 'eye'
    })
  }
  public render() {
    const { intl, form } = this.props;
    let { passIcon, isSend, endtime, loginCookie} = this.state;
    const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError, getFieldValue} = form;
    const accountError = isFieldTouched('account') && getFieldError('account');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const codeError = isFieldTouched('code') && getFieldError('code');
    const { formatMessage } = intl;
    return (
      <div className={styles.root}
        style={{ background: `url(${require('../../assets/images/login_bg_btm.jpg')})`, backgroundSize: 'cover' }}>
        <div className={styles.container}>
          <Theme intl={intl}></Theme>
          <div className={styles.rightBox}>
            <p className={styles.languageBox}>
              <Language beforeLogin={true}></Language>
            </p>
            <div className={styles.loginForm}>
              <h3 className={styles.title}>
                {formatMessage(login_msg.welcome_to_login)}
              </h3>
              <p className={styles.line}></p>
              <Form onSubmit={this.handleSubmit} style={{ marginTop: '.8rem' }}>
                <Form.Item
                  validateStatus={accountError ? 'error' : ''}
                  help={accountError || ''}
                >
                  {getFieldDecorator('account', {
                    rules: [{ 
                      required: true, 
                      message: formatMessage(login_msg.placeholder_account) 
                    }],
                  })(
                    <Input
                      type='text'
                      className={styles.input}
                      prefix={<Icon type="user" className={styles.fontColor} />}
                      placeholder={formatMessage(login_msg.placeholder_account)}
                    />,
                  )}
                </Form.Item>
                <Form.Item
                  validateStatus={passwordError ? 'error' : ''}
                  help={passwordError || ''}
                >
                  {getFieldDecorator('password', {
                    rules: [{ 
                      required: true, 
                      message: formatMessage(login_msg.placeholder_psw) 
                    }],
                  })(
                    <Input
                      type={passIcon === 'eye' ? 'text' : 'password'}
                      className={styles.input}
                      prefix={<Icon type="lock" className={styles.fontColor} />}
                      suffix={<Icon onClick={this.changePass} type={passIcon} style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder={formatMessage(login_msg.placeholder_psw)}
                    />,
                  )}
                </Form.Item>
                {(loginCookie.indexOf(getFieldValue('account')) === -1) &&
                    <Form.Item 
                      validateStatus={codeError ? 'error' : ''}
                      help={codeError || ''}
                    >
                    {getFieldDecorator('code', {
                      rules: [{ 
                        required: true, 
                        message: formatMessage(login_msg.placeholder_code) 
                      }],
                    })(
                      <Input
                        type='text'
                        className={styles.input}
                        prefix={<Icon type="safety" className={styles.fontColor} />}
                        suffix={
                          <Button 
                            onClick={this.sendCode} className={styles.btnCode}
                            disabled={isSend} type='primary'
                          >
                            {formatMessage(login_msg.btn_send_psw)} {endtime<60 ? `(${endtime})` : null}
                          </Button>
                        }
                        placeholder={formatMessage(login_msg.placeholder_code)}
                      />,
                    )}
                  </Form.Item>
                }
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.loginFormButton}
                  disabled={
                    loginCookie.indexOf(getFieldValue('account')) > -1 ? 
                    hasErrors(getFieldsError()) : 
                    (hasErrors(getFieldsError()) || !getFieldValue('code'))
                  }
                >
                  {formatMessage(login_msg.login)}
                </Button>
              </Form>
              <div className={styles.loginWarn}>
                <Link to={{
                  pathname: 'resetPassword',
                  state: {
                    account: getFieldValue('account')
                  }
                }}
                >
                  <span className={styles.forgetPass}>
                    {formatMessage(login_msg.btn_forget_psw)}?
                  </span>
                </Link>
                <span className={styles.forgetPass}>
                  {formatMessage(login_msg.btn_contact)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Footer intl={intl}/>
      </div>
    );
  }
}
const mapState2Props = () => ({
  
})
const mapDispatch2Props = ({
  user: {
    login,
    postCodeForLogin
  },
  portal: {
    setLanguage
  }
}:any) => ({
  login,
  postCodeForLogin,
  setLanguage 
})

export default Form.create()(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(injectIntl(Login))
)
