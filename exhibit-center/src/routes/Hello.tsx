import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import hello from "./../resource/hello/hello.png";

export interface HelloProps {
  classes: any;
  match: any;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    backgroundColor: "#FFFFFF",
    padding: "100px 20px",
    textAlign: "center",
    "& img": {
      width: "400px",
      margin: "50px 0"
    }
  }
});

class Hello extends React.Component<HelloProps, any> {
  constructor(props: Readonly<HelloProps>) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <img src={hello} alt="" />
      </div>
    );
  }
}

const mapState2Props = (state: any) => {
  return {};
};

export default withStyles(styles)(connect(mapState2Props)(Hello));
