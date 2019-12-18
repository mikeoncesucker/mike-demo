import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Radio, Select, DatePicker } from 'antd';
import LoopCharts from './loop_chart';
import LineCharts from './line_chart';
import moment from 'moment';
import { FormattedMessage } from "react-intl";

export interface PayChart {
  classes: any;
  match: any;
  history: any;
  locale: any;
  chartData: any;
  PayMethod: any;
  statBySystem: any;
  eventTypeList: any;
  getData: Function;
  paymentAmounts: Function;
  getStatBySystem: Function;
  getPayMethod: Function;
}
const { RangePicker } = DatePicker;
const styles: any = (theme: any) => ({
  root: {
    '& .panel-wrap': {
      overflow: 'hidden',
      margin: '20px',
      padding: '20px',
      backgroundColor: '#ffffff',
      '& .title-bar': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      '& .title': {
        fontSize: '20px',
        color: '#33353D'
      },
      '& .right-search': {
        display: 'flex',
        alignItems: 'center',
        float: 'right'
      },
      '& .total-money': {
        color: '#5E616F',
        fontSize: '14px'
      },
      '& .content': {
        '& .item': {
          display: 'flex',
          whiteSpace: 'nowrap',
          alignItems: 'center',
          height: '30px',
          '& .label': {
            paddingRight: '20px',
          },
          '& .num': {
            paddingLeft: '20px',
          }
        },
        '& .clear-border': {
          '& .ant-radio-button-wrapper:last-of-type': {
            borderRadius: 0,
            borderRight: 'none'
          },
          '& .ant-calendar-picker-input': {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }
        }
      }
    }
  },
  loopCharts: {
    display: 'flex',
    '& .panel-wrap': {
      width: '50%',
      flex: '1',
      marginTop: 0,
      '&:first-of-type': {
        marginRight: '0'
      }
    }
  },
});

class User extends React.Component<PayChart, any> {
  constructor(props: PayChart) {
    super(props);
    this.state = {
      time: 'day',
      source: 'all',
      source1: 'all',
      startTime: undefined,
      endTime: undefined,
      rangeDateState: [],
      buttonWidth: 130,
    };
  }
  
  // 金额格式化
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  getData = () => {
    const { source, source1, time, startTime, endTime } = this.state;
    let params: any = {
      source: source === 'all' ? '' : source,
      source1: source1 === 'all' ? '' : source1,
      time
    }
    if ( time === 'auto' ) {
      if (!startTime || !endTime) {
        return;
      }
      params = {
        startTime: `${startTime}`,
        endTime: `${endTime}`,
        ...params,
        time: ''
      }
    }
    this.props.paymentAmounts({params});
  }
  componentDidMount() {
    this.getData();
    this.props.getStatBySystem();
    const { locale } = this.props;
    this.setState({
      buttonWidth : locale === "zh" ? 96 : 130,
    })
  }
  disabledDate = (current: any) => {
    return  current > moment();
  }

