import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Radio, DatePicker, Icon, message } from 'antd';
import moment from "moment";
import LoopCharts from './loop_chart';
import MinLoopCharts from './minLoop_chart';
import Histogram from './histogram_chart';
import Custom from './custom_chart'
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
export interface EventAnalyze {
  classes: any;
  location: any;
  locale: any;
  dataByAppCode: any;
  dataByLevel: any;
  dataByType: any;
  analyseLoop: any;
  dataByStatus: any;
  analyzeData: any;
  analyseCustom: any;
  getAnalyseCustom: Function;
  getAnalyseLoop: Function;
  getEventLevelList: Function;
  getStatByAppCode: Function;
  getStatByLevel: Function;
  getStatByType: Function;
  getStatByStatus: Function;
  getAnalyzeData: Function;
}
const format = (str: any) => {
  const re = /(?=(?!(\b))(\d{3})+$)/g;
  return str.toString().replace(re, ",");
}

const styles: any = (theme: any) => ({
  dateTime: {
    "& span:nth-child(1)": {
      "& .ant-calendar-picker-input": {
        borderRadius: '0',
        borderLeft: 'none',
        borderRight: 'none'
      }
    },
    "& span:nth-child(2)": {
      "& .ant-calendar-picker-input": {
        borderLeft: 'none',
        borderRadius: '0 4px 4px 0'
      }
    }
  },
  left: {
    backgroundColor: "#ffffff",
    padding: "12px 24px",
    borderBottom: "1px solid #dddddd",
    margin: "20px 20px 0 20px",
    "& .ant-radio-button-wrapper:last-child": {
      borderRadius: '0'
    },
  },
  leftText: {
    display: "inline-block",
    marginLeft: "52px",
    marginRight: "10px"
  },
  root: {
    '& .panel-wrap': {
      overview: 'hidden',
      margin: '0 20px 20px 20px',
      padding: '20px',
      backgroundColor: '#ffffff',
      '& .title': {
        fontSize: '20px',
        marginBottom: '20px',
        '& .extra': {
          fontSize: '16px',
          fontWeight: 'normal',
          float: 'right'
        }
      },
      "& .arrowIcon": {
        width: "16px",
        height: "16px",
        margin: "4px"
      },
      "& .arrowUp": {
        color: '#FC5B5B',
        border: "1px solid #FC5B5B",
      },
      "& .arrowDown": {
        color: '#02B583',
        border: "1px solid #02B583",
      },
      '& .content': {
        '& .left.auto': {
          '& .ant-radio-button-wrapper:last-of-type': {
            borderRadius: 0,
            borderRight: 'none'
          },
          '& .ant-calendar-picker-input': {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }
        },
        '& .left div label': {
          width: '100px',
          textAlign: 'center',
          padding: '0 10px'
        },
        '& .item': {
          display: 'flex',
          whiteSpace: 'nowrap',
          alignItems: 'center',
          height: '30px',
          '& .ant-progress-outer': {
            width: "97%"
          },
          '& .label': {
            paddingRight: '20px',
          },
          '& .labelEng': {
            paddingRight: '20px',
            width: '120px'
          },
          '& .num': {
            paddingLeft: '10px',
            minWidth: '70px',
            textAlign: 'right'
          }
        }
      }
    },
    "& .polygonal-warp": {
      marginTop: "0"
    }
  },
  overview: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: "#FFFFFF",
    margin: "0 20px",
    height: '100px',
    "& >div": {
      display: 'flex',
      alignItems: 'center',
      height: '100px',
    },
    '& .item': {
      '& .label': {
        fontSize: '14px',
        color: '#5E616E',
        textAlign: 'center'
      },
      '& .value': {
        color: '#33353D',
        fontSize: '30px',
        padding: '0 50px',
        height: '40px',
      },
    },
    "& .item:not(:first-child) .value": {
      borderLeft: '1px solid #E9E9E9',
    }
  },
  loopCharts: {
    display: 'flex',
    '& .minLoops': {
      width: '60%',
      marginTop: 0,
      '&:first-of-type': {
        marginRight: '0'
      }
    }
  },
  link: {
    float: 'right',
    width: "11%"
  },
});
class User extends React.Component<EventAnalyze, any> {
  constructor(props: Readonly<EventAnalyze>) {
    super(props);
    this.state = {
      startTime: '',
      endTime: '',
      dateType: '',
      time: '',
      timeMarker: '',
      byLevel: 1,
      byType: 1,
      byStatus: 1,
      byOvertime: 1,
      byAppCode: 1,
      startValue: null,
      startValueTime: null,
      endValue: null,
      endOpen: false,
    };
  }

