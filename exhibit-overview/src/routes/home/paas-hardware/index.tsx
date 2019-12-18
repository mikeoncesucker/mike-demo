import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import { chineseSysName, englishSysName} from '../../../constants';
import title_line from "../../../resource/title_line.png";
import LoopCharts from "./loop-chart";
import HistogramCharts from "./histogram-charts";
import TabPaneContent from "./tabPaneContent";
import SystemChart from "./system-chart";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tabs } from "antd";
import { cockpit, paasHardware } from "../message";

const { TabPane } = Tabs;

export interface HomeProps {
  classes: any;
  match: any;
  intl: any;
  resourceList: any;
  getresourceList: any;
  getRestartNum: any;
  restartNumList: any;
  getServerRate: any;
  serverList: any;
  resourceUseList: any;
  getResourceUseRate: any;
  nodeList: any;
  getNodeByAll: any;
}

const settings = {
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1
};

const styles: any = (theme: any) => ({
  root: {
    width: "100%",
    "& .ant-tabs .ant-tabs-nav-container": {
      marginLeft: "35%",
      left: "0 !important"
    },
    "& .ant-tabs-nav-wrap": {
      width: "400px",
      margin: "0 auto"
    },
    "& .ant-tabs-tab-next": {
      background: `url(${require("../../../resource/tab_right.png")}) center center no-repeat`
    },
    "& .ant-tabs-tab-prev": {
      background: `url(${require("../../../resource/tab_left.png")}) center center no-repeat`
    },
    "& .ant-tabs-tab-prev-icon-target, & .ant-tabs-tab-next-icon-target": {
      fontSize: "0 !important"
    },
    "& h2, & h3, & h4": {
      marginTop: 0,
      marginBottom: 0,
      color: "#fff"
    },
    "& p": {
      marginBottom: 0
    },
    "& .slick-slider": {
      width: "92%",
      margin: "0 auto"
    },
    "& .slick-list": {
      height: "160px"
    },
    "& .slick-slide>div": {
      margin: "0 10px"
    },
    "& .slick-prev": {
      background: `url(${require("../../../resource/arrow_left.png")}) no-repeat`,
      backgroundSize: "contain",
      left: "-35px"
    },
    "& .slick-next": {
      background: `url(${require("../../../resource/arrow_right.png")}) no-repeat`,
      backgroundSize: "contain",
      right: "-35px"
    },
    "& .slick-prev, & .slick-next": {
      top: "50%"
    },
    "& .slick-prev:before,& .slick-next:before": {
      content: " ",
      display: "none"
    },
    "& .slick-prev:hover,& .slick-prev:focus": {
      background: `url(${require("../../../resource/arrow_left.png")}) no-repeat`,
      backgroundSize: "contain"
    },
    "& .slick-next:hover,& .slick-next:focus": {
      background: `url(${require("../../../resource/arrow_right.png")}) no-repeat`,
      backgroundSize: "contain"
    },
    "& .main": {
      display: "flex",
      height: "637px",
      margin: "16px 32px 0",
      color: "#fff",
      fontSize: "18px",
      "& .resources": {
        width: "64.38%",
        height: "612px",
        border: "1px solid #3E74FF",
        borderRadius: "4px",
        overflow: 'hidden',
        "& .resHead": {
          width: "100%",
          height: "53px",
          background:
            "linear-gradient(270deg,rgba(0,16,145,0) 0%,rgba(0,16,145,0.6) 100%)",
          backgroundSize: "100%",
          position: "relative",
          "& > h4": {
            position: "absolute",
            lineHeight: "53px",
            left: "24px",
            color: "#0078FF",
            fontSize: "18px"
          },
          "& > img": {
            height: "12px",
            position: "absolute",
            top: "20px",
            left: "19%"
          },
          "& .resContent": {
            display: "flex",
            justifyContent: "center"
          },
          "& .lineChart": {
            height: "192px",
            marginBottom: "82px",
            width: "50%",
            textAlign: "center",
            position: "relative",
            "& >h4": {
              position: "absolute",
              top: "10px",
              left: "40%"
            }
          }
        }
      }
    },
    "& .center": {
      width: "36%",
      "& img": {
        width: "195%",
        marginLeft: "-214px"
      }
    },
    "& .char": {
      width: "34%",
      marginLeft: "16px",
      "& .border>div": {
        position: "absolute",
        width: "15px",
        height: "15px",
        zIndex: 1
      },
      "& .border1": {
        top: "-1px",
        left: "-1px",
        borderLeft: "2px solid #14A5FB",
        borderTop: "2px solid #14A5FB"
      },
      "& .border2": {
        top: "-1px",
        right: "-1px",
        borderRight: "2px solid #14A5FB",
        borderTop: "2px solid #14A5FB"
      },
      "& .border3": {
        bottom: "-1px",
        left: "-1px",
        borderLeft: "2px solid #14A5FB",
        borderBottom: "2px solid #14A5FB"
      },
      "& .border4": {
        bottom: "-1px",
        right: "-1px",
        borderRight: "2px solid #14A5FB",
        borderBottom: "2px solid #14A5FB"
      },
      "&  .service": {
        width: "100%",
        height: "314px",
        position: "relative",
        textAlign: "center",
        background:
          "linear-gradient(227deg,rgba(4,10,255,0) 0%,rgba(4,10,255,0.54) 48%,rgba(4,10,255,0) 100%);",
        backgroundSize: "100%",
        border: "1px solid #3E74FF"
      },
      "& .call": {
        position: "relative",
        marginTop: "16px",
        height: "281px",
        textAlign: "center",
        background:
          "linear-gradient(227deg,rgba(4,10,255,0) 0%,rgba(4,10,255,0.54) 48%,rgba(4,10,255,0) 100%);",
        border: "1px solid #3E74FF"
      },
      "& .head": {
        display: "flex",
        alignItems: "center",
        height: "50px",
        background:
          "linear-gradient(227deg,rgba(4,10,255,0) 0%,rgba(4,10,255,0.54) 48%,rgba(4,10,255,0) 100%);",
        "& > h4": {
          color: "#0078FF",
          fontSize: "15px",
          marginLeft: "24px",
          "& > span": {
            fontSize: "10px",
            color: "#9193BF"
          }
        },
        "& > img": {
          height: "12px",
          margin: '5px 0 0 12px'
        }
      }
    },
    "& .nav": {
      marginTop: ".4rem",
      padding: '0 0 .24rem',
      background:'rgba(0,16,145,0.3)',
      border: '1px solid rgba(28,50,105,1)',
      borderRadius: '20px',
      color: "#D6E5FB",
      "& .navHead": {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        margin: '.18rem 0',
        "& >img": {
          height: ".1rem",
        },
        "& p": {
          fontSize: ".24rem",
          fontFamily: "PingFangSC-Semibold,PingFangSC",
          color: "#32F0FF",
          letterSpacing: "9.6px",
          margin: "0 .28rem 0 .37rem",
          textShadow: "1px 1px 6px rgba(3,144,192,0.33)",
        },
        "& .left": {
          float: "left",
          fontSize: "12px",
          marginTop: "20px",
          textAlign: "left",
          "& p": {
            marginTop: "12px"
          }
        }
      },
      "& .platform": {
        "& .slick-list": {
          height: '2.84rem',
          "& .item": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "linear-gradient(223deg,rgba(4,10,255,0) 0%,rgba(4,10,255,1) 48%,rgba(4,10,255,0) 100%)",
            borderRadius: " .05rem",
            border: "1px solid #3E74FF",
            height: "2.84rem",
            padding: "0 .1rem",
            fontSize: ".12rem",
            "& > p": {
              fontWeight: 500,
            },
            "& .sysName": {
              fontSize: '.2rem'
            },
            "& .left": {
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              padding: '10px 0',
              fontSize: "12px",
            },
            "& .right": {
              marginTop: "10px",
              "& .rgtContent": {
                width: "100px",
                height: "90px",
                marginTop: "-10px"
              },
              "& > p": {
                marginTop: "10px",
                color: "#afafaf",
                textAlign: "center"
              },
              "& .wrap,& h3": {
                fontSize: "10px",
                color: "#afafaf"
              },
              "& h4": {
                color: "#fff",
                marginTop: "5px"
              },
              "& .wrap": {
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                textAlign: "center"
              }
            }
          }
        }
      },
      "& .flex": {
        display: "flex",
        justifyContent: "space-between",
      }
    },
    "& .ant-tabs": {
      "& .ant-tabs-bar": {
        height: "53px",
        border: "none"
      },
      "& .ant-tabs-nav-container": {
        left: "35%"
      },
      "& .ant-tabs-ink-bar": {
        opacity: 0
      },
      "& .ant-tabs-nav .ant-tabs-tab": {
        width: "134px",
        height: "53px",
        padding: 0,
        margin: 0,
        fontSize: "18px",
        color: "#0078FF",
        lineHeight: "53px",
        textAlign: "center"
      },
      "& .ant-tabs-nav .ant-tabs-tab:nth-child(odd)": {
        background: `url(${require("../../../resource/resUnBot.png")}) no-repeat`,
        backgroundSize: "100% 100%"
      },
      "& .ant-tabs-nav .ant-tabs-tab:nth-child(even)": {
        background: `url(${require("../../../resource/resUnTop.png")}) no-repeat`,
        backgroundSize: "100% 100%"
      },
      "& .ant-tabs-nav .ant-tabs-tab-active:nth-child(odd)": {
        background: `url(${require("../../../resource/resSelectBot.png")}) no-repeat`,
        backgroundSize: "100% 100%"
      },
      "& .ant-tabs-nav .ant-tabs-tab-active:nth-child(even)": {
        background: `url(${require("../../../resource/resSelectTop.png")}) no-repeat`,
        backgroundSize: "100% 100%"
      }
    }
  }
});

