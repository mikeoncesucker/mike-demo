import * as React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Icon, Modal, message } from 'antd';
import store from 'store';
import styles from './style.module.less';
import { common_msg } from '../../messages/common';
const { confirm } = Modal;
export interface CenterProps {
  history;
  intl;
  show?;
  logout;
  user;
}

class Center extends React.Component<CenterProps, any> {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  logout = () => {
    let { logout, history } = this.props;
    let accessToken = store.get('accessToken') || '';
    const { formatMessage } = this.props.intl;
    confirm({
      title: formatMessage(common_msg.confirm_txt),
      okText: formatMessage(common_msg.btn_sure),
      cancelText: formatMessage(common_msg.btn_cancel),
      onOk() {
        logout({
          params: { accessToken },
          cb: (err, res) => {
            if (res && res.status.code === '200') {
              store.remove('accessToken');
              message.success(formatMessage(common_msg.message_back));
              history.push('/login');
            } else {
              store.remove('accessToken');
              history.push('/login');
            }
          }
        });
      },
      onCancel() { }
    });
  };
  public render() {
    const { formatMessage } = this.props.intl;
    let { user, show, } = this.props;
    const menuHeaderDropdown = (
      <Menu selectedKeys={[]}>
        <Menu.Item key="password" onClick={
          () => {
            this.props.history.push('/password')
          }
        }>
          <Icon type="lock" />
          {formatMessage(common_msg.change_psw)}
        </Menu.Item>
        <Menu.Item key="logout" onClick={this.logout}>
          <Icon type="logout" />
          {formatMessage(common_msg.logout)}
        </Menu.Item>
      </Menu>
    );
    const center_icon = (
      <label className={`${styles.action} ${styles.account}`}>
        <span className="iconfont icon-principal" />
        <span className={styles.text_hide}>{user.data.user.name}</span>
        <span className="iconfont icon-down" />
      </label>
    )
    return (
      <div>
        {show ? center_icon :
          (<Dropdown overlay={menuHeaderDropdown}>
            {center_icon}
          </Dropdown>)
        }
      </div>
    );
  }
}
const mapState2Props = ({
  user: {
    user
  },
}) => ({
  user,
})
const mapDispatch2Props = ({
  user: {
    logout,
  }
}: any) => ({
  logout,
})
export default connect(
  mapState2Props,
  mapDispatch2Props
)(Center)