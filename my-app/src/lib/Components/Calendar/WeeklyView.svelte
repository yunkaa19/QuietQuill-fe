<script lang="ts">
    import { getWeekGrid } from '$lib/Components/Calendar/calendarUtils';
    import { writable } from 'svelte/store';
    import { getJournalEntries } from '$lib/Components/Api/Journal/GetJournalEntries';
    import { user } from '$lib/stores/session';
    import { createEventDispatcher } from 'svelte';

    export let currentDate = new Date();
    const weekGrid = writable([]);

    let currentUser: any = null;

    user.subscribe(value => {
        currentUser = value;
    });

    const dispatch = createEventDispatcher();

    async function loadEntriesForWeek(date: Date) {
        if (!currentUser) {
            console.error('User not loaded');
            return;
        }

        const userId = currentUser.UserId;
        const month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString();

        try {
            const response = await getJournalEntries({ userId, month, year });
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

    function handleEntryClick(entryId: string) {
        dispatch('entryClick', entryId);
    }

    function handleAddEntryClick(date: Date) {
        dispatch('addEntryClick', date);
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
            <button class="absolute top-2 right-2 text-xs bg-CTA text-white px-2 py-1 rounded-full hover:bg-CTA-Hover" on:click={() => handleAddEntryClick(day.date)}>
                +
            </button>
            {#each day.entries as entry}
                <div class="entry p-2 bg-gray-100 rounded-lg mb-2">
                    <span class="time font-bold">{entry.time}</span> - <span class="description">{entry.description}</span>
                    <button class="text-xs bg-CTA text-white px-2 py-1 rounded-full hover:bg-CTA-Hover" on:click={() => handleEntryClick(entry.id)}>
                        View
                    </button>
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
        padding: 1rem;
    }
    .day {
        padding: 10px;
        border: 1px solid #ccc;
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100px;
        transition: transform 0.5s ease-in-out;
    }
    .date {
        font-weight: bold;
    }
    .entry {
        margin-top: 0.5rem;
        padding: 0.5rem;
        background-color: #f0f0f0;
        border-radius: 0.25rem;
    }
</style>