class Home extends React.Component<HomeProps, any> {
  constructor(props: Readonly<HomeProps>) {
    super(props);
    this.state = {
      tabIndex: 0,
      dataList: [],
      nodeDataList: [],
      mode: "top"
    };
  }

  borderRadius = () => {
    return (
      <div className="border">
        <div className="border1"></div>
        <div className="border2"></div>
        <div className="border3"></div>
        <div className="border4"></div>
      </div>
    );
  };

  changeTab = (activeKey: any) => {
    const nodeDataList = sessionStorage.getItem("nodeDataList");
    if (nodeDataList && JSON.parse(nodeDataList)[activeKey]) {
      this.setState({
        dataList: JSON.parse(nodeDataList)[activeKey]
      });
    } else {
      this.setState(
        {
          dataList: []
        },
        () => {
          this.getDataList(activeKey);
        }
      );
    }
  };

  componentWillMount() {
    const {
      getresourceList,
      getRestartNum,
      getServerRate,
      getNodeByAll,
      intl
    } = this.props;
    const language = intl.locale === "zh" ? "chinese" : "english";
    getresourceList(language);
    getRestartNum(language);
    getServerRate(language);
    getNodeByAll({
      cb: () => {
        this.getDataList(0);
      }
    });
  }

  getDataList = (index: any) => {
    const { getResourceUseRate, nodeList } = this.props;
    getResourceUseRate({
      system: nodeList[index].system,
      nodeIp: nodeList[index].address,
      cb: () => {
        const dataList = this.props.resourceUseList;
        let nodeDataList = this.state.nodeDataList;
        nodeDataList[index] = dataList;

        this.setState(
          {
            dataList,
            nodeDataList
          },
          () => {
            sessionStorage.setItem(
              "nodeDataList",
              JSON.stringify(nodeDataList)
            );
          }
        );
      }
    });
  };

