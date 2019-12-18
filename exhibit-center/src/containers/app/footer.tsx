import React from "react";
import { Layout } from "antd";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

export interface FooterProps {
  classes: any;
}

const styles: any = (theme: any) => ({
  footer: {
    textAlign: "center",
    color: "#999999",
    padding: "16px "
  }
});

class Footer extends React.Component<FooterProps, any> {
  constructor(props: Readonly<FooterProps>) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Layout.Footer className={classes.footer}>
          Copyright ©2019 中通服出品
        </Layout.Footer>
      </div>
    );
  }
}

const mapState2Props = (state: any) => {
  return {};
};

export default withStyles(styles)(connect(mapState2Props)(Footer));
