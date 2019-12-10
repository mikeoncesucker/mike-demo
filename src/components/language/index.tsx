import * as React from 'react';
import { connect } from "react-redux";
import classNames from 'classnames';
export interface LanguageProps {
  styles?;
  portal?;
  beforeLogin?;
  setLanguage;
  changeLocale;
  locale;
}

class Language extends React.Component<LanguageProps, any> {
  constructor(props) {
    super(props)
    this.state = {
      language: null,
    }
  }
  componentDidMount() {
    this.setState({
      language: this.props.locale === 'zh' ? 'English' : '简体中文'
    })
  }
  // 设置语言
  setLanguage = () => {
    const { setLanguage, portal, beforeLogin, changeLocale, } = this.props;
    let lan = this.state.language === 'English' ? 'en' : 'zh';
    if(portal) {
      return null
    }
    changeLocale(lan);
    if(!beforeLogin) {
      let language = lan === 'zh' ? 'chinese' : 'english';
      setLanguage({
        language:{language:language},
        cb:null
      })
    }
  }

  public render() {
    const { language } = this.state;
		const { styles } = this.props;
    return (
      <label style={ styles }>
        <span 
          className={classNames('iconfont icon-change')} 
          style={{cursor: 'pointer',}}
          onClick={ this.setLanguage }
        >
          { language }
        </span>
      </label>
    )
  }
}
const mapState2Props = ({ 
  intl: { 
    locale 
  }
}) => ({
  locale
})
const mapDispatch2Props = ({
  portal: { 
    setLanguage 
  },
  intl: { 
    changeLocale 
  },
}:any) => ({
 changeLocale, 
 setLanguage
});
export default connect(mapState2Props,mapDispatch2Props)(Language);