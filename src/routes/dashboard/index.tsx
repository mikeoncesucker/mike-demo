import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Button, Input, } from 'antd';
import News from '../../components/news';
import Gridstack from '../../components/gridstack';
import Center from '../../components/center';
import Language from '../../components/language';
import classNames from 'classnames';
import _ from 'lodash';
import store from 'store';
import { Scrollbars } from 'react-custom-scrollbars';
import { injectIntl } from 'react-intl';
import { dashboard_msg } from '../../messages/dashboard';
import styles from './style.module.less';
export interface IDashboardProps {
  history;
  location;
  match;
  getAllCards;
  saveCards;
  searchCards;
  resetCard,
  resetTodo,
  cards;
  todos;
  changeTheme;
  intl;
  resetQuerys;
}
const cell_h = ((window.innerHeight - 64 * 2 - 34 - 72) / 10) * 2;
class Dashboard extends React.Component<IDashboardProps, any> {
  gridStack;
  grid;
  searchInput;
  constructor(props) {
    super(props);
    this.state = {
      showMoreMenu: false,
      compareData: [],
      loaded: false,
      showSearch: false,
      searchTodos: [],
      theme: '',
      move: false,
      serachName: '', //  设置中的搜索
    };
  }
  componentDidMount() {
    let lan = store.get('local_language');
    let language  = lan === 'zh' ? 'chinese' : 'english';
    this.getAllCards(language);
    this.props.resetQuerys()
  }
  componentWillUnmount() {
    const { resetCard, resetTodo, } = this.props;
    resetCard();
    resetTodo()
  }
  // 获取所有卡片
  getAllCards = (language) => {
    this.props.getAllCards({
      language,
      cb: (err, data) => {
        this.setState({
          loaded: true,
        })
        if (data) {
          var resolve = _.partial(_.map, _, 'id');
          let compareData = resolve(data.data.completes);
          this.setState({
            compareData,
            theme: data.data.theme
          });
        }
      }
    });
  }
  // 展示更多卡片
  showMoreMenu = () => {
    this.setState({
      showMoreMenu: true
    });
    this.searchCards('');
  };
  // 隐藏更多卡片
  hideMoreMenu = () => {
    this.setState({
      showMoreMenu: false
    });
  };
  // 切换主题
  changeTheme = () => {
    let { theme, showMoreMenu } = this.state;
    let { changeTheme,  } = this.props;
    //  方案一 刷新页面
    !showMoreMenu && changeTheme({
      theme: theme === 'theme_0' ? 'theme_1' : 'theme_0',
      cb: (err, res) => {
        window.location.reload();
      }
    });
  };
  // 保存卡片
  onChange = (data, data2, move) => {
    if(this.state.showMoreMenu || !move) {
      var resolve = _.partial(_.map, _, 'id');
      this.setState({
        compareData: resolve(data)
      });
      this.props.saveCards({
        cb: (err, data) => { },
        data: {
          theme: '',
          completes: data,
          todos: data2
        }
      });
    }
  };
  // 获取拖拽（搜索）卡片列表
  searchCards = (serachName) => {
    let language  = store.get('local_language') === 'zh' ? 'chinese' : 'english';
    this.props.searchCards({
      cb: (err, data) => {
        let _searchTodos = data && data.data ? data.data.todos : [];
        this.setState({ showSearch: true, searchTodos: _searchTodos, serachName }, () => {
        });
      },
      serachName,
      language
    });
  }
  renderSearchTodos = () => {
    const { formatMessage } = this.props.intl;
    const { compareData, searchTodos, showSearch, serachName, showMoreMenu } = this.state;
    let c_w = '100%';
    let c_h = cell_h * 2;
    if (!showSearch) return '';
    if (!searchTodos && serachName) {
      return (
        <div className="placeholder-box">
          <img src={require('../../assets/images/placeholder.png')} alt="" />
          <p>{formatMessage(dashboard_msg.search_no_message)}～</p>
        </div>
      );
    }

    return (
      <Scrollbars 
        style={{ width: c_w, height: c_h,}}
      >
        <Gridstack
          isMain={false}
          onChange={this.onChange}
          compareData={compareData}
          minHeight={`${cell_h * 2}px`}
          float={false}
          row={2}
          data={searchTodos}
          isClick={showMoreMenu}
          name="gridstack2"
          autoPosition={true}
        />
      </Scrollbars>
    );
  };
  renderMoreMenu() {
    let c_h = cell_h * 2;
    let { showMoreMenu } = this.state;
    const { formatMessage } = this.props.intl;
    if (!showMoreMenu) {
      return null;
    }
    return (
      <div className={styles.gridstack_box} id="gridstackBox" style={{ height: `${c_h + 137}px` }}>
        <div className={styles.gridstack_box_top}>
          <span>{formatMessage(dashboard_msg.setting_txt)}…</span>
          <span className={styles.serarch_box}>
            <span className={classNames("iconfont icon-search", styles.icon_search)} />
            <Input
              className=""
              placeholder={formatMessage(dashboard_msg.placeholder_more_search)}
              allowClear={true}
              ref={(node) => {
                this.searchInput = node;
              }}
              onPressEnter={(e) => {
                let serachName = this.searchInput.state.value;
                this.searchCards(serachName);
              }}
              onChange={(e) => {
                if (e.target.value === '') {
                  this.searchCards('');
                }
              }}
            />
          </span>
        </div>
        {this.renderSearchTodos()}
        <div className={styles.gridstack_box_toolbar}>
          <Button className={styles.btn_finish} onClick={this.hideMoreMenu}>
            {formatMessage(dashboard_msg.btn_finish)}
          </Button>
        </div>
      </div>
    );
  }
  
