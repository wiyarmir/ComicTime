import React from "react";
import { translateComponent } from "../../i18n/i18n";
import { connect } from "react-redux";
import { AutoComplete } from "material-ui";
import { search } from "../search";
import debounce from "lodash/debounce";
import { withRouter } from "react-router";
const style = {
  hint: { color: "rgba(255,255,255, 0.7)" },
  list: { textColor: "#000000" }
};
class SearchPublicationAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.onSearch = debounce(this.props.onSearch, 500);
  }

  render() {
    const { t } = this.props;
    const dataSource = this.props.searchResults.map(publication => {
      return {
        text: publication.title,
        value: publication
      };
    });
    const dataSourceConfig = {
      text: "text",
      value: "value"
    };
    return (
      <AutoComplete
        hintText={t("searchHint")}
        dataSource={dataSource}
        dataSourceConfig={dataSourceConfig}
        onUpdateInput={this.onSearch}
        hintStyle={style.hint}
        menuProps={{ menuItemStyle: { color: "#000000" } }}
        filter={AutoComplete.fuzzyFilter}
        onNewRequest={item => this.props.history.push(`/${item.value.id}`)}
        openOnFocus={true}
      />
    );
  }
}

SearchPublicationAutoComplete.defaultProps = {
  searchResults: []
};

function mapStateToProps(state) {
  const searchResults = state.search.searchResults;
  const maxSearchItems = Math.min(7, searchResults.length);
  const limitedSearchResults = searchResults.slice(0, maxSearchItems);
  return {
    searchResults: limitedSearchResults
  };
}

export function mapPropsToDispatch(dispatch) {
  return {
    onSearch: text => {
      dispatch(search(text));
    }
  };
}
export const PureSearchPublicationAutoComplete = SearchPublicationAutoComplete;
export default translateComponent(
  withRouter(
    connect(mapStateToProps, mapPropsToDispatch)(
      PureSearchPublicationAutoComplete
    )
  )
);
