import React from "react";
import { Progress } from "antd";
import { dataCenter, common } from "../message";

export interface PlatformProgressProps {
  data: any,
  intl: any,
}

class PlatformProgress extends React.Component<PlatformProgressProps, any> {
  constructor(props: Readonly<PlatformProgressProps>) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, intl } = this.props;
    const { formatMessage } = intl;
    const percent: any = [
      {
        sort: formatMessage(dataCenter.center_exhibitions_number),
        count: data['exhibition']
      },
      {
        sort: formatMessage(dataCenter.center_order_number),
        count: data['order'],
      },
      {
        sort: formatMessage(dataCenter.center_event_number),
        count: data['event'],
      },
      {
        sort: formatMessage(dataCenter.center_pay_number),
        count: data['pay'],
      }
    ];
    const total = percent.reduce((prev: any,cur: any) => cur.count + prev ,0);
    
    return (
      <div className="number">
        {percent.length ? (
          percent.map((item: any, key: any) => {
            return (
              <div className="percent" key={key}>
                <span className="title">{item.sort}</span>
                <Progress
                  percent={item.count/total*100}
                  strokeColor={{
                    "0%": "#0737F4",
                    "100%": "#15B4F2"
                  }}
                />
                <span className="count">{item.count}</span>
              </div>
            );
          })
        ) : (
          <p
            style={{
              minHeight: "2.1rem",
              color: "#fff",
              textAlign: "center",
              lineHeight: "2.1rem"
            }}
          >
            <span>{formatMessage(common.no_data)}</span>
          </p>
        )}
      </div>
    );
  }
}

export default PlatformProgress;
