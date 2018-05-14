import FileSaver from "file-saver";

export async function downloadFile(jszipFile, fileName) {
  return jszipFile.generateAsync({ type: "blob" }).then(blobFile => {
    FileSaver.saveAs(blobFile, fileName);
    return fileName;
  });
}
