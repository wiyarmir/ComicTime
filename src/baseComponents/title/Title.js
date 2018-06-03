import React from "react";
import DocumentTitle from "react-document-title";
import { translateComponent } from "../../i18n/i18n";
import { connect } from "react-redux";
import { Maybe } from "monet";
import { Helmet } from "react-helmet";
import logo from "../images/logo.svg";

class Title extends React.Component {
  render() {
    const { t } = this.props;
    const publication = Maybe.fromNull(this.props.publication);
    const appName = t("appName");
    const appDescription = t("appDescription");
    const title = publication
      .map(p => `${p.title} - ${appName}`)
      .orSome(appName);
    const description = publication
      .map(p => appName + " - " + p.summary)
      .orSome(appDescription);
    const baseAppUrl =
      window.location.protocol + "//" + window.location.host + "/";
    const url = baseAppUrl + publication.map(p => p.id).orSome("");
    const image = publication.map(p => baseAppUrl + p.image).orSome(logo);
    return (
      <DocumentTitle title={title}>
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
          </Helmet>
          {this.props.children}
        </div>
      </DocumentTitle>
    );
  }
}

Title.defaultProps = {
  title: undefined
};

export function mapStateToProps(state) {
  const publication = state.publicationDetail.publicationSelected.orSome(
    undefined
  );
  return {
    publication: publication
  };
}

export const PureTitle = Title;
export default translateComponent(connect(mapStateToProps, null)(PureTitle));
