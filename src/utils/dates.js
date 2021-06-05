import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export function getDiapason(date1, date2) {
  const stD = moment(date1);
  const enD = moment(date2);
  if (stD.year() === enD.year()) {
    if (stD.month() === enD.month()) {
      if (stD.date() === enD.date()) {
        return enD.format('LL');
      } else {
        return `${stD.date()} - ${enD.format('LL')}`;
      }
    } else {
      return `${stD.format('DD MMM')} - ${enD.format('LL')}`;
    }
  } else {
    return `${stD.format('LL')} - ${enD.format('LL')}`;
  }
}

export function getDate(date, format) {
  return moment(date).format(format);
}
