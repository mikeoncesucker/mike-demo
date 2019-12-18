import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Button, Table, Switch, message, Popconfirm, Select, Tooltip, Divider, Result } from "antd";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
export interface EventConfig {
  classes: any;
  match: any;
  history: any;
  locale: any;
  configListData: any;
  eventLevelList: any;
  forwardTypeList: any;
  eventTypeList: any;
  appCodeList: any;
  peopleInfoList: any;
  eventTitleList: any;
  eventConfigPageState: any;
  putEventConfigPageState: Function;
  getEventTitleList: Function;
  getEventLevelList: Function;
  getEventTypeList: Function;
  getAppCodeList: Function;
  editConfig: Function;
  deleteConfig: Function;
  getForwardTypeList: Function;
  getConfigList: Function;
  getPeopleInfoList: Function;
  setPeopleInfoList: Function;
  resourcesLabel: any;
}

const styles: any = (theme: any) => {
  const color = (color: string) => ({
    color: color,
    '& span': {
      background: color
    }
  });
const media = window.screen.width
  return {
    
    col: {
      maxWidth: media <= 1280 ? 160 : 260,
      minWidth: 60,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      cursor: 'pointer',
      WebkitLineClamp: 3, 
      display: "inherit"
    },
    root: {
      margin: "20px",
      backgroundColor: "#FFFFFF",
      padding: "20px",
      position: 'relative'
    },
    searchBox: {
      marginBottom: "10px",
      paddingRight: '100px',

      "& .ant-select, & input": {
        width: "150px",
        marginRight: "20px",
        marginBottom: "5px",
      },
      "& .ant-calendar-picker": {
        marginRight: "10px",
        " & input": {
          width: "100px"
        }
      }
    },
    create: {
      textAlign: 'right',
      position: 'absolute',
      right: '20px',
      top: '20px',
      paddingBottom: '20px'
    },
    gridIcon: {
      '& span': {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '4px',
      },
      '&.red': color('#F54238')
    },
    operate: {
      // minWidth: "150px",
      // '& a': {
      //   margin: '5px'
      // },
      '& .delete': {
        color: '#F54238',
        cursor: 'pointer',
        margin: '5px'
      }
    },

  }
};

