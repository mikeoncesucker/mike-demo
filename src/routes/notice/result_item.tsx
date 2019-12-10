import * as React from 'react';
import { connect } from 'react-redux';
import styles from './style.module.less';
import { Badge, Modal } from 'antd';
import { common_msg } from '../../messages/common';
export interface IResultItemProps {
  data;
  history;
  intl;
  getData;
  putDeleteById;
  getUnreadNoticeList;
  appCodeList;
}

const { confirm } = Modal;
const warringTypes = ['#02B583', '#08ABF8', '#FFC000', '#FC5B5B'];
// level:0 绿色 1 蓝色 2: 黄色 3: 红色
class ResultItem extends React.PureComponent<IResultItemProps> {
  delete = (id, event) => {
    event.stopPropagation();
    const { getUnreadNoticeList, putDeleteById, getData, intl } = this.props;
    const { formatMessage } = intl;
    confirm({
      title: `${formatMessage(common_msg.confirm_delete_notice)}?`,
      okText: formatMessage(common_msg.btn_sure),
      cancelText: formatMessage(common_msg.btn_cancel),
      onOk() {
        putDeleteById({
          id,
          cb: () => {
            getData()
            getUnreadNoticeList({
              language: intl.locale === "zh" ? "chinese" : "english",
              cb: null
            })
          }
        })
      },
      onCancel() { }
    })
  }
  toDetail = (id, event) => {
    event.preventDefault()
    this.props.history.push({ pathname: 'notice/detail', state: { id: id } })
  }
  public render() {
    let { data, appCodeList, intl } = this.props;
    const { formatMessage } = intl;
    const appCode = appCodeList.find((item) => item.code === data.appCode) || {};
    return (
      <div onClick={this.toDetail.bind(this, data.id)}
        className={styles.notice_item}
      >
        <div className={data.status === 'haveRead' ? styles.notice_item_title_readed : styles.notice_item_title}>
          <Badge color={warringTypes[data.level]} /> {data.title || ''}
          {
            data.images ? <img src={require('../../assets/images/pic.png')} alt="" /> : null
          }
          {
            data.videos !== '[]' ? <img src={require('../../assets/images/video.png')} alt="" /> : null
          }
        </div>
        <div className={styles.notice_item_desc}>
          <div className={data.status === 'haveRead' ? '' : styles.item_warn}>
            {data.message || ''}
          </div>
          <div className={styles.item_source}>
            {formatMessage(common_msg.origin)}: {
              intl.locale === 'zh' ? appCode.name : appCode.english
            }
          </div>
          <div className={styles.item_create_at}>
            {data.occurTime}
          </div>
          <div className={styles.delete} onClick={this.delete.bind(this, data.id)}>
            {formatMessage(common_msg.delete)}
          </div>
        </div>
      </div>
    );
  }
}

const mapState2Props = ({
  search: {
    appCodeList,
  }
}) => ({
  appCodeList
})
const mapDispatch2Props = ({
  notice: {
    putDeleteById
  },
  common: {
    getUnreadNoticeList
  }
}: any) => ({
  putDeleteById,
  getUnreadNoticeList
})

export default connect(
  mapState2Props,
  mapDispatch2Props
)(ResultItem)
