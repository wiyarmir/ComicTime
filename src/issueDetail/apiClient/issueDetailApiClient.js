import { get } from "../../apiClient/apiClient";
import cheerio from "cheerio";
import { Issue, IssuePage } from "../model";
import JSZip from "jszip";
import { downloadImageUrlAsBase64 } from "../../utils/imageUtils";
import { formatNumberWithTwoDigits } from "../../utils/numberUtils";
import { downloadFile } from "../../utils/jszipUtils";
import { Right, Left } from "monet";
import log from "loglevel";

export async function getIssue(publicationId, issueId) {
  return get(`/comic/${publicationId}/${issueId}`).then(response => {
    return response.map(htmlPage =>
      extractIssueFromPage(publicationId, issueId, htmlPage)
    );
  });
}

export async function downloadIssueAsCbrFile(issue) {
  const fileName = `${issue.title}.cbr`;
  return generateZipFileFromIssueImages(issue)
    .then(eitherJszipFile => {
      return eitherJszipFile.map(jszipFile => {
        return downloadFile(jszipFile, fileName).then(file => Right(file));
      });
    })
    .catch(() => {
      return Left(fileName);
    });
}

function extractIssueFromPage(publicationId, issueId, htmlPage) {
  const loadedPage = cheerio.load(htmlPage);
  const title = loadedPage(".pager-cnt a")
    .first()
    .html();
  const numberOfPages = parseInt(
    loadedPage("#page-list").attr("data-size"),
    10
  );
  return new Issue(
    issueId,
    publicationId,
    title,
    numberOfPages,
    extractIssuePages(publicationId, issueId, numberOfPages)
  );
}

function extractIssuePages(publicationId, issueId, numberOfPages) {
  const issuePages = [];
  for (let page = 1; page <= numberOfPages; page++) {
    const completePageNumber = formatNumberWithTwoDigits(page);
    issuePages.push(
      new IssuePage(
        page,
        `http://readcomicsonline.ru/uploads/manga/${publicationId}/chapters/${issueId}/${completePageNumber}.jpg`
      )
    );
  }
  return issuePages;
}

async function generateZipFileFromIssueImages(issue) {
  const futureImages = issue.pages.map(page => {
    return downloadImageUrlAsBase64(page.image);
  });
  const imageNames = issue.pages.map(
    page => `${formatNumberWithTwoDigits(page.number)}.jpg`
  );
  return Promise.all(futureImages)
    .then(base64Images => {
      return new Promise(resolve => {
        const zipFile = new JSZip();
        imageNames.forEach((name, index) => {
          const image = base64Images[index].split("base64,");
          zipFile.file(name, image[1], { base64: true });
        });
        resolve(Right(zipFile));
      });
    })
    .catch(error => {
      log.error(`Error downloading issue: ${error}`);
      return Left();
    });
}
