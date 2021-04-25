import numeral from "numeral"

function toMoney(value) {
  return numeral(value).format('0,0')
}
export {
  toMoney
}