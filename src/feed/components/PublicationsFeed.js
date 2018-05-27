import React from "react";
import { GridList, GridTile } from "material-ui";
import { numberOfGridColumns } from "../../utils/windowUtils";
import LazyImage from "../../baseComponents/lazyImage/LazyImage";

const defaultCoverImageHeight = 350;
const defaultCoverImageWidth = 250;

class PublicationsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.sizeStatus = this.sizeStatus.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillMount() {
    this.updateDimensions();
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

  render() {
    const cellHeight = this.cellHeight();
    return (
      <GridList cols={this.numberOfGridColumns()} cellHeight={cellHeight}>
        {this.renderGridTiles(cellHeight)}
      </GridList>
    );
  }

  renderGridTiles(cellHeight) {
    return this.props.publications.map((publication, index) => (
      <GridTile
        key={index}
        title={publication.title}
        onClick={() => {
          this.props.onPublicationSelected(publication.path);
        }}
        subtitle={
          <span>
            <b>{publication.lastIssuesNumbers.join(", ")}</b>
            {" - "}
            {publication.releaseDate}
          </span>
        }
      >
        <LazyImage
          height={cellHeight}
          src={publication.image}
          placeholder={publication.image}
          alt={publication.title}
        />
      </GridTile>
    ));
  }

  numberOfGridColumns() {
    return numberOfGridColumns(this.state.width);
  }

  cellHeight() {
    const screenWidth = this.state.width;
    const columnWidth = screenWidth / this.numberOfGridColumns();
    return columnWidth * defaultCoverImageHeight / defaultCoverImageWidth;
  }
}

export default PublicationsFeed;
