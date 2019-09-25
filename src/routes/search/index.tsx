import * as React from 'react';
import { connect } from 'react-redux';
import { Layout, Input, Icon, Pagination, } from 'antd';
import HeaderBar from '../../components/header_bar';
import Nav from '../../components/nav';
import ResultItem from './result_item';
import styles from './style.module.less';
import { injectIntl } from 'react-intl';
import { search_msg } from '../../messages/search';
import { common_msg } from '../../messages/common';
import Sliders from './slider';
const { Footer } = Layout;
export interface ISearchProps {
  history;
  location;
  match;
  getData;
  intl;
  query;
}

class Search extends React.Component<ISearchProps, any> {
  constructor(props) {
    super(props)  ;
    this.state = {
      searchName: '',
      list: [],
      user: [],
      count: null,
      page: 1,
    }
  }
  componentDidMount() {
    const { query } = this.props;
    if(Object.keys(query).length) {
      this.setState({
        page: query.page,
        searchName: query.searchName
      },()=> {
        this.getData()
      })
    }
  }
  getData = () => {
    let { getData } = this.props;
    let { page, searchName } = this.state;
    getData({
      query: {
        searchName,
        page,
        size: 5,
      },
      cb: (err, res) => {
        if (res) {
          this.setState({
            searchName,
            list: res.resultMap.rows,
            user: res.resultMap.users,
            count: res.resultMap.totalNum
          })
        }
      }
    })
  }
  doSearch = (searchName) => {
    if(searchName.length) {
      this.setState({
        searchName,
        page: 1,
      },()=>{
        this.getData()
      })
    }
  }
  onChange = (page) => {
    this.setState({
      page,
    },()=> {
      this.getData();
    });
  }

  public render() {
    const { searchName, list, count, user, } = this.state;
    const { history, intl, } = this.props;
    const { formatMessage } = intl;
    return (
      <Layout className="layout">
        <HeaderBar history={history} intl={intl}></HeaderBar>
        <Nav name={ common_msg.btn_search } intl={intl}></Nav>
        <div className={styles.search_container}>
          <div className={styles.search_content}>
            <Input.Search
              defaultValue={searchName}
              placeholder={formatMessage(search_msg.search_key)}
              enterButton={formatMessage(common_msg.btn_search)}
              size="large"
              allowClear
              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
              style={{ width: 720 }}
              onSearch={this.doSearch}
            />
          </div>
          {
            searchName && <div className={styles.message}>
              <span>{formatMessage(search_msg.search_msg_pre)}</span>
              <span>{count+user.length}</span>
              <span>{formatMessage(search_msg.search_result_count)}</span>
              <span>{formatMessage(search_msg.search_msg_suffix)}</span>
            </div>
          }
          <Sliders user={user} intl={intl}></Sliders>
          <div className={styles.result}>
            <div className={styles.content}>
              {list.map((item, index) => {
                return <ResultItem data={item} key={index} history={history}/>
              })}
            </div>
          </div>
          {
            list.length !== 0 ? (<div className={styles.pagination}>
              <Pagination
                total={count}
                showTotal={
                  total =>  `${formatMessage(common_msg.total)} ${total} ${formatMessage(common_msg.count)}`  
                }
                onChange={this.onChange}
                current={this.state.page}
                pageSize={5}
              />
            </div>) : null
          }
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
    query 
  }
}) => ({
  query
})

const mapDispatch2Props = ({
  search: { 
    getData, 
  }
}:any) => ({
  getData, 
})

export default connect(mapState2Props, mapDispatch2Props)(injectIntl(Search));

