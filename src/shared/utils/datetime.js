import moment from "moment"
import 'moment/locale/th'

moment.locale("th")

function formatFullDate(value) {
  return moment(value).format('DD MMMM') + " " + (Number(moment(value).format('YYYY')) + 543).toString()  
}

function currentDateForDB(format='YYYY-MM-DD') {  
  return moment().format(format)  
}

export {
  formatFullDate,
  currentDateForDB
}