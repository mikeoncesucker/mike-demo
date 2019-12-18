import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from 'bizcharts'
import { connect } from "react-redux";
import DataSet from "@antv/data-set";
export interface LoopCharts {
  labelRender: any;
  data: any;
  colorCallback: any;
  innerContent: any;
  locale: any;
  classes: any;
  label: any;
  value: any;
  DataView: Function;
}

class Charts extends React.Component<any, any>{
  defaultLabelRender = (val: string) => {
    return val
  }

  render() {
    const {
      data = [],
      locale
    } = this.props;
    let normal = data.normal;
    let obj1: any = {};
    let obj2: any = {}
    normal && normal.map((item: any) => {
      obj1['nameEng'] = 'Success';
      obj1['name'] = '正常处理';
      obj1[item.time] = Number(item.normallabel);
      return undefined;
    })
    data.overtime && data.overtime.map((item: any) => {
      obj2['nameEng'] = 'Fail';
      obj2['name'] = '超时处理';
      obj2[item.time] = Number(item.overtimelabel);
      return undefined;
    })

    // 数据源
    const dataList = [obj2, obj1];

    const time = data.overtime && data.overtime.map((item: any) => item.time);
    const ds = new DataSet();
    const dv = ds.createView().source(dataList);
    dv.transform({
      type: "fold",
      fields: time,
      // 展开字段集
      key: "时间",
      // key字段
      value: "事件数量" // value字段
    });
    
    const scale = {
      时间: 
      {
        type: 'cat',
        tickCount: time && (time.length === 12 && time[0].includes(':')) ? 12 : 10
      }
        // (time && time[0].includes('-'))?
       
        // (
        //   time && time.length > 10
        //   ? {
        //     type: 'timeCat',
        //   }
        //   : {
        //     type: 'cat',  // cat: 分类类型
        //   }) :  (time && time.length > 13
        //   ? {
        //     type: 'timeCat',
        //   }
        //   : {
        //     type: 'cat',  // cat: 分类类型
        //   })
    };
    return (
      <div id="chartH">
        <Chart height={400}
          scale={scale}
          data={dv} forceFit>
          <Legend
            itemFormatter={(val) => {
              const obj: any = { "正常处理": "Success", "超时处理": "Fail" };
              return locale === "zh" ? val : obj[val];
            }}
          />
          <Axis name="时间" />
          <Axis name="事件数量"
            label={{
              textStyle: {
                fill: '#5E616E', // 文本的颜色
                fontSize: '14', // 文本大小
                fontWeight: '400', // 文本粗细
                textBaseline: 'bottom', // 文本基准线，可取 top middle bottom，默认为middle
              },
              formatter: (val) => {
                return `${val}`
              }
            }} />
          <Legend
            position="bottom"
            marker="square"
            useHtml={true}
            visible={true}
          />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="时间*事件数量"
            color={["name", ["#FFA940", "#54B978"]]}
            tooltip={[
              "name*事件数量*nameEng",
              (name, 事件数量, nameEng) => {
                return {
                  name: locale === 'zh' ? name : nameEng,
                  value: 事件数量
                };
              }
            ]}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
            size={30}
          />
        </Chart>
      </div>
    )
  }
}
const mapState2Props = ({ 
  intl: { locale } 
}: any) => ({
  locale
});
export default (connect(mapState2Props)(Charts));