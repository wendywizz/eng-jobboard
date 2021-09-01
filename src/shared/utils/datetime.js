import moment from "moment"
import 'moment/locale/th'

moment.locale("th")

function currentDateTime(format="YYYY-MM-DD") {
  return moment().format(format)  
}

function formatFullDate(value, be=false) {
  const dayMonth = moment(value).format('DD MMMM')
  let year = Number(moment(value).format('YYYY'))
  
  if (be) {
    year = Number(year) + 543
  }
  return dayMonth + year.toString()
}

function currentDateForDB(format='YYYY-MM-DD') {  
  return moment().format(format)  
}

function dateDiffToDay(date1, date2) {
  return moment(date1).diff(moment(date2), 'days')
}

function diffToday(date) {
  const diffDate = moment(date)

  return diffDate.diff(moment(currentDateTime()), "days")
}

export {
  currentDateTime,
  formatFullDate,
  currentDateForDB,
  dateDiffToDay,
  diffToday
}