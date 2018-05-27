import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchPublications, fetchNextPublicationsPage } from "../feed";
import NavigationBar from "../../baseComponents/navigationBar/NavigationBar";
import { translateComponent } from "../../i18n/i18n";
import ProgressBar from "../../baseComponents/progressBar/ProgressBar";
import { Scrollbars } from "react-custom-scrollbars";
import PublicationsFeed from "./PublicationsFeed";
import { publicationDetail } from "../../routes";

const style = {
  grid: {
    marginTop: 62
  }
};

const nextPageScrollBoundary = 0.75;

class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onScrollFrame = this.onScrollFrame.bind(this);
    this.goToPublicationDetailScreen = this.goToPublicationDetailScreen.bind(
      this
    );
  }

  componentWillMount() {
    this.props.onComponentMounted();
  }

  render() {
    const { t } = this.props;
    if (this.props.loading) {
      return <ProgressBar />;
    } else {
      return (
        <div style={{ height: "100%", width: "100%", position: "absolute" }}>
          <NavigationBar title={t("appName")} />
          <Scrollbars style={style.grid} onScrollFrame={this.onScrollFrame}>
            <PublicationsFeed
              publications={this.props.publications}
              onPublicationSelected={id => this.goToPublicationDetailScreen(id)}
            />
          </Scrollbars>
        </div>
      );
    }
  }

  onScrollFrame(values) {
    if (values.top > nextPageScrollBoundary && !this.props.loadingNextPage) {
      this.props.onNextPageReached();
    }
  }

  goToPublicationDetailScreen(id) {
    const url = publicationDetail(id);
    this.props.history.push(url);
  }
}

export function mapStateToProps(state) {
  return {
    publications: state.feed.publications,
    loading: state.feed.fetchingPage && state.feed.publications.length === 0,
    loadingNextPage:
      state.feed.fetchingPage && state.feed.publications.length > 0
  };
}

export function mapPropsToDispatch(dispatch) {
  return {
    onComponentMounted: () => {
      dispatch(fetchPublications(1));
    },
    onNextPageReached: () => {
      dispatch(fetchNextPublicationsPage());
    }
  };
}

export const PureFeedScreen = FeedScreen;
export default withRouter(
  connect(mapStateToProps, mapPropsToDispatch)(
    translateComponent(PureFeedScreen)
  )
);