  public render() {
    const { history, intl, } = this.props;
    const { formatMessage } = intl;
    if (!this.state.loaded) {
      return '';
    }
    let { showMoreMenu, } = this.state;
    let { cards, } = this.props;
    const { theme } = this.state;
    let bottom = showMoreMenu ? (cell_h * 2 + 137) : 0;
    const theme_0 = {
      background: `url(${require('../../assets/images/bg1.jpg')}) no-repeat`,
      paddingBottom: bottom,
    }
    const theme_1 = {
      background: `url(${require('../../assets/images/bg2.jpg')}) no-repeat`,
      paddingBottom: bottom,
    }
    let theme_style = theme === 'theme_0' ? theme_0 : theme_1;
    return (
      <div className={classNames(theme,styles.dashboard)} style={theme_style}>
        <div className={styles.container}>
          <header className={styles.header}>
            <img className={styles.logo} src={require('../../assets/images/logo.png')} alt="" />
            <div className={styles.right}>
              <div className={styles.search_box} onClick={()=> {
                if(!showMoreMenu) {
                  history.push('/search')
                }
              }}>
                <span className={classNames('iconfont icon-search', styles.icon_search)} />
                <span className={styles.hr}></span>
                <span>{formatMessage(dashboard_msg.placeholder_search)}</span>
              </div>

              <span
                onClick={this.changeTheme}
                className={classNames('iconfont icon-theme')}
              />

              <span
                className={classNames('iconfont icon-setting')}
                onClick={this.showMoreMenu}
              />

              <Language styles={{ margin: '0 18px'}} portal={showMoreMenu} />
              <News history={history} intl={intl} show={showMoreMenu} />
              <Center history={history} intl={intl} show={showMoreMenu} />
            </div>
          </header>
      
          <Row className={styles.portalCards}>
            <Scrollbars>
              <Gridstack
                onChange={this.onChange}
                isMain={true}
                float={true}
                row={5}
                name="gridstack1"
                autoPosition={false}
                className="gridstack"
                data={cards}
                isClick={showMoreMenu}
              />
            </Scrollbars>
          </Row>
        </div>
        {
          showMoreMenu ? this.renderMoreMenu() : null
        }
      </div>
    );
  }
}

const mapState2Props = ({ 
  portal: { 
    cards,
    todos 
  },
}) => ({
  cards, 
  todos,
})
const mapDispatch2Props = ({
  portal: {
    getAllCards, 
    changeTheme, 
    saveCards, 
    searchCards, 
    resetCard,
    resetTodo,
  },
  search: {
    resetQuerys
  }
}:any) =>({
  getAllCards, 
  changeTheme, 
  saveCards, 
  searchCards, 
  resetCard,
  resetTodo,
  resetQuerys
})

export default connect(
  mapState2Props,
  mapDispatch2Props
)(injectIntl(Dashboard))
