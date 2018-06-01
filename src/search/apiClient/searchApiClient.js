import { Right } from "monet";
import { get } from "../../apiClient/apiClient";
import { PublicationSearchResult } from "../model";
import log from "loglevel";

export async function searchPublication(text) {
  return get(`/search?query=${text}`).then(response => {
    if (response.isRight()) {
      const stringResponse = response.right();
      const jsonResponse = JSON.parse(stringResponse);
      const publicationSearchResult = jsonResponse["suggestions"].map(
        suggestion => {
          return new PublicationSearchResult(
            suggestion["data"],
            suggestion["value"]
          );
        }
      );
      return Right(publicationSearchResult);
    } else {
      log.error(`Error found while searching: ${text}: ${response.left()}`);
      return response;
    }
  });
}
