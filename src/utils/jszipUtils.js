import FileSaver from "file-saver";
import { issueDownloadedProperlyEvent } from "../analytics/events";
import { trackEvent } from "../analytics/stats";

export async function downloadFile(jszipFile, fileName) {
  return jszipFile
    .generateAsync({ type: "blob", compression: "DEFLATE" })
    .then(blobFile => {
      trackEvent(issueDownloadedProperlyEvent(fileName));
      FileSaver.saveAs(blobFile, fileName);
      return fileName;
    });
}
