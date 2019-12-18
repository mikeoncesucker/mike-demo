const styles: any = (theme: any) => ({
  root: {
    "& .main": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      margin: ".41rem .1rem"
    },
    "& .leftCensus": {
      fontSize: ".14rem",
      color: "#BBE4FF",
      "& .item": {
        display: "flex",
        alignItems: "center",
        marginTop: ".19rem",
        "& p": {
          margin: 0,
          lineHeight: ".2rem",
          whiteSpace: "nowrap"
        },
        "& span": {
          color: "#4FCCFF"
        },
        "& img": {
          width: ".38rem",
          height: ".4rem",
          marginRight: ".09rem"
        },
        "& .NumAmount": {
          display: "block",
          width: ".84rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }
    },
    "& .rightSys": {
      position: "relative",
      height: "5.9rem",
      width: "90%",
      maxWidth: "15.76rem",
      "&>div": {
        display: "flex",
        justifyContent: "space-around"
      },
      "& .middle": {
        margin: "1.5rem 0",
        '& .item:nth-child(2)>p': {
          opacity: 0,
          minWidth: '3.4rem'
        },
        '& .content': {
          top: '90%'
        }
      },
      "& .item": {
        height: "1rem",
        "&>p": {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: "1rem",
          width: "2rem",
          padding: "0 .12rem",
          margin: 0,
          background: "rgba(1,15,81,0.61)",
          boxShadow: "0 -.07rem .3rem 0 rgba(31,68,190,1) inset",
          border: "1px solid rgba(0,25,101,1)",
          textAlign: "center",
          fontSize: ".24rem",
          fontWeight: "400",
          lineHeight: ".33rem",
          textShadow: "1px 1px .06rem rgba(3,144,192,.62)",
          "& span": {
            overflow: 'hidden',
            display: '-webkit-box',
            textOverflow: 'ellipsis',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': 2,
          }
        },
        "& .dataTitle": {
          color: "#32F0FF",
          cursor: "pointer"
        },
        "& .nullTitle": {
          color: "#B7BEC5",
        },
        "& .dataTitle:hover + .content": {
          display: "block"
        },
        "& .content": {
          position: "absolute",
          zIndex: 22,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          display: "none",
          minWidth: "1.6rem",
          border: "1px solid #7A4D03",
          background: "rgba(15,0,0,.3)",
          fontSize: ".14rem",
          color: "#fff",
          paddingBottom: "2px",
          "& .name": {
            height: ".37rems",
            marginBottom: ".05rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: ".37rem",
            background: "#402903",
            textAlign: "center",
            color: "#F5A623"
          },
          "& p": {
            marginBottom: '1em',
            padding: "0 .16rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }
        },
      }
    },
    "& .footer": {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: ".1rem .45rem",
      background: "#001141",
      overflow: "hidden",
      "& .item": {
        flex: 1,
        width: "30%",
        height: "100%",
        "& .title": {
          padding: "0 0 0 .36rem",
          margin: ".1rem 0",
          fontSize: ".16rem",
          color: "#0390C0",
          '& >span': {
            marginLeft: ".06rem",
            color: "#b7bec5", 
            fontSize: ".12rem", 
          }
        },
        "& .content": {
          width: "100%",
          height: "2.2rem",
          background: `url(${require("../../../resource/center_border1.png")}) no-repeat`,
          backgroundSize: "100% 100%",
          paddingTop: ".1rem",
          overflow: "hidden",
          "& .number": {
            height: '100%',
            display: "flex", 
            flexDirection: 'column', 
            justifyContent: 'space-around',
            padding: '0 .1rem'
          },
          "& .percent": {
            display: "flex",
            alignItems: "center",
            color: "#9193BF",
            fontSize: ".18rem",
            '& .title': {
              width: '1rem',
              padding: 0,
              textAlign: 'right'
            },
            "& .ant-progress-line": {
              width: "60%",
              margin: "0 .2rem"
            },
            "& .ant-progress-show-info .ant-progress-outer": {
              marginRight: 0,
              paddingRight: 0
            },
            "& .ant-progress-inner": {
              background: "#053A70"
            },
            "& .ant-progress-status-success .ant-progress-bg": {
              background: "#005CC3"
            },
            "& .ant-progress-text": {
              display: "none"
            }
          },
          "& .loop": {
            display: "flex",
            alignItems: "center",
            height: "100%",
            fontSize: ".12rem",
            color: "#00E999"
          }
        }
      },
      "& .item:nth-child(2)": {
        margin: "0 .14rem",
        "& .content": {
          background: `url(${require("../../../resource/center_border2.png")}) no-repeat`,
          backgroundSize: "100% 100%"
        },
        "& .count": {
          fontSize: ".12rem",
          color: "#00E999",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }
    }
  }
});
export default styles;