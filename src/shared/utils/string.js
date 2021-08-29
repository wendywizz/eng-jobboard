function isset(value, returnValue = null) {
  return !value ? returnValue : value
}
function subText(text, limit=100, addDot=false) {
  let subText = text.substring(0, limit)
  
  if (addDot) {
    subText += " ..."
  }
  return subText
}

export {
  isset,
  subText
}