import * as React from 'react';
import { common_msg } from '../../messages/common';
export interface FooterProps {
  intl;
  bg?;
}

class Footer extends React.Component<FooterProps, any> {
  constructor(props) {
    super(props)
    this.state = {}
  }
  public render() {
    const { intl, bg } = this.props;
    return (
      <footer style={{
        lineHeight: bg ? '.32rem' : '.42rem',
        color: '#fff',
        textAlign: 'center',
        fontSize: '.12rem',
        background: bg, 
      }}>
        Copyright &#169;&#65039; 2019 {intl.formatMessage(common_msg.corpright)}
      </footer>
    )
  }
}
export default Footer;