import * as React from 'react';
import { connect } from 'react-redux';
import { Layout, Button, Input, Form, message, } from 'antd';
import HeaderBar from '../../components/header_bar';
import Nav from '../../components/nav';
import styles from './style.module.less';
import { injectIntl } from 'react-intl';
import store from 'store';
import { password_msg } from '../../messages/password';

export interface PasswordProps {
  history;
  match;
  user;
  intl;
  form;
  putPasswordByUserId;
  resetQuerys;
}
class Password extends React.Component<PasswordProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      newPsw: null,
    }
  }
  componentDidMount() {
    this.props.resetQuerys()
  }
  onChange = (event: any) => {
    this.setState({ newPsw: event.target.value });
  };
  validatePassword = (rule, value, callback) => {
    const { formatMessage } = this.props.intl;
    if (value && value !== this.state.newPsw) {
      callback(`${formatMessage(password_msg.tip_info)}!`);
    } else {
      callback()
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { putPasswordByUserId, user, history, form, intl } = this.props;
    const { formatMessage } = intl;
    form.validateFields((err, values) => {
      if (!err) {
        putPasswordByUserId({
          userId: user.data.user.userId,
          body: {
            newPassword: values.newPassword,
            oldPassword: values.oldPassword
          },
          cb: (err, res) => {
            if (res && res.status.code === '200') {
              store.remove('accessToken');
              message.success(formatMessage(password_msg.reset_success))
              history.push('/login')
            }
          }
        })
      } else {
        this.props.form.validateFields();
      }
    })


  }
  public render() {
    let { user, history, intl, form } = this.props;
    const { getFieldDecorator } = form;
    const { formatMessage } = intl;
    const minWidth = intl.locale === 'zh' ? '72px' : '173px';
    return (
      <Layout className="layout">
        <HeaderBar history={history} intl={intl} />
        <Nav name={password_msg.change_psw} intl={intl} />
        <div className={styles.warpper}>
          <p className={styles.account}>
            {user.data.user.account}
          </p>
          <Form onSubmit={this.handleSubmit} className={styles.input_warpper}>
            <div className={styles.item}>
              <span style={{ minWidth }}>
                {formatMessage(password_msg.old_psw)}
              </span>
              <Form.Item>
                {getFieldDecorator('oldPassword', {
                  rules: [{
                    required: true,
                    message: formatMessage(password_msg.placeholder_old_psw)
                  }],
                })(
                  <Input.Password 
                    placeholder={formatMessage(password_msg.old_psw)} 
                  />,
                )}
              </Form.Item>
            </div>
            <div className={styles.item}>
              <span style={{ minWidth }}>
                {formatMessage(password_msg.new_psw)}
              </span>
              <Form.Item>
                {getFieldDecorator('newPassword', {
                  rules: [{
                    required: true,
                    message: formatMessage(password_msg.placeholder_new_psw)
                  }],
                })(
                  <Input.Password
                    placeholder={formatMessage(password_msg.new_psw)}
                    onChange={this.onChange}
                  />,
                )}
              </Form.Item>
            </div>
            <div className={styles.item}>
              <span style={{ minWidth }}>
                {formatMessage(password_msg.new_rp_psw)}
              </span>
              <Form.Item>
                {getFieldDecorator('confirmPsw', {
                  rules: [{
                    required: true, message: formatMessage(password_msg.new_rp_psw)
                  }, {
                    validator: this.validatePassword,
                  }],
                })(
                  <Input.Password 
                    placeholder={formatMessage(password_msg.new_rp_psw)} 
                  />,
                )}
              </Form.Item>
            </div>
            <Button
              type="primary"
              className={styles.btn}
              htmlType="submit"
            >
              {formatMessage(password_msg.edit_text)}
            </Button>
          </Form>
        </div>
      </Layout>
    )
  }
}

const mapState2Props = ({
  user: {
    user
  }
}) => ({
  user
})
const mapDispatch2Props = ({
  user: {
    putPasswordByUserId,
  },
  search: {
    resetQuerys
  }
}: any) => ({
  putPasswordByUserId,
  resetQuerys,
})

export default Form.create()(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(injectIntl(Password))
)