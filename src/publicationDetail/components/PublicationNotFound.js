import React from "react";
import { translateComponent } from "../../i18n/i18n";
import ComicTimeLogo from "../../baseComponents/comicTimeLogo/ComicTimeLogo";

const style = {
  container: {
    width: "100%",
    height: "100%"
  },
  iconContainer: {
    position: "absolute",
    height: "200px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
};

class PublicationNotFound extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div style={style.container}>
        <div style={style.iconContainer}>
          <ComicTimeLogo />
          <p>
            {t("publicationNotFoundMessage")}{" "}
            <span role="img" aria-label="Sad">
              &#128546;
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export const PurePublicationNotFound = PublicationNotFound;
export default translateComponent(PurePublicationNotFound);
