import round from 'lodash/round';
import isDate from 'lodash/isDate';
import minDate from 'date-fns/min';
import maxDate from 'date-fns/max';
import isWeekend from 'date-fns/is_weekend';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import addDays from 'date-fns/add_days';
import isSameDay from 'date-fns/is_same_day';
import startOfDay from 'date-fns/start_of_day';

// Get the time difference in hours between two dates, excluding weekends
export const getDateHoursDiff = (d1, d2) => {
    const date1 = isDate(d1) ? d1 : new Date(d1);
    const date2 = isDate(d2) ? d2 : new Date(d2);
    const first = minDate(date1, date2);
    const last = maxDate(date1, date2);

    if (isSameDay(first, last)) {
        return round(differenceInMinutes(last, first) / 60, 2);
    }

    let iterDate = startOfDay(addDays(first, 1));
    let hours = differenceInMinutes(iterDate, first) / 60;

    while (!isSameDay(iterDate, last)) {
        hours += isWeekend(iterDate) ? 0 : 24;
        iterDate = addDays(iterDate, 1);
    }
    const offset = round(differenceInMinutes(last, iterDate) / 60, 2);
    return hours + offset;
};
