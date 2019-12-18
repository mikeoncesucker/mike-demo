import * as React from 'react';
import styles from './style.module.less';
import Slider from "react-slick";
import { Icon } from 'antd';
import classNames from 'classnames';
import './slider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { search_msg } from '../../messages/search';
export interface SliderProps {
  user;
  intl;
}

class Sliders extends React.Component<SliderProps, any> {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  SamplePrev = (props) => {
    const { className, onClick } = props;
    const disabled = className.indexOf('slick-disabled') > -1;
    return (
      <div
        className={classNames(styles.prev, (disabled && styles.opc))}
        onClick={onClick}
      >
        <Icon type="left" className={disabled && styles.opc} />
      </div>
    );
  }
  SampleNext = (props) => {
    const { className, onClick } = props;
    const disabled = className.indexOf('slick-disabled') > -1;
    return (
      <div
        className={classNames(styles.next, (disabled && styles.opc))}
        onClick={onClick}
      >
        <Icon type="right" className={disabled && styles.opc} />
      </div>
    );
  }

  public render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      nextArrow: <this.SampleNext />,
      prevArrow: <this.SamplePrev />
    };
    const { intl, user, } = this.props;
    const { formatMessage } = intl
    return (
      <div className={classNames(styles.slider, user.length>4 ? styles.leftMore : styles.leftAlign)}>
        <Slider {...settings}>
          {
            user.map((item, index) => {
              return (
                <div className={styles.item} key={index}>
                  <div className={styles.item_content}>
                    <p className={styles.name} dangerouslySetInnerHTML={{ __html: item.name }} />
                    <div className={styles.info_item}>
                      <p>{formatMessage(search_msg.sex)}</p>
                      <p>：{item.sex}</p>
                    </div>
                    <div className={styles.info_item}>
                      <p>{formatMessage(search_msg.tel)}</p>
                      <p>：{item.phone}</p>
                    </div>
                    <div className={styles.info_item}>
                      <p>{formatMessage(search_msg.branch)}</p>
                      <p>：{item.organize}</p>
                    </div>
                    <div className={styles.info_item}>
                      <p>{formatMessage(search_msg.job)}</p>
                      <p>：{item.job}</p>
                    </div>
                    <div className={styles.info_item}>
                      <p>{formatMessage(search_msg.account)}</p>
                      <p title={item.userId}>：{item.userId}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </Slider>
      </div>
    )
  }
}
export default Sliders
