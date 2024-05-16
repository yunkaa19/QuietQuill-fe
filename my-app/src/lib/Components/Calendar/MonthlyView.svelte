<script lang="ts">
    import { getMonthGrid } from '$lib/Components/Calendar/calendarUtils';
    import { writable } from 'svelte/store';

    export let currentDate = new Date();

    type DayInfo = { date: Date, isCurrentMonth: boolean, entryId?: string };
    type WeekInfo = DayInfo[];

    let monthGrid = writable<WeekInfo[]>([]);

    $: monthGrid.set(getMonthGrid(currentDate));

    function nextMonth() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        monthGrid.set(getMonthGrid(currentDate));
    }

    function prevMonth() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        monthGrid.set(getMonthGrid(currentDate));
    }

    function handleEntryClick(entryId: string) {
        dispatch('entryClick', entryId);
    }

    function handleAddEntryClick(date: Date) {
        dispatch('addEntryClick', date);
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
