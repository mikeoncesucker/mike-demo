import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Breadcrumb as Breadcrumbs } from "antd";
import breadcrumbNameMap_zh from "../intl/breadcrumbNameMap_zh";
import breadcrumbNameMap_en from "../intl/breadcrumbNameMap_en";
import { store } from "../store";

export interface BreadcrumbProps {
  classes: any;
  history: any;
  location: any;
  match: any;
  locale: any;
}

const styles: any = (theme: any) => ({
  Breadcrumb: {
    // height: "60px",
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
  setPageAddreee = () => {
    store.dispatch.pageState.resetAllPageState();
  };
  render() {
    const { location, classes, locale } = this.props;
    let title = "";
    const breadcrumbNameMap =
      locale === "en" ? breadcrumbNameMap_en : breadcrumbNameMap_zh;
    const pathSnippets = location.pathname.split("/").filter((i: any) => i);
    const extraBreadcrumbItems = pathSnippets
      .map((_: any, index: number) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        const breadValue = breadcrumbNameMap[url];
        title = breadValue || title;
        return breadValue ? (
          <Breadcrumbs.Item key={url}>
            <Link
              onClick={this.setPageAddreee}
              to={{
                pathname: url,
                // state: location.state ? location.state : {}
              }}
            >
              {breadValue}
            </Link>
          </Breadcrumbs.Item>
        ) : null;
      })
      .filter((i: any) => i);
    extraBreadcrumbItems.pop();
    extraBreadcrumbItems.push(
      <Breadcrumbs.Item key={title}>
        <span>{title}</span>
      </Breadcrumbs.Item>
    );
    const breadcrumbItems = [].concat(extraBreadcrumbItems);
    return title ? (
      <div className={classes.Breadcrumb}>
        {extraBreadcrumbItems.length > 1 && (
          <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
        )}
        <div className={classes.title}>{title}</div>
      </div>
    ) : (
      <div />
    );
  }
}

const mapState2Props = ({ intl: { locale } }: any) => ({
  locale
});

export default withStyles(styles)(withRouter(
  connect(mapState2Props)(Breadcrumb))
);
