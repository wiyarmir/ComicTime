import rest from "rest";
import mime from "rest/interceptor/mime";
import log from "loglevel";
import { Left, Right } from "monet";
import { NetworkError, NotFound, UnknownError } from "./model";

const restClient = rest.wrap(mime);

export const baseUrl = "https://allorigins.me";

export function composeResourceUrl(resource) {
  return (
    "/get?url=" + encodeURIComponent(`http://readcomicsonline.ru${resource}`)
  );
}

export function get(resource) {
  return new Promise(resolve => {
    restClient(baseUrl + composeResourceUrl(resource))
      .then(response => {
        processResponse(response, resolve);
      })
      .catch(error => {
        processException(error, resolve);
      });
  });
}

function processResponse(response, resolve) {
  log.debug(response);
  const statusCode = response.status.code;
  if (statusCode === 200) {
    const pageHtml = response.entity.contents;
    resolve(Right(pageHtml));
  } else if (statusCode === 404) {
    resolve(Left(new NotFound()));
  } else {
    const unknownError = new UnknownError(statusCode);
    log.error(unknownError);
    resolve(Left(unknownError));
  }
}

function processException(error, resolve) {
  log.error(error);
  resolve(Left(new NetworkError()));
}
