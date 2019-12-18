import React from "react";
import { Chart, Geom, View, Guide, Coord } from "bizcharts";
import { cockpit } from "../message";
import { injectIntl } from "react-intl";

export interface LoopCharts {
  data: any;
}
const Views: any = View;
const { Html, Arc }: any = Guide;
const pcols = {
  value: {
    min: 0,
    max: 9,
    ticks: [],
    nice: false
  }
};
const pcols1 = {
  value: {
    min: 0,
    max: 9,
    ticks: [],
    nice: false
  }
};
class Charts extends React.Component<any, any> {
  render() {
    const { item, intl } = this.props;
    const { formatMessage } = intl;

    return (
      <div>
        <div className="item">
          <p className={intl.locale==='zh' ? 'sysName' : ''}>{item.systemName} ({item.shortName})</p>
          <div className="flex">
            <div className="left">
              <p>
                {formatMessage(cockpit.Uptime)}：{item.time}
              </p>
              <p>{formatMessage(cockpit.restartsNum)}：{item.restart}</p>
              <p>{formatMessage(cockpit.containersNum)}：{item.container}</p>
            </div>
            <div className="right">
              <p>{formatMessage(cockpit.discUtilization)}</p>
              <div className="rgtContent">
                <Chart height={100} padding="auto" forceFit>
                  <Views scale={pcols}>
                    <Coord
                      type="polar"
                      startAngle={(-9 / 7) * Math.PI}
                      endAngle={(2 / 7) * Math.PI}
                      radius={0.75}
                    />
                    <Guide>
                      <Arc
                        zIndex={0}
                        start={[0, 0.965]}
                        end={[9, 0.965]}
                        style={{
                          stroke: "#32F0FF",
                          lineWidth: 5,
                          opacity: 1
                        }}
                      />
                      <Arc
                        zIndex={1}
                        start={[0, 0.965]}
                        end={[`${item.fileRate / 10}`, 0.965]}
                        style={{
                          // 底灰色
                          stroke: "#FC8D52",
                          lineWidth: 5
                        }}
                      />
                      <Html
                        position={["50%", "95%"]}
                        html={() => `<div style="width: 300px;text-align: center;font-size: 12px!important;margin-top:-12px;">
                                <p style="color: #fff;margin: 0;">${parseFloat(
                                  item.fileRate
                                ).toFixed(2)}%</p>
                            </div>`}
                      />
                    </Guide>
                    <Geom type="area" position="value*1" opacity="0" />
                  </Views>
                  <Views scale={pcols1} padding={[28, 5, 22, 5]}>
                    {/* 外部阴影 */}
                    <Coord
                      type="polar"
                      startAngle={(-9 / 7) * Math.PI}
                      endAngle={(2 / 7) * Math.PI}
                      radius={0.95}
                    />
                    <Guide>
                      <Arc
                        zIndex={0}
                        start={[0, 0.965]}
                        end={[9, 0.965]}
                        style={{
                          stroke: "#fff",
                          lineWidth: 20,
                          opacity: 0.2
                        }}
                      />
                    </Guide>
                    <Geom type="area" position="value*1" opacity="0" />
                  </Views>
                </Chart>
              </div>
              <div className="wrap">
                <div>
                  <h3>{formatMessage(cockpit.used)}</h3>
                  <h4>
                    {(item.fileUser / 1024 / 1024 / 1024 / 1024).toFixed(2)}TB
                  </h4>
                </div>
                <div>
                  <h3>{formatMessage(cockpit.total)}</h3>
                  <h4>
                    {(item.fileTatol / 1024 / 1024 / 1024 / 1024).toFixed(2)}TB
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(Charts);
