import React from "react";

import { withStyles } from "@material-ui/styles";
import { Spin, Icon } from "antd";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export interface LoadingProps {
  classes: any;
}

const styles: any = (theme: any) => ({
  loading: {
    height: "400px",
    paddingTop: "100px",
    "& .ant-spin-spinning": {
      margin: "0 auto",
      display: "block"
    }
  }
});

class Loading extends React.Component<LoadingProps, any> {
  constructor(props: Readonly<LoadingProps>) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loading}>
        <Spin indicator={antIcon} size={"large"} />
      </div>
    );
  }
}

export default withStyles(styles)(Loading);
