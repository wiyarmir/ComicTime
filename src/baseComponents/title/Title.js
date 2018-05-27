import React from "react";
import DocumentTitle from "react-document-title";
import { translateComponent } from "../../i18n/i18n";
import { connect } from "react-redux";
import { Maybe } from "monet";

class Title extends React.Component {
  render() {
    const { t } = this.props;
    const title = Maybe.fromNull(this.props.title).orSome(t("appName"));
    return <DocumentTitle title={title}>{this.props.children}</DocumentTitle>;
  }
}

Title.defaultProps = {
  title: undefined
};

export function mapStateToProps(state) {
  const customTitle = state.publicationDetail.publicationSelected
    .map(publication => publication.title)
    .orSome(undefined);
  return {
    title: customTitle
  };
}

export const PureTitle = Title;
export default translateComponent(connect(mapStateToProps, null)(PureTitle));
