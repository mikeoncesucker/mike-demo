import * as React from 'react';
import { connect } from 'react-redux';
import { Layout, } from 'antd';
import HeaderBar from '../../components/header_bar';
import Nav from '../../components/nav';
import styles from './style.module.less';
import { injectIntl } from 'react-intl';
import { search_msg } from '../../messages/search';
import { common_msg } from '../../messages/common';
const { Footer } = Layout;
export interface DetailProps {
  history;
  location;
  match;
  intl;
  detail,
  appCodeList;
  typeList;
  levelList;
  statusList;
  getDetailById;
  getAppCodeList;
  getTypeList;
  getLevelList;
  getStatusList;
  resetDetails;
  resetAppCodeLists;
  resetTypeLists;
  resetLevelLists;
  resetStatusLists;
}

class Detail extends React.Component<DetailProps, any> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentWillMount() {
    const {
      getDetailById,
      getAppCodeList,
      getTypeList,
      getLevelList,
      getStatusList,
      location
    } = this.props;
    let id;
    if (location.state && location.state.id) {
      id = location.state.id;
      sessionStorage.setItem('eventId', location.state.id)
    } else {
      id = sessionStorage.getItem('eventId')
    }
    getDetailById({
      id,
      cb: null
    })
    getAppCodeList({
      cb: null,
    })
    getTypeList({
      cb: null,
    })
    getLevelList({
      cb: null,
    })
    getStatusList({
      cb: null,
    })
  }
  componentWillUnmount() {
    const { 
      resetDetails,
      resetAppCodeLists,
      resetTypeLists,
      resetLevelLists,
      resetStatusLists
    } = this.props;
    resetDetails();
    resetAppCodeLists();
    resetTypeLists();
    resetLevelLists();
    resetStatusLists();
  }
  public render() {
    const { 
      history, 
      intl, 
      detail, 
      appCodeList, 
      typeList, 
      levelList, 
      statusList 
    } = this.props;
    const { formatMessage } = intl;
    const appCode = appCodeList.find((item) => item.code === detail.appCode) || {};
    const type = typeList.find((item) => item.id === detail.typeId) || {};
    const level = levelList.find((item) => item.code === detail.level) || {};
    const status = statusList.find((item) => item.code === detail.status) || {};
    const forwardLog = detail.forwardLog || [];
    const messageStatus = forwardLog.find((item) => item.fwType === 0 && item.fwResult === 'SUCCESS');
    const portalStatus = forwardLog.find((item) => item.fwType === 1 && item.fwResult === 'SUCCESS');
    return (
      <Layout>
        <HeaderBar history={history} intl={intl} />
        <Nav 
          name={common_msg.btn_search} 
          title={search_msg.event_detail} 
          jump={'search'} intl={intl} 
        />
        <div className={styles.event_content}>
          <h3 className={styles.info}>
            {formatMessage(search_msg.event_info)}
          </h3>
          <table>
            <tbody>
              <tr>
                <td>
                  {formatMessage(search_msg.event_id)}
                </td>
                <td>{detail.traceId}</td>
                <td>
                  {formatMessage(search_msg.event_name)}
                </td>
                <td>
                  {intl.locale === 'zh' ? appCode.name : appCode.english}
                </td>
                <td>
                  {formatMessage(search_msg.event_type)}
                </td>
                <td>
                  {intl.locale === 'zh' ? type.name : type.english}
                </td>
              </tr>
              <tr>
                <td>
                  {formatMessage(search_msg.event_level)}
                </td>
                <td>
                  <div className={styles.circle}>
                    <span style={{ background: level.color }}></span>
                    {intl.locale === 'zh' ? level.label : level.english}
                  </div>
                </td>
                <td>
                  {formatMessage(search_msg.event_target)}
                </td>
                <td>
                  {
                    forwardLog.length ? forwardLog.map((item, key) => (
                      key === 0 && JSON.parse(item.targets).map((items, keys) => (
                        `${items.name}${JSON.parse(item.targets).length-1 >keys ? '、' : ''}`
                      ))
                    )) : null
                  }
                </td>
                <td>
                  {formatMessage(search_msg.event_message)}
                </td>
                <td>
                  {
                    messageStatus ? 
                      <div className={styles.circle}>
                        <span style={{background: '#02B583'}}></span>
                        {formatMessage(search_msg.event_success)}
                      </div> : null
                  }
                </td>
              </tr>
              <tr>
                <td>
                  {formatMessage(search_msg.event_happen)}
                </td>
                <td>{detail.occurTime}</td>
                <td>
                  {formatMessage(search_msg.event_receive)}
                </td>
                <td>{detail.logTime}</td>
                <td>
                  {formatMessage(search_msg.event_portal)}
                </td>
                <td>
                  {
                    portalStatus ? 
                    <div className={styles.circle}>
                      <span style={{background: '#02B583'}}></span>
                      {formatMessage(search_msg.event_success)}
                    </div> : null
                  }
                </td>
              </tr>
              <tr>
                <td>
                  {formatMessage(search_msg.event_deal)}
                </td>
                <td>
                  {
                    Object.keys(detail).length ?
                      <div className={styles.circle}>
                      {
                        detail.overtime === 0 ?
                          <span style={{ background: '#02B583' }}></span> :
                          <span style={{ background: '#FC5B5B' }}></span>
                      }
                      {
                        detail.overtime === 0 ?
                          intl.locale === 'zh' ? '正常处理' : 'normal' :
                          intl.locale === 'zh' ? '超时处理' : 'timeout'
                      }
                    </div>: null
                  }
                  
                </td>
                <td>
                  {formatMessage(search_msg.event_circle)}
                </td>
                <td>
                  <div className={styles.circle}>
                    <span style={{ background: status.color }}></span>
                    {intl.locale === 'zh' ? status.label : status.english}
                  </div>
                </td>
                <td>
                  {formatMessage(search_msg.event_send)}
                </td>
                <td>
                  {
                    (messageStatus || portalStatus) ? forwardLog[0].fwTime : null
                  }
                </td>
              </tr>
              <tr>
                <td>
                  {formatMessage(search_msg.event_detail)}
                </td>
                <td colSpan={5}>{detail.message}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Footer className={styles.footer}>
          Copyright &#169;&#65039; 2019 {formatMessage(common_msg.corpright)}
        </Footer>
      </Layout>
    );
  }
}

const mapState2Props = ({ 
  search: {
    detail,
    levelList,
    statusList,
    appCodeList,
    typeList
  } 
}) => ({
  detail,
  levelList,
  statusList,
  appCodeList,
  typeList
})
const mapDispatch2Props = ({
  search: {
    getDetailById,
    getAppCodeList,
    getTypeList,
    getLevelList,
    getStatusList,
    resetDetails,
    resetAppCodeLists,
    resetTypeLists,
    resetLevelLists,
    resetStatusLists
  }
}:any) => ({
  getDetailById,
  getAppCodeList,
  getTypeList,
  getLevelList,
  getStatusList,
  resetDetails,
  resetAppCodeLists,
  resetTypeLists,
  resetLevelLists,
  resetStatusLists
})

export default connect(
  mapState2Props,
  mapDispatch2Props
)(injectIntl(Detail))


