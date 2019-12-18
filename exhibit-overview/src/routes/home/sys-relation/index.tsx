import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import RelationChart from "./relationChart";
import { apiGateway } from "../message";
import title_line from "../../../resource/title_line.png";
import styles from "./style";
export interface SysRelationProps {
  classes: any;
  match: any;
  list: any;
  intl: any;
  getCallGraph: Function;
}
class SysRelation extends React.Component<SysRelationProps, any> {
  constructor(props: Readonly<SysRelationProps>) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { getCallGraph, intl } = this.props;
    const language = intl.locale === 'zh' ? 'chinese' : 'english';
    getCallGraph({
      language,
      cb: null
    });
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const { classes, list, intl } = this.props;
    const { formatMessage } = intl;
    if (!list) return null;
    const titleList: any = list.sysName.map(
      (item: any) => item.sysName
    );
    const sliceLength = (titleList.length / 2) % 1 === 0 ? titleList.length / 2 : (titleList.length + 1) / 2;
    const newList = list.sysName.map((item: any, key: number)=> {
      return {
        sysName: item.sysName,
        common: item.detail.filter((item:any)=> item.particular === 0),
        other: item.detail.filter((item:any)=> item.particular === 1),
      }
    });
    return (
      <div className={classes.root}>
        <div className="main">
          <div className="lfetArea">
            {
              newList.slice(0,sliceLength).map((item: any, key: number) => (
                <div className="item" key={item.sysName}>
                  <div className="head">
                    <h3>{item.sysName}</h3>
                    <img src={title_line} alt="" />
                  </div>
                  {
                    item.common.length ?  (<span className="click">
                      {formatMessage(apiGateway.common_interface)}: {item.common.length} {intl.locale === 'zh' ? '个' : 'PCS'}
                    </span>) : null
                  }
                  <div className="model modelLeft" key={key}>
                    <div>
                      <p>{formatMessage(apiGateway.common_interface)}: {item.common.length}{intl.locale === 'zh' ? '个' : 'PCS'}</p>
                    </div>
                    {item.common.map((item: any) => <span key={item.name}>{item.name}</span>)}
                  </div>
                  <div className="textList">
                    {
                      item.other.map((item:any)=> <p key={item.name}>{item.name}</p>)
                    }
                  </div>
                </div>
              ))
            }
          </div>
          <div className="middleArea">
            <RelationChart list={titleList} intl={intl} />
          </div>
          <div className="rightArea">
          {
              newList.slice(sliceLength).map((item: any, key: number) => (
                <div className="item" key={item.sysName}>
                  <div className="head">
                    <h3>{item.sysName}</h3>
                    <img src={title_line} alt="" />
                  </div>
                  <span className="click" style={{display : (item.common.length<= 0 ? 'none' : 'block')}}>
                    {formatMessage(apiGateway.common_interface)}: {item.common.length} {intl.locale === 'zh' ? '个' : 'PCS'}
                  </span>
                  <div className="model modelRight" key={key}>
                    <div>
                      <p>{formatMessage(apiGateway.common_interface)}: {item.common.length}{intl.locale === 'zh' ? '个' : 'PCS'}</p>
                    </div>
                    {item.common.map((item: any) => <span key={item.name}>{item.name}</span>)}
                  </div>
                  <div className="textList">
                    {
                      item.other.map((item:any)=> <p key={item.name}>{item.name}</p>)
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}
const mapState2Props = ({ sysRelation: { list } }: any) => ({
  list
});

const mapDispatch2Props = ({ sysRelation: { getCallGraph } }: any) => ({
  getCallGraph
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(injectIntl(SysRelation))
);
 