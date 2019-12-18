import React from "react";
import { withStyles } from "@material-ui/styles";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

export interface LineProps {
  classes: any;
  data: any;
  type: any;
  locale: any;
}

const styles: any = (theme: any) => {
  return {
    root: {
      paddingTop: "16px"
    },
    label: {
      paddingLeft: "20px",
      color: "#bfbfbf",
      fontSize: "12px",
      marginBottom: "-38px"
    }
  };
};

class Series extends React.Component<LineProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      sort: "day",
    };
  }
  componentWillReceiveProps(nextProps: any) {
    const type = nextProps.type;
    const data = nextProps.data;
    if (type === "week") {
      this.setState({
        sort: "week"
      });
    } else {
      data.forEach((item: any, index: any) => {
        if (item.payDate.indexOf(":") !== -1) {
          this.setState({
            sort: "day"
          });
        } else {
          this.setState({
            sort: "month"
          });
        }
      });
    }
  }

  // 金额格式化
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { classes, data } = this.props;
    const { sort } = this.state;
    data &&
      data.map(function(item: any, index: number) {
        if (item.bookValue === null) {
          item.bookValue = 0;
        }
        return item;
      });

    const yLabel = "bookValue";
    const xLabel = "payDate";
    const scale = {
      [xLabel]: {
        ticks: sort === "day" && [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
      },
      [yLabel]: {
        formatter: (val: any) => {
          return this.formatNum(val);
        }
      }
    };
    const verticalAxis = {
      name: yLabel,
      label: {
        formatter: (val: any) => {
          return `${val}`;
        },
        autoRotate: false
      }
    };
    const horizontalAxis = {
      name: xLabel,
      label: {
        formatter: (val: any, item: any, index: number) => {
          return val;
        }
      }
    };
    return (
      <div className={classes.root}>
        <div className={classes.label}>
          <FormattedMessage id="pay.amount" defaultMessage="Amount(yuan)" />
        </div>
        <Chart
          padding={[50, 80, 50, 80]}
          height={400}
          data={data}
          scale={scale}
          forceFit
        >
          <Legend position="bottom" marker="square" />
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
              type: "y"
            }}
            containerTpl={`<div class="g2-tooltip" style="color:#999BA1; ">
                ${this.props.locale === "zh" ? "时间" : "Time"}：
                <span
                  class="g2-tooltip-title"
                  style="white-space:nowrap;vertical-align:middle;width:80px;overflow:hidden;display:inline-block;"></span>
                <table class="g2-tooltip-list"></table>
              </div>`}
            itemTpl={`<tr class="g2-tooltip-list-item">
                <td>
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:{color};"></span>
                  ${this.props.locale === "zh" ? "收入" : "Income"}:
                </td>
                <td>
                  <span>{value}</span>${
                    this.props.locale === "zh" ? "元" : " yuan"
                  }
                </td>
              </tr>`}
          />
          <Geom
            type="line"
            position={`${xLabel}*${yLabel}`}
            size={2}
            color={"#FC5B5B"}
          />
        </Chart>
      </div>
    );
  }
}

const mapState2Props = ({ intl: { locale } }: any) => ({
  locale
});

export default withStyles(styles)(connect(mapState2Props)(Series));
