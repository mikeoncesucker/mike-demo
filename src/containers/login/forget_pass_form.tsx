import * as React from 'react';
import { Form, Input, Button, Icon, Select, message, } from 'antd';
import styles from './style.module.less';
import { injectIntl } from 'react-intl';
import Language from '../../components/language';
import Theme from './theme';
import { connect } from 'react-redux';
import { login_msg } from '../../messages/login';
import { common_msg } from '../../messages/common';
import store from 'store';
export interface FormProps {
	form;
	location;
	history;
	intl;
	putRestPassword;
	postCodeByVerify;
	postResetPassWordByVerify;
}
function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class LoginForm extends React.Component<FormProps, any> {
	timer;
	constructor(props) {
		super(props);
		this.state = {
			passIcon: 'eye-invisible',
			confirmDirty: false,
			way: null,
			endtime: 60,
			isSend: false,
		}
	}
	componentDidMount() {
		this.props.form.validateFields();
	}
	goBack = () => {
		const { history } = this.props;
		history.goBack();
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { history, intl, form, postResetPassWordByVerify } = this.props;
		const { formatMessage } = intl;
		form.validateFields((err, values) => {
			if (!err) {
				postResetPassWordByVerify({
					params: values,
					cb: (err, res) => {
						if (res && res.status.code === '200') {
							store.remove('accessToken');
							message.success(formatMessage(login_msg.reset_success));
							history.push('login');
						}
					}
				})
			}
		})
	}
	ways = (val) => {
		this.setState({
			way: val,
		})
	}
	sendCode = () => {
		const { formatMessage } = this.props.intl;
		const { getFieldValue } = this.props.form;
		const account = getFieldValue('account');
		const { way } = this.state;
		let time = 60;
		if (!account) {
			message.warn(formatMessage(login_msg.placeholder_username))
		} else if (!way) {
			message.warn(formatMessage(login_msg.placeholder_way))
		} else {
			this.props.postCodeByVerify({
				params: {
					account,
					type: way,
				},
				cb: (err, res)=> {
					if(res.status.code === '200') {
						this.timer = setInterval(() => {
							this.setState({
								endtime: --time,
								isSend: true,
							}, () => {
								if (time === 0) {
									clearInterval(this.timer);
									this.setState({
										isSend: false
									})
								}
							})
						}, 1000)
					}
				}
			})
		}
	}
	changePass = () => {
		let { passIcon } = this.state;
		this.setState({
			passIcon: passIcon === 'eye' ? 'eye-invisible' : 'eye'
		})
	}
	choeseWay = (rule, value, callback) => {
		const { formatMessage } = this.props.intl;
		if (value === 'email' || value === 'mobile') {
			callback()
		} else {
			callback(`${formatMessage(login_msg.placeholder_way)}!`)
		}
	}
	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['credentConfirm'], { force: true });
		}
		callback();
	}
	compareToFirstPassword = (rule, value, callback) => {
		const { form, intl } = this.props;
		const { formatMessage } = intl;
		if (value && value !== form.getFieldValue('credent')) {
			callback(`${formatMessage(login_msg.tip_info)}!`);
		} else {
			callback();
		}
	};
	componentWillUnmount() {
		clearInterval(this.timer)
	}
	handleConfirmBlur = e => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	public render() {
		const { location, intl, form  } = this.props;
		const { formatMessage } = intl;
		const { endtime, isSend } = this.state;
		const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError, } = form;
		const usernameError = isFieldTouched('account') && getFieldError('account');
		const wayError = isFieldTouched('type') && getFieldError('type');
		const codeError = isFieldTouched('verification') && getFieldError('verification');
		const passwordError = isFieldTouched('credent') && getFieldError('credent');
		const conformPasswordError = isFieldTouched('credentConfirm') && getFieldError('credentConfirm');
		return (
			<div className={styles.root} 
				style={{ background:`url(${require('../../assets/images/login_bg_btm.jpg')})`}}
			>
				<div className={styles.container}>
					<Theme intl={intl}></Theme>
					<div className={styles.rightBox}>
						<div className={styles.language_box}>
							<span
								className='iconfont icon-back'
								onClick={this.goBack}
							>
							</span>
							<Language beforeLogin={ true }></Language>
						</div>
						<div className={styles.loginForm}>
							<h3 className={styles.title}>{formatMessage(login_msg.forget_psw)}</h3>
							<p className={styles.line}></p>
							<Form onSubmit={this.handleSubmit} style={{ marginTop: '10px'}}>
								<Form.Item 
									validateStatus={usernameError ? 'error' : ''} 
									help={usernameError || ''}
								>
									{getFieldDecorator('account', {
										rules: [{ 
											required: true, 
											message: formatMessage(login_msg.placeholder_username) 
										}],
										initialValue: location.state && location.state.account,
									})(
										<Input
											type='text'
											className={styles.input}
											prefix={<Icon type="user" className={styles.fontColor} />}
											placeholder={formatMessage(login_msg.placeholder_username)}
										/>,
									)}
								</Form.Item>
								<Form.Item 
									validateStatus={wayError ? 'error' : ''} 
									help={wayError || ''}
								>
									{getFieldDecorator('type', {
										initialValue: formatMessage(login_msg.placeholder_way),
										rules: [{ 
											required: true, 
											message: formatMessage(login_msg.placeholder_way) 
										}, {
											validator: this.choeseWay
										}],
									})(
										<Select onChange={this.ways}>
											<Select.Option value="email" className={styles.wayItem}>
												{formatMessage(login_msg.find_email)}
											</Select.Option>
											<Select.Option value="mobile" className={styles.wayItem}>
												{formatMessage(login_msg.find_tel)}
											</Select.Option>
										</Select>
									)}
								</Form.Item>
								<Form.Item 
									validateStatus={codeError ? 'error' : ''} 
									help={codeError || ''}
								>
									{getFieldDecorator('verification', {
										rules: [{ 
											required: true, message: formatMessage(login_msg.placeholder_code) 
										}],
									})(
										<Input
											type='text'
											className={styles.input}
											prefix={<Icon type="safety" className={styles.fontColor} />}
											suffix={<Button onClick={this.sendCode} className={styles.btnCode} 
											disabled={isSend} type='primary'
										>
												{formatMessage(login_msg.btn_send_psw)} {isSend ? `(${endtime})` : null}
											</Button>}
											placeholder={formatMessage(login_msg.placeholder_code)}
										/>,
									)}
								</Form.Item>
								<Form.Item 
									validateStatus={passwordError ? 'error' : ''} 
									help={passwordError || ''}
								>
									{getFieldDecorator('credent', {
										rules: [{ 
											required: true, 
											message: formatMessage(login_msg.placeholder_new_psw) 
										}, {
											validator: this.validateToNextPassword,
										}],
									})(
										<Input
											type='password'
											className={styles.input}
											prefix={<Icon type="lock" className={styles.fontColor} />}
											placeholder={formatMessage(login_msg.placeholder_new_psw)}
										/>,
									)}
								</Form.Item>
								<Form.Item 
									validateStatus={conformPasswordError ? 'error' : ''} 
									help={conformPasswordError || ''}
								>
									{getFieldDecorator('credentConfirm', {
										rules: [{ 
											required: true, 
											message: formatMessage(login_msg.placeholder_re_psw) 
										}, {
											validator: this.compareToFirstPassword
										}],
									})(
										<Input
											type='password'
											className={styles.input}
											prefix={<Icon type="lock" className={styles.fontColor} />}
											onBlur={this.handleConfirmBlur}
											placeholder={formatMessage(login_msg.placeholder_re_psw)}
										/>,
									)}
								</Form.Item>
								<Button 
									type="primary" 
									htmlType="submit" 
									className={styles.loginFormButton} 
									disabled={hasErrors(getFieldsError())}
								>
									{formatMessage(common_msg.btn_sure)}
								</Button>
								<p className={styles.forgetPass} style={{ textDecoration: 'none'}}>
									{formatMessage(login_msg.btn_contact)}
								</p>
							</Form>
						</div>
					</div>
				</div>
				<div className={styles.copyRight}>
					Copyright &#169;&#65039; 2019 {formatMessage(common_msg.corpright)}
				</div>
			</div>
		);
	}
}

const mapState2Props = () => ({
	
});
const mapDispatch2Props = ({
	user: { 
		postCodeByVerify, 
		postResetPassWordByVerify 
	}
}:any) => ({
	postCodeByVerify, 
	postResetPassWordByVerify
});

export default Form.create()(
	connect(
		mapState2Props,
		mapDispatch2Props
	)(injectIntl(LoginForm))
)
