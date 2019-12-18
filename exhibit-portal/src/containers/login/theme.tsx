import * as React from 'react';
import styles from './style.module.less';
import { login_msg } from '../../messages/login';
export interface ThemeProps {
	intl;
}

class Theme extends React.Component<ThemeProps, any> {
  public render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={styles.leftBox} 
        style={{ background: `url(${require('../../assets/images/login_bg_top.jpg')})`, backgroundSize: '100% 100%'}}
      >
        <img className={styles.logo} src={require('../../assets/images/logo.png')} alt="logo"/>
        <div className={styles.themeBox}>
          <div className={styles.theme1}>
            Shenzhen World 
            <p>Exhibition &#38; Convention Center</p>
          </div>
          <p>{formatMessage(login_msg.title_sufix)}</p>
        </div>
      </div>
    )
  }
}

export default (Theme)