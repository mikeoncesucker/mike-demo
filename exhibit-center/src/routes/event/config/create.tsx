import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  Button,
  Form,
  Input,
  Select,
  Radio,
  Checkbox,
  Switch,
  message,
  Modal,
  Spin
} from "antd";
export interface EventCreate {
  classes: any;
  location: any;
  match: any;
  history: any;
  locale: any;
  appCodeList: any;
  eventTypeList: any;
  eventLevelList: any;
  forwardTypeList: any;
  peopleInfoList: any;
  eventTitleList: any;
  form: any;
  getAppCodeList: Function;
  getEventTypeList: Function;
  getForwardTypeList: Function;
  getEventTitleList: Function;
  getPeopleInfoList: Function;
  getEventLevelList: Function;
  setConfigDetail: Function;
  getConfigDetail: Function;
  setPeopleInfoList: Function;
  editConfig: Function;
  addConfig: Function;
}
const { TextArea } = Input;
const { Option } = Select;
const styles: any = (theme: any) => {
  return {
    root: {
      margin: "20px",
      backgroundColor: "#FFFFFF",
      padding: "20px 50px",
      "& .title": {
        color: "#33353D",
        fontSize: "16px",
        marginBottom: "20px"
      },
      "& .ant-form-item-label": {
        textAlign: "left",
      },
      "& .labelForm .ant-form-item-label": {
        textAlign: "left",
        width: "21%"
      }
    },
    footer: {
      borderTop: "1px dotted #999BA2",
      paddingTop: "20px",
      textAlign: "right",
      "& button": {
        "&+button": {
          marginLeft: "8px"
        }
      }
    }
  };
};
class ConfigCreate extends React.Component<EventCreate, any> {
  constructor(props: Readonly<EventCreate>) {
    super(props);
    this.state = {
      fetching: false,
      fwTypeChecked: false,
    };
  }
  get id() {
    const { match } = this.props;
    return match.params ? match.params.id : undefined;
  }
  componentDidMount() {
    this.props.getAppCodeList();
    this.props.getEventTypeList();
    this.props.getEventLevelList();
    this.props.getForwardTypeList();
    this.props.getEventTitleList();
    this.props.getPeopleInfoList("");
    this.fillBack();
  }
  componentWillUnmount() {
    this.props.setConfigDetail({});
  }

  // 编辑回填
  fillBack = () => {
    if (this.id) {
      this.props.getConfigDetail({
        id: this.id,
        cb: (error: any, data: any) => {
          if (!error) {
            const { locale } = this.props
            data.fwTplText = locale === 'zh' ? data.fwTplText : data.english;
            data.text = locale === 'zh' ? data.text : data.textEnglish;
            data.fwEnabled = !!data.fwEnabled;
            data.fwType = data.fwType ? data.fwType.split(",") : [];
            data.fwType = data.fwType.map((item: any) => {
              if (item === '0') {
                this.setState({
                  fwTypeChecked: true
                })
              }
              return Number(item)
            });
            if (data.fwTargets) {
              try {
                const fwTargets = data.fwTargets.split('、');
                if (fwTargets) {
                  data.fwTargets = fwTargets
                }
              } catch (err) {
              }
            }
            this.props.form.setFieldsValue(data);
          }
        }
      });
    }
  };
  // 保存
  save = () => {
    this.props.form.validateFields((error: any, value: any, key: any) => {
      if (!error) {
        let { fwEnabled, fwTargets, fwTplText, fwType, level, fwUser, text, ...params } = value;
        const { peopleInfoList, eventTitleList, locale } = this.props;
        fwTargets = fwTargets.reduce((pre: any, key: any) => {
          const target = peopleInfoList.find((item: any) => item.name === key)
          const item = peopleInfoList.find((item: any) => item.id === key);
          if (item) {
            const data = {
              id: item.id,
              name: item.name,
            };
            pre.push(data);
          }
          if (target) {
            const data = {
              id: target.id,
              name: target.name,
            };
            pre.push(data);
          }
          return pre;
        }, []);
        params.fwEnabled = fwEnabled ? 1 : 0;
        params.fwType = fwType.join(",");
        if (!(fwType.includes(0))) {
          params.fwTplText = ''
        } else {
          const fwTplTexts = eventTitleList.find((item: any) => item.tplTitle === fwTplText)
          params.fwTplText = fwTplText.length > 2 ? fwTplTexts.id : fwTplText
        }
        params.level = level;
        params.fwTargets = JSON.stringify(fwTargets);
        if (this.id) {
          params.id = this.id;
        }
        const request = this.id ? "editConfig" : "addConfig";

        this.props[request]({
          params,
          cb: (error: any) => {
            if (error.code === 10002 || error.code === 500) {
            }
            else {
              message.success(
                this.id ? (locale === 'zh' ? '编辑成功' : 'Successful revision') :
                  (locale === 'zh' ? '创建成功' : 'Create success'), 3
              );
              this.id ? this.props.history.push("../") : this.props.history.push("./")
            }
          }
        });
      }
    });
  };
  cancel = () => {
    const { locale } = this.props
    if (locale === 'zh') {
      Modal.confirm({
        title: "确定退出编辑？",
        content: "退出后所编辑的内容将不被保存",
        icon: null,
        okText: "取消",
        okType: "default",
        cancelText: "确定",
        cancelButtonProps: {
          type: "primary"
        },
        onCancel: () => {
          this.id ? this.props.history.push("../") : this.props.history.push("./");
        }
      })
    } else {
      Modal.confirm({
        title: "Confirm to exit editing?",
        content: "All data will remain unchanged after exiting!",
        icon: null,
        okText: "Cancel",
        okType: "default",
        cancelText: "Confirm",
        cancelButtonProps: {
          type: "primary"
        },
        onCancel: () => {
          this.id ? this.props.history.push("../") : this.props.history.push("./");
        }
      })
    }
  };

