import React from "react";

import { withStyles } from "@material-ui/styles";
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import Table from "../../compontents/column_table";

export interface DetailsProps {
  classes: any;
  location: any;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "30px 20px",
  },
  title: {
    fontSize: "16px",
    color: "#33353D"
  },
  table: {
    "& td": {
      padding: "0 10px"
    }
  },
});

class Details extends React.Component<DetailsProps, any> {
  constructor(props: Readonly<DetailsProps>) {
    super(props);
    this.state = {
      item: null,

    };
  }

  componentWillMount() {
    const { location } = this.props;
    if (location.state) {
      sessionStorage.setItem("logItem", JSON.stringify(location.state.item));
    }
    let logItem : any = sessionStorage.getItem("logItem");
    logItem = JSON.parse(logItem);
    this.setState({
      item: logItem
    });
  }

  render () {
    const { classes } = this.props;
    const { item } = this.state;

    const column : any = [
      [
      {
        name: <FormattedMessage id="log.userName" defaultMessage="User name"/>,
        value: <Tooltip title={item.userName}>{item.userName}</Tooltip>
      },
      {
        name: <FormattedMessage id="log.userId" defaultMessage="User ID"/>,
        value: <Tooltip title={item.userId} className="value">{item.userId}</Tooltip>
      },
      {
        name: <FormattedMessage id="log.userAccount" defaultMessage="User account"/>,
        value: <Tooltip title={item.account}>{item.account}</Tooltip>
      }],
      [{
        name: <FormattedMessage id="log.userOperationTime" defaultMessage="User Operation Time" />,
        value: <Tooltip title={item.createdAt}>{item.createdAt}</Tooltip>
      },
      {
        name: <FormattedMessage id="log.systemAbbreviation" defaultMessage="System abbreviation"/>,
        value: <Tooltip title={item.identifier}>{item.identifier}</Tooltip>
      },
      {
        name: <FormattedMessage id="log.instructions" defaultMessage="Instructions"/>,
        value: <Tooltip title={item.operation}>{item.operation}</Tooltip>
      }],
      [{
        name: <FormattedMessage id="log.requestMethod" defaultMessage="Request Method" />,
        value: <Tooltip title={item.method}>{item.method}</Tooltip>,
      },
      {
        name: <FormattedMessage id="log.chineseNameOfTheSystem" defaultMessage="Chinese Name Of The System"/>,
        value: <Tooltip title={item.systemName}>{item.systemName}</Tooltip>,
        colSpan: "3"
      }],
      [{
        name: <FormattedMessage id="log.requestFullPath" defaultMessage="Request Full Path"/>,
        value: <Tooltip title={item.api}>{item.api}</Tooltip>,
        colSpan: "5"
      }]
    ];

    return (
      <div className={classes.root}>
        <p className={classes.title}>
          <FormattedMessage
            id="user.detail.basicInformation"
            defaultMessage="Basic information"
          />
        </p>
        <div className={classes.table}>
          <Table column={column} />
        </div>
      </div>
    )
  }

}

export default withStyles(styles)(Details);
  
