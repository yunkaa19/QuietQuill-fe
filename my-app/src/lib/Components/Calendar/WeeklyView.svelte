<script lang="ts">
    import { getWeekGrid } from '$lib/Components/Calendar/calendarUtils.js';
    import { writable } from 'svelte/store';
    import { getJournalEntries } from '$lib/Components/Api/Journal/GetJournalEntries';

    export let currentDate = new Date();
    let weekGrid = writable([]);

    async function loadEntriesForWeek(date: Date) {
        const userId = 'd5ce285b-d7a9-454d-ad9b-67938e8cd860'; // Replace with actual user ID
        const month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString();

        try {
            const response = await getJournalEntries({ userId, month, year });
            // Process and display the entries for the week
            // Assume getWeekGrid returns a grid of days with entries
            const weekEntries = getWeekGrid(date).map(day => ({
                ...day,
                entries: response.journals.filter(entry => new Date(entry.year, entry.month - 1, entry.day).toDateString() === day.date.toDateString())
            }));
            weekGrid.set(weekEntries);
        } catch (error) {
            console.error('Error fetching journal entries:', error);
        }
    }

    $: loadEntriesForWeek(currentDate);

    function nextWeek() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
        loadEntriesForWeek(currentDate);
    }

    function prevWeek() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
        loadEntriesForWeek(currentDate);
    }
</script>

<div class="week-navigation flex items-center justify-between p-4 bg-bgColor text-textColor mb-4 rounded-lg shadow-md">
    <button class="px-4 py-2 rounded bg-CTA hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover" on:click={prevWeek}>&lt;</button>
    <span class="font-bold">
        {currentDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })} -
        {new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 6).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
    </span>
    <button class="px-4 py-2 rounded bg-CTA hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover" on:click={nextWeek}>&gt;</button>
</div>

<div class="week-grid grid grid-cols-7 gap-4 p-4">
    {#each $weekGrid as day}
        <div class="day p-4 bg-white rounded-lg shadow-md">
            <span class="date font-bold">{day.date.toLocaleDateString()}</span>
            {#each day.entries as entry}
                <div class="entry p-2 bg-gray-100 rounded-lg mb-2">
                    <span class="time font-bold">{entry.time}</span> - <span class="description">{entry.description}</span>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .week-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.5rem;
    }
    .day {
        padding: 10px;
        border: 1px solid #ccc;
        text-align: center;
        transition: transform 0.5s ease-in-out;
    }
    .date {
        font-weight: bold;
    }
</style>