  async componentDidMount() {
    await
      this.props.getAnalyseCustom({
        params: {
          timeMarker: 1,
          startTime: '',
          endTime: '',
          typeId: '',
          byLevel: 1,
          byType: 1,
          byAppCode: 1,
          byStatus: 1,
          byOvertime: 1
        }
      })
    this.props.getAnalyseLoop({
      params: {
        timeMarker: 1,
        startTime: '',
        endTime: '',
        typeId: ''
      }
    });
  }

  searchChange = (e: any) => {
    const valueType = e.target.value
    const { endTime, typeId, byLevel, byAppCode, byStatus, byOvertime, byType } = this.state
    this.setState({ time: valueType })
    if (!(valueType === 'auto')) {
      this.props.getAnalyseCustom({
        params: {
          timeMarker: valueType,
          startTime: '',
          endTime,
          typeId,
          byLevel,
          byAppCode,
          byStatus,
          byOvertime,
          byType
        }
      })
      this.props.getAnalyseLoop({
        params: {
          timeMarker: valueType,
          startTime: '',
          endTime,
          typeId: ''
        }
      });
      this.setState({ time: e.target.value, startTime: '', endTime: '', dataSelect: false })
    } else {
      this.setState({
        dataSelect: true
      })
    }
    this.setState({ startValueTime: null, endValue: null })
  }

  //点击左边进度条，查询右边饼图数据
  proClick = (item: any) => {
    const { locale } = this.props;
    const typeId = item.code;
    const { startTime, endTime, time } = this.state;
    if (time === 'auto') {
      if (endTime && startTime) {
        this.props.getAnalyseLoop({
          params: {
            timeMarker: 4,
            startTime,
            endTime,
            typeId: typeId
          }
        });
      } else {
        message.error(locale === 'zh' ? '请选择开始或结束时间' : 'Please select a start or end time');
      }
    } else {
      this.props.getAnalyseLoop({
        params: {
          timeMarker: time === 'auto' ? 4 : (time === null ? 1 : time),
          startTime,
          endTime,
          typeId: typeId
        }
      });
    }
  }
  //跳转到查询高亮一起变化
  eventNav = () => {
    const { analyseCustom } = this.props;
    const totals = analyseCustom && analyseCustom.total;
    if (totals === 0) {
      sessionStorage.setItem("pageAddress", "1402")
    } else {
      sessionStorage.setItem("pageAddress", "1401")
    }
  };

