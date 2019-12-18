import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Link, Route, Redirect } from "react-router-dom";
import { injectIntl } from "react-intl";
import loadable from "react-loadable";
import bg from "./../../resource/bg.png";
import { Spin } from "antd";
import { tabs } from "./message";
import axios from "axios";
import store from "store";
export interface OverviewProps {
  history: any;
  location: any;
  match: any;
  intl: any;
  classes: any;
  loading: Boolean;
}
const styles: any = (theme: any) => ({
  root: {
    minHeight: '100vh',
    background: `url(${bg}) no-repeat`,
    backgroundSize: "cover",
    lineHeight: 1,
    "& header>div": {
      flex: 1
    },
    "& header, & nav": {
      display: "flex",
      lineHeight: 1,
      "& nav": {
        justifyContent: "space-around",
        paddingTop: ".14rem"
      },
      "& nav a": {
        fontSize: ".16rem",
        fontWeight: "normal",
        color: "#fff",
        textAlign: "center",
        textDecoration: "none"
      },
      "& nav a.active": {
        color: "#32F0FF"
      },
      "& .center": {
        flex: 1.5,
        position: "relative",
        height: '.62rem',
      },
      "& .center h2": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        margin: 0,
        fontSize: ".4rem",
        whiteSpace: "nowrap",
        color: "#fff",
      }
    }
  }
});
const platformCockpit: any = loadable({
  loader: (): any =>
    import(/* webpackChunkName: "platformCockpit" */ "./platform-cockpit"),
  loading: () => {
    return <div>loading</div>;
  }
});

const dataCenter: any = loadable({
  loader: (): any =>
    import(/* webpackChunkName: "dataCenter" */ "./data-center"),
  loading: () => {
    return <div>loading</div>;
  }
});

const topologyModel: any = loadable({
  loader: (): any =>
    import(/* webpackChunkName: "topologyModel" */ "./topology-model"),
  loading: () => {
    return <div>loading</div>;
  }
});

const apiGateway: any = loadable({
  loader: (): any =>
    import(/* webpackChunkName: "apiGateway" */ "./api-gateway"),
  loading: () => {
    return <div>loading</div>;
  }
});

const paasHardware: any = loadable({
  loader: (): any =>
    import(/* webpackChunkName: "paasHardware" */ "./paas-hardware"),
  loading: () => {
    return <div>loading</div>;
  }
});

const sysRelation: any = loadable({
  loader: (): any =>
    import(/* webpackChunkName: "sysRelation" */ "./sys-relation"),
  loading: () => {
    return <div>loading</div>;
  }
});

class Overview extends React.Component<OverviewProps, any> {
  constructor(props: Readonly<OverviewProps>) {
    super(props);
    this.state = {
      title: ""
    };
  }
  componentDidMount() {
    const { location, history, intl } = this.props;
    const { formatMessage } = intl;
    document.title = formatMessage(tabs.title)

    let pathname =
      location.pathname === "/" ? "/platformCockpit" : location.pathname;
    history.push(pathname);
    
    let designSize = 1920; 
    let html = window.screen;
    let wW = html.width;
    let rem = wW * 100 / designSize; 
    document.documentElement.style.fontSize = rem + 'px';
  }
  componentWillReceiveProps(nextProps: any) {
    axios.defaults.headers.common["accessToken"] =
      store.get("accessToken") || "";
    const url = nextProps.location.pathname;
    const formatMessage = this.props.intl.formatMessage;
    const name: any = {
      "/platformCockpit": formatMessage(tabs.cockpit_title),
      "/dataCenter": formatMessage(tabs.center_title),
      "/topologyModel": formatMessage(tabs.topology_title),
      "/apiGateway": formatMessage(tabs.gateway_title),
      "/paasHardware": formatMessage(tabs.pasS_title),
      "/sysRelation": formatMessage(tabs.sysRelation_title)
    };
    this.setState({
      title: name[url]
    });
  }
  render() {
    const { classes, match, location, loading, intl } = this.props;
    const { formatMessage } = intl;
    const { title } = this.state;
    return (
      <div
        className={classes.root}
        style={{ display: !store.get("success") ? "none" : "block" }}
      >
        {loading && (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(100,100,100, 0.3)",
              zIndex: 10,
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Spin size="large" />
          </div>
        )}
        <header>
          <div className="left">
            <img
              src={require("../../resource/headerLeft.png")}
              alt=""
              width="100%"
            />
            <nav>
              <Link
                to={"/platformCockpit"}
                className={location.pathname === "/platformCockpit" ? "active" : ""}
              >
                {formatMessage(tabs.cockpit_title)}
              </Link>
              <Link
                to={"/dataCenter"}
                className={location.pathname === "/dataCenter" ? "active" : ""}
              >
                {formatMessage(tabs.center_title)}
              </Link>
              <Link
                to={"/topologyModel"}
                className={location.pathname === "/topologyModel" ? "active" : ""}
              >
                {formatMessage(tabs.topology_title)}
              </Link>
            </nav>
          </div>
          <div className="center">
            <img
              src={require("../../resource/headerCenter.png")}
              alt=""
              height="100%"
              width="100%"
            />
            <h2>{title}</h2>
          </div>
          <div className="right">
            <img
              src={require("../../resource/headerRight.png")}
              alt=""
              width="100%"
            />
            <nav>
              <Link
                to={"/apiGateway"}
                className={location.pathname === "/apiGateway" ? "active" : ""}
              >
                {formatMessage(tabs.gateway_title)}
              </Link>
              <Link
                to={"/paasHardware"}
                className={location.pathname === "/paasHardware" ? "active" : ""}
              >
                {formatMessage(tabs.pasS_title)}
              </Link>
              <Link
                to={"/sysRelation"}
                className={location.pathname === "/sysRelation" ? "active" : ""}
              >
                {formatMessage(tabs.sysRelation_title)}
              </Link>
              <a
                // href="http://61.141.223.167:1198"
                href="http://172.16.10.124:1198"
                target="_blank"
                rel="noopener noreferrer"
              >
                {formatMessage(tabs.backstage_title)}
              </a>
            </nav>
          </div>
        </header>
        <Route
          exact
          path={`${match.url}platformCockpit`}
          component={platformCockpit}
        />

        <Route exact path={`${match.url}dataCenter`} component={dataCenter} />

        <Route
          exact
          path={`${match.url}topologyModel`}
          component={topologyModel}
        />

        <Route exact path={`${match.url}apiGateway`} component={apiGateway} />

        <Route
          exact
          path={`${match.url}paasHardware`}
          component={paasHardware}
        />

        <Route exact path={`${match.url}sysRelation`} component={sysRelation} />

        <Redirect
          path={`${match.url}`}
          to={{ pathname: `${match.url}platformCockpit` }}
        ></Redirect>
      </div>
    );
  }
}

const mapState2Props = ({ app: { loading } }: any) => ({
  loading
});
export default withStyles(styles)(
  connect(mapState2Props)(injectIntl(Overview))
)

