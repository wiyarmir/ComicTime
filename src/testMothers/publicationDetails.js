import { IssueSummary, Publication } from "../publicationDetail/model";
import { Issue, IssuePage } from "../issueDetail/model";
import { Some } from "monet";

export const anyPublicationId = "the-flash-2016";
export const anyIssueId = "Annual1";

export const anyPublication = new Publication(
  "the-flash-2016",
  "https://comicimages.com/the-flash-1",
  "The Flash",
  Some("Ongoing"),
  "The best comic series in the world",
  Some("DC"),
  Some("January 2016"),
  Some("Peter Gomez"),
  [
    new IssueSummary("1", "the-flash-2016", "The Flash #1", "January 2016"),
    new IssueSummary("2", "the-flash-2016", "The Flash #2", "February 2016")
  ]
);

export const anyIssueSummary = new IssueSummary(
  "1",
  "detective-comic",
  "Detective Comic #1",
  "January 2018"
);

export const anyIssue = new Issue(
  "1",
  "detective-comic",
  "Detective Comic #1",
  2,
  [
    new IssuePage(1, "https://comicpages.com/1"),
    new IssuePage(2, "https://comicpages.com/2")
  ]
);
