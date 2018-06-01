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
    this.updateDimensions = this.updateDimensions.bind(this);
    this.sizeStatus = this.sizeStatus.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState(this.sizeStatus());
  }

  sizeStatus() {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.title()}
          onLeftIconButtonClick={this.onLeftIconButtonClick}
          iconElementLeft={this.leftIcon()}
          style={style}
          iconElementRight={this.rightIcon()}
        />
      </div>
    );
  }

  rightIcon() {
    const { t } = this.props;
    return (
      <div>
        <SearchPublicationAutoComplete />
        {this.gitHubIcon(t)}
      </div>
    );
  }

  gitHubIcon(t) {
    if (this.renderingInAReallySmallDevice()) {
      return null;
    } else {
      return (
        <IconButton onClick={this.openGitHubProjectPage}>
          <img src={githubLogo} alt={t("githubLogo")} />
        </IconButton>
      );
    }
  }

  title() {
    if (this.renderingInADeviceWhereTheTitleDoesNotFit()) {
      return "";
    } else {
      return this.props.title;
    }
  }

  renderingInADeviceWhereTheTitleDoesNotFit() {
    return this.state.width <= 510;
  }

  renderingInAReallySmallDevice() {
    return this.state.width <= 400;
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
