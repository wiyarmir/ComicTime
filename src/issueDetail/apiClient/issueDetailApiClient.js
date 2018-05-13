import { get } from "../../apiClient/apiClient";
import cheerio from "cheerio";
import { Issue, IssuePage } from "../model";

export async function getIssue(publicationId, issueId) {
  return get(`/comic/${publicationId}/${issueId}`).then(response => {
    return response.map(htmlPage =>
      extractIssueFromPage(publicationId, issueId, htmlPage)
    );
  });
}

function extractIssueFromPage(publicationId, issueId, htmlPage) {
  const loadedPage = cheerio.load(htmlPage);
  const title = loadedPage(".col-xs-12 h3 b").html();
  const numberOfPages = parseInt(loadedPage("#page-list").attr("data-size"));
  return new Issue(
    issueId,
    title,
    numberOfPages,
    extractIssuePages(publicationId, issueId, numberOfPages)
  );
}

function extractIssuePages(publicationId, issueId, numberOfPages) {
  const issuePages = [];
  for (let page = 1; page <= numberOfPages; page++) {
    const completePageNumber = page < 10 ? `0${page}` : page;
    issuePages.push(
      new IssuePage(
        page,
        `http://readcomicsonline.ru/uploads/manga/${publicationId}/chapters/${issueId}/${completePageNumber}.jpg`
      )
    );
  }
  return issuePages;
}
