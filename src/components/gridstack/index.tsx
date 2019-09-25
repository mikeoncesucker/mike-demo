import * as React from "react";
import store from "store";
import _ from "lodash";
import "./style/gridstack.scss";
declare var window: any;
export interface IGridstackProps {
  data;
  isClick;
  className?;
  style?;
  name;
  row;
  float;
  isMain;
  onChange?;
  autoPosition?;
  compareData?;
  minHeight?;
}
declare const $: any;
class Gridstack extends React.Component<IGridstackProps,any> {
  gridStack;
  grid;
  inited = false;
  flag = false;
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
    let { name, float, isMain, autoPosition } = this.props;
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
          let left = data._gridstack_node.x;
          let top = data._gridstack_node.y;
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
        if (self.props.onChange) self.props.onChange(objs,null,window.dragCheck);
      }
    });
    let dealData = items => {
      let objs: any = [];
      for (var i = 0; i < items.length; i++) {
        let data = $(items[i]).data();
        let { id, chineseName, englishName, url, icon, type } = data;
        let width = data.gsWidth;
        let height = data.gsHeight;
        let left = data._gridstack_node.x;
        let top = data._gridstack_node.y;
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
        if (self.props.onChange) self.props.onChange(objs, objs2,window.dragCheck);
      }
    });

    let openUrl = e => {
      if (!window.dragCheck) {
        if (e.currentTarget.dataset.type === "type_0") {
          const accessToken = store.get("accessToken");
          if (e.currentTarget.dataset.url !== "http://" && !this.props.isClick) {
            window.open(e.currentTarget.dataset.url + `?token=${accessToken}`);
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
                    data-icon="${node.icon}" 
                    data-backgroundkey="${node.backgroundKey}">
                      <div class="grid-stack-item-content ${
        node.backgroundKey
        }">
                          <img style="height:1em; display:block; margin: 0.3em auto 0;" src="${
        node.icon
        }" />
                          <p class="gridstack-title">${
        node.name ? node.name : ""
        }</p>
                      </div>
                <div/>`;

      if (node.type === "type_1") {
        el = `<div data-type="${node.type}" 
                data-url="${node.url}" 
                data-id="${node.id}" 
                data-name="${node.name}" 
                data-icon="${node.icon}" 
                data-backgroundKey="${node.backgroundKey}">
                    <div class="grid-stack-item-content ${node.backgroundKey}">
                      <img src="${node.content}" alt="" width="100%" height="100%">
                    </div>
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
          fontSize: `${(window.innerHeight - 64 * 2 - 34 - 72) / 10}px`,
          width: `${((window.innerHeight - 64 * 2 - 34 - 72) / 10) * 2 * 24}px`,
          minHeight: this.props.minHeight
        }}
        id={name}
      />
    );
  }
}

export default Gridstack;
