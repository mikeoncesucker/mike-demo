import * as React from 'react';
import { connect } from 'react-redux';
import { Layout, Badge, } from 'antd';
import HeaderBar from '../../components/header_bar';
import AudioIcon from "../../components/audioIcon";
import Footer from '../../components/footer';
import store from 'store';
import videojs from 'video.js';
import styles from '../notice/style.module.less';
import 'video.js/dist/video-js.min.css';
import Nav from '../../components/nav';
import { injectIntl } from 'react-intl';
import { detail_msg } from '../../messages/detail';
import { common_msg } from '../../messages/common';
export interface DetailProps {
  getReadById;
  putDeleteById;
  resetDetails;
  detail;
  appCodeList;
  location;
  history;
  match;
  intl;
}

const warringTypes = ['#02B583','#08ABF8','#FFC000','#FC5B5B'];
// level:0 绿色 1 蓝色 2: 黄色 3: 红色

class Detail extends React.Component<DetailProps,any> {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    const { getReadById, location, } = this.props;
    let language = store.get('local_language') === 'zh' ? 'chinese' : 'english';
    let id;
    if(location.state && location.state.id) {
      id = location.state.id;
      sessionStorage.setItem('noticeId',location.state.id)
    } else {
      id = sessionStorage.getItem('noticeId')
    }
    getReadById({
      query: {
        id,
        language,
      },
      cb: null
    })
  }
  componentWillUnmount() {
    this.props.resetDetails()
  }
  componentDidUpdate() {
    if(this.props.detail.videos) {
      var videos:any = document.getElementsByTagName('video');
      for(let i=0; i<videos.length; i++) {
        videojs('myVideo'+i)
      }
    }
  }
  delete = (id, event)=> {
    event.stopPropagation();
    const { putDeleteById, history } = this.props;
    putDeleteById({
      id,
      cb: ()=> {
        history.push('../notice')
      }
    }) 
  }
  play = (index) => {
    var videos:any = document.getElementsByTagName('video');
    for(let i=0; i<videos.length; i++) {
      if(index !== i) videos[i].pause()
    }
  }
  public render() {
    const { history, intl, detail, appCodeList } = this.props;
    const { formatMessage } = intl;
    const appCode = appCodeList.find((item)=> item.code === detail.appCode) || {};
    const imageList = JSON.parse(detail.images||'[]') || [];
    const videoList = JSON.parse(detail.videos||'[]') || [];
    return(
      <Layout>
        <HeaderBar history={history} intl={intl} show={true}></HeaderBar> 
        <Nav name={detail_msg.message} title={detail_msg.msg_detail} jump={'notice'} intl={intl}></Nav>
        <div className={styles.detail_item}>
          <div className={styles.detail_title}>
            <Badge color={warringTypes[detail.level]} /> {detail.title || ''}
            <AudioIcon image={detail.images} video={detail.videos} />
          </div>
          <div className={styles.detail_des}>
            <p>{detail.message || ''}</p>
            <div className={styles.source_time}>
              <p className={styles.source}>
                {formatMessage(common_msg.origin)}: {
                  intl.locale === 'zh' ? appCode.name : appCode.english
                }
              </p>
              <p>
                {detail.occurTime}
              </p>
              <p className={styles.deletes} onClick={this.delete.bind(this,detail.id)}>
                { formatMessage(common_msg.delete) }
              </p>
            </div>
            {
              imageList.map((item,key)=> {
                return <img 
                        src={item} 
                        alt="" 
                        key={key} 
                        width="650" 
                        height="358" 
                        style={{
                          display: 'block',
                          background: `url(${require('../../assets/images/failed_' + intl.locale+ '.png')}) center no-repeat`, 
                          backgroundSize: '100%' 
                        }}
                      />
              })
            }
            <div style={{width: 650,overflow: 'hidden'}}>
                {
                  videoList.map((item,key)=> {
                    return (
                      <div style={{ width: 650, height: 358, marginBottom: 10}} key={key} >
                        <video
                              id={'myVideo'+key}
                              className="video-js vjs-big-play-centered"
                              controls
                              preload="auto"
                              data-setup="{}"
                              style={{
                                width:'100%',
                                height:'100%' 
                              }}
                              poster={item.images} 
                              onPlay={this.play.bind(this,key)}
                            >
                              <source src={item.url}/>
                              您的浏览器不支持视频播放
                          </video>
                      </div>
                    )
                  })
                }
              </div>
          </div>
        </div>
        <Footer intl={intl} bg='#213571'/>
      </Layout>
    )
  }
}

const mapState2Props = ({ 
  notice: {
    detail, 
  },
  search: {
    appCodeList
  }
}) => ({
  detail,
  appCodeList
});
const mapDispatch2Props = ({ 
  notice: { 
    putDeleteById, 
    getReadById, 
    resetDetails 
  }
}:any) => ({
  putDeleteById, 
  getReadById, 
  resetDetails
})

export default connect(
  mapState2Props,
  mapDispatch2Props
)(injectIntl(Detail))