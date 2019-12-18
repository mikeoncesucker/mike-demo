import * as React from 'react';
import { IntlProvider } from "react-intl";
import { connect } from 'react-redux';

export interface IntlProps {
  locale: any;
  message: any;
}

class Intl extends React.Component<IntlProps, any> {
  public render() {
    let { locale, message } = this.props;
    return (
      <IntlProvider locale={locale} key={locale} messages={message}>
        {this.props.children}
      </IntlProvider>
    );
  }
}

const mapState2Props = (state:any) => {
  return {
    locale: state.intl.locale,
    message: state.intl.message
  };
};

export default connect(mapState2Props)(Intl);
