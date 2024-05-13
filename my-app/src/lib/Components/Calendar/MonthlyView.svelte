<script lang="ts">
    import { getMonthGrid } from '$lib/Components/Calendar/calendarUtils';
    import { writable,} from 'svelte/store';

    export let currentDate = new Date();
    
    type DayInfo = {date: Date, isCurrentMonth: boolean};
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
</script>

<div class="flex items-center justify-between p-4 bg-bgColor text-textColor">
    <button class="px-4 py-2 rounded bg-CTA hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover" on:click={prevMonth}>&lt;</button>
    <span class="font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
    <button class="px-4 py-2 rounded bg-CTA hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover" on:click={nextMonth}>&gt;</button>
</div>

<div class="calendar-grid">
    {#each $monthGrid as week}
        <div class="week">
        {#each week as day}
        <div class="day {day.isCurrentMonth ? 'current-month' : ''}">
        <span class="date">{day.date.getDate()}</span>
        {#if day.isCurrentMonth}
        <button class="absolute top-2 right-2 text-xs bg-CTA text-white px-2 py-1 rounded-full hover:bg-CTA-Hover">
        +
        </button>
        <!-- More logic to display entries can go here -->
        {/if}
        </div>
        {/each}
        </div>
            {/each}
</div>

<style>
    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr)); /* Keep 7 columns, but you can adjust '1fr' to a larger fixed size if needed */
        gap: 2rem; /* Increase gap if you want more space between cells */
        padding: 1rem; /* Padding for the grid itself */
        grid-template-rows: repeat(auto-fill, minmax(0, 1fr)); /* Rows should auto-fill */
    }
    .week {
        display: contents; /* Flattens the grid */
    }
    .day {
        padding: 1rem;
        background-color: #f0f0f0; /* Light grey background */
        border-radius: 0.5rem;
        text-align: center;
        vertical-align: top;
        position: relative;
        display: flex; /* This ensures content is centered */
        justify-content: center; /* Centers content horizontally */
        align-items: center; /* Centers content vertically */
    }
    .day.current-month {
        background-color: #ffffff; /* White background for current month days */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* subtle shadow for current month days */
    }
    .date {
        font-size: 0.875rem; /* smaller font size for dates */
        color: #2E5157; /* Darker text color for dates */
        font-weight: 500; /* semi-bold font weight for dates */
    }
</style>