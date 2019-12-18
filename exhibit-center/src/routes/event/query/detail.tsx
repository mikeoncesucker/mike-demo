import React from "react";
import { withStyles } from "@material-ui/styles";
import videojs from "video.js";
import "video.js/dist/video-js.min.css";
import videozhCN from 'video.js/dist/lang/zh-CN.json'
import { connect } from "react-redux";
import Table from "../../../compontents/column_table";
import { message, Tooltip, Steps } from "antd";
import { FormattedMessage } from "react-intl";
export interface EventDetail {
  classes: any;
  location: any;
  locale: any;
  eventLevelList: any;
  eventStatusList: any;
  eventTypeList: any;
  appCodeList: any;
  detail: any;
  setDetail: Function;
  queryDetail: Function;
  getAppCodeList: Function;
  getEventLevelList: Function;
  getEventTypeList: Function;
  getEventStatusList: Function;
}
const styles: any = (theme: any) => {
  return {
    col: {
      maxWidth: 600,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      cursor: "pointer",
      WebkitLineClamp: 3,
      display: "inherit"
    },
    root: {
      margin: "20px",
      padding: "26px 20px",
      background: "#fff"
    },
    title: {
      fontSize: "20px",
      color: "#33353D"
    },
    tabelList: {
      "& table": {
        "& td": {
          minWidth: "120px",
          maxWidth: "300px"
        }
      }
    },
    popup_content: {
      position: "fixed",
      top: 0,
      width: "100vw",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      color: "#33353D",
      zIndex: 90,
      "& .fix_popup": {
        position: "absolute",
        background: "#fff",
        width: "660px",
        height: "680px",
        left: "50%",
        top: "50%",
        borderRadius: "4px",
        transform: "translate(-50%,-50%)",
        padding: "24px"
      },
      "& .head": {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "16px",
        "span:last-child": {
          fontSize: "14px",
          color: "#08ABF8",
          cursor: "pointer"
        }
      },
      "& .content": {
        height: "calc(100% - 40px)",
        margin: "14px 0",
        overflowY: "auto",
        fontSize: "14px",
        "& img": {
          marginBottom: "10px"
        },
        "& .videos": {
          width: "592px",
          overflow: "hidden",
          "& .videocter": {
            width: "592px",
            height: "271px",
            marginBottom: "10px",
            "& .vjs-paused": {
              "& .vjs-big-play-button": {
                display: "block"
              }
            }
          }
        }
      }
    },
    stepList: {
      "& .ant-steps-item": {
        flex: "0 0 20%"
      },
      "& .noexist": {
        "& .ant-steps-item-content": {
          "& .ant-steps-item-title": {
            color: "#999BA1 !important",
            fontWeight: "normal"
          }
        }
      }
    },

    stepStatu: {
      "& span": {
        width: "8px",
        height: "8px",
        display: "inline-block",
        marginRight: "5px",
        borderRadius: "50%",
        backgroundColor: "red"
      }
    }
  };
};

const { Step } = Steps;

class Detail extends React.Component<EventDetail, any> {
  constructor(props: Readonly<EventDetail>) {
    super(props);
    this.state = {
      expoName: "",
      detail_popup: false
    };
  }
  getId = (props: any) => {
    return props.match.params.id;
  };
  componentDidMount() {
    this.getData(this.getId(this.props));
    this.props.getEventLevelList();
    this.props.getEventStatusList();
    this.props.getAppCodeList();
    this.props.getEventTypeList();
  }
  componentWillReceiveProps(props: any) {
    const oldId = this.getId(this.props);
    const id = this.getId(props);
    if (oldId !== id) {
      this.getData(id);
    }
  }
  getData = async (id: string | number) => {
    const { locale } = this.props;
    if (id) {
      this.props.queryDetail({ params: { id, detailLevel: 1 } });
    } else {
      message.config({
        maxCount: 1
      });
      message.error(
        locale === "zh" ? "获取数据失败" : "Failure to obtain data"
      );
    }
  };
  componentDidUpdate() {
    if (this.props.detail.videos) {
      var videos: any = document.getElementsByTagName("video");
      for (let i = 0; i < videos.length; i++) {
        videojs.addLanguage('zh-CN', videozhCN)
        videojs("myVideo" + i);
      }
    }
  };
  
