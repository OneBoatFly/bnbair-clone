export function getStartDateStr() {
    const todayDate = new Date();
    const todayPlusDate = new Date(todayDate.setDate(todayDate.getDate() + 1)); // next day for now. need to check bookings later

    return dateToString(todayPlusDate);
}

export function getEndDateStr() {
    const todayPlus = new Date();
    const todayPlusDate = new Date(todayPlus.setDate(todayPlus.getDate() + 3)); // adding 3 days for now

    return dateToString(todayPlusDate);
}

export function getMMMDDYYYStr(newDate) {
    const date = new Date(newDate);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

export function dateToString(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}