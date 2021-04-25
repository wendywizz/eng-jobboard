import moment from "moment"
import 'moment/locale/th'

moment.locale("th")

function fullDate(value) {
  return moment(value).format('DD MMMM') + " " + (Number(moment(value).format('YYYY')) + 543)
}

export {
  fullDate
}