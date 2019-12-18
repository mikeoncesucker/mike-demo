const styles: any = (theme: any) => ({
  root: {
    width: "100%",
    "& h2, & h3, & h4": {
      marginTop: 0,
      marginBottom: 0,
      color: "#fff"
    },
    "& p": {
      marginBottom: 0
    },
    "& .slick-slider": {
      width: "92%",
      margin: "0 auto",
    },
    "& .slick-slide>div": {
      margin: "0 .1rem"
    },
    "& .slick-prev": {
      background: `url(${require("../../../resource/arrow_left.png")}) no-repeat`,
      backgroundSize: "contain",
      left: "-.35rem"
    },
    "& .slick-next": {
      background: `url(${require("../../../resource/arrow_right.png")}) no-repeat`,
      backgroundSize: "contain",
      right: "-.35rem"
    },
    "& .slick-prev, & .slick-next": {
      top: "50%"
    },
    "& .slick-prev:before,& .slick-next:before": {
      content: " ",
      display: "none"
    },
    "& .slick-prev:hover,& .slick-prev:focus": {
      background: `url(${require("../../../resource/arrow_left.png")}) no-repeat`,
      backgroundSize: "contain"
    },
    "& .slick-next:hover,& .slick-next:focus": {
      background: `url(${require("../../../resource/arrow_right.png")}) no-repeat`,
      backgroundSize: "contain"
    },
    "& .main": {
      display: "flex",
      margin: ".2rem .24rem 0",
      color: "#fff",
      fontSize: ".18rem",
      "&>div": {
        flex: 1,
      },
      "& .head": {
        width: "100%",
        height: ".54rem",
        lineHeight: ".54rem",
        background:
          "linear-gradient(270deg,rgba(0,16,145,0) 0%,rgba(0,16,145,0.6) 100%)",
        boxShadow: "0 .07rem .25rem 0 rgba(32,31,67,0.06)",
        borderRadius: ".03rem",
        "& > h4": {
          display: "inline-block",
          margin: "0 .15rem 0 .24rem",
          fontSize: ".16rem",
          color: "#0078FF",
        },
        "& > img": {
          height: ".12rem",
        }
      },
      "& .zhibiao": {
        "& .content:nth-child(1) .item div": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
        "& > .content": {
          height: "2.86rem",
          background: "rgba(0,16,145,0.3)",
          borderRadius: ".03rem",
          boxSizing: " border-box",
          border: "1px solid rgba(28,50,105,1)",
          marginBottom: ".16rem",
          "& .item": {
            display: "flex",
            flexWrap: "wrap",
            padding: ".16rem .1rem 0",
            "& div": {
              flex: "0 0 25%",
              padding: '0 .05rem',
              overflow: "hidden",
              '& p:nth-child(1)': {
                fontSize: '.15rem',
                color: '#9193BF',
              },
              "& p:nth-child(2)": {
                margin: '.14rem 0',
                fontSize: '.24rem',
                fontWeight: 500,
                color: '#fff',
              }
            },
            "& .dashboard": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              flex: "50%",
              '& h4': {
                paddingBottom: '.09rem',
                fontSize: '.14rem',
                color: '#9193BF',
              },
              "& img": {
                width: "1.81rem",
              },
              "& div": {
                display: "flex",
                fontSize: ".12rem",
                justifyContent: 'space-between'
              },
              "& .pointer": {
                position: "absolute",
                left: "45%",
                top: ".42rem",
                width: ".24rem",
                height: ".75rem",
                transformOrigin: "center bottom",
                transform: "rotate(-90deg)"
              }
            }
          }
        },
        "& .content:nth-child(2)": {
          height: '2.56rem'
        },
        "& .tip": {
          fontSize: ".12rem",
          color: "#828BAA",
          padding: '.12rem 0 0 .1rem'
        }
      }
    },
    "& .center": {
      position: "relative",
      flex: '1.5 !important',
      '& .center_bg': {
        width: '100%',
        height: '103%'
      },
      margin: " 0 .2rem",
      "& .beard_left": {
        width: "3.27rem",
        position: "absolute",
        left: "-1.63rem",
        bottom: ".24rem"
      },
      "& .beard_right": {
        width: "3.27rem",
        position: "absolute",
        right: "-1.63rem",
        bottom: ".24rem"
      },
      "& .center_left_list": {
        position: "absolute",
        left: ".4rem",
        top: ".95rem",
        width: "1.9rem",
        height: "55%",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
          "-ms-overflow-style": "none"
        },
        "& .item": {
          color: "#1FA8FF",
          fontSize: ".16rem",
          marginBottom: ".12rem",
        }
      }
    },
    "& .char": {
      "& > .content": {
        height: "2.66rem",
        background: "rgba(0,16,145,0.3)",
        borderRadius: ".03rem",
        boxSizing: " border-box",
        border: "1px solid rgba(28,50,105,1)",
        marginBottom: ".11rem"
      },
      "& .content": {
        height: '2.76rem'
      }
    },
    "& .mid": {
      padding: "0 .32rem",
      display: "flex",
      "& .item": {
        flex: "1",
        width: "1.72rem",
        height: ".53rem",
        lineHeight: ".53rem",
        textAlign: "center",
        color: "#D6E5FB",
        background: "rgba(5,5,49,1)",
        border: "1px solid",
        borderImage:
          "linear-gradient(224deg, rgba(105,227,255,0), rgba(82,211,255,1), rgba(56,194,255,0)) 1 1",
        "& .num": {
          fontSize: ".24rem"
        },
        "& .name": {
          fontSize: ".12rem"
        }
      },
      "& .item_img": {
        flex: 1,
        "& .img_left": {
          width: "60%",
          padding: ".22rem 0 0 .16rem"
        },
        "& .img_right": {
          width: "60%",
          padding: ".22rem .16rem 0 0",
          float: "right"
        }
      }
    },
    "& .footer": {
      paddingBottom: ".22rem",
      marginTop: ".5rem",
      color: "#D6E5FB",
      "& .platform": {
        height: '2.84rem',
        "& .item": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(223deg,rgba(4,10,255,0) 0%,rgba(4,10,255,1) 48%,rgba(4,10,255,0) 100%)",
          borderRadius: " .05rem",
          border: "1px solid #3E74FF",
          height: "2.84rem",
          padding: "0 .1rem",
          fontSize: ".12rem",
          "& .sysName": {
            fontSize: ".2rem"
          },
          "& .left": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            padding: '.1rem 0',
            fontSize: ".12rem",
          },
          "& .right": {
            "& > p": {
              textAlign: "center",
              color: "#afafaf",
              marginTop: ".1rem"
            },
            "& .wrap,& h3": {
              color: "#afafaf"
            },
            "& h4": {
              color: "#fff",
              marginTop: ".05rem"
            },
            "& .wrap": {
              display: "flex",
              justifyContent: "space-between",
              marginTop: ".10rem",
              textAlign: "center"
            }
          }
        }
      },
      "& .flex": {
        display: "flex",
        justifyContent: "space-between"
      }
    }
  }
});
export default styles;