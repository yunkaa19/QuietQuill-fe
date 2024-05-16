<script lang="ts">
    import { getWeekGrid } from '$lib/Components/Calendar/calendarUtils.js';
    import { writable } from 'svelte/store';

    export let currentDate = new Date();
    let weekGrid = writable([]);

    $: weekGrid.set(getWeekGrid(currentDate));

    function nextWeek() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
        weekGrid.set(getWeekGrid(currentDate));
    }

    function prevWeek() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
        weekGrid.set(getWeekGrid(currentDate));
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
            <!-- Display journal entries or "+" button -->
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
