import React from "react";

import { withStyles } from "@material-ui/styles";
import { injectIntl, } from "react-intl";
import { connect } from "react-redux";
import { chineseSysName, englishSysName} from '../../../constants';
import moment from "moment";
import styles from "./style";
import title_line from "../../../resource/title_line.png";
import dashboard from "../../../resource/dashboard.png";
import pointer from "../../../resource/pointer.png";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
  View,
  Guide,
  Coord
} from "bizcharts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cockpit, common } from "../message";

export interface HomeProps {
  classes: any;
  match: any;
  intl: any;
  getSysList: any;
  getNetFlow: any;
  sysList: any;
  netFlowList: any;
  getApiCount: any;
  apiCountList: any;
  getresourceList: any;
  resourceList: any;
  iaasList: any;
  getIaasList: any;
  subitemList: any;
  getSubitemSystemList: any;
}

const Views: any = View;
const { Html, Arc }: any = Guide;

const settings = {
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1
};

const pcols = {
  value: {
    min: 0,
    max: 9,
    ticks: [],
    nice: false
  }
};
const pcols1 = {
  value: {
    min: 0,
    max: 9,
    ticks: [],
    nice: false
  }
};

class Home extends React.Component<HomeProps, any> {
  constructor(props: Readonly<HomeProps>) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const {
      getSysList,
      getNetFlow,
      getApiCount,
      getresourceList,
      getIaasList,
      getSubitemSystemList,
      intl
    } = this.props;
    const language = intl.locale === "zh" ? "chinese" : "english";
    getSysList();
    getNetFlow();
    getApiCount();
    getresourceList(language);
    getIaasList();
    getSubitemSystemList(language);
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const { classes, intl, subitemList} = this.props;
    const { formatMessage } = intl;

    const {
      sysList,
      netFlowList,
      apiCountList,
      resourceList,
      iaasList
    } = this.props;

