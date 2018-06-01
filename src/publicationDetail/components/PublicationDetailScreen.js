import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import NavigationBar from "../../baseComponents/navigationBar/NavigationBar";
import { translateComponent } from "../../i18n/i18n";
import ProgressBar from "../../baseComponents/progressBar/ProgressBar";
import { Scrollbars } from "react-custom-scrollbars";
import { downloadIssue, fetchPublicationById } from "../publicationDetail";
import { None } from "monet";
import { List, ListItem, Paper } from "material-ui";
import LazyImage from "../../baseComponents/lazyImage/LazyImage";
import {
  gridTemplateForTwoColumns,
  imageBackgroundPositionForTwoColumns
} from "../../utils/windowUtils";
import ArrowDownward from "material-ui/svg-icons/navigation/arrow-downward";
import PublicationNotFound from "./PublicationNotFound";

class PublicationDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.sizeStatus = this.sizeStatus.bind(this);
  }

  componentWillMount() {
    const publicationId = this.props.match.params.id;
    this.props.onComponentMounted(publicationId);
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
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

  componentDidUpdate(prevProps) {
    const oldPublicationId = prevProps.match.params.id;
    const publicationId = this.props.match.params.id;
    if (oldPublicationId !== publicationId) {
      this.props.onComponentMounted(publicationId);
    }
  }

  render() {
    if (this.props.loading) {
      return <ProgressBar />;
    } else {
      const style = this.style();
      const maybePublication = this.props.publication;
      const publicationTitle = maybePublication
        .map(publication => publication.title)
        .orSome("");
      const mainComponent = maybePublication
        .map(publication => {
          return this.publicationDetailComponent(style, publication);
        })
        .orSome(<PublicationNotFound />);
      return (
        <div style={{ height: "100%", width: "100%", position: "absolute" }}>
          <NavigationBar showBackButton={true} title={publicationTitle} />
          {mainComponent}
        </div>
      );
    }
  }

  publicationDetailComponent(style, publication) {
    const { t } = this.props;
    const publicationImage = publication.image;
    const publicationTitle = publication.title;
    return (
      <Scrollbars style={style.content}>
        <Paper style={style.paper}>
          <div style={style.infoGrid}>
            <div style={{ gridRowStart: 1, gridRowEnd: 7 }}>
              <LazyImage
                height={350}
                src={publicationImage}
                placeholder={publicationImage}
                alt={publicationTitle}
                style={style.image}
              />
            </div>
            <div>
              <p>
                <strong style={style.remarkableInfo}>
                  {t("publicationDetailHeaderTitle")}
                </strong>{" "}
                {publication.title}
              </p>
            </div>
            <div>
              <p>
                <strong style={style.remarkableInfo}>
                  {t("publicationDetailHeaderStatus")}
                </strong>{" "}
                {publication.status.orSome("")}
              </p>
            </div>
            <div>
              <p>
                <strong style={style.remarkableInfo}>
                  {t("publicationDetailHeaderSummary")}
                </strong>{" "}
                {publication.summary}
              </p>
            </div>
            <div>
              <p>
                <strong style={style.remarkableInfo}>
                  {t("publicationDetailHeaderPublisher")}
                </strong>{" "}
                {publication.publisher.orSome("")}
              </p>
            </div>
            <div>
              <p>
                <strong style={style.remarkableInfo}>
                  {t("publicationDetailHeaderReleaseDate")}
                </strong>{" "}
                {publication.releaseDate.orSome("")}
              </p>
            </div>
            <div>
              <p>
                <strong style={style.remarkableInfo}>
                  {t("publicationDetailHeaderAuthors")}
                </strong>{" "}
                {publication.authors.orSome("")}
              </p>
            </div>
          </div>
          <List>
            {publication.issues.map(issue => {
              return (
                <ListItem
                  key={issue.id}
                  primaryText={issue.title}
                  secondaryText={issue.releaseDate}
                  rightIconButton={
                    <ArrowDownward
                      onClick={() => {
                        this.props.onIssueClick(issue);
                      }}
                    />
                  }
                  onClick={() => {
                    this.props.onIssueClick(issue);
                  }}
                />
              );
            })}
          </List>
        </Paper>
      </Scrollbars>
    );
  }

  style() {
    return {
      content: {
        marginTop: 62
      },
      paper: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20,
        marginTop: 20,
        padding: 20
      },
      infoGrid: {
        display: "grid",
        gridTemplateColumns: gridTemplateForTwoColumns(this.state.width),
        marginBottom: 20
      },
      image: {
        backgroundPosition: imageBackgroundPositionForTwoColumns(
          this.state.width
        )
      },
      remarkableInfo: {
        textDecoration: "underline"
      }
    };
  }
}

PublicationDetailScreen.defaultProps = {
  loading: true,
  publication: None(),
  error: None()
};

export function mapStateToProps(state) {
  return {
    loading: state.publicationDetail.fetchingPublication,
    publication: state.publicationDetail.publicationSelected,
    error: state.publicationDetail.errorFetchingPublication
  };
}

export function mapPropsToDispatch(dispatch) {
  return {
    onComponentMounted: publicationId => {
      dispatch(fetchPublicationById(publicationId));
    },
    onIssueClick: issue => {
      dispatch(downloadIssue(issue));
    }
  };
}

export const PurePublicationDetailScreen = PublicationDetailScreen;
export default withRouter(
  connect(mapStateToProps, mapPropsToDispatch)(
    translateComponent(PurePublicationDetailScreen)
  )
);
