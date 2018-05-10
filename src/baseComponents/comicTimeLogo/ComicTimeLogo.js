import React from "react";
import appLogo from "../images/logo.svg";
import { translateComponent } from "../../i18n/i18n";

const style = {
  backgroundColor: "#FFFFFF",
  borderRadius: "50%"
};

class ComicTimeLogo extends React.Component {
  render() {
    const { t } = this.props;
    return <img src={appLogo} style={style} alt={t("appLogo")} />;
  }
}

export const PureComicTimeLogo = ComicTimeLogo;
export default translateComponent(PureComicTimeLogo);
