function isset(value, returnValue = null) {
  return !value ? returnValue : value
}
function subText(text, limit=100, addDot=false) {
  let subText = text.substring(0, limit)
  
  if (addDot) {
    if (subText.length > limit) {
      subText += " ..."
    }
  }
  return subText
}
function getFileName(file) {
  const splitFile = file.split('.')

  return splitFile[0]
}
function getFileExtension(fileName)
{
  var ext = /^.+\.([^.]+)$/.exec(fileName);
  return ext == null ? "" : ext[1];
}
function reduceFileName(file, length=20) {
  return subText(getFileName(file), length) + "." + getFileExtension(file)
}

export {
  isset,
  subText,
  getFileName,
  getFileExtension,
  reduceFileName
}