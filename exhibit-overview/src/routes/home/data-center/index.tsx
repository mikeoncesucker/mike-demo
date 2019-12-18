import React from "react";
import { withStyles } from "@material-ui/styles";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import { chineseSysName, englishSysName} from '../../../constants';
import { dataCenter, common } from "../message";
import PlatformLine from "./platformLine";
import PlatformLoop from "./PlatformLoop";
import PlatformProgress from "./platformProgress";
import styles from "./style";

export interface DataCenterProps {
  classes: any;
  match: any;
  location: any;
  intl: any;
  businessData: any;
  sysNum: any;
  transNum: any;
  sysList: any;
  getTransNum: Function;
  getSysNum: Function;
  getFuncList: Function;
  getBusinessData: Function;
}
class DataCenter extends React.Component<DataCenterProps, any> {
  constructor(props: Readonly<DataCenterProps>) {
    super(props);
    this.state = {
      
    };
  }

  chunk = (arr: any, num: any) => {
    let j = 0,
      o = j;
    let newArray = [];
    while (j < arr.length) {
      j += num;
      newArray.push(arr.slice(o, j));
      o = j;
    }
    return newArray;
  };

  componentDidMount() {
    const {
      getSysNum,
      getTransNum,
      getFuncList,
      getBusinessData,
      intl
    } = this.props;
    const language = intl.locale === 'zh' ? 'chinese' : 'english'

    getSysNum({
      params: {},
      cb: (type: any, data: any) => {}
    });

    getTransNum({
      params: {},
      cb: (type: any, data: any) => {}
    });

    getFuncList({
      language,
      cb: null
    });

    getBusinessData({
      params: {},
      cb: null,
    })
  }
  getSysContent = (name: string)=> {
    const { sysList, intl } = this.props;
    if(!sysList[name]) return null;
    const content = sysList[name].map((item: any, key: number)=> {
      return item.name
    })
    return(
      <div className="content">
        <h5 className="name">
          {intl.formatMessage(dataCenter.center_service_detail)}
        </h5>
        <div
          style={{display: 'flex'}}
        >
          {
            this.chunk(content,10).map((item:any, key:number)=> (
              <div key={key}>
                {
                  item.map((item:any,)=> <p key={item}>{item}</p>)
                }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const { classes, sysNum, transNum, sysList, businessData, intl } = this.props;
    const sysNameList = intl.locale === 'zh' ? chineseSysName : englishSysName;
    const { formatMessage } = intl;
    const bg = {
      background: `url(${require("../../../resource/earth_" + (intl.locale) + ".png")}) center no-repeat`,
      backgroundSize: "13.32rem 100%",
    };
    if(!sysList) return <div></div>;
    return (
      <div className={classes.root}>
        <div className="main">
          <div className="leftCensus">
            <div className="item">
              <img src={require("../../../resource/center_icon1.png")} alt="" />
              <p>
                {formatMessage(dataCenter.center_login_number)}
                <span className="NumAmount" title={businessData.login}>
                  {businessData.login}
                </span>
              </p>
            </div>
            <div className="item">
              <img src={require("../../../resource/center_icon2.png")} alt="" />
              <p>
                {formatMessage(dataCenter.center_user_number)}
                <span className="NumAmount" title={businessData.user}>
                  {businessData.user}
                </span>
              </p>
            </div>
            <div className="item">
              <img src={require("../../../resource/center_icon3.png")} alt="" />
              <p>
                {formatMessage(dataCenter.center_support_number)}
                <span className="NumAmount" title={sysNum}>
                  {sysNum}
                </span>
              </p>
            </div>
            <div className="item">
              <img src={require("../../../resource/center_icon4.png")} alt="" />
              <p>
                {formatMessage(dataCenter.center_transfers_number)}
                <span className="NumAmount" title={transNum}>
                  {transNum}
                </span>
              </p>
            </div>
          </div>
          <div className="rightSys" style={bg}>
            <div className="top">
              {
                sysNameList.slice(0,7).map((item:any, key:number)=> (
                  <div className="item" key={key}>
                    <p className={this.getSysContent(item) ? 'dataTitle' : 'nullTitle'}>
                      <span>{item}</span>
                    </p>
                    {this.getSysContent(item)}
                  </div>
                ))
              }
            </div>
            <div className="middle">
              {
                sysNameList.slice(7,10).map((item:any, key:number)=> (
                  <div className="item" key={key}>
                    <p className={this.getSysContent(item) ? 'dataTitle' : 'nullTitle'}>
                      <span>{item}</span>
                    </p>
                    {this.getSysContent(item)}
                  </div>
                ))
              }
            </div>
            <div className="bottom">
              {
                sysNameList.slice(10,16).map((item:any, key:number)=> (
                  <div className="item" key={key}>
                    <p className={this.getSysContent(item) ? 'dataTitle' : 'nullTitle'}>
                      <span>{item}</span>
                    </p>
                    {this.getSysContent(item)}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="item">
            <p className="title">
              {formatMessage(dataCenter.center_data_sharing)}
            </p>
            <div className="content">
              <PlatformLine intl={intl}/>
            </div>
          </div>
          <div className="item">
            <p className="title">
              {formatMessage(dataCenter.center_business_data)}
              <span>{formatMessage(common.last_week)}</span>
            </p>
            <div className="content">
              <PlatformProgress data={businessData} intl={intl}/>
            </div>
          </div>
          <div className="item">
            <p className="title">
              {formatMessage(dataCenter.center_share_percent)}
              <span>{formatMessage(common.last_week)}</span>
            </p>
            <div className="content">
              <div className="loop">
                <PlatformLoop intl={intl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState2Props = ({ 
  centerRawData: { 
    sysNum, 
    transNum,
    sysList,
    businessData
  } 
}: any) => ({
  sysNum,
  transNum,
  sysList,
  businessData
});

const mapDispatch2Props = ({
  centerRawData: {
    getSysNum,
    getTransNum,
    getFuncList,
    getBusinessData
  }
}: any) => ({
  getSysNum,
  getTransNum,
  getFuncList,
  getBusinessData
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(injectIntl(DataCenter))
);