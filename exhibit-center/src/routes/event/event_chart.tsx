import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import emitter from "../../util/events";
import Axios from "axios";
import { Chart, Geom, Axis, Coord, Legend } from "bizcharts";
import store from "store";
import DataSet from "@antv/data-set";
export interface EventAnalyze {
  classes: any;
  location: any;
  history: any;
  getUser: any;
  user: any;
  resetUsers: Function;
  putLocale: Function;
  locale: any;
  totalsLevelList: any;
  getTotalsByLevelList: Function;
  labelRender: any;
  data: any;
  colorCallback: any;
  label: any;
  innerContent: any;
  DataView: Function;
}

//取url里面的bgColor参数
const GetQueryValue = (queryName: string): string => {
  var query = decodeURI(window.location.href.substring(1));
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === queryName) { return pair[1]; }
  }
  return "";
}

const styles: any = (theme: any) => ({
  root: {
    "& h3": {
      fontSize: "16px",
      color: "#ffffff",
      padding: "14px 18px"
    }
  }
});
class Donut extends React.Component<EventAnalyze, any> {
  componentDidMount() {
    this.props.getTotalsByLevelList({
      params: { timeMarker: 1, startTime: "", endTime: "", typeId: "" }
    });
    Axios.defaults.headers.common["accessToken"] = store.get('accessToken')


    const { getUser, putLocale } = this.props;
    getUser({
      cb: (data: any) => {
        if (data) {
          emitter.emit("userId", data.id);
          putLocale({
            locale: data.language !== "english" ? "zh" : "en"
          });
        }
      }
    });
  }
  render() {
    const { classes, totalsLevelList, locale } = this.props;
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(totalsLevelList.data).transform({
      type: "percent",
      field: "count",
      dimension: "label",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: (val: any) => {
          return (val * 100).toFixed(2) + "%";
        }
      }
    };

    return (
      <div
        className={classes.root}
        style={{ height: window.innerHeight, backgroundColor: '#' + GetQueryValue("bgColor") }}
      >
        {locale &&
          (<h3>
            <FormattedMessage
              id="event.weekLevel"
              defaultMessage="Event level analysis of this week"
            />
          </h3>)}
        {(totalsLevelList.data && (totalsLevelList.data.length !== 0)) ? (
          <Chart
            height={window.innerHeight}
            data={dv}
            scale={cols}
            padding={[-20, 80, 60, -80]}
            forceFit
          >
            <Legend
              offsetX={-50}
              offsetY={-30}
              position="right-center"
              marker="circle"
              useHtml={true}
              itemTpl={(item: any, color: any, isShow: any, index: any) => {
                const dataLoop = totalsLevelList.data.map(
                  (item: any, index: any) => item
                );
                const value =
                  dataLoop[index] &&
                  (locale === "zh"
                    ? dataLoop[index].label
                    : dataLoop[index].english);
                const count = dataLoop[index] && dataLoop[index].count;
                const slight =
                  dataLoop[index] &&
                  ((count / dataLoop[index].total) * 100).toFixed(2) + "%";
                return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="min-width: 160px;color: #FFFFFF;font-weight:400;cursor: pointer;font-size: 14px;">
                  <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>
                  <span class="g2-legend-text" style="color: #ffffff; font-size: 14px">${value} ${count}${
                  locale === "zh" ? "个" : "PCS"
                  } | ${slight}</span>
                  </li>`;
              }}
            />
            <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
            <Axis name="percent" />
            <Geom
              type="intervalStack"
              position="percent"
              color={[
                "label",
                (label: string) => {
                  const item = totalsLevelList.data.find(
                    (item: any) => item.label === label
                  );
                  return (item && item.color) || undefined;
                }
              ]}
            ></Geom>
          </Chart>
        ) : (
            locale && <p
              style={{
                // height: '100%',
                minHeight: "200px",
                color: "#ffffff",
                textAlign: "center",
                lineHeight: "200px"
              }}
            >
              <FormattedMessage id="order.noData" defaultMessage="No data" />
            </p>

          )}
      </div>
    );
  }
}

const mapState2Props = ({
  app: { user },
  event: { totalsLevelList },
  intl: { locale }
}: any) => ({
  user,
  totalsLevelList,
  locale
});
const mapDispatch2Props = ({
  app: { getUser, resetUsers },
  event: { getTotalsByLevelList },
  intl: { putLocale }
}: any) => ({
  getUser,
  resetUsers,
  getTotalsByLevelList,
  putLocale
});
export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Donut)
);
