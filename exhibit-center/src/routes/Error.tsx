import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import error404 from "./../resource/error/404@2x.png";

export interface ErrorProps {
  classes: any;
  match: any;
}

const styles: any = (theme: any) => ({
  root: {
    margin: "20px",
    padding: "100px 20px",
    textAlign: "center",
    "& img": {
      width: "400px",
      margin: "50px 0"
    }
  }
});

class Error extends React.Component<ErrorProps, any> {
  constructor(props: Readonly<ErrorProps>) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <img src={error404} alt="" />
        <FormattedMessage
          id="error.404"
          defaultMessage="Sorry, the page doesn't exist"
          tagName="p"
        />
      </div>
    );
  }
}

const mapState2Props = (state: any) => {
  return {};
};

export default withStyles(styles)(connect(mapState2Props)(Error));
