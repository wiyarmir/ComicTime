export async function downloadImageUrlAsBase64(url) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement("CANVAS");
    let img = document.createElement("img");
    img.setAttribute("crossorigin", "anonymous");
    img.src = "https://cors-anywhere.herokuapp.com/" + url;

    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;
      let context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL("image/jpeg", 0.8);
      canvas = null;
      resolve(dataURL);
    };
    img.onerror = () => {
      reject();
    };
  });
}
