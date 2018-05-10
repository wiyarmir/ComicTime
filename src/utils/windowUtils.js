export function numberOfGridColumns(screenWidth) {
  if (screenWidth <= 320) {
    return 1;
  } else if (screenWidth <= 480) {
    return 2;
  } else if (screenWidth <= 960) {
    return 3;
  } else if (screenWidth <= 1280) {
    return 4;
  } else if (screenWidth <= 1920) {
    return 5;
  } else {
    return 6;
  }
}
