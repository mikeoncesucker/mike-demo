import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input, } from 'antd';
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
  getSystemAuthorityByName;
  resetCard;
  resetTodo;
  user;
  cards;
  todos;
  changeTheme;
  intl;
  resetQuerys;
}
class Dashboard extends React.Component<IDashboardProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      showMoreMenu: false,
      compareData: [],
      loaded: false,
      searchTodos: [],
      theme: '',
      serachName: '',
    };
  }
  componentDidMount() {
    this.getAllCards();
    this.props.resetQuerys()
  }
  componentWillUnmount() {
    const { resetCard, resetTodo, } = this.props;
    resetCard();
    resetTodo()
  }
  // 获取所有卡片
  getAllCards = () => {
    let language  = store.get('local_language') === 'zh' ? 'chinese' : 'english';
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
  // 底部卡片的展示/隐藏
  toggleMoreMenu = (boolean) => {
    this.setState({
      showMoreMenu: boolean
    });
    boolean && this.searchCards('')
  };
  // 切换主题
  changeTheme = () => {
    let { theme, showMoreMenu } = this.state;
    //  方案一 刷新页面
    !showMoreMenu && this.props.changeTheme({
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
        this.setState({ 
          searchTodos: _searchTodos, 
          serachName
        });
      },
      serachName,
      language
    });
  }
  renderMoreMenu() {
    const { formatMessage } = this.props.intl;
    const { compareData, searchTodos, showMoreMenu, serachName, theme} = this.state;
    return (
      <div className={styles.gridstack_box} id="gridstackBox">
        <div className={styles.gridstack_box_top}>
          <span>{formatMessage(dashboard_msg.setting_txt)}…</span>
          <Input 
            className={styles.serarch_box}
            placeholder={formatMessage(dashboard_msg.placeholder_more_search)}
            allowClear
            prefix={<span className={classNames("iconfont icon-search")} />}
            onChange={(e) => {
              this.searchCards(e.target.value);
            }}
          />
        </div>
        <div className={styles.bottom_cards}>
          { (searchTodos || !serachName)
            ?<Scrollbars style={{height: '100%'}}>
              <Gridstack
                isMain={false}
                onChange={this.onChange}
                compareData={compareData}
                float={false}
                data={searchTodos}
                isClick={showMoreMenu}
                name="gridstack2"
                autoPosition={true}
                theme={theme}
              />
            </Scrollbars>
            :<div className={styles.placeholder_box}>
              <img src={require('../../assets/images/placeholder.png')} alt="" />
              <p>{formatMessage(dashboard_msg.search_no_message)}～</p>
            </div>
          }
        </div>
        <div className={styles.gridstack_box_toolbar}>
          <Button className={styles.btn_finish} onClick={this.toggleMoreMenu.bind(this,false)}>
            {formatMessage(dashboard_msg.btn_finish)}
          </Button>
        </div>
      </div>
    );
  }
  
  public render() {
    const { history, intl, cards, user, getSystemAuthorityByName } = this.props;
    const { showMoreMenu, theme, } = this.state;
    const { formatMessage } = intl;
    if (!this.state.loaded || !theme) {
      return '';
    }
    let bottom = showMoreMenu ? '3.57rem' : 0;
    const theme_bg = {
      background: `url(${require('../../assets/images/bg' + (theme === 'theme_0' ? 1 : 2) + '.jpg')})`,
      marginBottom: bottom
    }
  
    return (
      <div className={classNames(theme,styles.dashboard)} style={theme_bg}>
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
                onClick={this.toggleMoreMenu.bind(this,true)}
              />

              <Language styles={{ margin: '0 .18rem'}} portal={showMoreMenu} />
              <News history={history} intl={intl} show={showMoreMenu} />
              <Center history={history} intl={intl} show={showMoreMenu} />
            </div>
          </header>
          <div className={styles.topCards}>
            <Gridstack
              onChange={this.onChange}
              authentication={getSystemAuthorityByName}
              userId={ user.data.user.userId}
              isMain={true}
              float={false}
              name="gridstack1"
              autoPosition={false}
              data={cards}
              isClick={showMoreMenu}
              theme={theme}
            />
          </div>
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
  user: {
    user,
  },
}) => ({
  cards, 
  todos,
  user
})
const mapDispatch2Props = ({
  portal: {
    getAllCards, 
    changeTheme, 
    saveCards, 
    searchCards,
    getSystemAuthorityByName,
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
  getSystemAuthorityByName,
  resetCard,
  resetTodo,
  resetQuerys
})

export default connect(
  mapState2Props,
  mapDispatch2Props
)(injectIntl(Dashboard))