  searchChange = (e: any) => {
    const value =  e.target.value;
    const state: any = {time: value};
    if (value === 'auto') {
      state.startTime = undefined;
      state.endTime = undefined;
    }
    this.setState(state, () => this.getData());
  }
  render() {
    const { classes, chartData, statBySystem, locale} = this.props;
    const { time, source1, source, buttonWidth } = this.state;
    const typeChartsData = chartData[1];
    const moneyChartsData = chartData[2];
    const lineChartsData = (chartData[0]||[]).map((item: any) => ({...item, typy: '收入'}));
    const typeTotal = (typeChartsData || []).reduce((pre: any, item: any) => pre += item.bookValue, 0 );
    const moneyTotal = (moneyChartsData|| []).reduce((pre: any, item: any) => pre += item.bookValue, 0 );
    const auto = time !== 'auto';
  
    return (
      <div className={classes.root}>
        <div className="panel-wrap">
          <h3 className="title">
            <FormattedMessage id="pay.paymentTrendAnalysis" defaultMessage="Trend Analysis" />
          </h3>
          <div className="content">
            <div className={auto ? '' : 'clear-border'}>
              <Radio.Group 
                defaultValue={time} 
                onChange={this.searchChange} 
                buttonStyle="solid"
              >
                <Radio.Button 
                  style={{width: buttonWidth, textAlign: "center"}} 
                  value="day"
                >
                  <FormattedMessage id="order.day" defaultMessage="Yesterday" />
                </Radio.Button>
                <Radio.Button 
                  style={{width: buttonWidth, textAlign: "center"}} 
                  value="week"
                >
                  <FormattedMessage id="order.week" defaultMessage="Last 7 days" />
                </Radio.Button>
                <Radio.Button 
                  style={{width: buttonWidth, textAlign: "center"}} 
                  value="month"
                >
                  <FormattedMessage id="order.month" defaultMessage="Last 30 days" />
                </Radio.Button>
                {
                  auto &&
                  <Radio.Button 
                    style={{width: buttonWidth, textAlign: "center"}} 
                    value="auto"
                  >
                    <FormattedMessage id="order.customize" defaultMessage="Customize" />
                  </Radio.Button>
                }
              </Radio.Group>
              {
                  !auto &&
                  <RangePicker
                    disabledDate={this.disabledDate}
                    showTime={{ format: "HH:mm:ss" }}
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={(date, dateString) => {
                      this.setState({
                        startTime: dateString[0],
                        endTime: dateString[1],
                      })
                    }}
                    onOk={this.getData}
                  />
                }
                <div className="right-search">
                 <span className={classes.navSpan}>
                   <FormattedMessage id="pay.source" defaultMessage="Source" />：
                  </span>
                <Select
                  value={source}
                  style={locale === 'zh'?{width: 190}:{width: 120}}
                  className={classes.link} 
                  defaultValue={source}
                  getPopupContainer={triggerNode => triggerNode}
                  onChange={(value: any)=>this.setState({source: value},() => this.getData())} 
                  >
                <Select.Option value="all" >
                  <FormattedMessage id="pay.allSystems" defaultMessage="All Systems" />
                </Select.Option>
                  {
                    statBySystem.map((item: any, index: number) => {
                      return <Select.Option key={index} value={item.english} >
                          {locale === 'zh'? item.label : item.english}
                        </Select.Option>
                    })
                  }
              </Select>
              </div>
            </div>
            <div>
              <LineCharts
                type = {time}
                data = {lineChartsData}
              />
            </div>  
          </div>
        </div>
        <div className={classes.loopCharts}>
          <div className="panel-wrap">
            <div className="title-bar">
              <h3 className="title">
                <FormattedMessage id="pay.paymentMethodAnalysis" defaultMessage="Payment Methods Analysis" />
              </h3>
              <div className="right-search">
                <span>
                  <FormattedMessage id="pay.source" defaultMessage="Source" />：
                </span>
                <Select
                value={source1}
                style={locale === 'zh'?{width: 190}:{width: 120}}
                className={classes.link} 
                defaultValue={source1}
                getPopupContainer={triggerNode => triggerNode}
                onChange={(value: any)=>this.setState({source1: value},() => this.getData())} 
                >
                <Select.Option value="all" >
                  <FormattedMessage id="pay.allSystems" defaultMessage="All Systems" />
                </Select.Option>
                    {
                      statBySystem.map((item: any, index: number) => {
                        return <Select.Option key={index} value={item.english} >
                            {locale === 'zh'? item.label : item.english}
                          </Select.Option>
                      })
                    }
                </Select>
              </div>
            </div>
            <div className="total-money">
              <FormattedMessage id="pay.totalAmount" defaultMessage="Total Amount(yuan)" /> ：
              {this.formatNum(typeTotal.toFixed(2))}
            </div>
            <div className="content">
              <LoopCharts data={typeChartsData} label={locale === 'zh'?"label" :"english"} value="percent" />
            </div>
          </div>
          <div className="panel-wrap">
            <div className="title-bar">
              <h3 className="title">
                <FormattedMessage id="pay.percentageOfPayment" defaultMessage="Payment Percentage" />
              </h3>
            </div>
            <div className="total-money">
              <FormattedMessage id="pay.totalAmount" defaultMessage="Total Amount(¥)" /> ：
              {this.formatNum(moneyTotal.toFixed(2))}
            </div>
            <div className="content">
              <LoopCharts data={moneyChartsData} label={locale === 'zh'?"label" :"english"} value="percent" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState2Props = ({
  pay: { 
    chartData, 
    PayMethod, 
    statBySystem
  },
  intl: { locale }
}: any) => ({
  chartData,
  PayMethod,
  statBySystem,
  locale
});

const mapDispatch2Props = ({
  pay: { 
    getList, 
    payDetail, 
    paymentAmounts, 
    getStatBySystem, 
    getPayMethod
  }
}: any) => ({
  getList, 
  payDetail,
  paymentAmounts, 
  getStatBySystem, 
  getPayMethod 
});
export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(User)
);

