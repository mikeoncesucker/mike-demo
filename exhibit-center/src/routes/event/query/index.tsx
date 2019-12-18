
import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import moment from 'moment';
import Hash from '../../../util/hash';
import { FormattedMessage } from "react-intl";
import {
  Button,
  Table,
  Select,
  DatePicker,
  Tooltip,
  Result
} from "antd";
import { Link } from "react-router-dom";
export interface EventQuery {
  classes: any;
  match: any;
  locale: any;
  list: any;
  location: any;
  eventLevelList: any;
  total: any;
  eventTypeList: any;
  appCodeList: any;
  resourcesLabel: any;
  eventPageState: any;
  putEventPageState: Function;
  getEventLevelList: Function;
  getEventTypeList: Function;
  getAppCodeList: Function;
  queryPage: Function;
  queryParams: Function;
  getList: Function
}
const styles: any = (theme: any) => {
  return {
    col: {
      maxWidth: 200,
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
    },
    list: {
      // backgroundColor: '#ccc',
    },
    searchBox: {
      '& >span': {
        paddingRight: '6px'
      },
      marginBottom: "10px",
      "& .ant-select, & input": {
        width: "150px",
        marginRight: "10px",
        marginBottom: "5px",
      },
      "& .ant-calendar-picker": {
        marginRight: "10px",
        " & input": {
          width: "100px"
        }
      }
    },
    gridIcon: {
      '& span': {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '4px',
      }
    }
  }
};

class User extends React.Component<EventQuery, any> {
  constructor(props: Readonly<EventQuery>) {
    super(props);
    this.state = {
      level: 'all',
      typeId: 'all',
      appCode: 'all',
      startTime: '',
      endTime: '',
      time: null,
      page: 1,
      limit: 10,
      status: 1
    }
  }

