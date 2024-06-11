<script lang="ts">
    import { writable } from 'svelte/store';
    import { getMonthGrid } from '$lib/Components/Calendar/calendarUtils';
    import { getJournalEntries } from '$lib/Components/Api/Journal/GetJournalEntries';
    import { user } from '$lib/stores/session';
    import { createEventDispatcher } from 'svelte';

    export let currentDate = new Date();
    const monthGrid = writable([]);

    let currentUser: any = null;

    user.subscribe(value => {
        currentUser = value;
    });

    const dispatch = createEventDispatcher();

    async function loadEntriesForMonth(date: Date) {
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

    function debounce(func: (...args: any[]) => void, wait: number) {
        let timeout: NodeJS.Timeout;
        return function(this: any, ...args: any[]) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const debouncedLoadEntriesForMonth = debounce(loadEntriesForMonth, 300);

    $: debouncedLoadEntriesForMonth(currentDate);

    function nextMonth() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        monthGrid.set(getMonthGrid(currentDate));
        debouncedLoadEntriesForMonth(currentDate);
    }

    function prevMonth() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        monthGrid.set(getMonthGrid(currentDate));
        debouncedLoadEntriesForMonth(currentDate);
    }

    function handleEntryClick(entryId: string | undefined) {
        if (entryId) {
            dispatch('entryClick', entryId);
        }
    }

    function handleAddEntryClick(date: Date) {
        console.log('Original date:', date);
        // Normalize the date to UTC
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        console.log('UTC date:', utcDate);
        dispatch('addEntryClick', utcDate);
    }
</script>

<div class="flex items-center justify-between p-4 bg-bgColor text-textColor mb-4 rounded-lg shadow-md">
    <button class="px-4 py-2 rounded bg-CTA hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover" on:click={prevMonth}>&lt;</button>
    <span class="font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
    <button class="px-4 py-2 rounded bg-CTA hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover" on:click={nextMonth}>&gt;</button>
</div>

<div class="calendar-grid w-full h-full">
    {#each $monthGrid as week}
        <div class="week">
            {#each week as day}
                <div class="day {day.isCurrentMonth ? 'current-month' : ''}">
                    <span class="date">{day.date.getDate()}</span>
                    <button class="absolute top-2 right-2 text-xs bg-CTA text-white px-2 py-1 rounded-full hover:bg-CTA-Hover" on:click={() => handleAddEntryClick(day.date)}>
                        +
                    </button>
                    {#if day.isCurrentMonth && day.entryId}
                        <button class="absolute top-2 left-2 text-xs bg-CTA text-white px-2 py-1 rounded-full hover:bg-CTA-Hover" on:click={() => handleEntryClick(day.entryId)}>
                            View
                        </button>
                    {/if}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1rem;
        padding: 1rem;
    }
    .week {
        display: contents;
    }
    .day {
        padding: 1rem;
        background-color: #f0f0f0;
        border-radius: 0.5rem;
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100px;
        transition: transform 0.5s ease-in-out;
    }
    .day.current-month {
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .date {
        font-size: 0.875rem;
        color: #2E5157;
        font-weight: 500;
    }
</style>