    if (!iaasList || iaasList.length === 0) return <div />;
    const cpuRate = parseInt(iaasList.cpu.sacle);
    const memoryRate = parseInt(iaasList.memory.sacle);
    const sysname = intl.locale === 'zh' ? chineseSysName : englishSysName;
    resourceList.sort((a: any, b: any) => {
      a = a.systemName === sysname[8];
      b = b.systemName === sysname[8];
      return b - a;
    });
    return (
      <div className={classes.root}>
        <div className="main">
          <div className="zhibiao">
            <div className="content">
              <div className="head">
                <h4>{formatMessage(cockpit.systemMetrics)}</h4>
                <img src={title_line} alt="" />
              </div>
              <div className="item">
                <div>
                  <p>{formatMessage(cockpit.TotalServicesNum)}</p>
                  <p>{sysList.serviceNum}</p>
                </div>
                <div>
                  <p>{formatMessage(cockpit.TotalNumContainers)}</p>
                  <p>{sysList.containerNum}</p>
                </div>
                <div>
                  <p>{formatMessage(cockpit.subsystemsNum)}</p>
                  <p>{sysList.ruleNum}</p>
                </div>
                <div>
                  <p>{formatMessage(cockpit.onlineServersNum)}</p>
                  <p>{sysList.serverLine}</p>
                </div>
                <div>
                  <p>{formatMessage(cockpit.apiNum)}</p>
                  <p>{sysList.APINum}</p>
                </div>
                <div>
                  <p>{formatMessage(cockpit.apiCallsNum)}</p>
                  <p>{sysList.invokeNum}</p>
                </div>
                <div>
                  <p>{formatMessage(cockpit.successApiCallNum)}</p>
                  <p>{sysList.successNum}</p>
                </div>
                <div>
                  <p>{formatMessage(cockpit.failedApiCallNum)}</p>
                  <p>{sysList.failNum}</p>
                </div>
              </div>
              <div className="tip">*{formatMessage(cockpit.lastSevenDays)}</div>
            </div>
            <div className="content">
              <div className="head">
                <h4>{formatMessage(cockpit.iaasData)}</h4>
                <img src={title_line} alt="" />
              </div>
              <div className="item">
                <div className="dashboard">
                  <h4>
                    {formatMessage(cockpit.cpuUtilization)}:
                    <span>{parseFloat(iaasList.cpu.sacle).toFixed(2)}%</span>
                  </h4>
                  <img src={dashboard} alt="" />
                  <img
                    className="pointer"
                    src={pointer}
                    alt=""
                    style={{
                      transform: `rotate(${(cpuRate / 100) * 180 - 90}deg)`
                    }}
                  />
                  <div style={{ marginTop: "12px" }}>
                    <h4>
                      {formatMessage(cockpit.used)}:
                      <span>{parseFloat(iaasList.cpu.user).toFixed(1)}{formatMessage(cockpit.core)}</span>
                    </h4>
                    &nbsp;&nbsp;
                    <h4>
                      {formatMessage(cockpit.total)}:<span>{iaasList.cpu.total}{formatMessage(cockpit.core)}</span>
                    </h4>
                  </div>
                </div>
                <div className="dashboard">
                  <h4>
                    {formatMessage(cockpit.memoryUtilization)}:
                    <span>{parseFloat(iaasList.memory.sacle).toFixed(2)}%</span>
                  </h4>
                  <img src={dashboard} alt="" />
                  <img
                    className="pointer"
                    src={pointer}
                    alt=""
                    style={{
                      transform: `rotate(${(memoryRate / 100) * 180 - 90}deg)`
                    }}
                  />
                  <div style={{ marginTop: "12px" }}>
                    <h4>
                      {formatMessage(cockpit.used)}:
                      <span>
                        {(
                          iaasList.memory.user /
                          1024 /
                          1024 /
                          1024 /
                          1024
                        ).toFixed(1)}
                        T
                      </span>
                    </h4>
                    &nbsp;&nbsp;
                    <h4>
                      {formatMessage(cockpit.total)}:
                      <span>
                        {(
                          iaasList.memory.total /
                          1024 /
                          1024 /
                          1024 /
                          1024
                        ).toFixed(2)}
                        T
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="center">
            <img
              className="center_bg"
              src={require(intl.locale === "zh" ? "../../../resource/center_bg.png":"../../../resource/center_bg_en.png")}
              alt=""
            />
            <img
              className="beard_left"
              src={require("../../../resource/beard_left.png")}
              alt=""
            />
            <img
              className="beard_right"
              src={require("../../../resource/beard_right.png")}
              alt=""
            />
            <div className="center_left_list">
              {subitemList.length > 0 ? (
                subitemList.map((item: any, key: any) => {
                  return (
                    <p className="item" key={key}>
                      {item.systemName}
                    </p>
                  );
                })
              ) : null
              }
            </div>
          </div>
          <div className="char">
            <div className="content" ref="linechart">
              <div className="head">
                <h4>{formatMessage(cockpit.discUtilization)}</h4>
                <img src={title_line} alt="" />
              </div>
              <Chart
                width={window.innerWidth/6}
                height={window.innerWidth/9}
                padding="auto"
                data={netFlowList}
                forceFit
              >
                <Legend
                  position="top-right"
                  custom={true}
                  items={[
                    { value: formatMessage(cockpit.discUtilization), fill: "#00FFF8", marker: "square" }
                  ]}
                />
                <Axis
                  name="date"
                  label={{
                    textStyle: {
                      fill: "#9193BF"
                    },
                    formatter: val => moment(val).format("MM.DD")
                  }}
                />
                <Axis
                  name="scale"
                  grid={{
                    type: "line",
                    lineStyle: {
                      stroke: "#3B437D",
                      lineWidth: 1
                    }
                  }}
                  label={{
                    textStyle: {
                      fill: "#9193BF",
                      fontSize: "12"
                    },
                    formatter: val => `${val}%`
                  }}
                />
                <Tooltip
                  crosshairs={{
                    type: "y"
                  }}
                  g2-tooltip={{
                    backgroundColor: "#000B49",
                    opacity: 0.8,
                    boxShadow: "0px 9px 33px 0px rgba(32,31,67,0.06)",
                    borderRadius: "3px",
                    border: "1px solid rgba(62,116,255,1)",
                    color: "#B9BBDD"
                  }}
                />
                <Geom
                  type="line"
                  position="date*scale"
                  size={2}
                  color="#00FFF8"
                  tooltip={[
                    "date*scale",
                    (date, scale) => {
                      return {
                        name: formatMessage(cockpit.discUtilization),
                        value: scale + "%"
                      };
                    }
                  ]}
                />
                <Geom
                  type="area"
                  position="date*scale"
                  color={"#00FFF8"}
                  opacity={0.2}
                  tooltip={false}
                />
              </Chart>
            </div>
            <div className="content">
              <div className="head">
                <h4>{formatMessage(cockpit.apiCallsAnalysic)}</h4>
                <img style={{ left: "150px" }} src={title_line} alt="" />
              </div>
              <Chart
                width={window.innerWidth/6}
                height={window.innerWidth/9}
                data={apiCountList}
                padding="auto"
                forceFit
              >
                <Axis
                  name="date"
                  label={{
                    textStyle: {
                      fill: "#9193BF",
                      fontSize: "12"
                    },
                    formatter: val => moment(val).format("MM.DD")
                  }}
                />
                <Axis
                  name="apiCount"
                  grid={{
                    type: "line",
                    lineStyle: {
                      stroke: "#3B437D",
                      lineWidth: 1
                    }
                  }}
                  label={{
                    offset: 20,
                    textStyle: {
                      fill: "#9193BF",
                      fontSize: "12"
                    },
                    formatter: val => `${val}${formatMessage(common.number)}`
                  }}
                />
                <Tooltip
                  crosshairs={{
                    type: "y"
                  }}
                  g2-tooltip={{
                    backgroundColor: "#000B49",
                    opacity: 0.8,
                    boxShadow: "0px 9px 33px 0px rgba(32,31,67,0.06)",
                    borderRadius: "3px",
                    border: "1px solid rgba(62,116,255,1)",
                    color: "#B9BBDD"
                  }}
                />
                <Geom
                  type="interval"
                  position="date*apiCount"
                  tooltip={[
                    "date*apiCount",
                    (date, apiCount) => {
                      return {
                        name: formatMessage(cockpit.apiCallsAnalysic),
                        value: apiCount
                      };
                    }
                  ]}
                />
              </Chart>
            </div>
          </div>
        </div>
        <div className="mid">
          <div className="item">
            <span className="num">{sysList.nodeNum}</span>
            <span className="name">{formatMessage(cockpit.node)}</span>
          </div>
          <div className="item">
            <span className="num">{sysList.partition}</span>
            <span className="name">{formatMessage(cockpit.partition)}</span>
          </div>
          <div className="item_img">
            <img
              className="img_left"
              src={require("../../../resource/left_line.png")}
              alt=""
            />
          </div>
          <div className="item_img">
            <img
              className="img_right"
              src={require("../../../resource/right_line.png")}
              alt=""
            />
          </div>
          <div className="item">
            <span className="num">{sysList.serviceNum}</span>
            <span className="name">{formatMessage(cockpit.service)}</span>
          </div>
          <div className="item">
            <span className="num">{sysList.pods}</span>
            <span className="name">Pods</span>
          </div>
        </div>
        <div className="footer">
          <div className="platform">
            <Slider {...settings}>
              {resourceList.map((item: any, index: any) => {
                return (
                  <div key={index}>
                    <div className="item">
                      <p className='sysName'>{item.systemName} ({item.shortName})</p>
                      <div className="flex">
                        <div className="left">
                          <p>
                            {formatMessage(cockpit.Uptime)}：{item.time}
                          </p>
                          <p>
                            {formatMessage(cockpit.restartsNum)}：{item.restart}
                          </p>
                          <p>
                            {formatMessage(cockpit.containersNum)}：
                          {item.container}
                          </p>
                        </div>
                        <div className="right">
                          <p>{formatMessage(cockpit.discUtilization)}</p>
                          <div
                            style={{
                              width: "100px",
                              height: "100px",
                              marginTop: "-10px"
                            }}
                          >
                            <Chart height={100} padding="auto" forceFit>
                              <Views scale={pcols}>
                                <Coord
                                  type="polar"
                                  startAngle={(-9 / 7) * Math.PI}
                                  endAngle={(2 / 7) * Math.PI}
                                  radius={0.75}
                                />
                                <Guide>
                                  <Arc
                                    zIndex={0}
                                    start={[0, 0.965]}
                                    end={[9, 0.965]}
                                    style={{
                                      // 底灰色
                                      stroke: "#32F0FF",
                                      lineWidth: 5,
                                      opacity: 1
                                    }}
                                  />
                                  <Arc
                                    zIndex={1}
                                    start={[0, 0.965]}
                                    end={[`${item.fileRate / 10}`, 0.965]}
                                    style={{
                                      // 底灰色
                                      stroke: "#FC8D52",
                                      lineWidth: 5
                                    }}
                                  />
                                  <Html
                                    position={["50%", "95%"]}
                                    html={() => `<div style="width: 300px;text-align: center;font-size: 12px!important;margin-top:-12px;">
                    <p style="color: #fff;margin: 0;">${parseFloat(
                                      item.fileRate
                                    ).toFixed(2)}%</p>
                </div>`}
                                  />
                                </Guide>
                                <Geom
                                  type="area"
                                  position="value*1"
                                  opacity="0"
                                />
                              </Views>
                              <Views scale={pcols1} padding={[28, 5, 22, 5]}>
                                {/* 外部阴影 */}
                                <Coord
                                  type="polar"
                                  startAngle={(-9 / 7) * Math.PI}
                                  endAngle={(2 / 7) * Math.PI}
                                  radius={0.95}
                                />
                                <Guide>
                                  <Arc
                                    zIndex={0}
                                    start={[0, 0.965]}
                                    end={[9, 0.965]}
                                    style={{
                                      stroke: "#fff",
                                      lineWidth: 20,
                                      opacity: 0.2
                                    }}
                                  />
                                </Guide>
                                <Geom
                                  type="area"
                                  position="value*1"
                                  opacity="0"
                                />
                              </Views>
                            </Chart>
                          </div>
                          <div className="wrap">
                            <div>
                              <h3>{formatMessage(cockpit.used)}</h3>
                              <h4>
                                {(
                                  item.fileUser /
                                  1024 /
                                  1024 /
                                  1024 /
                                  1024
                                ).toFixed(2)}
                                TB
                            </h4>
                            </div>
                            <div>
                              <h3>{formatMessage(cockpit.total)}</h3>
                              <h4>
                                {(
                                  item.fileTatol /
                                  1024 /
                                  1024 /
                                  1024 /
                                  1024
                                ).toFixed(2)}
                                TB
                            </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapState2Props = ({
  cockpit: { sysList, netFlowList, apiCountList, resourceList, iaasList, subitemList}
}: any) => ({
  sysList,
  netFlowList,
  apiCountList,
  resourceList,
  iaasList,
  subitemList
});

const mapDispatch2Props = ({
  cockpit: { getSysList, getNetFlow, getApiCount, getresourceList, getIaasList, getSubitemSystemList}
}: any) => ({
  getSysList,
  getNetFlow,
  getApiCount,
  getresourceList,
  getIaasList,
  getSubitemSystemList
});

export default withStyles(styles)(
  connect(mapState2Props, mapDispatch2Props)(injectIntl(Home))
);
