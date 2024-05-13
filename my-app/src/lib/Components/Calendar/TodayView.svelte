<script lang="ts">
    import { writable } from 'svelte/store';

    export let currentDate = new Date();
    type entry = { time: string, description: string };
    let entries = writable<entry[]>([]);

    // Placeholder function to simulate fetching entries for a day
    function loadEntriesForDay(date : Date) {
        entries.set([
            { time: '09:00', description: 'Morning Meditation' },
            { time: '12:00', description: 'Lunch with Team' },
            { time: '15:00', description: 'Project Meeting' },
            { time: '18:00', description: 'Gym Session' }
        ]);
    }

    $: loadEntriesForDay(currentDate);

    function nextDay() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        loadEntriesForDay(currentDate);
    }

    function prevDay() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
        loadEntriesForDay(currentDate);
    }
</script>

<div class="day-navigation">
    <button on:click={prevDay}>&lt; Prev Day</button>
    <span>{currentDate.toDateString()}</span>
    <button on:click={nextDay}>Next Day &gt;</button>
</div>

<div class="day-entries">
    <h2>Entries for {currentDate.toDateString()}</h2>
    {#each $entries as entry}
        <div class="entry">
            <span class="time">{entry.time}</span> - <span class="description">{entry.description}</span>
        </div>
    {/each}
</div>

<style>
    .day-navigation {
        text-align: center;
        margin-bottom: 20px;
    }
    .entry {
        margin: 10px 0;
        padding: 10px;
        background-color: #f3f4f6;
        border-radius: 8px;
    }
    .time {
        font-weight: bold;
    }
</style>