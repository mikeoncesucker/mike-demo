const styles: any = (theme: any) => ({
  root: {
    padding: ".32rem .32rem 1px",
    "& .border>div": {
      position: "absolute",
      width: ".15rem",
      height: ".15rem",
      zIndex: 1
    },
    "& .border1": {
      top: "-1px",
      left: "-1px",
      borderLeft: "2px solid #14A5FB",
      borderTop: "2px solid #14A5FB"
    },
    "& .border2": {
      top: "-1px",
      right: "-1px",
      borderRight: "2px solid #14A5FB",
      borderTop: "2px solid #14A5FB"
    },
    "& .border3": {
      bottom: "-1px",
      left: "-1px",
      borderLeft: "2px solid #14A5FB",
      borderBottom: "2px solid #14A5FB"
    },
    "& .border4": {
      bottom: "-1px",
      right: "-1px",
      borderRight: "2px solid #14A5FB",
      borderBottom: "2px solid #14A5FB"
    }
  },
  apiOverview: {
    display: "flex",
    "& .overview": {
      flex: 8,
      border: "1px solid #3E74FF",
      position: "relative",
      "&>div:nth-child(2)": {
        height: "55px",
        lineHeight: "55px",
        margin: '0 -1px',
        paddingTop: 0,
        background: "#050766",
        fontSize: '.22rem',
      }
    },
    "& .sysCensus": {
      flex: 4,
      marginLeft: "20px",
      border: "1px solid #3E74FF",
      position: "relative"
    }
  },
  title: {
    color: "#0078FF",
    fontSize: ".18rem",
    padding: ".12rem .14rem 0",
  },
  title_line: {
    height: "11px",
    marginLeft: "15px"
  },
  detailTrend: {
    display: "flex",
    height: "400px",
    margin: "18px 0",
  },
  detail: {
    flex: 6,
    marginRight: "18px",
    border: "1px solid #3E74FF",
    position: "relative",
    "& .table": {
      padding: "15px",
      height: "90%",
      fontSize: '.14rem',
      "& ul": {
        padding: 0,
        margin: 0
      },
      "& li, span": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      },
      "& .header": {
        display: "flex",
        height: "40px",
        padding: "0 20px",
        marginBottom: "10px",
        background: "#151B54",
        lineHeight: "40px",
        color: "#9193BF",
        "& li": {
          width: '16.66%'
        }
      },
      "& .content": {
        position: "relative",
        height: "80%",
        overflow: "hidden"
      },
      "& .itemList": {
        display: "flex",
        flexDirection: "column",
        color: "#9090C1",
        "& li": {
          display: "flex",
          padding: "5px 20px",
          lineHeight: "20px",
          "& span": {
            width: '16.66%'
          }
        }
      }
    }
  },
  trend: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    "& >div": {
      flex: 1,
      border: "1px solid #3E74FF",
      position: "relative",
      overflow: "hidden"
    },
    "& .loopChart": {
      marginTop: "10px"
    }
  }
});

export default styles;
