import * as React from 'react';
import { connect } from 'react-redux';
import { Layout, Steps, } from 'antd';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import HeaderBar from '../../components/header_bar';
import Footer from '../../components/footer';
import Nav from '../../components/nav';
import styles from './style.module.less';
import { injectIntl } from 'react-intl';
import { search_msg } from '../../messages/search';
import { common_msg } from '../../messages/common';

const { Step } = Steps;
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
      detail_popup: false
    }
  }
  componentWillMount() {
    const {
      getDetailById,
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
  componentDidUpdate() {
    if (this.props.detail.videos) {
      var videos: any = document.getElementsByTagName('video');
      for (let i = 0; i < videos.length; i++) {
        videojs('myVideo' + i)
      }
    }
  }
  play = (index) => {
    var videos: any = document.getElementsByTagName('video');
    for (let i = 0; i < videos.length; i++) {
      if (index !== i) videos[i].pause()
    }
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
    if (!detail) return null
    const { formatMessage } = intl;
    const { detail_popup } = this.state;
    const appCode = appCodeList.find((item) => item.code === detail.appCode) || {};
    const type = typeList.find((item) => item.id === detail.typeId) || {};
    const level = levelList.find((item) => item.code === detail.level) || {};
    const status = statusList.find((item) => item.code === detail.status) || {};
    const forwardLog = detail.forwardLog || [];
    const messageStatus = forwardLog.find((item) => item.fwType === 0 && item.fwResult === 'SUCCESS');
    const portalStatus = forwardLog.find((item) => item.fwType === 1 && item.fwResult === 'SUCCESS');
    const imageList = JSON.parse(detail.images || '[]') || [];
    const videoList = JSON.parse(detail.videos || '[]') || [];
    const steps: any = detail.list || [];
    const linkList = (status.code !== 5 ? (statusList.length && statusList.slice(0, 5).map((item, key) => {
      const current: any = steps.find((items) => item.code === items.currStatus);
      return {
        status: intl.locale === 'zh' ? item.label + '环节' : item.english,
        logTime: current ? new Date(+new Date(new Date(current.logTime).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') : null,
        overtime: current ? current.overtime : null
      }
    })) : statusList.length && steps.map((item, key) => {
      return {
        status: intl.locale === 'zh' ? statusList[item.currStatus].label + '环节' : statusList[item.currStatus].english,
        logTime: new Date(+new Date(new Date(item.logTime).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''),
        overtime: item.overtime
      }
    })) || [];
    return (
      <Layout>
        <HeaderBar history={history} intl={intl} />
        <Nav
          name={common_msg.btn_search}
          title={search_msg.event_detail}
          jump={'search'} intl={intl}
        />
        {
          detail_popup ? (<div className={styles.popup_content}>
            <div className={styles.fix_popup}>
              <div className={styles.head}>
                <span>{formatMessage(search_msg.describe_details)}</span>
                <span onClick={() => {
                  this.setState({
                    detail_popup: false
                  })
                }}
                >
                  {formatMessage(common_msg.close)}
                </span>
              </div>
              <div className={styles.content}>
                <p>{detail.message}</p>
                {
                  imageList.map((item, key) => {
                    return <img 
                            src={item}
                            alt=""  
                            key={key} 
                            width="100%"
                            style={{
                              background: `url(${require('../../assets/images/failed_' + intl.locale+ '.png')}) center no-repeat`, 
                              backgroundSize: '5rem 2.5rem' 
                            }}
                          />   
                  })
                }
                {
                  videoList.map((item, key) => {
                    return (
                      <video 
                        key={key}
                        style={{
                          width: '100%',
                          height: '2.92rem',
                          marginBottom: '.1rem'
                        }}
                        id={'myVideo' + key}
                        className="video-js vjs-big-play-centered"
                        controls
                        preload="auto"
                        data-setup="{}"
                        poster={item.images}
                        onPlay={this.play.bind(this, key)}
                      >
                        <source src={item.url} />
                        您的浏览器不支持视频播放
                      </video>
                    )
                  })
                }
              </div>
            </div>
          </div>) : null
        }
        <div className={styles.event_content}>
          <div className={styles.steps}>
            <h4>{formatMessage(search_msg.event_link)}</h4>
            {
              steps.length ?
                <Steps progressDot
                  current={steps[steps.length - 1].currStatus}
                  labelPlacement='vertical'
                  className={styles.stepList}
                >
                  {
                    linkList.map((item, key) => {
                      return (
                        <Step className={item.logTime ? '' : 'noexist'} title={item.status} description={
                          item.logTime ? <div className={styles.description}>
                            <p>
                              <span style={{ background: item.overtime === 0 ? '#02B583' : '#FC5B5B' }}/>
                              {formatMessage(item.overtime === 0 ? search_msg.event_success : search_msg.event_fail)}
                            </p>
                            <p>{item.logTime}</p>
                          </div> : null
                        } key={key} />
                      )
                    })
                  }
                </Steps> : null
            }
          </div>
          <div className={styles.table}>
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
                      <span style={{ background: level.color }} />
                      {intl.locale === 'zh' ? level.label : level.english}
                    </div>
                  </td>
                  <td>
                    {formatMessage(search_msg.event_title)}
                  </td>
                  <td>
                    {detail.title}
                  </td>
                  <td>
                    {formatMessage(search_msg.event_message)}
                  </td>
                  <td>
                    {
                      forwardLog.length ? 
                        <div className={styles.circle}>
                          <span style={{ background: messageStatus ? '#02B583' :  '#F54238'}} />
                          {formatMessage(messageStatus ? search_msg.event_success : search_msg.event_fail)}
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
                      forwardLog.length ?
                        <div className={styles.circle}>
                          <span style={{ background: portalStatus? '#02B583' : '#F54238'}}></span>
                          {formatMessage(portalStatus ? search_msg.event_success : search_msg.event_fail)}
                        </div> : null
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    {formatMessage(search_msg.event_circle)}
                  </td>
                  <td>
                    <div className={styles.circle}>
                      {intl.locale === 'zh' ? status.label : status.english}
                    </div>
                  </td>
                  <td>
                    {formatMessage(search_msg.event_deal)}
                  </td>
                  <td>
                    {
                      Object.keys(detail).length ?
                        <div className={styles.circle}>
                          {
                            detail.overtime === 0 ?
                              intl.locale === 'zh' ? '否' : 'No' :
                              intl.locale === 'zh' ? '是' : 'Yes'
                          }
                        </div> : null
                    }
                  </td>
                  <td>
                    {formatMessage(search_msg.event_send)}
                  </td>
                  <td>
                    {
                      forwardLog[0] ? forwardLog[0].fwTime : null
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    {formatMessage(search_msg.event_target)}
                  </td>
                  <td colSpan={5}>
                    {
                      forwardLog.map((item, key) => (
                        key === 0 && item.targets
                      ))
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    {formatMessage(search_msg.event_des)}
                  </td>
                  <td colSpan={5}>
                    {detail.message}
                    {
                      detail.images ? <img src={require('../../assets/images/pic.png')} alt="" /> : null
                    }
                    {
                      detail.videos !== '[]' ? <img src={require('../../assets/images/video.png')} alt="" /> : null
                    }
                    {
                      (detail.images || detail.videos) ?
                        <p className={styles.popup} onClick={() => {
                          this.setState({
                            detail_popup: true
                          })
                        }}>{formatMessage(search_msg.view_details)} &#62;</p> : null
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Footer intl={intl} bg='#213571'/>
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
    getTypeList,
    getLevelList,
    getStatusList,
    resetDetails,
    resetAppCodeLists,
    resetTypeLists,
    resetLevelLists,
    resetStatusLists
  }
}: any) => ({
  getDetailById,
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


