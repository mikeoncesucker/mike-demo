import * as React from 'react';
import { connect } from 'react-redux';
import { Layout, Button, Input, Form, message, } from 'antd';
import HeaderBar from '../../components/header_bar';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
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
  getCredentialRule;
  resetQuerys;
}
class Password extends React.Component<PasswordProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      newPsw: null,
      passwordRule: '',
    }
  }
  componentDidMount() {
    const { resetQuerys, getCredentialRule, intl, } = this.props;
    resetQuerys()
    getCredentialRule({
      cb: (code,data)=> {
        const res = data.data;
				this.setState({
					passwordRule: intl.locale === 'zh'? res.credentialRule : res.credentialRuleEn
				})
      }
    })
  }
  onChange = (event: any) => {
    this.setState({ newPsw: event.target.value });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirmPsw'], { force: true });
		}
		callback();
	}
  validatePassword = (rule, value, callback) => {
    const { form, intl } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback(`${intl.formatMessage(password_msg.tip_info)}`);
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
    const { user, history, intl, form } = this.props;
    const { passwordRule } = this.state;
    const { getFieldDecorator } = form;
    const { formatMessage } = intl;
    const minWidth = intl.locale === 'zh' ? '.72rem' : '1.73rem';
    return (
      <Layout className="layout">
        <HeaderBar history={history} intl={intl} />
        <Nav name={password_msg.change_psw} intl={intl} />
        <div className={styles.warpper}>
          <p className={styles.account}>
            {user.data.user.name}
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
                  }, {
                    validator: this.validateToNextPassword,
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
                    onBlur={this.handleConfirmBlur}
                  />,
                )}
              </Form.Item>
            </div>
            <p style={{fontSize: '.14rem'}}>{passwordRule}</p>
            <Button
              type="primary"
              className={styles.btn}
              htmlType="submit"
            >
              {formatMessage(password_msg.edit_text)}
            </Button>
          </Form>
        </div>
        <Footer intl={intl} bg='#213571'/>
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
    getCredentialRule
  },
  search: {
    resetQuerys
  }
}: any) => ({
  putPasswordByUserId,
  getCredentialRule,
  resetQuerys,
})

export default Form.create()(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(injectIntl(Password))
)