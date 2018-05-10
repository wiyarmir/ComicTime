import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "material-ui";
import ComicTimeLogo from "../comicTimeLogo/ComicTimeLogo";

const style = {
  progressBar: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  logo: {
    position: "absolute",
    width: 92,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -48%)"
  }
};
class ProgressBar extends React.Component {
  render() {
    if (this.props.hidden) {
      return null;
    } else {
      return (
        <div>
          <div>
            <CircularProgress
              mode="indeterminate"
              size={100}
              value={55}
              style={style.progressBar}
            />
            <div style={style.logo}>
              <ComicTimeLogo />
            </div>
          </div>
        </div>
      );
    }
  }
}

ProgressBar.propTypes = {
  hidden: PropTypes.bool
};

ProgressBar.defaultProps = {
  hidden: false
};

export default ProgressBar;
