import * as React from 'react';
import { connect } from 'react-redux';
import styles from './style.module.less';
import { Badge } from 'antd';
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

const warringTypes = ['#02B583','#08ABF8', '#FFC000', '#FC5B5B'];
// level:0 绿色 1 蓝色 2: 黄色 3: 红色
 class ResultItem extends React.PureComponent<IResultItemProps> {
  delete = (id, event)=> {
    event.stopPropagation();
    const { getUnreadNoticeList, putDeleteById, intl } = this.props;
    putDeleteById({
      id,
      cb: ()=> {
        this.props.getData()
        getUnreadNoticeList({
          language: intl.locale === "zh" ? "chinese" : "english",
          cb: null
        })
      }
    }) 
  }
  toDetail = (id,event) => {
    event.preventDefault()
    this.props.history.push({pathname: 'notice/detail', state: {id: id}})
  }
  public render() {
    let { data, appCodeList, intl } = this.props;
    const { formatMessage } = intl;
    return (
      <div onClick={this.toDetail.bind(this,data.id)}
        className={styles.notice_item}
      >
        <div className={data.status === 'haveRead' ? styles.notice_item_title_readed : styles.notice_item_title}>
          <Badge color={warringTypes[data.level]} /> {data.title || ''}
        </div>
        <div className={styles.notice_item_desc}>
          <div className={data.status === 'haveRead' ? '' : styles.item_warn }>
            {data.message || ''}
          </div>
          <div className={styles.item_source}>
            {formatMessage(common_msg.origin)}: {
              appCodeList
                .filter((item)=> item.code === data.appCode)
                .map((item)=>(
                  intl.locale === 'zh' ? item.name : item.english
                ))
            }
          </div>
          <div className={styles.item_create_at}>
            {data.occurTime}
          </div>
          <div className={styles.delete} onClick={this.delete.bind(this,data.id)}>
            { formatMessage(common_msg.delete) }
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
}:any) => ({
  putDeleteById, 
  getUnreadNoticeList

})

export default connect(
  mapState2Props,
  mapDispatch2Props
)(ResultItem)