  play = (index: any) => {
    var videos: any = document.getElementsByTagName('video');
    for (let i = 0; i < videos.length; i++) {
      if (index !== i) videos[i].pause()
    };
  };
  
  componentWillUnmount() {
    this.props.setDetail({});
  }
 
  render() {
    const {
      classes,
      detail,
      eventLevelList,
      eventStatusList,
      eventTypeList,
      appCodeList,
      locale
    } = this.props;
    
    const levelItem = eventLevelList.find((item: any) => item.code === detail.level) || {};
    const statusItem = eventStatusList.find((item: any) => item.code === detail.status) || {};
    const typeItem = eventTypeList.find((item: any) => item.name === detail.typeName) || {};
    const appCodeItem = appCodeList.find((item: any) => item.name === detail.appName) || {};
    const test = detail.forwardLog;
    const imageList = JSON.parse(detail.images || "[]") || [];
    const videoList = JSON.parse(detail.videos || "[]") || [];
    const { detail_popup } = this.state;
    //处理进度条

    const status =
      eventStatusList.find((item: any) => item.code === detail.status) || {};
    const steps: any = detail.list || [];
    const linkList =
      (status.code !== 5
        ? eventStatusList.length &&
        eventStatusList.slice(0, 5).map((item: any, key: any) => {
          const current: any = steps.find(
            (items: any) => item.code === items.currStatus
          );
          const date = new Date(
            +new Date(new Date(current && current.logTime).toJSON()) +
            8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          return {
            status:
              locale === "zh" ? item.label + "环节" : item.english,
            logTime: current ? date : null,
            overtime: current ? current.overtime : null
          };
        })
        : eventStatusList.length &&
        steps.map((item: any, key: any) => {
          const date = new Date(
            +new Date(new Date(steps[key].logTime).toJSON()) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          return {
            status:
              locale === "zh"
                ? eventStatusList[item.currStatus].label + "环节"
                : eventStatusList[item.currStatus].english,
            logTime: date,
            overtime: item.overtime
          };
        })) || [];

    const newData: any = [];
    if (test) {
      test.map((item: any, index: any) => {
        newData.push({
          fwResult: item.fwResult,
          targets: item.targets,
          fwType: item.fwType,
          fwTime: item.fwTime
        });
        return undefined;
      });
    }
    const media = window.screen.width
    const column: any = [
      [
        {
          name: (
            <FormattedMessage id="event.eventID" defaultMessage="Event ID" />
          ),
          value: <Tooltip
              placement="topLeft"
              trigger="click"
              title={detail.traceId}
            >
              <span className={`${classes.col}`} style={{ maxWidth: media <= 1280? '165px' : '210px' }}>
                {detail.traceId}
              </span>
            </Tooltip>
        },
        {
          name: (
            <FormattedMessage
              id="event.sourceSystem"
              defaultMessage="Source System"
            />
          ),
          value: locale === "zh" ? appCodeItem.name : appCodeItem.english || "111"
        },
        {
          name: (
            <FormattedMessage
              id="event.eventType"
              defaultMessage="Event Type"
            />
          ),
          value: locale === "zh" ? typeItem.name : typeItem.english || "111"
        }
      ],
      [
        {
          name: (
            <FormattedMessage
              id="event.eventLevel"
              defaultMessage="Event Level"
            />
          ),
          value: (
            <div className="circle">
              <span style={{ background: levelItem.color }}></span>
              {locale === "zh" ? levelItem.label : levelItem.english}
            </div>
          )
        },
        {
          name: (
            <FormattedMessage
              id="event.eventTitle"
              defaultMessage="Event Title"
            />
          ),
          value: detail.title
        },
        {
          name: (
            <FormattedMessage
              id="event.pushStatu"
              defaultMessage="Push Status (SMS)"
            />
          ),
          value: newData.map((item: any, key: any) => {
            if (item.fwType === 0) {
              return item.fwResult === "SUCCESS" ? (
                <div className="circle" key={key}>
                  <span style={{ background: "rgb(2, 181, 131)" }}></span>
                  {locale === "zh" ? "成功" : "SUCCESS"}
                </div>
              ) : (
                  <div className="circle" key={key}>
                    <span style={{ background: "red" }}></span>
                    {locale === "zh" ? "失败" : "FAIL"}
                  </div>
                );
            }
            return undefined;
          })
        }
      ],
      [
        {
          name: (
            <FormattedMessage id="event.occurrenceTime" defaultMessage="Occurrence Time" />
          ),
          value: detail.occurTime
        },
        {
          name: (
            <FormattedMessage
              id="event.receivingTime"
              defaultMessage="Receiving Time"
            />
          ),
          value: detail.logTime || ""
        },
        {
          name: (
            <FormattedMessage
              id="event.pushStatuPortal"
              defaultMessage="Push Status (Portal)"
            />
          ),
          value: newData.map((item: any, key: any) => {
            if (item.fwType === 1) {
              return item.fwResult === "SUCCESS" ? (
                <div className="circle" key={key}>
                  <span style={{ background: "rgb(2, 181, 131)" }}></span>
                  {locale === "zh" ? "成功" : "SUCCESS"}
                </div>
              ) : (
                  <div className="circle" key={key}>
                    <span style={{ background: "red" }}></span>
                    {locale === "zh" ? "失败" : "FAIL"}
                  </div>
                );
            }
            return undefined;
          })
        }
      ],
      [
        {
          name: (
            <FormattedMessage
              id="event.eventHandlingStatus"
              defaultMessage="Timeout"
            />
          ),
          value:
            locale === "zh"
              ? detail.overtime === 1
                ? "是"
                : "否"
              : detail.overtime === 1
                ? "Yes"
                : "No",
          colSpan: ""
        },
        {
          name: (
            <FormattedMessage
              id="event.processingLink"
              defaultMessage="Processing Step"
            />
          ),
          value: (
            <div className="circle">
              <span style={{ background: statusItem.color }}></span>
              {locale === "zh" ? statusItem.label : statusItem.english}
            </div>
          ),
          colSpan: ""
        },
        {
          name: (
            <FormattedMessage
              id="event.pushTime"
              defaultMessage="Push Time"
            />
          ),
          value: newData.map((item: any, key: any) => {
            if (item.fwType === 1) {
              return item.fwTime;
            }
            return undefined;
          })
        }
      ],
      [
        {
          name: (
            <FormattedMessage
              id="event.notificationObject"
              defaultMessage="Notification Object"
            />
          ),
          value: newData.map((item: any) => item).length ? newData[0].targets : null,
          colSpan: "5"
        }
      ],
      [
        {
          name: (
            <FormattedMessage id="event.describe" defaultMessage="Description" />
          ),
          value: (
            <div>
              {detail.message}
              {detail.images && (
                <img src={require("../../../resource/logo/pic.png")} alt="" />
              )}
              {detail.videos && (
                <img src={require("../../../resource/logo/video.png")} alt="" />
              )}
              {(detail.images || detail.videos) && (
                <span
                  className={styles.popup}
                  style={{
                    color: "#08ABF8",
                    marginLeft: "10px",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    this.setState({
                      detail_popup: true
                    });
                  }}
                >
                  <FormattedMessage
                    id="evnet.viewDetails"
                    defaultMessage="View Details"
                  />{" "}
                  &#62;
                </span>
              )}
            </div>
          ),

          colSpan: "5"
        }
      ]
    ];
    const videoJsOptions = {
      autoplay: true,  //自动播放
      language: 'zh-CN', 
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      width: 500,  //宽
      height: 300,  //高
      // fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
      // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
      // textTrackDisplay: false,  // 不渲染字幕相关DOM
      userActions: {
        hotkeys: true  //是否支持热键
      },
      
  };
    return (
      <div>
        <div className={classes.root}>
          <h3 className={classes.title}>
            <FormattedMessage
              id="event.processingprogress"
              defaultMessage="Processing Progress"
            />
          </h3>
          <div className={classes.tabelList}>
            {steps.length ? (
              <Steps
                progressDot
                current={steps[steps.length - 1].currStatus}
                labelPlacement="vertical"
                className={classes.stepList}
              >
                {linkList.map((item: any, key: any) => {
                  return (
                    <Step
                      className={item.logTime ? "" : "noexist"}
                      title={item.status}
                      description={
                        item.logTime ? (
                          <div className={classes.stepStatu}>
                            <p>
                              {item.overtime === 0 ? (
                                <span style={{ background: "#02B583" }}></span>
                              ) : (
                                  <span style={{ background: "#FC5B5B" }}></span>
                                )}
                              {item.overtime === 0
                                ? locale === "zh"
                                  ? "正常处理"
                                  : "Success"
                                : locale === "zh"
                                  ? "超时处理"
                                  : "Fail"}
                            </p>
                            <p>{item.logTime}</p>
                          </div>
                        ) : null
                      }
                      key={key}
                    />
                  );
                })}
              </Steps>
            ) : null}
          </div>
        </div>
        <div className={classes.root}>
          <h3 className={classes.title}>
            <FormattedMessage
              id="order.basicInformation"
              defaultMessage="Basic information"
            />
          </h3>
          <div className={classes.tabelList}>
            <Table column={column} />
          </div>
        </div>
        {detail_popup ? (
          <div className={classes.popup_content}>
            <div className="fix_popup">
              <div className="head">
                <span>
                  <FormattedMessage
                    id="event.describeDetails"
                    defaultMessage="Description details"
                  />
                </span>
                <span
                  style={{ color: "#08ABF8", cursor: "pointer" }}
                  onClick={() => {
                    this.setState({
                      detail_popup: false
                    });
                  }}
                >
                  <FormattedMessage
                    id="event.closingSwitch"
                    defaultMessage="Close"
                  />
                </span>
              </div>
              <div className="content">
                <p>{detail.message}</p>
                {imageList.length
                  ? imageList.map((item: any, key: any) => {
                    return <img 
                    src={item}
                    alt=""  
                    width="592" 
                    height="271" 
                    key={key} 
                    style={{
                      display: 'block',
                      background: `url(${locale === 'zh' ?require('../../../resource/error/failed.pngZh.png'):require('../../../resource/error/failed.pngEn.png') }) center no-repeat`, 
                      backgroundSize: '500px 250px' 
                    }}
                  /> 
                  })
                  : null}
                <div className="videos">
                  {videoList.length
                    ? videoList.map((item: any, key: any) => {
                      return (
                        <div className="videocter" key={key}>
                          <video
                            id={"myVideo" + key}
                            className="video-js vjs-big-play-centered"
                            controls
                            preload="auto"
                            data-setup="{}"
                            style={{
                              width: "100%",
                              height: "100%"
                            }}
                            poster={item.images}
                            onPlay={this.play.bind(this, key)}
                            // lang="videozhCN"
                            { ...videoJsOptions }
                          >
                            <source src={item.url}></source>
                          </video>
                        </div>
                      );
                    })
                    : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapState2Props = ({
  event: {
    detail,
    eventLevelList,
    eventStatusList,
    eventTypeList,
    appCodeList
  },
  intl: { locale }
}: any) => ({
  detail,
  eventLevelList,
  eventStatusList,
  eventTypeList,
  appCodeList,
  locale
});
const mapDispatch2Props = ({
  event: { 
    queryDetail, 
    getEventLevelList,
    getEventTypeList,
    getAppCodeList, 
    getEventStatusList, 
    setDetail 
  }
}: any) => ({
  queryDetail,
  getAppCodeList,
  getEventLevelList,
  getEventTypeList,
  getEventStatusList,
  setDetail
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Detail)
);
