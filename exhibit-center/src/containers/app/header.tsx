import React from "react";
import { Layout, Icon } from "antd";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import emitter from "../../util/events";
import { withRouter } from "react-router";
import Axios from "axios";
import store from "store";

import user_icon from "../../resource/icon/user_icon.png";
import close_icon from "../../resource/icon/close_icon.png";

export interface HeaderProps {
  classes: any;
  location: any;
  match: any;
  history: any;
  getUser: any;
  user: any;
  resetUsers: Function;
  putLocale: Function;
  locale: any;
}

const styles: any = (theme: any) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: "0 30px",
    height: "54px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 1px 6px 0px rgba(0,21,41,0.12)",
  },
  trigger: {
    fontSize: "18px",
    cursor: "pointer",
    "&:hover": {
      color: "#1890ff"
    }
  },
  action: {
    display: 'flex',
    '&>div': {
      display: 'flex',
      alignItems: 'center',
      height: '21px',
      marginLeft: '20px'
    },
    '& img': {
      marginRight: '8px'
    }
  }
});

class Header extends React.Component<HeaderProps, any> {
  constructor(props: Readonly<HeaderProps>) {
    super(props);
    this.state = {
      collapsed: false,
      token: '',
    };
  }

  toggle = () => {
    this.setState(
      {
        collapsed: !this.state.collapsed
      },
      () => {
        emitter.emit("showNav", this.state.collapsed);
      }
    );
  };

  sendUser = () => {
    emitter.emit("userId", this.state.collapsed);
  };

  componentWillMount() {
    Axios.defaults.headers.common["accessToken"] = store.get("accessToken");
    const { getUser, putLocale } = this.props;
    this.setState({
      token: store.get("accessToken")
    })
    getUser({
      cb: (data: any) => {
        if (data) {
          emitter.emit("userId", data.id);
          putLocale({
            locale: data.language !== "english" ? "zh" : "en"
          });
        }
      }
    });
  }
  componentDidUpdate(prevProps:any,prevState:any) {
    if(prevState.token !== store.get('accessToken')) {
      const { getUser, putLocale } = this.props;
      this.setState({
        token: store.get("accessToken")
      })
      getUser({
        cb: (data: any) => {
          if (data) {
            emitter.emit("userId", data.id);
            putLocale({
              locale: data.language !== "english" ? "zh" : "en"
            });
          }
        }
      });
    }
  }
  componentWillUnmount() {
    const { resetUsers } = this.props;
    resetUsers();
  }
  render() {
    const { classes, user, locale } = this.props;
    if (!user) return <div />;
    return (
      <Layout.Header className={classes.header}>
        <Icon
          className={classes.trigger}
          type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.toggle}
        />
        <div className={classes.action}>
          <div>
            <img src={user_icon} alt=""/>
            {user.name}
          </div>
          <div 
            style={{ cursor: 'pointer' }} 
            onClick={()=>{
              window.close();
            }}
          >
            <img src={close_icon} alt=""/>
            { locale === 'zh' ? '关闭' : 'Close'}
          </div>
        </div>
      </Layout.Header>
    );
  }
}

const mapState2Props = ({ app: { user }, intl: { locale } }: any) => ({
  user,
  locale
});

const mapDispatch2Props = ({
  app: { getUser, resetUsers },
  intl: { putLocale }
}: any) => ({
  getUser,
  resetUsers,
  putLocale
});

export default withStyles(styles)(
  withRouter(
    connect(
      mapState2Props,
      mapDispatch2Props
    )(Header)
  )
);
