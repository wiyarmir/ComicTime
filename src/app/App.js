import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { INDEX } from "../routes";
import FeedScreen from "../feed/components/FeedScreen";
import { translateComponent } from "../i18n/i18n";
import DocumentTitle from "react-document-title";

class App extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <BrowserRouter>
        <DocumentTitle title={t("appName")}>
          <Route exact path={INDEX} component={FeedScreen} />
        </DocumentTitle>
      </BrowserRouter>
    );
  }
}

export default translateComponent(App);
