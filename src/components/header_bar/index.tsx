import * as React from 'react';
import Center from '../center';
import styles from './style.module.less';
import News from '../news';
import Language from '../language';
import { Link } from 'react-router-dom';
import { store } from "../../store";

export interface HeaderBarProps {
  history;
  intl;
  show?;
}

class HeaderBar extends React.Component<HeaderBarProps, any> {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  resetQuery = () => {
    store.dispatch.notice.resetQuery()
  }
  public render() {
    const { history, intl, show } = this.props;
    return (
      <header className={styles.header}>
        <Link 
          onClick={this.resetQuery}
          to={'/dashboard'}
        >
          <img alt="logo" src={require('../../assets/images/logo.png')} />
        </Link>
       
        <div className={styles.right}>
          <Language styles={{color: '#fff', fontSize: '14px', marginRight: '18px' }}></Language>
          <News history={history} intl={intl} show={show}></News>
          <Center history={history} intl={intl}></Center>
        </div>
      </header>
    );
  }
}
export default HeaderBar;
