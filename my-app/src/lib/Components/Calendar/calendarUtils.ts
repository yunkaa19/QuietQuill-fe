
function daysInMonth(month: number, year:number ) {
    return new Date(year, month + 1, 0).getDate();
}

export function getMonthGrid(date : Date) {
    const month = date.getMonth();
    const year = date.getFullYear();

    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    // Get the last day of the month
    const lastDay = new Date(year, month, daysInMonth(month, year));

    // Start the calendar on the Sunday of the week containing the first day
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // End the calendar on the Saturday of the week containing the last day
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const grid = [];
    let currentDate = new Date(startDate);

    // Iterate from start date to end date, one week at a time
    while (currentDate <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {  // There are 7 days in a week
    week.push({
    date: new Date(currentDate),
    isCurrentMonth: currentDate.getMonth() === month
});
    currentDate.setDate(currentDate.getDate() + 1);  // Move to the next day
}
    grid.push(week);
}

    return grid;
}
export function getWeekGrid(date: Date) {
    const week = [];
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));

    for (let i = 0; i < 7; i++) {  // 7 days in a week
        week.push({
            date: new Date(startOfWeek.setDate(startOfWeek.getDate() + (i === 0 ? 0 : 1))),
            isCurrentMonth: startOfWeek.getMonth() === date.getMonth()
        });
    }

    return week;
}