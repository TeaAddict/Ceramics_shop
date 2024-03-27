export function isPicUrl(data: FormData) {
  const pictureObjs = data.getAll("picture0");
  const isUrl = pictureObjs.some((val) => {
    const valString = val.toString();
    if (valString.includes(`"width":0`)) return true;
  });
  return isUrl;
}
