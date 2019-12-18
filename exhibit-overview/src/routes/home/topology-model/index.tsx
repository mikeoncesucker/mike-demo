import React from "react";
import { withStyles } from "@material-ui/styles";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const styles: any = (theme: any) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 'calc(10.80rem - 2rem)',
  },
  slider: {
    width: '80%',
    height: '1.02rem',
    paddingLeft: '10%',
    marginTop: '6%',
    '& .slick-slide>div': {
      marginRight: '.46rem',
      height: '100%',
    },
    '& .slick-list, .slick-slider, .slick-track': {
      height: '100%',
      padding: '4px 0'
    },
    '& .slick-prev:before, .slick-next:before': {
      fontSize: 0,
    },
    '& .slick-prev, & .slick-prev:hover,& .slick-prev:focus': {
      background: `url(${require('../../../resource/arrow_left.png')}) no-repeat`,
      backgroundSize: 'cover'
    },
    '& .slick-next, .slick-next:hover,& .slick-next:focus': {
      background: `url(${require('../../../resource/arrow_right.png')}) no-repeat`,
      backgroundSize: 'cover'
    },
    '& .item': {
      height: '100%',
      margin: '0 23px',
      color: '#80A6FB ',
      backgroundColor: '#010f51',
      opacity: 0.8,
      boxShadow: '0px -7px 30px 0px #1F44BE inset',
      '& span': {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }
    }
  }
})

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1
};

export interface TopologyModelProps {
  classes: any;
  match: any;
  list: any;
  intl: any;
  getTopological: Function;
}
class TopologyModel extends React.Component<TopologyModelProps, any> {
  constructor(props: Readonly<TopologyModelProps>) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const {getTopological, intl } = this.props;
    const language = intl.locale === 'zh' ? 'chinese' : 'english';
    getTopological({
      language,
      cb: null
    })
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const { classes, list, intl } = this.props;
    const bg = {
      background: `url(${require('../../../resource/topology_' + (intl.locale) +'.png')}) center no-repeat`,
      backgroundSize: '17rem 8.28rem',
    }
    if(!list) return '</div>';

    return (
      <div className={classes.root} style={bg}>
        <div className={classes.slider}>
          <Slider {...settings}>
            {
              list.map((item:any, key:number) => {
                return (
                  <div className="item" key={key}>
                    <span>{item.systemName}</span>
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </div>
    );
  }
}
const mapState2Props = ({ topologyModel: { list } }: any) => ({
  list
});

const mapDispatch2Props = ({ topologyModel: { getTopological } }: any) => ({
  getTopological
});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(injectIntl(TopologyModel))
);
