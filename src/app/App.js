import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { INDEX, publicationDetail } from "../routes";
import FeedScreen from "../feed/components/FeedScreen";
import PublicationDetailScreen from "../publicationDetail/components/PublicationDetailScreen";
import Title from "../baseComponents/title/Title";
import DownloadWidget from "../publicationDetail/components/DownloadWidget";

class App extends React.Component {
  render() {
    return (
      <Title>
        <BrowserRouter>
          <Switch>
            <div>
              <Route exact path={INDEX} component={FeedScreen} />
              <Route
                exact
                path={publicationDetail(":id")}
                component={PublicationDetailScreen}
              />
              <DownloadWidget />
            </div>
          </Switch>
        </BrowserRouter>
      </Title>
    );
  }
}

export default App;
