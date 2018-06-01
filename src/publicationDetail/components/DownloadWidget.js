import React from "react";
import { withRouter } from "react-router";
import { translateComponent } from "../../i18n/i18n";
import { connect } from "react-redux";
import { IssueDownloadProgress } from "../../issueDetail/model";
import { Maybe } from "monet";
import { LinearProgress, IconButton } from "material-ui";
import NavigationArrowDropDown from "material-ui/svg-icons/navigation/arrow-drop-down";
import NavigationArrowDropUp from "material-ui/svg-icons/navigation/arrow-drop-up";

const style = {
  downloadContainer: {
    position: "fixed",
    display: "grid",
    gridTemplateColumns: "50% 50%",
    bottom: "0%",
    left: "50%",
    maxHeight: "260px",
    transform: "translate(-50%)",
    backgroundColor: "rgba(0,0,0, 0.9)",
    width: "70%",
    color: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  downloadHeader: {
    gridColumnStart: 1,
    gridColumnEnd: 3
  },
  downloadHeaderCounter: {
    float: "left",
    marginLeft: "20px"
  },
  downloadHeaderButton: {
    float: "right"
  },
  downloadList: {
    listStyle: "none",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 0,
    gridColumnStart: 1,
    gridColumnEnd: 3
  },
  downloadItemContainer: {
    display: "grid",
    gridTemplateColumns: "35% 65%",
    textAlign: "center"
  },
  downloadTitle: {
    textAlign: "left"
  },
  downloadProgressBar: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 5
  }
};

const initialState = {
  minimized: false
};
class DownloadWidget extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMinimizedState = this.toggleMinimizedState.bind(this);
    this.state = initialState;
  }
  render() {
    const { t } = this.props;
    if (this.props.visible) {
      return (
        <div style={style.downloadContainer}>
          <div style={style.downloadHeader}>
            <p style={style.downloadHeaderCounter}>
              {`${t("downloadWidgetCounterTitle")} ${
                this.props.inProgressDownloadsCount
              }/${this.props.totalDownloads}`}
            </p>
            <IconButton
              style={style.downloadHeaderButton}
              iconStyle={{ color: "white" }}
              onClick={this.toggleMinimizedState}
            >
              {this.headerIcon()}
            </IconButton>
          </div>
          {this.downloadsList()}
        </div>
      );
    } else {
      return null;
    }
  }

  toggleMinimizedState() {
    const newMinimizedState = !this.state.minimized;
    this.setState({ minimized: newMinimizedState });
  }

  headerIcon() {
    return this.state.minimized ? (
      <NavigationArrowDropUp />
    ) : (
      <NavigationArrowDropDown />
    );
  }

  downloadsList() {
    if (this.state.minimized) {
      return null;
    }
    return (
      <ul style={style.downloadList}>
        {this.props.issueDownloadsProgress.map(download => {
          return (
            <li key={download.issue.publicationId + download.issue.id}>
              <div style={style.downloadItemContainer}>
                <p style={style.downloadTitle}>{download.issue.title}</p>
                <LinearProgress
                  mode="determinate"
                  value={download.progress * 100}
                  style={style.downloadProgressBar}
                />
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export function mapStateToProps(state) {
  return {
    visible: state.publicationDetail.issuesBeingDownloaded.length > 0,
    issueDownloadsProgress: calculateIssueDownloadsProgress(state),
    inProgressDownloadsCount:
      state.publicationDetail.lastIssuesDownloadedProperly.length,
    totalDownloads: state.publicationDetail.downloadsInitiated
  };
}

function calculateIssueDownloadsProgress(state) {
  return state.publicationDetail.issuesBeingDownloaded.map(issue => {
    const maybeProgress = Maybe.fromNull(
      state.publicationDetail.issuePercentageDownloadStatus[issue.id]
    );
    return new IssueDownloadProgress(issue, maybeProgress.orSome(0.0));
  });
}

export const PureDownloadWidget = DownloadWidget;
export default withRouter(
  connect(mapStateToProps, null)(translateComponent(PureDownloadWidget))
);
