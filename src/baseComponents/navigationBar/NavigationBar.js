import React from "react";
import PropTypes from "prop-types";
import { AppBar, IconButton } from "material-ui";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { INDEX } from "../../routes";
import ComicTimeLogo from "../comicTimeLogo/ComicTimeLogo";

const style = {
  position: "fixed",
  top: 0
};

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.onLeftIconButtonClick = this.onLeftIconButtonClick.bind(this);
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          onLeftIconButtonClick={this.onLeftIconButtonClick}
          iconElementLeft={this.leftIcon()}
          style={style}
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PureNavigationBar)
);
