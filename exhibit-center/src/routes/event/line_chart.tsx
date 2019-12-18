import React from 'react';
import { withStyles } from "@material-ui/styles";
import moment from 'moment';
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from 'bizcharts';
export interface LineProps {
  classes: any;
  data: any;
  type: any;
  locale: any;
}
const styles: any = (theme: any) => {
  return ({
    root: {
      paddingTop: '16px'
    },
    label: {
      paddingLeft: '20px'
    }
  })
};

class Series extends React.Component<LineProps, any> {
  render() {
    const { classes, data, type, locale } = this.props;
    const yLabel = 'value';
    const xLabel = 'label';
    const scale = {
      [xLabel]: {
      },
      [yLabel]: {
        // tickInterval: 50,
      }
    };
    const verticalAxis = {
      name: yLabel,
      label: {
        formatter: (val: any) => {
          return locale === "zh" ? `${val}个` : `${val}PCS`
        },
        autoRotate: false
      }
    };
    const horizontalAxis = {
      name: xLabel,
      label: {
        formatter: (val: any) => {
          if (val === '0' || val === '1') {
            return val;
          }
          const date = moment(val, 'YYYY-MM-DD,HH:mm:ss');
          if (type === '1-hour') {
            return date.format('HH:mm');
          } else if (type === '1-day-true') {
            return date.format('HH:mm');
          } else {
            return date.format('MM-DD');
          }
        },
      }
    };
    return (
      <div className={classes.root} >
        <div className={classes.label} >
          <FormattedMessage id="event.numberEventStates" defaultMessage="Number Event States (pcs)" />
        </div>
        <Chart height={400} data={data} scale={scale} forceFit>
          <Legend
            itemFormatter={(val) => {
              const obj: any = { "正常处理": "Success", "超时处理": "Fail" };
              return locale === "zh" ? val : obj[val];
            }}
          />
          <Axis
            grid={{
              type: "line",
              lineStyle: {
                lineDash: [1, 0]
              }
            }}
            {...verticalAxis}
          />
          <Axis {...horizontalAxis} />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
            containerTpl={
              `<div class="g2-tooltip" style="color:#999BA1;">
            ${locale === "zh" ? "时间" : "time"}
            <span 
              class="g2-tooltip-title" 
              style="white-space:nowrap;vertical-align:middle;width:200px;overflow:hidden;display:inline-block;"></span>
            <table class="g2-tooltip-list"></table>
          </div>`}
            itemTpl={`<tr class="g2-tooltip-list-item">
            <td>
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:{color};"></span>
              {name}: 
            </td>
            <td>
              <span style="color:{color}">{value}</span>${locale === 'zh' ? "个" : "PCS"}
            </td>
            <td style="padding-left:4px;">
              ${locale === 'zh' ? '占比' : "Proportion"}<span style="color:{color}">{percent}%</span>
            </td>
          </tr>`} />
          <Geom
            type="line"
            position={`${xLabel}*${yLabel}`}
            size={2}
            color={['type', ['#02B583', '#FC5B5B']]}
            tooltip={['type*percent*value', (type, percent, value) => {
              const obj: any = { "正常处理": "Success", "超时处理": "Fail" }
              return {
                name: locale === "zh" ? type : obj[type],
                value: value,
                percent: percent,
                label: '0000'
              };
            }]}
          />
        </Chart>
      </div>
    );
  }
}
const mapState2Props = ({ 
  intl: { locale } 
}: any) => ({
  locale
});

export default withStyles(styles)(
  connect(mapState2Props)(Series)
);
