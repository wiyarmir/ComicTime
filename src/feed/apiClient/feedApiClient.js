import { get } from "../../apiClient/apiClient";
import { Page, PublicationSummary } from "../model";
import cheerio from "cheerio";

export async function getFeedPage(page = 1) {
  return get(`/latest-release?page=${page}`).then(response => {
    return response.map(htmlPage =>
      extractPublicationsFromPage(page, htmlPage)
    );
  });
}

function extractPublicationsFromPage(page, htmlPage) {
  const loadedPage = cheerio.load(htmlPage);
  const publications = extractPublications(loadedPage);
  const totalPages = extractTotalPages(loadedPage);
  return new Page(publications, page, totalPages);
}

function extractTotalPages(page) {
  const pageLinks = page(".pagination a");
  let rawLastPage = pageLinks.eq(pageLinks.length - 2).html();
  const maxPageValue = parseInt(rawLastPage);
  return Number.isInteger(maxPageValue) ? maxPageValue : 0;
}

function extractPublications(page) {
  const publicationsItems = page(".manga-item");
  let publications = [];
  publicationsItems.each(function() {
    const publicationLoaded = cheerio.load(this);
    const publicationSummary = publicationLoaded("h3 a");
    const publicationUrl = publicationSummary.attr("href");
    const publicationId = publicationUrl.substring(
      publicationUrl.lastIndexOf("/") + 1,
      publicationUrl.length
    );
    const title = publicationSummary.html();
    const publication = new PublicationSummary(
      publicationId,
      publicationUrl,
      title,
      extractLastIssuesTitles(publicationLoaded),
      extractCoverFromPublicationId(publicationId)
    );
    publications.push(publication);
  });
  return publications;
}

function extractLastIssuesTitles(publicationLoaded) {
  let issues = [];
  const lastIssuesLoaded = publicationLoaded("h6 a");
  lastIssuesLoaded.each(function() {
    const issueLoaded = cheerio.load(this);
    const issueTitle = issueLoaded.text();
    issues.push(issueTitle);
  });
  return issues;
}

function extractCoverFromPublicationId(publicationId) {
  return `http://readcomicsonline.ru/uploads/manga/${publicationId}/cover/cover_250x350.jpg`;
}
