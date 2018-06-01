import React from "react";
import PropTypes from "prop-types";
import { AppBar, IconButton } from "material-ui";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { INDEX } from "../../routes";
import ComicTimeLogo from "../comicTimeLogo/ComicTimeLogo";
import githubLogo from "../images/githubLogo.svg";
import { translateComponent } from "../../i18n/i18n";
import SearchPublicationAutoComplete from "../../search/components/SearchPublicationAutoComplete";
const style = {
  position: "fixed",
  top: 0
};

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.onLeftIconButtonClick = this.onLeftIconButtonClick.bind(this);
    this.openGitHubProjectPage = this.openGitHubProjectPage.bind(this);
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <AppBar
          title={this.props.title}
          onLeftIconButtonClick={this.onLeftIconButtonClick}
          iconElementLeft={this.leftIcon()}
          style={style}
          iconElementRight={
            <div>
              <SearchPublicationAutoComplete />
              <IconButton onClick={this.openGitHubProjectPage}>
                <img src={githubLogo} alt={t("githubLogo")} />
              </IconButton>
            </div>
          }
        />
      </div>
    );
  }

  leftIcon() {
    if (this.props.showBackButton) {
      return (
        <IconButton>
          <NavigationArrowBack />
        </IconButton>
      );
    } else {
      return (
        <IconButton>
          <ComicTimeLogo />
        </IconButton>
      );
    }
  }

  onLeftIconButtonClick() {
    if (this.props.showBackButton === true) {
      this.props.history.goBack();
    } else {
      this.props.history.go(INDEX);
    }
  }

  openGitHubProjectPage() {
    window.open("https://github.com/ComicTime/ComicTime", "_blank");
  }
}

NavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool,
  history: PropTypes.object
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export const PureNavigationBar = NavigationBar;
export default translateComponent(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(PureNavigationBar))
);