  componentWillUnmount() {
    sessionStorage.removeItem("nodeDataList");
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const {
      classes,
      resourceList,
      restartNumList,
      serverList,
      nodeList,
      intl
    } = this.props;
    const { formatMessage } = intl;
    const { dataList } = this.state;

    if (nodeList.length === 0) {
      return <div />;
    }
    const sysname = intl.locale === 'zh' ? chineseSysName : englishSysName;
    resourceList.sort((a: any, b: any) => {
      a = a.systemName === sysname[8];
      b = b.systemName === sysname[8];
      return b - a;
    });
    return (
      <div className={classes.root}>
        <div className="nav">
          <div className="navHead">
            <img src={require("../../../resource/systemLeft.png")} alt=""/>
            <p>{formatMessage(paasHardware.systemResources)}</p>
            <img
              src={require("../../../resource/systemRight.png")}
              alt=""
            />
          </div>
          <div className="platform">
            <Slider {...settings}>
              {resourceList.map((item: any, index: any) => {
                return <SystemChart item={item} key={index}></SystemChart>;
              })}
            </Slider>
            <div className="arrowRight"></div>
          </div>
        </div>
        <div className="main">
          <div className="resources">
            <div className="resHead">
              <h4>{formatMessage(paasHardware.resourceOccupancyDetails)}</h4>
              {intl.locale === 'zh' && <img src={title_line} alt="" />}
              <Tabs
                defaultActiveKey="0"
                tabPosition={this.state.mode}
                onChange={this.changeTab}
              >
                {nodeList.map((item: any, i: any) => {
                  return (
                    <TabPane
                      tab={`${formatMessage(cockpit.node)}-${i + 1}`}
                      key={i}
                    >
                      <TabPaneContent
                        data={dataList}
                        ip={item.address}
                        key={i}
                      />
                    </TabPane>
                  );
                })}
              </Tabs>
            </div>
          </div>
          <div className="char">
            <div className="service">
              {this.borderRadius()}
              <div className="head">
                <h4>{formatMessage(paasHardware.runningServicesPercentage)}</h4>
                <img style={{ left: "178px" }} src={title_line} alt="" />
              </div>
              <LoopCharts data={serverList} intl={intl}></LoopCharts>
            </div>
            <div className="call">
              {this.borderRadius()}
              <div className="head">
                <h4>
                  {formatMessage(paasHardware.restartsAnalysisNum)}
                  <span>（{formatMessage(paasHardware.analysisToDate)}）</span>
                </h4>
                {intl.locale === 'zh' && <img src={title_line} alt="" />}
              </div>
              <div>
                <HistogramCharts data={restartNumList} intl={intl}></HistogramCharts>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState2Props = ({
  paasHardware: {
    resourceList,
    restartNumList,
    serverList,
    resourceUseList,
    nodeList
  }
}: any) => ({
  resourceList,
  restartNumList,
  serverList,
  resourceUseList,
  nodeList
});

const mapDispatch2Props = ({
  paasHardware: {
    getresourceList,
    getRestartNum,
    getServerRate,
    getResourceUseRate,
    getNodeByAll
  }
}: any) => ({
  getresourceList,
  getRestartNum,
  getServerRate,
  getResourceUseRate,
  getNodeByAll
});

export default withStyles(styles)(
  connect(mapState2Props, mapDispatch2Props)(injectIntl(Home))
);
