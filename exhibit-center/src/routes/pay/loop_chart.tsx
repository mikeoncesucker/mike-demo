import React from 'react';
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
export interface LoopCharts {
  labelRender: any;
  data: any;
  locale: any;
  classes: any;
  label: any;
  value: any;
  DataView: Function;
}
const styles: any = (theme: any) => {
  return ({
    root: {
      '& .tip': {
        fontSize: '12px',
        whiteSpace: 'nowrap'
      }
    },
  })
};
class Charts extends React.Component<any, any> {
  defaultLabelRender = (val: string, item: any) => {
    return item.point.payType + ": " + val;
  }
  // 金额格式化
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { 
      data = [], 
      classes,
      label,
      value,
      locale
    } = this.props;
    const { DataView } = DataSet;
    const dv = new DataView();
  
    dv.source(data).transform({
      type: "percent",
      field: value,
      dimension: label,
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: (val: any, item: any) => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div className={classes.root}>
        {data.length ? (
        <Chart
          height={330}
          data={dv}
          scale={cols}
          padding={[0, 80, 60, 80]}
          forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend/>
          <Tooltip
            showTitle={false}
            itemTpl="<li>
              <span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>
              {name}: {value}
            </li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color={[label, ['#08ABF8', '#FFC000', '#27DA99', '#FC5B5B', '#3A5DDF']]}
            tooltip={[
              "percent*english*bookValue*label",
              ( percent, english ,bookValue,label) => {
                bookValue = locale === 'zh'?"金额:" + this.formatNum(bookValue) + "元":"Amounts: " + this.formatNum(bookValue) + " yuan";
                percent = (percent * 100).toFixed(2) + "%";   
               return {
                  name: locale === 'zh'? label :english ,
                  value: percent + '<br>' + bookValue,
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              htmlTemplate={(text, item, english)=>{
                const point = item.point; // 每个弧度对应的点
                let labelValue =locale === 'zh'? point[label] : point.english;
                const percent = (point.percent * 100).toFixed(2) + '%'
                return (locale === 'zh'
                ?`<span class="tip">${labelValue}:${percent}</span>`
                :`<span class="tip">${labelValue}:${percent}</span>`);
              }}
            />
          </Geom>
        </Chart>
        ) : (
          <p
            style={{
              minHeight: "300px",
              color: "red",
              textAlign: "center",
              lineHeight: "300px"
            }}
          >
            <span>{locale === "en" ? "No Data" : "暂无数据"}</span>
          </p>
        )
        }
      </div>
    )
  }
}
const mapState2Props = ({ 
  intl: { locale } 
}: any) => ({
  locale
});
 export default withStyles(styles)(
   connect(mapState2Props)(Charts)
);