  async componentDidMount() {
    const { location, eventPageState } = this.props
    await this.props.getEventLevelList();
    await this.props.getEventTypeList();
    await this.props.getAppCodeList();
    const hash = Hash.get();
    const {
      typeId,
      appCode,
    } = this.state;
    if (location.state) {
      sessionStorage.setItem("level", location.state.index);
      sessionStorage.setItem("startTime", location.state.startTime);
      sessionStorage.setItem("endTime", location.state.endTime);
    }

    const Time = location.state && location.state.time;
    const level = sessionStorage.getItem('level');
    const startTime = sessionStorage.getItem('startTime');
    const endTime = sessionStorage.getItem('endTime');
    this.setState(
      Time >= 0 ?
        {
          level: level,
          time: Time === 4 ? null : Time,
          typeId: typeId === '' ? 'all' : typeId,
          appCode: appCode === '' ? 'all' : appCode,
          startTime: startTime,
          endTime: endTime, page: 1, limit: 10,
          ...eventPageState

        } : {
          level: 'all',
          typeId: 'all',
          appCode: 'all',
          startTime: '',
          endTime: '',
          time: Time === 4 ? null : Time,
          page: 1, limit: 10,
          ...eventPageState
        });

    this.setState(hash, () => {
      const { putEventPageState } = this.props;
      putEventPageState({
        eventPageState: { ...this.state }
      });
      this.props.queryPage({ params: this.queryParams });
    });

    document.body.addEventListener("keyup", this.enterPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keyup", this.enterPress);
  };

  get queryParams() {
    const {
      level,
      typeId,
      appCode,
      startTime,
      endTime,
      page,
      limit
    } = this.state;

    return {
      level: level === 'all' ? '' : level,
      typeId: typeId === 'all' ? '' : typeId,
      appCode: appCode === 'all' ? '' : appCode,
      startTime, endTime, page, limit
    }

  }
  onChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  doSearch = () => {
    this.setState({ page: 1 }, () => {
      this.getList();
    })
  };
  enterPress = (e: any) => {
    let code = e.charCode || e.keyCode;
    if (code === 13) {
      this.doSearch();
    }
  };
  getList = () => {
    const hash = Hash.get();
    this.setState(hash, () => {
      this.props.queryPage({
        params: this.queryParams, cb: () => {
          const { putEventPageState } = this.props;
          putEventPageState({
            eventPageState: {
              ...this.state
            }
          });
        }
      });
    });
  }
  onPageChange = (page: any, limit: any) => {
    this.setState({ page, limit }, () => this.getList());
  }
  disabledDate = (current: any) => {
    return current > moment().subtract('day');
  }
  render() {
    const { classes, match, list, eventLevelList, total, eventTypeList, appCodeList, locale, resourcesLabel, } = this.props;
    if (!resourcesLabel) return <div></div>;
    if (resourcesLabel.indexOf("event_query") < 0)
      return (
        <FormattedMessage id="auth.noAuth" defaultMessage="No Auth">
          {(text: any) => {
            return <Result status="warning" title={text} />;
          }}
        </FormattedMessage>
      );
    const { level, typeId, appCode, startTime, endTime, page, limit } = this.state;
    const columns = [
      {
        title: (
          <FormattedMessage
            id="event.sourceSystem"
            defaultMessage="Source System"
          />
        ),
        dataIndex: "appName",
        render: (text: any, record: any) => {
          const item = appCodeList.find((item: any) => item.name === text);
          return (
            <Link
              to={`${match.path}/detail/${record.id}`}
            >
              <Tooltip placement="topLeft"
                title={locale === 'zh' ? item.name : item.english}>
                <span className={`${classes.col}`} style={{ maxWidth: '160px', display: 'inline-block' }}>
                  {locale === 'zh' ? item.name : item.english}
                </span>
              </Tooltip>
            </Link>

          );
        }
      },
      {
        title: (
          <FormattedMessage id="event.eventType" defaultMessage="Event Type" />
        ),
        dataIndex: "typeName",
        render: (text: any) => {
          const item = eventTypeList.find((item: any) => item.name === text);
          return item ? (
            locale === 'zh' ? item.name : item.english
          ) : (
              "--"
            );
        }
      },
      {
        title: <FormattedMessage id="event.eventLevel" defaultMessage="Event Level" />,
        dataIndex: "level",
        render: (text: any) => {
          const item = eventLevelList.find((item: any) => item.code === text);
          const color = item ? item.color : "";
          return item ? (
            <span className={`${classes.gridIcon}`}>
              <span style={{ background: color }}></span>
              {locale === 'zh' ? item.label : item.english || ""}
            </span>
          ) : (
              "--"
            );
        }
      },
      {
        title: <FormattedMessage id="event.descriptiveInformation" defaultMessage="Event Title" />,
        dataIndex: "title",
        render: (title: any) => {
          return (
            <Tooltip placement="topLeft" title={title} trigger="click">
              <span className={`${classes.col}`}>
                {title}
              </span>
            </Tooltip>
          );
        }
      },
      {
        title: <FormattedMessage id="event.occurrenceTime" defaultMessage="Occurrence Time" />,
        dataIndex: "occurTime",
        width: 200
      },
      {
        title: <FormattedMessage id="action.action" defaultMessage="Action" />,
        render: (text: string, record: any) => (
          <Link to={`${match.path}/detail/${record.id}`}><FormattedMessage id="order.view" defaultMessage="View" /></Link>
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
    const levels = sessionStorage.getItem('level');
    const valus = levels && eventLevelList.find((item: any) => item.code === Number(levels))
    const levelValue = valus ? valus.label : level
    return (
      <div className={classes.root}>
        <div className={classes.searchBox}>
          <span>
            <FormattedMessage
              id="event.eventLevel"
              defaultMessage="Event Level"
            />
            :{" "}
          </span>
          <Select
            getPopupContainer={triggerNode => triggerNode}
            value={level === 'undefined' ? 'all' : level}
            defaultValue={levelValue === 'undefined' ? 'all' : levelValue}
            onChange={(value: any) => {
              this.setState({ level: value });
            }}
          >
            <Select.Option value="all" ><FormattedMessage id="event.allEventLevel" defaultMessage="allEventLevel" /></Select.Option>
            {
              eventLevelList.map((item: any, index: number) => {
                return <Select.Option key={index} value={item.code + ''} >{locale === 'zh' ? item.label : item.english}</Select.Option>
              })
            }
          </Select>

          <span><FormattedMessage id="event.eventType" defaultMessage="Event Type" />: </span>
          <Select
            value={typeId}
            getPopupContainer={triggerNode => triggerNode}
            onChange={(value: any) => {
              this.setState({ typeId: value });
            }}
          >
            <Select.Option value="all" ><FormattedMessage id="event.allEventType" defaultMessage="allEventType" /></Select.Option>
            {
              eventTypeList.map((item: any, index: number) => {
                return <Select.Option key={index} value={item.id + ''} >{locale === 'zh' ? item.name : item.english}</Select.Option>
              })
            }
          </Select>

          <span><FormattedMessage id="event.sourceSystem" defaultMessage="Source System" />: </span>
          <Select
            value={appCode}
            getPopupContainer={triggerNode => triggerNode}
            onChange={(value: any) => {
              this.setState({ appCode: value });
            }}
          >
            <Select.Option value="all">
              <FormattedMessage
                id="event.allSourceSystem"
                defaultMessage="allSourceSystems"
              />
            </Select.Option>
            {appCodeList.map((item: any, index: number) => {
              return (
                <Select.Option key={index} value={item.code}>
                  {locale === "zh" ? item.name : item.code}
                </Select.Option>
              );
            })}
          </Select>
          {locale === 'zh' ? null : <br></br>}
          <span><FormattedMessage id="event.occurrenceTime" defaultMessage="Occurrence Time" />:</span>
          <DatePicker.RangePicker
            disabledDate={this.disabledDate}
            value={(startTime && endTime) ? [moment(startTime), moment(endTime)] : []}
            onChange={(date, dateString) => {
              this.setState({
                startTime: dateString[0],
                endTime: dateString[1]
              });
            }}
            getCalendarContainer={(triggerNode): any => triggerNode.parentNode}
          />
          <Button type="primary" onClick={this.doSearch}><FormattedMessage id="action.search" defaultMessage="Search" /></Button>
        </div>
        <Table
          rowKey="id"
          className={classes.list}
          pagination={pagination}
          columns={columns}
          dataSource={list}
          locale={{ emptyText: (<FormattedMessage id="event.noInFormationWasFound" defaultMessage="No results found" />) }}
        />
      </div>
    );
  }
}

const mapState2Props = ({ event: { list, eventLevelList, total, eventTypeList, appCodeList }, intl: { locale },
  app: { resourcesLabel },
  pageState: { eventPageState }
}: any) => ({
  list, eventLevelList, total, eventTypeList, appCodeList, locale, resourcesLabel, eventPageState
});
const mapDispatch2Props = ({
  event: { getEventTypeList, getEventLevelList, getAppCodeList, queryPage, queryParams, getList },
  pageState: { putEventPageState }
}: any) => ({
  getEventTypeList, getEventLevelList, getAppCodeList, queryPage, queryParams, getList, putEventPageState
});

export default withStyles(styles)(connect(mapState2Props, mapDispatch2Props)(User));