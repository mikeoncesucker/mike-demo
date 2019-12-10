import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Layout, Input, Icon, Pagination, } from 'antd';
import { Chart, Geom, Tooltip, Coord, Shape, } from "bizcharts";
import DataSet from "@antv/data-set";
import HeaderBar from '../../components/header_bar';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import ResultItem from './result_item';
import styles from './style.module.less';
import { injectIntl } from 'react-intl';
import { search_msg } from '../../messages/search';
import { common_msg } from '../../messages/common';
import Sliders from './slider';

export interface ISearchProps {
  history;
  location;
  match;
  getData;
  getWordCloud;
  getSaveQueryWord;
  intl;
  query;
  wordCloud;
}

class Search extends React.Component<ISearchProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      list: [],
      user: [],
      count: null,
      page: 1,
      ciyun: true
    }
  }
  componentDidMount() {
    const { query, getWordCloud } = this.props;
    getWordCloud({
      cb: null
    })
    
    if (Object.keys(query).length) {
      this.setState({
        page: query.page,
        searchName: query.searchName,
      }, () => {
        this.getData()
      })
    }
  }
  getData = () => {
    let { getData, intl, } = this.props;
    let { page, searchName } = this.state;
    this.setState({
      ciyun: false
    })
    getData({
      query: {
        searchName,
        page,
        size: 5,
        language: intl.locale === 'zh' ? 'chinese' : 'english'
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
    if (searchName.length) {
      this.setState({
        searchName,
        page: 1,
      }, () => {
        this.getData()
        this.props.getSaveQueryWord({
          query: { searchName },
          cb: null
        })
      })
    }
  }
  onChange = (page) => {
    this.setState({
      page,
    }, () => {
      this.getData();
    });
  }

  public render() {
    const { searchName, list, count, user, ciyun } = this.state;
    const { history, intl, wordCloud } = this.props;
    const { formatMessage } = intl;
    function getTextAttrs(cfg) {
      return _.assign(
        {},
        cfg.style,
        {
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate,
          text: cfg.origin._origin.text,
          textAlign: "center",
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: "Alphabetic"
        }
      );
    }
    const shape: any = Shape;
    shape.registerShape("point", "cloud", {
      drawShape(cfg, container) {
        const attrs = getTextAttrs(cfg);
        return container.addShape("text", {
          attrs: _.assign(attrs, {
            x: cfg.x,
            y: cfg.y
          })
        });
      }
    });
    
    const dv = new DataSet.View().source(wordCloud);
    if (dv.rows.length) {
      const range = dv.range("count");
      const min = range[0];
      const max = range[1];
      dv.transform({
        type: "tag-cloud",
        fields: ["wordName", "count"],
        size: [500, 300],
        font: "Verdana",
        padding: 0,
        timeInterval: 5000,

        rotate() {
          let random = ~~(Math.random() * 4) % 4;
          if (random === 2) {
            random = 0;
          }

          return random * 90; 
        },
        fontSize(d) {
          if (d.value) {
            const divisor = (max - min) !== 0 ? (max - min) : 1;
            return ((d.value - min) / divisor) * (80 - 24) + 24;
          }
          return 0;
        }
      });
    }

    const scale = {
      x: {
        nice: false
      },
      y: {
        nice: false
      }
    };
    return (
      <Layout className="layout">
        <HeaderBar history={history} intl={intl}></HeaderBar>
        <Nav name={common_msg.btn_search} intl={intl}></Nav>
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
              <span>{count + user.length}</span>
              <span>{formatMessage(search_msg.search_result_count)}</span>
              <span>{formatMessage(search_msg.search_msg_suffix)}</span>
            </div>
          }
          {
            ciyun ? <div className={styles.ciyun}>
              <div style={{ width: '500', height: '500', marginLeft: '1.6rem'}}>
                <Chart
                  height={300}
                  width={500}
                  data={dv}
                  scale={scale}
                  padding={0}
                  forceFit
                >
                  <Tooltip
                    containerTpl={`<div class="g2-tooltip">
                    <table class="g2-tooltip-list"></table>
                    </div>`
                    }
                    itemTpl={`<tr class="g2-tooltip-list-item">
                    <td style="display:block">
                      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:{color};"></span>
                      {value}
                    </td>
                      <td style="display:block">
                        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:{color};"></span>
                        {count}
                      </td>
                    </tr>`
                    }
                  />
                  <Coord reflect="y" />
                  <Geom
                    type="point"
                    position="x*y"
                    color="count"
                    shape="cloud"
                    tooltip={['count*wordName', (count, wordName) => {
                      return {
                        value: (intl.locale === 'zh' ? '搜索词' : 'name') + ': ' + wordName,
                        count: (intl.locale === 'zh' ? '次数' : 'count') + ': ' + count
                      };
                    }]}
                  />
                </Chart>
              </div>
              {
                wordCloud.length ? <div className={styles.list}>
                  <h4>{formatMessage(search_msg.search_hot)}</h4>
                  {
                    wordCloud.slice(0, 11).map((item, key) => {
                      return (
                        <div className={styles.item} key={key}>
                          <div className={styles.left}>
                            <span>{key + 1}</span>
                            <p onClick={this.doSearch.bind(this, item.wordName)}>{item.wordName}</p>
                          </div>
                          <p className={styles.right}>
                            {item.count}
                            <img src={require('../../assets/images/hot.png')} alt="" />
                          </p>
                        </div>
                      )
                    })
                  }
                </div> : null
              }
            </div> : null
          }
          <Sliders user={user} intl={intl}></Sliders>
          <div className={styles.result}>
            <div className={styles.content}>
              {list.map((item, index) => {
                return <ResultItem data={item} key={index} history={history} />
              })}
            </div>
          </div>
          {
            list.length !== 0 ? (<div className={styles.pagination}>
              <Pagination
                total={count}
                showTotal={
                  total => `${formatMessage(common_msg.total)} ${total} ${formatMessage(common_msg.count)}`
                }
                onChange={this.onChange}
                current={this.state.page}
                pageSize={5}
              />
            </div>) : null
          }
        </div>
        <Footer intl={intl} bg='#213571'/>
      </Layout>
    );
  }
}

const mapState2Props = ({
  search: {
    query,
    wordCloud,
  }
}) => ({
  query,
  wordCloud,
})

const mapDispatch2Props = ({
  search: {
    getData,
    getWordCloud,
    getSaveQueryWord,
  }
}: any) => ({
  getData,
  getWordCloud,
  getSaveQueryWord,
})

export default connect(mapState2Props, mapDispatch2Props)(injectIntl(Search));