class User extends React.Component<EventConfig, any, any> {
  constructor(props: EventConfig) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      level: 'all',
      typeId: 'all',
      appCode: 'all',
      fwType: 'all',
      fwTargets: 'all',
      fwEnabled: 'all',
    };
  };
  componentDidMount() {
    this.props.getEventLevelList();
    this.props.getEventTypeList();
    this.props.getAppCodeList();
    this.props.getForwardTypeList();
    this.props.getPeopleInfoList('');
    this.props.getEventTitleList();
    const { eventConfigPageState } = this.props
    this.setState({ ...eventConfigPageState }, () => {
      this.getConfigList();
    });
    document.body.addEventListener("keyup", this.enterPress);
  };

  componentWillUnmount() {
    document.body.removeEventListener("keyup", this.enterPress);
  };

  goToCreate = () => {
    const { history, match } = this.props;
    history.push(`${match.path}/create`);
  };
  getConfigList = () => {
    const { limit, page, level, typeId, appCode, fwType, fwTargets, fwEnabled } = this.state;

    this.setState(() => {
      this.props.getConfigList({
        params: {
          limit,
          page,
          level: level === 'all' ? '' : level,
          typeId: typeId === 'all' ? '' : typeId,
          appCode: appCode === 'all' ? '' : appCode,
          fwType: fwType === 'all' ? '' : fwType,
          fwTargets: fwTargets === 'all' ? '' : fwTargets,
          fwEnabled: fwEnabled === 'all' ? '' : fwEnabled
        }, cb: () => {
          const { putEventConfigPageState } = this.props;
          putEventConfigPageState({
            eventConfigPageState: {
              ...this.state
            }
          });
        }
      })
    });
  }
  onPageChange = (page: any, limit: any) => {
    this.setState({ page, limit }, () => this.getConfigList());
  }
  //控制是否启用推送
  changeSend = (checked: boolean, item: any) => {
    const { locale, peopleInfoList } = this.props
    const target = item.fwTargets.split()
    const fwTargets = target.reduce((pre: any, key: any) => {
      const item = peopleInfoList.find((item: any) => item.name === key);
      if (item) {
        const data = {
          id: item.id,
          name: item.name,
        };
        pre.push(data);
      }
      return pre;
    }, []);
    this.props.editConfig({
      params: {
        ...item,
        fwTargets: JSON.stringify(fwTargets),
        fwTplText: "模板样式A" ? 1 : 2,
        fwEnabled: checked ? 1 : 0
      },
      cb: (error: any) => {
        if (error.code === "200") {
          message.success(locale === 'zh' ? '修改成功' : 'Successful revision');
        } else {
          message.error(locale === 'zh' ? '修改失败' : 'Modification failed');
        }
        this.getConfigList();
      }
    });
  }
  delete = (item: any) => {
    const { locale, getConfigList } = this.props;
    const { page, limit } = this.state;
    this.props.deleteConfig({
      params: {
        id: item.id,
      },
      cb: (error: any) => {
        if (error) {
          message.success(locale === 'zh' ? '删除失败' : 'Delete failed');
        } else {
          getConfigList({
            params: {
              page,
              limit
            },
            cb: (error: any, data: any) => {
              if (data.list.length === 0) {
                getConfigList({
                  params: {
                    page: page - 1,
                    limit,
                  },
                  cb: null
                })
              }
            }
          });
          message.success(locale === 'zh' ? '删除成功' : 'Successful deletion');
        }

      }
    });
  }
  onSearch = () => {
    this.setState({ page: 1 }, () => {
      this.getConfigList();
    });
  }
  enterPress = (e: any) => {
    let code = e.charCode || e.keyCode;
    if (code === 13) {
      this.onSearch();
    }
  };
  isShowByResourcesLabel = (label: string) => {
    const { resourcesLabel } = this.props;
    return resourcesLabel.indexOf(label) > -1;
  };

  componentWillMount() {
    const { configListData } = this.props;
    configListData.list = []
  }


  render() {
    const {
      classes,
      match,
      configListData,
      eventLevelList,
      eventTypeList,
      appCodeList,
      forwardTypeList,
      peopleInfoList,
      eventTitleList,
      locale,
      resourcesLabel
    } = this.props;
    if (!resourcesLabel) return <div></div>;
    
    if (resourcesLabel.indexOf("event_list_get") < 0)
      return (
        <FormattedMessage id="auth.noAuth" defaultMessage="No Auth">
          {(text: any) => {
            return <Result status="warning" title={text} />;
          }}
        </FormattedMessage>
      );
    const { level, typeId, appCode, page, limit, fwType, fwTargets, fwEnabled } = this.state;
    const total = configListData.total;
    const data = configListData.list;
    const columns = [
      {
        title: (
          <FormattedMessage
            id="event.eventType"
            defaultMessage="Event Type"
          />
        ),
        dataIndex: "typeId",
        render: (text: any, record: any) => {

          const item = eventTypeList.find((item: any) => item.id === text);
          return item ? (locale === 'zh' ?
            <Link to={`${match.path}/detail/${record.id}`}>{item.name}</Link>
            : <Link to={`${match.path}/detail/${record.id}`}>{item.english} </Link>) : ("--");
        }
      },
      {
        title: (
          <FormattedMessage
            id="event.eventLevel"
            defaultMessage="Event Level"
          />
        ),
        dataIndex: "level",
        render: (text: any) => {
          const item = eventLevelList.find((item: any) => item.code === text);
          if (item) {
            const color = item.color || '';
            return <span className={`${classes.gridIcon}`}>
              <span style={{ backgroundColor: color }}></span>{locale === 'zh' ? item.label : item.english || ''}
            </span>
          } else {
            return text
          }
        }
      },
      {
        title: (
          <FormattedMessage
            id="event.sourceSystem"
            defaultMessage="Source System"
          />
        ),
        dataIndex: "appCode",
        render: (text: any) => {
          const item = appCodeList.find((item: any) => item.code === text);
          return (
            <Tooltip placement="topLeft"
              trigger="click"
              title={item ? (locale === 'zh' ? item.name : item.english) : null}>
              <span className={`${classes.col}`}>
                {item ? (locale === 'zh' ? item.name : item.english) : null}
              </span>
            </Tooltip>
          );
        }
      },
      {
        title: () => {
          return this.isShowByResourcesLabel("event_push") ? (
            <FormattedMessage id="event.whetherPushIsEnabled" defaultMessage="Enable Push" />
          ) : null;
        },
        dataIndex: "fwEnabled",
        render: (value: any, scope: any) => {

          return this.isShowByResourcesLabel("event_push") ? (<Switch
            size="small"
            defaultChecked={!!value}
            onChange={(checked) => this.changeSend(checked, scope)}
          />) : null
        }
      },
      {
        title: (
          <FormattedMessage
            id="event.notificationChannel"
            defaultMessage="Notification Channel"
          />
        ),
        dataIndex: "fwType",
        render: (text: any) => {
          const textArr = text ? text.split(',') : [];
          const value = textArr.reduce((pre: any, code: any) => {
            const valueItem = forwardTypeList.find((item: any) => item.code === Number(code));
            if (locale === 'zh') {
              if (valueItem) {
                pre.push(valueItem.label);
              }
            } else {
              pre.push(valueItem.english)
            }
            return pre;
          }, []);
          return (value && value.length > 0) ? value.join(',') : text;
        }
      },
      {
        title: (
          <FormattedMessage
            id="event.notificationObject"
            defaultMessage="Notification Object"
          />
        ),
        dataIndex: "fwTargets",
        render: (text: any) => {
          return (
            <Tooltip placement="topLeft"
              trigger="click"
              title={text}>
              <span className={`${classes.col}`} style={{maxWidth: '80px'}}>
                {text}
              </span>
            </Tooltip>
          );
        }
      },
      {
        title: (
          <FormattedMessage
            id="event.messageTemplate"
            defaultMessage="SMS Template"
          />
        ),
        dataIndex: "fwTplText",
        render: (text: any) => {
          const item = eventTitleList.find((item: any) => item.tplTitle === text)
          return item ? (locale === 'zh' ? item.tplTitle : item.english) : ('--')
        }
      },
      {
        title: () => {
          return this.isShowByResourcesLabel("event_get") ||
            this.isShowByResourcesLabel("event_put") || this.isShowByResourcesLabel("event_delete") ? (
              <FormattedMessage id="order.operate" defaultMessage="Action" />
            ) : null;
        },
        render: (text: string, record: any) => (
          <div className={classes.operate}>
            {
              this.isShowByResourcesLabel("event_get") &&
              (
                <Link to={`${match.path}/detail/${record.id}`}>
                  <FormattedMessage id="order.view" defaultMessage="View" />
                </Link>
              )
            }
            {
              ((this.isShowByResourcesLabel("event_get") && this.isShowByResourcesLabel("event_put")) || 
              this.isShowByResourcesLabel("event_get")) && this.isShowByResourcesLabel("event_delete") ?
              (<Divider type="vertical" style={{ margin: 0 }} />) : null
            }
            {
              this.isShowByResourcesLabel("event_put") && (
                <Link to={`${match.path}/edit/${record.id}`}>
                  <FormattedMessage id="action.edit" defaultMessage="Edit" />
                </Link>
              )
            }
            {
              this.isShowByResourcesLabel("event_delete") && this.isShowByResourcesLabel("event_put") && (
                <Divider type="vertical" style={{ margin: 0 }} />
              )
            }
            {
              this.isShowByResourcesLabel("event_delete") &&
              (
                <span className="delete" >
                  <Popconfirm
                    title={
                      <FormattedMessage
                        id="event.determineToDeleteThisRule"
                        defaultMessage="Confirm to delete this rule?"
                        tagName="p"
                      />
                    }
                    onConfirm={() => this.delete(record)}
                    okText={
                      <FormattedMessage id="action.yes" defaultMessage="Yes" />}
                    cancelText={
                      <FormattedMessage id="action.no" defaultMessage="No" />
                    }
                  >
                    <Link to="./" style={{ color: "red" }}>
                      {<FormattedMessage
                        id="action.delete"
                        defaultMessage="Delete"
                      ></FormattedMessage>}
                    </Link>
                  </Popconfirm>
                </span>
              )
            }

          </div>
        )
      }
    ];
    const pagination = {
      showSizeChanger: true,
      showQuickJumper: {
        goButton: (
          <Button style={{ marginLeft: "10px" }}>
            <FormattedMessage id="order.skip" defaultMessage="Jump" />
          </Button>
        )
      },
      showTotal: (total: number) => {
        return (
          <FormattedMessage
            id="pay.total"
            defaultMessage={`Total ${total} items`}
            values={{ total }}
          />
        );
      },
      total,
      pageSize: Number(limit),
      current: Number(page),
      onChange: this.onPageChange,
      onShowSizeChange: this.onPageChange
    };
    const noPush = locale === 'zh' ? '不推送' : 'No Push';
    const Push = locale === 'zh' ? '推送' : 'Push';
    return (
      <div className={classes.root}>
        <div className={classes.create}>
          {this.isShowByResourcesLabel("event_create") && (
            <Button type="primary" onClick={this.goToCreate}>
              <FormattedMessage id="action.createRules" defaultMessage="Create Rules" />
            </Button>
          )}
        </div>
        <div className={classes.searchBox}>
          <span className={classes.searchNav}>
            <FormattedMessage id="event.eventLevel" defaultMessage="Event Level" />： 
          </span>
          <Select
            value={level}
            getPopupContainer={triggerNode => triggerNode}
            onChange={(value: any) => {
              this.setState({ level: value });
            }}
          >
            <Select.Option value="all" >
              <FormattedMessage id="event.allEventLevel" defaultMessage="allEventLevel" />
            </Select.Option>
            {
              eventLevelList.map((item: any, index: number) => {
                return <Select.Option key={index} value={item.code + ''} >
                  {locale === 'zh' ? item.label : item.english}
                </Select.Option>
              })
            }
          </Select>

          <span className={classes.searchNav}>
            <FormattedMessage id="event.sourceSystem" defaultMessage="sourceSystem" />：
          </span>
          <Select
            value={appCode}
            getPopupContainer={triggerNode => triggerNode}
            onChange={(value: any) => {
              this.setState({ appCode: value });
            }}
          >
            <Select.Option value="all" >
              <FormattedMessage id="event.allSourceSystem" defaultMessage="allSourceSystems" />
            </Select.Option>
            {
              appCodeList.map((item: any, index: number) => {
                return <Select.Option key={index} value={item.code} >{locale === 'zh' ? item.name : item.code}</Select.Option>
              })
            }
          </Select>
          <span className={classes.searchNav}>
            <FormattedMessage id="event.notificationObject" defaultMessage="Notification Object" />：
          </span>
          <Select
            value={fwTargets}
            getPopupContainer={triggerNode => triggerNode}
            onChange={(value: any) => {
              this.setState({ fwTargets: value });
            }}
          >
            <Select.Option value="all" >
              <FormattedMessage id="event.allPersonResponsible" defaultMessage="allNotificationObject" />
            </Select.Option>
            {
              peopleInfoList.map((item: any) => {
                return <Select.Option key={item.id} value={item.name + ''}>{item.name}</Select.Option>
              })
            }
          </Select>

          <br />
          <span className={classes.searchNav}>
            <FormattedMessage id="event.notificationChannel" defaultMessage="notificationChannel" />： 
          </span>
          <Select
            value={fwType}
            getPopupContainer={triggerNode => triggerNode}
            onChange={(value: any) => {
              this.setState({ fwType: value });
            }}
          >
            <Select.Option value="all" >
              <FormattedMessage id="event.allChannel" defaultMessage="allChannels" />
            </Select.Option>
            {
              forwardTypeList.map((item: any, index: number) => {
                return <Select.Option value={item.code + ''} key={index}>
                  {locale === 'zh' ? item.label : item.english}
                </Select.Option>
              })
            }
          </Select>

          <span className={classes.searchNav}> 
            <FormattedMessage id="event.eventType" defaultMessage="Event Type" />：
          </span>
          <Select
            value={typeId}
            getPopupContainer={triggerNode => triggerNode}
            onChange={(value: any) => {
              this.setState({ typeId: value });
            }}
          >
            <Select.Option value="all" >
              <FormattedMessage id="event.allEventType" defaultMessage="allEventType" />
            </Select.Option>
            {
              eventTypeList.map((item: any, index: number) => {
                return <Select.Option key={index} value={item.id + ''} >
                    {locale === 'zh' ? item.name : item.english}
                </Select.Option>
              })
            }
          </Select>
          <span className={classes.searchNav}>
            <FormattedMessage id="event.whetherPushIsEnabled" defaultMessage="Enable Push" />：
          </span>
          <Select
            value={fwEnabled}
            getPopupContainer={triggerNode => triggerNode}
            onChange={(value: any) => {
              this.setState({ fwEnabled: value });
            }}
          >
            <Select.Option value="all">
              <FormattedMessage id="event.allPush" defaultMessage="allPush" />
            </Select.Option>
            <option value="0">{noPush}</option>
            <option value="1">{Push}</option>
          </Select>
          <Button type="primary" onClick={this.onSearch}>
            <FormattedMessage id="action.search" defaultMessage="Search" />
          </Button>
        </div>
        <Table
          rowKey="id"
          className={classes.list}
          pagination={pagination}
          columns={columns}
          dataSource={data}
          locale={{ 
            emptyText: (<FormattedMessage 
              id="event.noInFormationWasFound" 
              defaultMessage="No results found" 
            />) 
          }}
        />
      </div>
    );
  }
}

