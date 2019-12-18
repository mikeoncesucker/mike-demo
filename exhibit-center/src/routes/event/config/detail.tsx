import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import Table from '../../../compontents/column_table';
import _ from 'lodash';
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
const styles: any = (theme: any) => {
  return {
    col: {
      maxWidth: 600,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      cursor: 'pointer',
      WebkitLineClamp: 3,
      display: "inherit"
    },
    root: {
      margin: '20px',
      padding: '26px 20px',
      background: '#fff',
      "& .Component-root-42 td": {
        minWidth: '214px'
      }
    },
    title: {
      fontSize: '20px',
      color: '#33353D',
    },
  }
};

class Detail extends React.Component<any, any> {
  get id() {
    return this.props.match.params.id;
  }
  componentDidMount() {
    this.props.getConfigDetail({ id: this.id });
    this.props.getEventLevelList();
    this.props.getEventTypeList();
    this.props.getAppCodeList();
    this.props.getForwardTypeList();
    this.props.getEventTitleList();
  }
  componentWillUnmount() {
    this.props.setConfigDetail({});
  }
  render() {
    const {
      classes,
      configDetail,
      eventLevelList,
      eventTypeList,
      appCodeList,
      forwardTypeList,
      locale
    } = this.props;
    const appName = (appCodeList.find((item: any) => item.code === configDetail.appCode) || {});
    const eventTypeName = (eventTypeList.find((item: any) => item.id === configDetail.typeId) || {});
    const levelItem = eventLevelList.find((item: any) => item.code === configDetail.level) || {};

    let canel = configDetail.fwType;
    if (canel && canel.split) {
      canel = canel.split(',').reduce((pre: any, code: any) => {
        const cancelItem = forwardTypeList.find((item: any) => item.code === Number(code));
        if (cancelItem) {
          pre.push(locale === 'zh'?cancelItem.label : cancelItem.english);
        }
        return pre;
      }, []);
    }
    
    const column: any = [
      [
        {
          name: <FormattedMessage id="event.sourceSystem" defaultMessage="Source System" />,
          value: locale === 'zh' ? appName.name : appName.english || ''
        },
        {
          name: <FormattedMessage id="event.eventType" defaultMessage="Event Type" />,
          value: locale === 'zh' ? eventTypeName.name : eventTypeName.english || ''
        },
        {
          name: <FormattedMessage id="event.eventLevel" defaultMessage="Event Level" />,
          value: <div className="circle">
            <span style={{ background: levelItem.color }} ></span>
            {locale === 'zh' ? levelItem.label : levelItem.english || ''}
          </div>
        },
      ],
      [
        {
          name: <FormattedMessage id="event.messageTemplate" defaultMessage="SMS Template" />,
          value: <Tooltip placement="topLeft"
            trigger="click"
            title={locale === 'zh' ? configDetail.text : configDetail.textEnglish}>
            <span className={`${classes.col}`} style={{ maxWidth: "1000px" }}>
              {locale === 'zh' ? configDetail.text : configDetail.textEnglish}
            </span>
          </Tooltip>,
          colSpan: '5'
        }
      ],
      [
        {
          name: <FormattedMessage id="event.notificationChannel" defaultMessage="Notification Channel" />,
          value: (_.isArray(canel) && canel.length > 0) ? canel.join(',') : configDetail.fwType,
        },
        {
          name: <FormattedMessage id="event.notificationObject" defaultMessage="Notification Object" />,
          value:
            <Tooltip placement="topLeft"
              trigger="click"
              title={configDetail.fwTargets}>
              <span className={`${classes.col}`}>
                {configDetail.fwTargets}
              </span>
            </Tooltip>,
          colSpan: 3
        }
      ],
      [
        {
          name: <FormattedMessage id="event.whetherPushIsEnabled" defaultMessage="Enable Push" />,
          value: configDetail.fwEnabled ? (locale === 'zh' ? '推送' : 'Push') : (locale === 'zh' ? '不推送' : 'No Push'),
        },
        {
          name: <FormattedMessage id="event.creationTime" defaultMessage="Creation Time" />,
          value: configDetail.createTime,
          colSpan: 4
        }
      ]
    ]
    return (
      <div className={classes.root}>
        <h3 className={classes.title}><FormattedMessage id="order.basicInformation" defaultMessage="Basic information" /></h3>
        <div>
          <Table column={column} />
        </div>
      </div>
    );
  }
}

const mapState2Props = ({ event: { configDetail, eventLevelList, eventTypeList, appCodeList, forwardTypeList, eventTitleList }, intl: { locale } }: any) => ({
  configDetail, eventLevelList, eventTypeList, appCodeList, forwardTypeList, eventTitleList, locale
});

const mapDispatchToProps = (dispatch: any) => {
  return dispatch.event;
}
export default withStyles(styles)(connect(mapState2Props, mapDispatchToProps)(Detail));