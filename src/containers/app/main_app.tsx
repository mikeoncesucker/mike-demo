import * as React from 'react';
import { connect } from 'react-redux';
import store from 'store';
import App from '../../routes';
export interface IMainAppProps {
  match;
  location;
  history;
  version;
  intl;
  user;
  getUserInfo;
}

class MainApp extends React.Component<IMainAppProps> {
  componentDidMount () {
    let { getUserInfo, location } = this.props;
    const accessToken = store.get('accessToken');
    if (location.pathname === '/') {
      window.location.href = '#/login';
    }else {
      getUserInfo({
        params:{accessToken},
        cb:(err, res)=>{
          if (!res || !res.data.user) {
            window.location.href = '#/login';
          }
        }
      })
    }
    
  }
  public render() {
    let { match, user } = this.props;
    if (!user.data) {
      return <div />;
    }
    return (
      <App match={match} />
    );
  }
}

const mapState2Props = ({ 
  common: { 
    version 
  }, 
  user: {
    user
  } 
}) => ({
  version, 
  user
})

const mapDispatch2Props = ({
  user: {
    getUserInfo
  },
}:any) => ({
  getUserInfo 
});

export default connect(
  mapState2Props, 
  mapDispatch2Props
)(MainApp)