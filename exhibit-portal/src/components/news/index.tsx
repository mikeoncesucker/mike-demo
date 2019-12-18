import * as React from "react";
import { connect } from "react-redux";
import { Popover, Row, Col, Badge, Icon, } from "antd";
import AudioIcon from "../audioIcon";
import styles from "./style.module.less";
import classNames from "classnames";
import store from "store";
import { common_msg } from '../../messages/common';

export interface NewsProps {
  history;
  intl;
  show?;
  unreadNoticeList;
  appCodeList;
  getUnreadNoticeList;
  getAppCodeList;
  resetNoticeRead;
  resetNoticeLists;
}

class News extends React.Component<NewsProps, any> {
  notice_timer;
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getUnreadNoticeList();
    // 一分钟请求一次消息列表
    this.notice_timer = setInterval(() => {
      this.getUnreadNoticeList();
    },60*1000);
  }
  componentWillUnmount() {
    clearInterval(this.notice_timer);
    this.props.resetNoticeLists()
  }
  getUnreadNoticeList = () => {
    let lan = store.get("local_language");
    const { getUnreadNoticeList, getAppCodeList } = this.props;
    getUnreadNoticeList({
      language: lan === "zh" ? "chinese" : "english",
      cb: null
    });
    getAppCodeList({
      cb: null
    })
  }
  resetNoticeRead = () => {
    const { resetNoticeRead } = this.props;
    resetNoticeRead({
      cb: () => {
        this.getUnreadNoticeList()
      }
    })
  }
  goNoticeList = () => {
    this.props.history.push("/notice");
  };
  toDetail = (id) => {
    this.props.history.push({
      pathname: '/notice/detail',
      state: { id }
    })
  }
  list = () => {
    const { unreadNoticeList, appCodeList, intl } = this.props;
    const { formatMessage } = intl;
    const warringTypes = ['#02B583', '#08ABF8', '#FFC000', '#FC5B5B'];
    if (unreadNoticeList && !unreadNoticeList.count) {
      return (
        <div className={styles.content}>
          <div className={styles.notice_kong}>{formatMessage(common_msg.no_message)}</div>
          <Row className={styles.listFooter}>
            <Col
              style={{ textAlign: 'right', cursor: 'pointer' }}
              span={24}
              onClick={this.goNoticeList}
            >
              {formatMessage(common_msg.read_all)} >
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <div className={styles.content}>
        <div className={styles.listBox}>
          {unreadNoticeList && unreadNoticeList.noticeEntities.map((notice, index) => {
            const appCode = appCodeList.find((item)=> item.code === notice.appCode) || {};
            return (index<5&&<Row className={styles.noticItem} key={index} onClick={this.toDetail.bind(this, notice.id)}>
              <Col span={1}>
                <Badge color={warringTypes[notice.level]} />
              </Col>
              <Col span={23}>
                <Col
                  className={
                    classNames(
                      styles.title,
                      notice.status === 'haveRead' ? styles.readed : styles.title_unread
                    )
                  }
                  span={24}
                >
                  <span className={styles.name}>{notice.title}</span>
                  <AudioIcon image={notice.images} video={notice.videos} />
                </Col>
                <p
                  className={
                    classNames(
                      styles.txt,
                      notice.status === 'haveRead' ? styles.readed : styles.txt_unread
                    )
                  }
                >
                  {notice.message}
                </p>
                <Row className={styles.noticeBtm}>
                  <Col span={12} className={styles.origin}>
                    {formatMessage(common_msg.origin)}:
                    {
                      intl.locale === 'zh' ? appCode.name : appCode.english
                    }
                  </Col>
                  <Col span={12} className={styles.noticeTime}>
                    {notice.occurTime}
                  </Col>
                </Row>
              </Col>
            </Row>)
          })}
          <Row className={styles.listFooter}>
            <Col
              style={{ textAlign: 'left', cursor: 'pointer' }}
              span={12}
            >
              <p>
                <Icon type="check" className={styles.font} />
                <span onClick={this.resetNoticeRead}>{formatMessage(common_msg.readed)}</span>
              </p>
            </Col>
            <Col
              style={{ textAlign: 'right', cursor: 'pointer' }}
              span={12}
              onClick={this.goNoticeList}
            >
              <p>{formatMessage(common_msg.read_all)} &#62;</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  };
  public render() {
    const { unreadNoticeList, show } = this.props;
    const notice_icon = (
      <span
        className={classNames(
          "iconfont icon-notice",
          styles.ml18,
          styles.icon_notice
        )}
      >
        {unreadNoticeList && unreadNoticeList.count ? (
          unreadNoticeList.count <= 99 ? (<label className={styles.notice_num}>{unreadNoticeList.count}</label>) :
            (<label className={styles.notice_num}>99+</label>)
        ) : null}
      </span>
    )
    return (
      <div>
        {show ? notice_icon : (<Popover
          placement="bottomLeft"
          content={this.list()}
          trigger="hover"
        >
          {notice_icon}
        </Popover>)}
      </div>
    );
  }
}
const mapState2Props = ({ 
  common: { 
    unreadNoticeList 
  }, 
  search: {
    appCodeList
  }
}) => ({
  unreadNoticeList,
  appCodeList
})
const mapDispatch2Props = ({
  common: {
    getUnreadNoticeList, 
    resetNoticeRead,
    resetNoticeLists
  },
  search: {
    getAppCodeList 
  }
}:any)=> ({
  getUnreadNoticeList, 
  getAppCodeList,
  resetNoticeRead,
  resetNoticeLists,
})
export default connect(
  mapState2Props,
  mapDispatch2Props
)(News)

