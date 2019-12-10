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
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Login extends React.Component<ILoginProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      passIcon: 'eye-invisible',
    };
  }
  componentDidMount() {
    this.props.form.validateFields()
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
  handleSubmit = (e) => {
    e.preventDefault();
    let { history, form, intl, login, setLanguage } = this.props;
    let { formatMessage } = intl;
    form.validateFields((err, values) => {
      if (!err) {
        login({
          data: values,
          cb: (err, res) => {
            if (res && res.status.code === '200') {
              store.set('local_language', intl.locale);
              setLanguage({
                language: {
                  language: intl.locale === 'zh' ? 'chinese' : 'english'
                }
              })
              if (res.data.remind) {
                if (res.data.remind === '密码30天后失效') {
                  message.warn(formatMessage(login_msg.login_remind_thirty))
                }
                if (res.data.remind === '密码7天后失效') {
                  message.warn(formatMessage(login_msg.login_remind_seven))
                }
                if (res.data.remind === '密码3天后失效') {
                  message.warn(formatMessage(login_msg.login_remind_three))
                }
                if (res.data.remind === '密码2天后失效') {
                  message.warn(formatMessage(login_msg.login_remind_two))
                }
                if (res.data.remind === '密码明天失效') {
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
    let { passIcon } = this.state;
    const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = form;
    const accountError = isFieldTouched('account') && getFieldError('account');
    const passwordError = isFieldTouched('password') && getFieldError('password');
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.loginFormButton}
                  disabled={hasErrors(getFieldsError())}
                >
                  {formatMessage(login_msg.login)}
                </Button>
              </Form>
              <Link to={{
                pathname: 'resetPassword',
                state: {
                  account: this.props.form.getFieldValue('account')
                }
              }}
              >
                <span className={styles.forgetPass}>
                  {formatMessage(login_msg.btn_forget_psw)}?
					      </span>
              </Link>
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
    login
  },
  portal: {
    setLanguage
  }
}:any) => ({
  login, 
  setLanguage 
})

export default Form.create()(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(injectIntl(Login))
)
