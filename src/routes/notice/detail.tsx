import * as React from 'react';
import { connect } from 'react-redux';
import { Layout, Badge, } from 'antd';
import styles from '../notice/style.module.less';
import HeaderBar from '../../components/header_bar';
import Nav from '../../components/nav';
import store from 'store';
import { injectIntl } from 'react-intl';
import { detail_msg } from '../../messages/detail';
import { common_msg } from '../../messages/common';
const { Footer } = Layout;
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
  a: any;
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    const { getReadById, location,} = this.props;
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

  public render() {
    const { history, intl, detail, appCodeList } = this.props;
    const { formatMessage } = intl;
    return(
      <Layout>
        <HeaderBar history={history} intl={intl} show={true}></HeaderBar> 
        <Nav name={detail_msg.message} title={detail_msg.msg_detail} jump={'notice'} intl={intl}></Nav>
        <div className={styles.detail_item}>
          <div className={styles.detail_title}>
            <Badge color={warringTypes[detail.level]} /> {detail.title || ''}
          </div>
          <div className={styles.detail_des}>
            <p>{detail.message || ''}</p>
            <div className={styles.source_time}>
              <p className={styles.source}>
                {formatMessage(common_msg.origin)}: {
                  appCodeList
                    .filter((item)=> item.code === detail.appCode)
                    .map((item)=> (
                      intl.locale === 'zh' ? item.name : item.english
                    ))
                }
              </p>
              <p>
                {detail.occurTime}
              </p>
              <p className={styles.deletes} onClick={this.delete.bind(this,detail.id)}>
                { formatMessage(common_msg.delete) }
              </p>
            </div>
          </div>
        </div>
        <Footer className={styles.footer}>
          Copyright &#169;&#65039; 2019 {formatMessage(common_msg.corpright)}
        </Footer>
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