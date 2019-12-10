import * as React from 'react';
import { connect } from 'react-redux';
import store from 'store';
import axios from 'axios';
import App from '../../routes';
export interface IMainAppProps {
  match;
  location;
  history;
  intl;
  user;
  getUserInfo;
}

class MainApp extends React.Component<IMainAppProps,any> {
  authentication = () => {
    let { getUserInfo, history, location } = this.props;
    const accessToken = store.get('accessToken');
    if(accessToken) {
      axios.defaults.headers.common['accessToken'] = store.get('accessToken');
      axios.defaults.headers.common['client'] = '';
      getUserInfo({
        params: { accessToken },
        cb: (err, res)=> {
          if(res && res.status.code === '200' && location.pathname === '/') {
            history.push('/dashboard')
          }
        }
      })
    }else {
      history.push('/login')
    }
  }
  componentWillMount() {
    this.authentication()
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
  user: {
    user
  } 
}) => ({
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