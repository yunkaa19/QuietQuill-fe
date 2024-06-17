import { getJournalEntries } from '$lib/Components/Api/Journal/GetJournalEntries';
import { getMonthGrid } from '$lib/Components/Calendar/calendarUtils';
import type { Writable } from 'svelte/store';

export async function fetchAndMapEntries(currentUser: any, date: Date, monthGrid: Writable<any[]>) {
    if (!currentUser) {
        console.error('User not loaded');
        return;
    }

    const userId = currentUser.UserId;
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    try {
        const response = await getJournalEntries({ userId, month, year });
        const monthEntries = getMonthGrid(date).map(week => week.map(day => {
            const entry = response.journals.find(entry =>
                new Date(parseInt(entry.year), parseInt(entry.month) - 1, parseInt(entry.day)).toDateString() === day.date.toDateString()
            );
            return {
                ...day,
                entryId: entry ? entry.id : undefined
            };
        }));
        monthGrid.set(monthEntries);
    } catch (error) {
        console.error('Error fetching journal entries:', error);
    }
}
