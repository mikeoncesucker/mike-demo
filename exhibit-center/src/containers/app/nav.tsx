import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

import imgCN from "../../resource/logo/logoCN.png";
import imgEN from "../../resource/logo/logoEN.png";
import imgMini from "../../resource/logo/logoMini.png";
import emitter from "../../util/events";

import user_icon from "./../../resource/menu_icon/用户中心@2x.png";
import order_icon from "./../../resource/menu_icon/订单中心@2x.png";
import pay_icon from "./../../resource/menu_icon/支付中心@2x.png";
import event_icon from "./../../resource/menu_icon/事件中心@2x.png";
import { store } from "../../store";

export interface NavProps {
  history: any;
  classes: any;
  location: any;
  match: any;
  user: any;
  userResources: any;
  getUserResources: Function;
  resetUserResources: Function;
  resetUsers: Function;
  locale: any;
}

const styles: any = (theme: any) => ({
  nav: {
    backgroundColor: "#213571",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none"
    },
    "& .ant-menu-submenu-title": {
      backgroundColor: "#213571"
    },
    "& .ant-menu-inline.ant-menu-sub ": {
      backgroundColor: "#122357"
    }
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#162A66",
    "& span": {
      display: "block",
      height: "54px",
      lineHeight: "54px",
      fontWeight: "bold",
      color: "#FFFFFF",
      whiteSpace: "nowrap",
      overflow: "hidden"
    }
  },
  icon: {
    height: "20px",
    margin: "0 14px 3px 0"
  }
});

class Nav extends React.Component<NavProps, any> {
  eventEmitter: any;
  constructor(props: Readonly<NavProps>) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    const { getUserResources, history, location } = this.props;
    this.eventEmitter = emitter.addListener("showNav", message => {
      this.setState({
        collapsed: message
      });
    });
    this.eventEmitter = emitter.addListener("showEventQuery", message => {
      this.setState({
        selected: message
      });
    });
    // 订单查询
    this.eventEmitter = emitter.addListener("showOrderQuery", message => {
      this.setState({
        selected: message
      });
    });
    this.eventEmitter = emitter.addListener("userId", message => {
      getUserResources({
        userId: message,
        cb: (data: any) => {
          if (location.pathname === "/" && data.data.children) {
            const _resources = data.data.children;
            if (
              _resources.find((value: any) => {
                return value.name === "订单中心";
              })
            ) {
              sessionStorage.setItem("pageAddress", "1202");
              history.push("/orderAnalyse");
            } else if (
              _resources.find((value: any) => {
                return value.name === "事件中心";
              })
            ) {
              const childrenName = _resources.find(
                (value: any) => value.name === "事件中心"
              ).children;
              if(childrenName.find(
                (value: any) => value.name === "事件分析"
              )) {
                sessionStorage.setItem("pageAddress", "1402");
                history.push("/eventAnalyze");
              }else if (
                childrenName.find(
                  (value: any) => value.name === "事件推送规则配置"
                )
              ) {
                history.push("/eventConfig");
              } else {
                history.push("/eventQuery");
              }
            } else if (
              _resources.find((value: any) => {
                return value.name === "支付中心";
              })
            ) {
              const payChildrenName = _resources.find(
                (value: any) => value.name === "支付中心"
              ).children;
              if (
                payChildrenName.find((value: any) => value.name === "支付分析")
              ) {
                sessionStorage.setItem("pageAddress", "1302");
                history.push("/payAnalyze");
              } else {
                history.push("/payQuery");
              }
            }
          }
        }
      });
    });
  }

  setPageAddreee = (v: any) => {
    sessionStorage.setItem("pageAddress", v.id);
    store.dispatch.pageState.resetAllPageState();
  };

  componentWillUnmount() {
    const { resetUserResources, resetUsers } = this.props;
    emitter.removeListener(this.eventEmitter, () => {});
    resetUserResources();
    resetUsers();
  }

  render() {
    const { classes, match, userResources, locale } = this.props;
    const pageAddress: string = sessionStorage.getItem("pageAddress") || "";
    return (
      <Layout.Sider
        collapsed={this.state.collapsed}
        className={classes.nav}
        width={220}
      >
        <div className={classes.logo}>
          {this.state.collapsed ? (
            <img
              src={imgMini}
              alt=""
              style={{
                height: "55px",
                width: "55px",
                padding: "10px"
              }}
            />
          ) : (
            <img src={locale === "en" ? imgEN : imgCN} alt="" />
          )}
        </div>
        {userResources && (
          <Menu
            theme="dark"
            selectedKeys={[pageAddress]}
            defaultSelectedKeys={[pageAddress]}
            defaultOpenKeys={[pageAddress.substring(0, 2)]}
            mode="inline"
            className={classes.nav}
          >
            {userResources.map((value: any) => {
              if (value.children && value.type === "MENU") {
                return (
                  <Menu.SubMenu
                    className={classes.item}
                    key={value.id}
                    title={
                      <span>
                        <img
                          alt=""
                          className={classes.icon}
                          src={
                            (value.name === "用户中心" && user_icon) ||
                            (value.name === "订单中心" && order_icon) ||
                            (value.name === "支付中心" && pay_icon) ||
                            (value.name === "事件中心" && event_icon) ||
                            ""
                          }
                        />
                        <span>
                          {locale === "zh" ? value.name : value.english}
                        </span>
                      </span>
                    }
                  >
                    {value.children.map((v: any) => {
                      return (
                        <Menu.Item key={v.id}>
                          <Link
                            to={`${match.path}` + v.path}
                            onClick={this.setPageAddreee.bind(this, v)}
                          >
                            <span>{locale === "zh" ? v.name : v.english}</span>
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </Menu.SubMenu>
                );
              } else if (value.type === "MENU") {
                return (
                  <Menu.Item key={value.id}>
                    <Link to={`${match.path}` + value.path}>
                      <Icon type={value.icon || ""} />
                      <span>
                        {locale === "zh" ? value.title : value.english}
                      </span>
                    </Link>
                  </Menu.Item>
                );
              }

              return null;
            })}
          </Menu>
        )}
      </Layout.Sider>
    );
  }
}

const mapState2Props = ({
  app: { userResources, user },
  intl: { locale }
}: any) => ({
  userResources,
  user,
  locale
});

const mapDispatch2Props = ({
  app: { getUserResources, resetUserResources, resetUsers }
}: any) => ({
  getUserResources,
  resetUserResources,
  resetUsers
});

export default withStyles(styles)(
  withRouter(connect(mapState2Props, mapDispatch2Props)(Nav))
);
