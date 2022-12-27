import moment from 'moment';

export const timeDiff = (date) => {
    const bookingDate = moment(date)
    const dayDiff = bookingDate.diff(moment(), 'days')
    const monthDiff = bookingDate.diff(moment(), 'months')
    const yearDiff = bookingDate.diff(moment(), 'years')

    if (yearDiff === 0) {
        if (monthDiff === 0) {
            return dayDiff > 1 ? dayDiff + ' days' : '1 day'
        } else {
            return monthDiff > 1 ? monthDiff + ' months': '1 month'
        }
    } else {
        return yearDiff > 1 ? yearDiff + ' years': '1 year'
    }
}

export const dateRange = (startDate, endDate) => {
    const start = moment(startDate)
    const end = moment(endDate)

    if (start.month() === end.month()) {
        return start.format('MMM') + '\n' + start.format('D') + ' –⁠ ' + end.format('D')
    } else {
        return start.format('MMM D') + ' –⁠ ' + end.format('MMM D')
    }
}