  //时间选择30工作日
  disabledStartDate = (startValue: any) => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return startValue > moment()
    }
    // 开始时间不能大于当前时间且开始与结束时间最多相差三十天且结束时间
    return (
      moment(endValue).diff(moment(startValue), 'days') < 0 ||
      moment(endValue).diff(moment(startValue), 'days') >= 30
    )
  }

  disabledEndDate = (endValue: any) => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return endValue > moment()
    }
    // 结束时间不能大于当前时间且结束时间大于开始时间且最多相差三十天
    return (
      endValue <= startValue ||
      endValue > moment() ||
      moment(endValue).diff(moment(startValue), 'days') >= 30
    )
  }
  onChange = (field: any, value: any) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = (value: any, time: any) => {
    this.onChange('startValue', value);
    const { typeId, byLevel, byAppCode, byStatus, byOvertime, byType, endTime } = this.state
    this.setState({
      dateType: false,
      startTime: time,
      startValueTime: time,
    })
    if (endTime && time) {
      this.props.getAnalyseCustom({
        params: {
          timeMarker: 4,
          startTime: time,
          endTime,
          typeId,
          byLevel,
          byAppCode,
          byStatus,
          byOvertime,
          byType
        }
      })
      this.props.getAnalyseLoop({
        params: {
          timeMarker: 4,
          startTime: time,
          endTime,
          typeId: ''
        }
      })
    };
  };

  onEndChange = (value: any, time: any) => {
    this.onChange('endValue', value);
    const { locale } = this.props;
    const { typeId, byLevel, byAppCode, byStatus, byOvertime, byType, startValueTime } = this.state
    this.setState({ dateType: false, startTime: startValueTime, endTime: time, })
    if (!(startValueTime) && value) {
      message.error(locale === 'zh' ? '请先选择开始时间' : 'Please select a start time')
    }
    if (startValueTime && time) {
      this.props.getAnalyseCustom({
        params: {
          timeMarker: 4,
          startTime: startValueTime,
          endTime: time,
          typeId,
          byLevel,
          byAppCode,
          byStatus,
          byOvertime,
          byType
        }
      })
      this.props.getAnalyseLoop({
        params: {
          timeMarker: 4,
          startTime: startValueTime,
          endTime: time,
          typeId: ''
        }
      })
      this.setState({
        time: 'auto'
      })
    };
  };
  circleList = (list: any, locale: any) => {
    const name_zh = ['待确认环节', '待处置环节', '处置中环节', '已处置环节'];
    const name_en = ['Unidenti fied', 'Undispos ed', 'Dispos ing', 'Dispos ed'];
    return (
      list.map((item: any, key: number) => (
        <div className="content" style={{ width: "25%", height: "235px" }} key={key}>
          <MinLoopCharts
            dataLink={item}
            content={
              `<div style="color:#666;font-size:16px;text-align: center;width:70%;margin-left: -10%;">
                ${locale === 'zh' ? name_zh[key] : name_en[key]}
              </div>`
            }
          />
        </div>
      ))
    )
  };
  iconUp = () => {
    return (
      <Icon
        type="arrow-up"
        className="arrowIcon arrowUp"
      />
    )
  }
  iconDown = () => {
    return (
      <Icon
        type="arrow-down"
        className="arrowIcon arrowDown"
      />
    )
  }
  render() {
    const { time, startTime, endTime, dataSelect, } = this.state;
    const {
      classes,
      analyseCustom,
      analyseLoop,
      locale
    } = this.props;
    const loopData = analyseLoop.data;
    const dataList = analyseCustom.data;
    if (!loopData || !dataList) return <div></div>
    const successTotal = dataList.byStatus.find((item: any) => item.code === 4).total
    const totals = analyseCustom.total;
    const loopList = loopData ? loopData.map((item: any) => { return item }) : (dataList.byTypeId)
    const totalLoop = analyseLoop.total ? analyseLoop.total : totals
    const Time = time ? (time === 'auto' ? 4 : time) : 1
    const customStart = dataList.startTime;
    const customEnd = dataList.endTime;
    return (
      <div className={classes.root}>
        <div className={classes.left} style={{ display: 'flex' }}>
          <Radio.Group
            defaultValue={'1'}
            onChange={(e) => this.searchChange(e)
            }
            buttonStyle="solid"
          >
            <Radio.Button value="1">
              <FormattedMessage id="event.week" defaultMessage="Week" />
            </Radio.Button>
            <Radio.Button value="2">
              <FormattedMessage id="event.month" defaultMessage="Month" />
            </Radio.Button>
            <Radio.Button value="3">
              <FormattedMessage id="event.quarter" defaultMessage="Quarter" />
            </Radio.Button>
            {
              !dataSelect &&
              <Radio.Button
                style={{ width: 96, textAlign: "center", borderRadius: '0 4px 4px 0' }}
                value="auto"
              >
                <FormattedMessage id="order.customize" defaultMessage="Customize" />
              </Radio.Button>
            }
          </Radio.Group>
          {
            dataSelect && <div className={classes.dateTime}>
              <DatePicker
                disabledDate={this.disabledStartDate}
                format="YYYY-MM-DD"
                placeholder={locale === 'zh' ? "请选择开始日期" : 'Strat Time'}
                onChange={this.onStartChange}
                showToday={false}
                getCalendarContainer={(triggerNode): any => triggerNode.parentNode}
              />
              <DatePicker
                disabledDate={this.disabledEndDate}
                format="YYYY-MM-DD"
                placeholder={locale === 'zh' ? "请选择结束日期" : 'End Time'}
                onChange={this.onEndChange}
                showToday={false}
                getCalendarContainer={(triggerNode): any => triggerNode.parentNode}
              />
            </div>
          }
        </div>

        <div className={classes.overview}>
          <div className="left">
            <div className="item" onClick={this.eventNav.bind(this, ["1401"])}>
              <Link
                style={totals === 0 ? { cursor: 'auto' } : {}}
                to={{
                  pathname: totals
                    ? `/eventQuery`
                    : `/eventAnalyze`,
                  state: {
                    startTime: startTime ? startTime : customStart,
                    endTime: endTime ? endTime : customEnd,
                    time: Time,
                  }
                }}
              >
                <div className="label" >
                  <FormattedMessage id="event.totalNumberEvents" defaultMessage="Events" />
                </div>
                <div className="value">
                  {totals}
                </div>
              </Link>
            </div>
            <div className="item" >
              <div className="label">
                <FormattedMessage id="event.successfulHandling" defaultMessage="Success" />
              </div>
              <div className="value">{successTotal}</div>
            </div>
          </div>
          <div className="right">
            {
              dataList.byLevel.map((item: any, index: number) => {
                const indexLev = item.code
                const { startTime, endTime } = this.state
                return <Link
                  to={{
                    pathname: analyseCustom.total
                      ? `/eventQuery`
                      : `/eventAnalyze`,
                    state: {
                      index: indexLev,
                      startTime: startTime ? startTime : customStart,
                      endTime: endTime ? endTime : customEnd,
                      time: Time
                    }
                  }}
                  key={index}
                >
                  <div className="item" onClick={this.eventNav}>
                    <div className="label">
                      {locale === 'zh' ? item.label : item.english}
                      <FormattedMessage id="event.eventPCS" defaultMessage="Event (PCS)" />
                    </div>
                    <div className="value">{format(item.count)}</div>
                  </div>
                </Link>
              })
            }
          </div>
        </div>
        <div className="panel-wrap" style={{ display: "flex", height: "350px" }}>
          <div style={{ width: "50%" }}>
            <h3 className="title">
              <FormattedMessage id="event.eventTypeAnalysis" defaultMessage="Event Type Analysis" />
            </h3>
            <div className="content" >
              {dataList.byType.length !== 0 ?
                (dataList.byType.map((item: any, index: number) => {
                  let _style: any = {
                    backgroundColor: "#2f9fff",
                    width: item.percent.toString() + "%",
                    height: '100%',
                    borderRadius: '6px',
                  }
                  return (
                    <div key={index} className="item" onClick={this.proClick.bind(this, item)}>
                      <span className={locale === 'zh' ? "label" : "labelEng"}>
                        {locale === 'zh' ? item.label : item.english}
                      </span>
                      <div
                        style={{
                          width: '380px',
                          borderRadius: '6px',
                          height: '12px',
                          border: '1px solid #f4f4f4',
                          marginRight: '6px',
                          backgroundColor: '#EBECF0'
                        }}
                      >
                        <div style={_style}></div>
                      </div>
                      <span style={{ width: '60px', marginRight: '2px' }}>
                        {item.percent}%
                        </span>
                      <span className="num">
                        {item.count}<FormattedMessage id="event.piece" defaultMessage="(PCS)" />
                      </span>
                    </div>
                  )
                }))
                :
                (<p
                  style={
                    {
                      minHeight: "300px",
                      color: "red",
                      textAlign: "center",
                      marginTop: "20%"
                    }
                  }
                >
                  <FormattedMessage id="order.noData" defaultMessage="No data" />
                </p>)
              }
            </div>
          </div>
          <div style={{ marginLeft: "16px", width: "50%" }}>
            <h3 className="title" style={{ marginLeft: '10%' }}>
              <FormattedMessage id="event.eventLevelAnalysis" defaultMessage="Event Level Analysis" />
            </h3>
            <div className="content">
              <LoopCharts data={loopList}
                innerContent={
                  `<div>
                    <h1 style="color:#000000;font-size:24px;text-align:center;">${ totalLoop}</h1>
                    <div style="color:#666666;font-size:12px;text-align: center">${locale === 'zh' ? "事件总数" : "Event Tot"}</div>
                  </div>`
                }

                colorCallback={(label: string) => {
                  const item = loopData.find((item: any) => item.label === label);
                  return (item && item.color) || undefined;
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.loopCharts}>
          <div className="panel-wrap minLoops">
            <h3 className="title">
              <FormattedMessage id="event.processingEfficiency" defaultMessage="Processing Efficiency Diagram" />
            </h3>

            <div style={{ display: "flex" }}>
              {
                this.circleList(dataList.byStatus, locale)
              }
            </div>
          </div>
          <div className="panel-wrap" style={{ width: "35%" }}>
            <h3 className="title">
              <FormattedMessage id="event.eventSourceAnalysis" defaultMessage="Event Source Analysis" />
            </h3>
            <div className="content">
              <Custom data={dataList.byAppCode} labelEng={locale === 'zh' ? "label" : "english"} />
            </div>
          </div>
        </div>
        <div className="panel-wrap polygonal-warp">
          <h3 className="title">
            <FormattedMessage id="event.effectivenessAnalysis" defaultMessage="Effectiveness Analysis" />
          </h3>
          <div style={{ display: "flex" }}>
            <div className="content" style={{ width: "80%" }}>
              <div className="tooltip">
                <Histogram data={dataList.byOvertime} />
              </div>
            </div>
            <div className="histogram-right" style={{ marginLeft: "63px", marginTop: "5%" }}>
              <div style={{ marginBottom: "37px" }}>
                <h6>
                  <FormattedMessage id="event.numberEvents" defaultMessage="Number Of Events" />
                </h6>
                <h4 style={{ display: "inline-block" }}>{totals}</h4>
                <span>{locale === 'zh' ? '件' : 'PCS'}</span>
                <div>
                  <div>
                    <span>
                      <FormattedMessage id="event.YearOnYearGrowth" defaultMessage="Year-on-year Growth" />
                    </span>
                    {
                      dataList.byOvertime.toyearRate >= 0 ? this.iconUp() : this.iconDown()
                    }
                    <span>{dataList.byOvertime.toyearRate}%</span>
                  </div>
                  <div>
                    <span>
                      <FormattedMessage id="event.chainGrowth" defaultMessage="Month-on-month Growth" />
                    </span>
                    {
                      dataList.byOvertime.tomonthRate >= 0 ? this.iconUp() : this.iconDown()
                    }
                    <span>{dataList.byOvertime.tomonthRate}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h6>
                  <FormattedMessage id="event.overTime" defaultMessage="Success Percentage" />
                </h6>
                <h4>{dataList.byOvertime.totalRate}%</h4>
                <div>
                  <div>
                    <span>
                      <FormattedMessage id="event.YearOnYearGrowth" defaultMessage="Year-on-year Growth" />
                    </span>
                    {
                      dataList.byOvertime.percentToyearRate >= 0 ? this.iconUp() : this.iconDown()
                    }
                    <span>{dataList.byOvertime.percentToyearRate}%</span>
                  </div>
                  <div>
                    <span>
                      <FormattedMessage id="event.chainGrowth" defaultMessage="Month-on-month Growth" />
                    </span>
                    {
                      dataList.byOvertime.percentTomonthRate >= 0 ? this.iconUp() : this.iconDown()
                    }
                    <span>{dataList.byOvertime.percentTomonthRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState2Props = ({
  event: {
    analyseCustom,
    analyseLoop,
    dataByAppCode,
    dataByLevel,
    dataByType,
    dataByStatus,
    analyzeData
  },
  intl: {
    locale
  }
}: any) => ({
  analyseCustom,
  analyseLoop,
  dataByAppCode,
  dataByLevel,
  dataByType,
  dataByStatus,
  analyzeData,
  locale
});
const mapDispatch2Props = ({
  event: {
    getAnalyseCustom,
    getAnalyseLoop,
    getEventLevelList,
    getStatByAppCode,
    getStatByLevel,
    getStatByType,
    getStatByStatus,
    getAnalyzeData
  }
}: any) => ({
  getAnalyseCustom,
  getEventLevelList,
  getStatByAppCode,
  getStatByLevel,
  getStatByType,
  getStatByStatus,
  getAnalyzeData,
  getAnalyseLoop
});

export default withStyles(styles)(connect(mapState2Props, mapDispatch2Props)(User));