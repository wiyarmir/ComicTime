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

export function gridTemplateForTwoColumns(screenWidth) {
  if (screenWidth <= 320) {
    return "100%";
  } else if (screenWidth <= 480) {
    return "100%";
  } else if (screenWidth <= 740) {
    return "100%";
  } else if (screenWidth <= 900) {
    return "45% 55%";
  } else if (screenWidth <= 1280) {
    return "35% 65%";
  } else if (screenWidth <= 1920) {
    return "30% 70%";
  } else {
    return "15% 85%";
  }
}

export function imageBackgroundPositionForTwoColumns(screenWidth) {
  if (screenWidth <= 320) {
    return "center";
  } else if (screenWidth <= 480) {
    return "center";
  } else if (screenWidth <= 740) {
    return "center";
  } else if (screenWidth <= 900) {
    return "0% 0%";
  } else if (screenWidth <= 1280) {
    return "0% 0%";
  } else if (screenWidth <= 1920) {
    return "0% 0%";
  } else {
    return "0% 0%";
  }
}
