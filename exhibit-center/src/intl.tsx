import * as React from "react";
import { connect } from "react-redux";

import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";
import en_US from "./intl/en_US";
import zh_CN from "./intl/zh_CN";
addLocaleData([...en, ...zh]);

export interface IntlProps {
  locale: "en" | "zh";
}

class Intl extends React.Component<IntlProps, any> {
  public render() {
    const messages = {
      en: en_US,
      zh: zh_CN
    };

    let locale = this.props.locale || "en";

    return (
      <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
        {this.props.children}
      </IntlProvider>
    );
  }
}

const mapState2Props = ({ intl: { locale } }: any) => ({
  locale
});

export default connect(mapState2Props)(Intl);
