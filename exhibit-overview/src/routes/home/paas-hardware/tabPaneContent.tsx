import React from "react";
import LineChart from "./line-chart";
import SingleLineChart from "./singleLine-chart";
import { injectIntl } from "react-intl";
import { cockpit } from "../message";

export interface TabPaneContentProps {
  data: any;
  ip: any;
}

class TabPaneContent extends React.Component<any, any> {
  render() {
    const { data, ip, intl } = this.props;
    const { formatMessage } = intl;

    if (!data || (data && data.length === 0)) {
      return <div></div>;
    }

    return (
      <div>
        <div className="resContent">
          <div className="lineChart">
            <h4>{formatMessage(cockpit.memoryUtilization)}</h4>
            <div className="content">
              <LineChart
                data={data}
                field="memory"
                title={formatMessage(cockpit.memoryUtilization)}
              ></LineChart>
            </div>
          </div>
          <div className="lineChart">
          <h4>{formatMessage(cockpit.cpuUtilization)}</h4>
            <div className="content">
              <SingleLineChart
                data={data}
                ip={ip}
                title={formatMessage(cockpit.cpuUtilization)}
              ></SingleLineChart>
            </div>
          </div>
        </div>
        <div className="resContent">
          <div className="lineChart">
            <h4>{formatMessage(cockpit.netUtilization)}</h4>
            <div className="content">
              <LineChart
                data={data}
                field="network"
                title={formatMessage(cockpit.netUtilization)}
              ></LineChart>
            </div>
          </div>
          <div className="lineChart">
          <h4>{formatMessage(cockpit.discUtilization)}</h4>
            <div className="content">
              <LineChart
                data={data}
                field="file"
                title={formatMessage(cockpit.discUtilization)}
              ></LineChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(TabPaneContent);
