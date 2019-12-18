import React from "react";
import { Chart, Geom, Axis, Legend, Tooltip } from "bizcharts";
import { connect } from "react-redux";
export interface LineProps {
  type: string;
  trend: any;
  locale: any;
}

const styles: any = (theme: any) => ({
  wrapper: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  mainTitle: {
    fontSize: 18,
    color: "#333",
    display: "block",
    padding: 10
  },
  subTitle: {
    fontSize: 14,
    color: "#bbb",
    display: "block",
    padding: 10
  }
});

class LineCharts extends React.Component<LineProps, any> {
  constructor(props: Readonly<LineProps>) {
    super(props);
    this.state = {
      dataItem: [],
      type: "day"
    };
  }
  componentWillReceiveProps(nextProps: any) {
    const type = nextProps.type;
    const trend = nextProps.trend;
    let dataItem: any = [];

    if (trend && trend.orderAmountsVoList) {
      for (let i = 0; i < trend.orderAmountsVoList.length; i++) {
        if (trend.orderCountsVoList[i].date.indexOf(":") !== -1) {
          // 选择天和当天为周二的时候
          dataItem.push({
            sort: trend.orderCountsVoList[i].date,
            rainfall: Number(trend.orderAmountsVoList[i].amounts),
            seaLevelPressure: trend.orderCountsVoList[i].counts
          });
          this.setState({
            type: "day"
          });
        } else if (type === "week") {
          //选择周的时候
          dataItem.push({
            sort: trend.orderCountsVoList[i].date,
            rainfall: Number(trend.orderAmountsVoList[i].amounts),
            seaLevelPressure: trend.orderCountsVoList[i].counts
          });
          this.setState({
            type: "week"
          });
        } else {
          //选择月的时候
          dataItem.push({
            sort: trend.orderCountsVoList[i].date,
            rainfall: Number(trend.orderAmountsVoList[i].amounts),
            seaLevelPressure: trend.orderCountsVoList[i].counts
          });
          this.setState({
            type: "month"
          });
        }
      }
    }

    this.setState({
      dataItem: dataItem
    });
  }

  // 金额格式化
  formatNum = (num: any) => {
    return (num + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const { dataItem, type } = this.state;
    return (
      <div style={styles.wrapper}>
        <Chart
          padding={[40, 80, 80, 100]}
          height={350}
          width={1850}
          data={dataItem}
          scale={{
            rainfall: {
              min: 0,
              alias:
                this.props.locale === "zh"
                  ? "订单金额(元)"
                  : "Amount of order",
              formatter: (val: any) => {
                return this.formatNum(val);
              }
            },
            seaLevelPressure: {
              min: 0,
              minTickInterval: 1,
              alias:
                this.props.locale === "zh"
                  ? "订单数量(单)"
                  : "Number of orders"
            },
            sort: {
              ticks: type === "day" && [
                0,
                2,
                4,
                6,
                8,
                10,
                12,
                14,
                16,
                18,
                20,
                22
              ]
            }
          }}
          forceFit
        >
          <Axis name="" title />
          {/* 订单金额 */}
          <Axis name="rainfall" grid={null} />
          {/* 订单数量 */}
          <Axis name="seaLevelPressure" grid={null} />
          <Legend
            position="bottom"
            marker="square"
            offsetY={-window.innerHeight / 80}
          />
          <Tooltip />
          <Geom type="line" position="sort*rainfall" color="#07A7F3" />
          <Geom type="line" position="sort*seaLevelPressure" color="#FC5B5B" />
        </Chart>
      </div>
    );
  }
}
const mapState2Props = ({ intl: { locale } }: any) => ({
  locale
});
export default connect(mapState2Props)(LineCharts);