  handleArea = (value: any) => {
    const { eventTitleList, locale } = this.props
    if (locale === 'zh') {
      this.props.form.setFieldsValue({
        text: eventTitleList[value - 1].tplText
      });
    } else {
      this.props.form.setFieldsValue({
        textEnglish: eventTitleList[value - 1].textEnglish,
      });
    }
  }
  render() {
    const {
      classes,
      appCodeList,
      eventTypeList,
      eventLevelList,
      forwardTypeList,
      peopleInfoList,
      eventTitleList,
      locale
    } = this.props;

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };
    const filterOption = {
      showSearch: true,
      filterOption: (input: any, option: any) => {
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }
    }
    const { fwTypeChecked, fetching } = this.state;
    return (
      <div className={classes.root}>
        <h3 className="title">
          <FormattedMessage id="event.eventPushConfiguration" defaultMessage="Event Push Configuration" />
        </h3>
        <Form layout={'horizontal'}>
          <Form.Item
            className={locale === 'zh' ? '' : 'labelForm'}
            label={<FormattedMessage id="event.sourceSystem" defaultMessage="Source System" />}
            {...formItemLayout}
          >
            {
              getFieldDecorator('appCode', {
                rules: [{
                  required: true,
                  message: <FormattedMessage
                    id="event.text.pleaseSelectYouBelong"
                    defaultMessage="Please select the source system"
                  />
                }],
              })(
                <Select
                  placeholder={
                    <FormattedMessage
                      id="event.text.pleaseSelectYouBelong"
                      defaultMessage="Please select the source system"
                    />
                  }
                  {...filterOption}
                  getPopupContainer={triggerNode => triggerNode}
                >
                  {
                    appCodeList.map((item: any, index: number) => {
                      return <Option value={item.code} key={index} >{locale === 'zh' ? item.name : item.code}</Option>
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item
            className={locale === 'zh' ? '' : 'labelForm'}
            label={<FormattedMessage id="event.eventType" defaultMessage="Event Type" />}
            {...formItemLayout}
          >
            {
              getFieldDecorator('typeId', {
                rules: [{
                  required: true,
                  message: <FormattedMessage
                    id="event.pleaseEnterEventType"
                    defaultMessage="Please enter event type"
                  />
                }],
              })(
                <Select
                  getPopupContainer={triggerNode => triggerNode}
                  placeholder={
                    <FormattedMessage
                      id="event.pleaseEnterEventType"
                      defaultMessage="Please enter event type"
                    />
                  }
                  {...filterOption}>
                  {
                    eventTypeList.map((item: any, index: number) => {
                      return <Option key={index} value={item.id}>
                        {locale === 'zh' ? item.name : item.english}
                      </Option>
                    })
                  }
                </Select>
              )
            }

          </Form.Item>
          <Form.Item
            className={locale === 'zh' ? '' : 'labelForm'}
            label={<FormattedMessage id="event.eventLevel" defaultMessage="Event Level" />}
            required {...formItemLayout}
          >
            {
              getFieldDecorator('level', {
                initialValue: [],
                rules: [{
                  required: true,
                  message: <FormattedMessage
                    id="event.text.pleaseSelectTheEventLevel"
                    defaultMessage="Please select the event level"
                  />
                }],
              })(
                <Radio.Group>
                  {
                    eventLevelList.map((item: any, index: number) => {
                      return <Radio key={index} value={item.code}>{locale === 'zh' ? item.label : item.english}</Radio>
                    })
                  }
                </Radio.Group>
              )
            }

          </Form.Item>
          <Form.Item
            className={locale === 'zh' ? '' : 'labelForm'}
            label={<FormattedMessage id="event.notificationObject" defaultMessage="Notification Object" />}
            {...formItemLayout}
          >
            {
              getFieldDecorator('fwTargets', {
                rules: [{
                  required: true,
                  message: <FormattedMessage
                    id="event.text.pleaseSelectThePersonResponsible"
                    defaultMessage="Please select the notification object"
                  />
                }],
              })(
                <Select
                  getPopupContainer={triggerNode => triggerNode}
                  placeholder={
                    <FormattedMessage
                      id="event.text.pleaseSelectThePersonResponsible"
                      defaultMessage="Please select the notification object"
                    />
                  }
                  mode="multiple"
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {
                    peopleInfoList.map((item: any) => {
                      return <Option key={item.id} value={item.name}>{item.name}</Option>
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item
            className={locale === 'zh' ? '' : 'labelForm'}
            label={
              <FormattedMessage
                id="event.notificationChannel"
                defaultMessage="Notification Channel"
              />
            }
            {...formItemLayout}
          >
            {getFieldDecorator("fwType", {
              initialValue: [],
              rules: [{
                required: true,
                message: <FormattedMessage
                  id="event.text.pleaseNotification"
                  defaultMessage="Please select notification channel"
                />
              }]
            })(
              <Checkbox.Group>
                {forwardTypeList.map((item: any, index: number) => {
                  return (
                    <Checkbox value={item.code} key={index}
                      onChange={(e: any) => {
                        if (e.target.value === 0) {
                          this.setState({
                            fwTypeChecked: e.target.checked
                          })
                        }
                      }}>
                      {locale === 'zh' ? item.label : item.english}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item
            className={locale === 'zh' ? '' : 'labelForm'}
            style={fwTypeChecked ? { display: 'block' } : { display: 'none' }}
            label={<FormattedMessage id="event.messageTemplate" defaultMessage="Message Template" />}
            {...formItemLayout}
          >
            {
              getFieldDecorator('fwTplText', {
                rules: [{
                  required: (fwTypeChecked ? true : false),
                  message: <FormattedMessage
                    id="event.pleaseSelectTheMessageTemplate"
                    defaultMessage="Please select the message template"
                  />
                }],
              })(
                <Select
                  placeholder={
                    <FormattedMessage
                      id="event.pleaseSelectTheMessageTemplate"
                      defaultMessage="Please select the message template"
                    />
                  }
                  {...filterOption}
                  getPopupContainer={triggerNode => triggerNode}
                  onChange={this.handleArea}
                >
                  {
                    eventTitleList.map((item: any, index: number) => {
                      return <Option value={item.id} key={index} >
                        {locale === 'zh' ? item.tplTitle : item.english}
                      </Option>
                    })
                  }
                </Select>
              )
            }

            {getFieldDecorator(locale === "zh" ? "text" : "textEnglish", {
              rules: [
                {
                  message: (
                    <FormattedMessage
                      id="event.pleaseSelectTheMessageTemplate"
                      defaultMessage="Please select the message template"
                    />
                  )
                }
              ]
            })(
              <TextArea
                placeholder={
                  locale === "zh"
                    ? "选择的消息模版会在这里显示"
                    : "Message template will be displayed here."
                }
                disabled={true}
                style={{ marginTop: 10 }}
                autosize={false}
              />
            )}

          </Form.Item>
          <Form.Item
            className={locale === 'zh' ? '' : 'labelForm'}
            label={
              <FormattedMessage
                id="event.whetherPushIsEnabled"
                defaultMessage="Enable Push"
              />
            }
            {...formItemLayout}
          >
            {getFieldDecorator("fwEnabled", {
              initialValue: false,
              valuePropName: "checked",
              rules: [{ required: true }]
            })(<Switch size="small" />)}
          </Form.Item>
        </Form>
        <div className={classes.footer}>
          <Button type="primary" onClick={this.save}>
            <FormattedMessage id="action.confirm" defaultMessage="Confirm" />
          </Button>
          <Button onClick={this.cancel}>
            <FormattedMessage id="action.cancel" defaultMessage="cancel" />
          </Button>
        </div>
      </div>
    );
  }
}
const mapState2Props = ({
  event: {
    appCodeList,
    eventTypeList,
    eventLevelList,
    forwardTypeList,
    peopleInfoList,
    eventTitleList
  },
  intl: {
    locale
  }
}: any) => ({
  appCodeList,
  eventTypeList,
  eventLevelList,
  forwardTypeList,
  peopleInfoList,
  eventTitleList,
  locale
});
const mapDispatch2Props = ({
  event: {
    getAppCodeList,
    getEventTypeList,
    getForwardTypeList,
    getEventTitleList,
    getPeopleInfoList,
    getEventLevelList,
    setConfigDetail,
    getConfigDetail,
    setPeopleInfoList,
    editConfig,
    addConfig
  }
}: any) => ({
  getAppCodeList,
  getEventTypeList,
  getForwardTypeList,
  getEventTitleList,
  getPeopleInfoList,
  getEventLevelList,
  setConfigDetail,
  getConfigDetail,
  setPeopleInfoList,
  editConfig,
  addConfig
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Form.create()(ConfigCreate))
);