<script lang="ts">
    import { writable } from 'svelte/store';
    import { getJournalEntries } from '$lib/Components/Api/Journal/GetJournalEntries';

    export let currentDate = new Date();
    type Entry = { time: string, description: string };
    let entries = writable<Entry[]>([]);

    async function loadEntriesForDay(date: Date) {
        const userId = 'd5ce285b-d7a9-454d-ad9b-67938e8cd860'; // Replace with actual user ID
        const month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString();

        try {
            const response = await getJournalEntries({ userId, month, year });
            const dayEntries = response.journals.filter(entry => entry.day === date.getDate().toString());
            entries.set(dayEntries);
        } catch (error) {
            console.error('Error fetching journal entries:', error);
        }
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

<div class="day-navigation flex items-center justify-between p-4 bg-bgColor text-textColor mb-4 rounded-lg shadow-md">
    <button class="px-4 py-2 rounded bg-CTA hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover" on:click={prevDay}>&lt; Prev Day</button>
    <span class="font-bold">{currentDate.toDateString()}</span>
    <button class="px-4 py-2 rounded bg-CTA hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover" on:click={nextDay}>Next Day &gt;</button>
</div>

<div class="day-entries p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Entries for {currentDate.toDateString()}</h2>
    {#each $entries as entry}
        <div class="entry p-2 bg-gray-100 rounded-lg mb-2">
            <span class="time font-bold">{entry.time}</span> - <span class="description">{entry.description}</span>
        </div>
    {/each}
</div>

<style>
    .day-navigation {
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
