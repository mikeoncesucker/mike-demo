import * as React from "react";
import store from "store";
import { message, } from 'antd';
import _ from "lodash";
import "./style/gridstack.scss";
declare var window: any;
export interface IGridstackProps {
  data;
  isClick;
  name;
  float;
  isMain;
  theme;
  userId?;
  onChange?;
  authentication?;
  autoPosition?;
  compareData?;
}
declare const $: any;
class Gridstack extends React.Component<IGridstackProps, any> {
  gridStack;
  grid;
  inited = false;
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.init(this.props.data);
  }
  componentWillReceiveProps(nextProps) {
    let { data } = this.props;
    if (!_.isEqual(nextProps.data, data)) {
      this.grid.removeAll();
      this.init(nextProps.data);
    }
  }
  init(data) {
    let { 
      name, 
      float, 
      isMain, 
      userId,
      autoPosition, 
      theme, 
      isClick, 
      authentication 
    } = this.props;
    const accessToken = store.get("accessToken");
    const theme_0 = {
      'color_0': 'D8502C',
      'color_1': 'BB1E48',
      'color_2': '603BBC',
      'color_3': '491BC6',
      'color_4': '3380DC',
      'color_5': '0A57C1',
      'color_6': '2881EF',
      'color_7': '5E3AB4',
      'color_8': '9A01A4',
      'color_9': '5A4E8C',
      'color_10': '03A006',
      'color_11': '0099AC',
      'color_12': 'B76F54',
      'color_13': '065B91',
      'color_14': '08AFB6',
      'color_15': 'AF9770',
      'color_16': '0C90BF',
      'color_17': '2DACC7',
      'color_18': '5479EA',
    };
    const theme_1 = {
      'color_0': '628C8A',
      'color_1': '6D6D6F',
      'color_2': '48616B',
      'color_3': '979AA3',
      'color_4': '758E93',
      'color_5': '5D8698',
      'color_6': '748E93',
      'color_7': '688995',
      'color_8': 'A6C0BD',
      'color_9': '526C76',
      'color_10': '556772'
    }
    const themes = theme === 'theme_0' ? theme_0 : theme_1;
    let self = this;
    var options = {
      acceptWidgets: true,
      cellHeight: "auto",
      width: 24,
      float: float,
      verticalMargin: 10,
      disableResize: true
    };
    var grid = (self.grid = $(`#${name}`)
      .gridstack($.extend({}, options, {}))
      .data("gridstack"));
    $(`#${name}`).on("dragstart", function (event, ui) {
      window.dragCheck = true;
    });
    $(`#${name}`).on("dragstop", function (event, ui) {
      window.dragCheck = false;
    });
    $(`#${name}`).on("change", function (event, items) {
      if (isMain && self.inited) {
        let items = $(`#${name}`).find(".grid-stack-item");
        let objs: any = [];
        for (var i = 0; i < items.length; i++) {
          let data = $(items[i]).data();
          let { id, chineseName, englishName, url, icon, type } = data;
          let width = data.gsWidth;
          let height = data.gsHeight;
          let left = data._gridstack_node && data._gridstack_node.x;
          let top = data._gridstack_node && data._gridstack_node.y;
          let backgroundKey = data.backgroundkey;
          let obj = {
            id,
            chineseName,
            englishName,
            url,
            backgroundKey,
            icon,
            type,
            width,
            height,
            left,
            top
          };
          objs.push(obj);
        }
        if (self.props.onChange) self.props.onChange(objs, null, window.dragCheck);
      }
    });
    let dealData = items => {
      let objs: any = [];
      for (var i = 0; i < items.length; i++) {
        let data = $(items[i]).data();
        let { id, chineseName, englishName, url, icon, type } = data;
        let width = data.gsWidth;
        let height = data.gsHeight;
        let left = data._gridstack_node && data._gridstack_node.x;
        let top = data._gridstack_node && data._gridstack_node.y;
        let backgroundKey = data.backgroundkey;
        let obj = {
          id,
          chineseName,
          englishName,
          url,
          backgroundKey,
          icon,
          type,
          width,
          height,
          left,
          top
        };
        objs.push(obj);
      }
      return objs;
    };
    $(`#gridstack2`).on("added", function (event, items) {
      if (self.inited) {
        let items = $(`#gridstack1`).find(".grid-stack-item");
        let items2 = $(`#gridstack2`).find(".grid-stack-item");
        let objs = dealData(items);
        let objs2 = dealData(items2);
        if (self.props.onChange) self.props.onChange(objs, objs2, window.dragCheck);
      }
    });
    let openUrl = e => {
      if (!window.dragCheck) {
        const target = e.currentTarget.dataset;
        if (target.url !== "http://" && !isClick && target.type === 'type_0') {
          if (e.currentTarget.dataset.secondLogin * 1) {
            window.open(e.currentTarget.dataset.url);
          } else {
            authentication({
              shortName: target.identifier,
              userId,
              cb:(data,res) => {
                if(res) {
                  if (res.data.isAccess) {
                    window.open(e.currentTarget.dataset.url + `?accessToken=${accessToken}`);
                  } else {
                    const warn = store.get('local_language') === 'zh' ? 
                    '无权限访问，请联系管理员' : 'No access, please contact the administrator';
                    message.warn(warn)
                  }
                }
              }
            })
          }
        }
      }
    };
    $(`#${name}`).on("added", function (event, items) {
      for (var i = 0; i < items.length; i++) {
        let element = $(items[i].el);
        element.bind("mouseup", openUrl);
      }
    });
    _.map(data, function (node) {
      let el = `<div 
                    data-type="${node.type}" 
                    data-url="${node.url}" 
                    data-id="${node.id}" 
                    data-name="${node.name}" 
                    data-identifier="${node.identifier}"
                    data-icon="${node.icon}" 
                    data-second-login="${node.secondLogin}" 
                    data-theme="${theme}"
                    data-backgroundkey="${node.backgroundKey}">
                      <div class="grid-stack-item-content ${
        node.backgroundKey
        }">       ${node.secondLogin ? `<img src=${require('../../assets/images/dashboard_tips.png')} alt='' class='dashboard_tips'/>` : ``}
                  
                  <img style="height: 42px; display:block; margin: .3rem auto 0;" src="${node.icon}" />
                          <p class="gridstack-title">${
        node.name ? node.name : ""
        }</p>
                      </div>
                <div/>`;

      if (node.type === "type_1") {
        el = `<div data-type="${node.type}" style='cursor: default'
                data-url="${node.url}" 
                data-id="${node.id}" 
                data-name="${node.name}"
                data-identifier="${node.identifier}"
                data-icon="${node.icon}"
                data-backgroundKey="${node.backgroundKey}">
                    <div class="grid-stack-item-content ${node.backgroundKey}" style='overflow: hidden'>
                      <iframe 
                        src="${store.get("local_language") === 'zh' ? node.content : node.encontent}${node.content.indexOf('?') > -1 ? '&' : '?'}accessToken=${accessToken}&bgColor=${themes[node.backgroundKey]}" 
                        width="100%" 
                        height="100%" 
                        frameborder="0" 
                        scrolling="no"
                      />
                    </div>
                    <div class="grid-stack-item-content" style="background:transparent"></div>
                </div>`;
      }
      let element = $(el);
      if (self.props.compareData) {
        if (_.indexOf(self.props.compareData, node.id) < 0) {
          grid.addWidget(
            element,
            node.left,
            node.top,
            node.width,
            node.height,
            autoPosition
          );
        }
      } else {
        grid.addWidget(
          element,
          node.left,
          node.top,
          node.width,
          node.height,
          autoPosition
        );
      }
    });
    this.inited = true;
  }
  public render() {
    let { name, } = this.props;
    return (
      <div className="gridstack grid-stack"
        style={{
          width: `100%`,
          minHeight: '100%',
        }}
        id={name}
      />
    );
  }
}

export default Gridstack;