<script lang="ts">
    import { getWeekGrid } from '$lib/Components/Calendar/calendarUtils';
    import { writable } from 'svelte/store';
    import { getJournalEntries } from '$lib/Components/Api/Journal/GetJournalEntries';
    import { user } from '$lib/stores/session';
    import { createEventDispatcher } from 'svelte';

    export let currentDate = new Date();
    const weekGrid = writable([]);

    const moods = [
        { value: 1, label: "HAPPY" },
        { value: 2, label: "SAD" },
        { value: 3, label: "ANGRY" },
        { value: 4, label: "CALM" },
        { value: 5, label: "ANXIOUS" },
        { value: 6, label: "EXCITED" },
        { value: 7, label: "BORED" },
        { value: 8, label: "RELAXED" },
        { value: 9, label: "GRATEFUL" },
        { value: 10, label: "FRUSTRATED" },
        { value: 11, label: "CONFUSED" },
        { value: 12, label: "HOPEFUL" },
        { value: 13, label: "INSPIRED" },
        { value: 14, label: "NERVOUS" },
        { value: 15, label: "LONELY" },
        { value: 16, label: "SURPRISED" },
        { value: 17, label: "TIRED" },
        { value: 18, label: "STRESSED" },
        { value: 19, label: "MOTIVATED" },
        { value: 20, label: "ENERGETIC" },
        { value: 21, label: "SCARED" },
        { value: 22, label: "JEALOUS" },
        { value: 23, label: "CONTENT" },
        { value: 24, label: "MELANCHOLIC" },
        { value: 25, label: "INDIFFERENT" },
        { value: 26, label: "OVERWHELMED" },
        { value: 27, label: "RELIEVED" },
        { value: 28, label: "EMBARRASSED" },
        { value: 29, label: "HOPELESS" },
        { value: 30, label: "GUILTY" },
        { value: 31, label: "PROUD" },
        { value: 32, label: "AWKWARD" },
        { value: 33, label: "LOVED" },
        { value: 34, label: "PEACEFUL" },
        { value: 35, label: "TRUSTING" }
    ];

    let currentUser: any = null;

    user.subscribe(value => {
        currentUser = value;
    });

    const dispatch = createEventDispatcher();

    function getMoodLabel(value: number): string {
        const mood = moods.find(m => m.value === value);
        return mood ? mood.label : "UNKNOWN";
    }

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
                    .map(entry => ({
                        id: entry.id,
                        mood: getMoodLabel(entry.mood),
                        tags: entry.tags
                    }))
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
        // Navigate to view entry page with query parameter
        window.location.href = `/journals/journal_page/view?e=${entryId}`;
    }

    function handleAddEntryClick(date: Date) {
        dispatch('addEntryClick', date);
    }

    function getDayName(date: Date): string {
        return date.toLocaleString('default', { weekday: 'long' });
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
            <div class="header flex justify-between w-full mb-2">
                <span class="date font-bold">{getDayName(day.date)}</span>
                <button class="text-xs bg-CTA text-white px-2 py-1 rounded-full hover:bg-CTA-Hover" on:click={() => handleAddEntryClick(day.date)}>
                    +
                </button>
            </div>
            <div class="entries-container overflow-y-auto max-h-32">
                {#each day.entries as entry}
                    <div class="entry p-2 bg-gray-100 rounded-lg mb-2">
                        <span class="mood font-bold">Mood: {entry.mood}</span>
                        {#if entry.tags}
                            - <span class="tags">Tags: {entry.tags}</span>
                        {/if}
                        <button class="text-xs bg-CTA text-white px-2 py-1 rounded-full hover:bg-CTA-Hover" on:click={() => handleEntryClick(entry.id)}>
                            View
                        </button>
                    </div>
                {/each}
            </div>
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
        justify-content: flex-start;
        align-items: center;
        height: 200px; /* Adjust the height as needed */
        transition: transform 0.5s ease-in-out;
    }
    .date {
        font-weight: bold;
    }
    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .entries-container {
        width: 100%;
        overflow-y: auto;
    }
    .entry {
        margin-top: 0.5rem;
        padding: 0.5rem;
        background-color: #f0f0f0;
        border-radius: 0.25rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .mood {
        font-weight: bold;
    }
    .tags {
        font-style: italic;
    }
</style>
