import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Breadcrumb as Breadcrumbs } from "antd";

const breadcrumbNameMap: any = {
  "/overview/sysRelation": {
    nav: "系统指标/系统间调用关系",
    url: ''
  }
};

export interface BreadcrumbProps {
  classes: any;
  history: any;
  location: any;
  match: any;
}

const styles: any = (theme: any) => ({
  Breadcrumb: {
    padding: "15px",
    marginTop: "3px",
    backgroundColor: "#FFFFFF",
    fontSize: "14",
    "& .ant-breadcrumb": {
      marginBottom: "16px"
    },
    "& a": {
      color: "#30c4ff"
    }
  },
  title: {
    fontSize: "20px",
    color: "#33353D",
    fontWeight: "bold"
  }
});

class Breadcrumb extends React.Component<BreadcrumbProps, any> {
  constructor(props: Readonly<BreadcrumbProps>) {
    super(props);
    this.state = {};
  }

  render() {
    const { location, classes } = this.props;
    const title = (breadcrumbNameMap[location.pathname] || {}).nav || '';
    const breadcrumbItems = title.split('/');
    const url = (breadcrumbNameMap[location.pathname] || {}).url;
    return (
      <div className={classes.Breadcrumb}>
        <Breadcrumbs>
          {
            breadcrumbItems.map((item:any,key:number)=>{
              return(
                key === 0 ? (<Breadcrumbs.Item key={key}>
                  <Link to={{
                    pathname: url,
                  }}>
                    {item}
                  </Link>
                </Breadcrumbs.Item>) :
                <Breadcrumbs.Item key={key}>
                  {item}
                </Breadcrumbs.Item>
              )
            })
          }
        </Breadcrumbs>
      </div>
    )
  }
}

const mapState2Props = () => ({});

export default withStyles(styles)(
  withRouter(connect(mapState2Props)(Breadcrumb))
);
