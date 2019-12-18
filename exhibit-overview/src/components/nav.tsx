import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";
import { withRouter, Link } from "react-router-dom";

const { Sider } = Layout;

export interface NavProps {
  classes: any;
  history: any;
  location: any;
  match: any;
  collapsed: any;
}

const styles: any = (theme: any) => ({
  sider: {
    background: "#070B2B",
    overflow: "auto",
    height: "100vh",
    left: 0,
    width: '240px',
    boxShadow: "5px 0px 5px #eee",
    '& .logo': {
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0 20px 30px',
      fontSize: '16px',
      color: '#fff',
      whiteSpace: "nowrap",
      overflow: "hidden",
      '& img': {
        width: '35px',
        height: '37px',
        marginRight: '15px',
      }
    },
    '& .menu': {
      background: "#070B2B",
    },
    "&::-webkit-scrollbar": {
      display: "none"
    },
    "& .ant-menu-inline": {
      border: "none"
    },
    "& .ant-menu-submenu-selected, .ant-menu-submenu-title:hover, .ant-menu-item-selected, .ant-menu-item-active ": {
      color: '#fff',
    },
    '& .ant-menu-item a': {
      color: '#fff'
    },
    "& .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected": {
      background: "#1890FF",
    },
    '& .ant-menu-item-selected > a, .ant-menu-item-selected > a:hover': {
      color: '#fff',
    }
  },
  menu: { marginBottom: "70px" }
});

class Nav extends React.Component<NavProps, any> {
  constructor(props: Readonly<NavProps>) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes, match, collapsed } = this.props;
    return (
      <div className={classes.root}>
        <Sider className={classes.sider} collapsed={collapsed}>
          <Link to={`/home`} className="logo">
            <img src={require('./../resource/logo.png')} alt=""/>
            <span>支撑平台驾驶舱</span>
          </Link>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            className='menu'
          >
            <Menu.Item key="1">
              <Link to={`${match.url}/sysRelation`}>
                <Icon type="setting" />
                <span>系统间调用关系</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    );
  }
}

const mapState2Props = (state: any) => {
  return {};
};

export default withStyles(styles)(withRouter(connect(mapState2Props)(Nav)));
