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

<div class="week-navigation">
    <button on:click={prevWeek}>&lt;</button>
    <span>{currentDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })} - {new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 6).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
    <button on:click={nextWeek}>&gt;</button>
</div>

<div class="week-grid">
    {#each $weekGrid as day}
        <div class="day">
            <span class="date">{day.date.toLocaleDateString()}</span>
            <!-- Display journal entries or "+" button -->
        </div>
    {/each}
</div>

<style>
    .week-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr); /* 7 days a week */
        gap: 0.5rem;
    }
    .day {
        padding: 10px;
        border: 1px solid #ccc;
        text-align: center;
    }
    .date {
        font-weight: bold;
    }
</style>