const mapState2Props = ({ 
  event: { 
    configListData, 
    eventLevelList, 
    forwardTypeList, 
    eventTypeList, 
    appCodeList, 
    eventTitleList, 
    peopleInfoList 
  }, 
  intl: { locale },
  app: { resourcesLabel },
  pageState: { eventConfigPageState }
}: any) => ({
  configListData,
  eventLevelList,
  eventTypeList,
  appCodeList,
  forwardTypeList,
  peopleInfoList,
  eventTitleList,
  locale,
  resourcesLabel,
  eventConfigPageState
});
const mapDispatch2Props = ({
  event: { 
    getEventTypeList, 
    getEventTitleList, 
    getEventLevelList, 
    getAppCodeList, 
    editConfig, 
    deleteConfig, 
    getForwardTypeList, 
    getConfigList, 
    getPeopleInfoList, 
    setPeopleInfoList 
  },
  pageState: { putEventConfigPageState }
}: any) => ({
  getEventTypeList, 
  getEventTitleList, 
  getEventLevelList, 
  getAppCodeList, 
  editConfig, 
  deleteConfig, 
  getForwardTypeList, 
  getConfigList, 
  getPeopleInfoList, 
  setPeopleInfoList, 
  putEventConfigPageState
});
export default withStyles(styles)(
  connect(
    mapState2Props, 
    mapDispatch2Props
  )(User)
);
