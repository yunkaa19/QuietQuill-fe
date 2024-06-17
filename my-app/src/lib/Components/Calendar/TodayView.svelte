<script lang="ts">
    import { writable } from 'svelte/store';
    import { getJournalEntries } from '$lib/Components/Api/Journal/GetJournalEntries';
    import { user } from '$lib/stores/session';

    export let currentDate = new Date();
    export let selectedDate = new Date();
    type Entry = { id: string, mood: string, tags: string };
    let entries = writable<Entry[]>([]);

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

    function getMoodLabel(value: number): string {
        const mood = moods.find(m => m.value === value);
        return mood ? mood.label : "UNKNOWN";
    }

    async function loadEntriesForDay(date: Date) {
        if (!currentUser) {
            console.error('User not loaded');
            return;
        }

        const userId = currentUser.UserId;
        const month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString();

        try {
            const response = await getJournalEntries({ userId, month, year });
            const dayEntries = response.journals.filter(entry => entry.day === date.getDate().toString());

            // Map JournalEntry to Entry
            const mappedEntries = dayEntries.map(entry => ({
                id: entry.id,
                mood: getMoodLabel(entry.mood),
                tags: entry.tags
            }));

            entries.set(mappedEntries);
        } catch (error) {
            console.error('Error fetching journal entries:', error);
        }
    }

    $: loadEntriesForDay(selectedDate);

    function nextDay() {
        selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1);
        loadEntriesForDay(selectedDate);
    }

    function prevDay() {
        selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1);
        loadEntriesForDay(selectedDate);
    }

    function viewEntry(entryId: string) {
        // Navigate to view entry page with query parameter
        window.location.href = `/journals/journal_page/view?e=${entryId}`;
    }
</script>

<div class="day-navigation flex items-center justify-between p-4 bg-bgColor text-textColor mb-4 rounded-lg shadow-md">
    <button class="px-4 py-2 rounded bg-CTA hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover" on:click={prevDay}>&lt; Prev Day</button>
    <span class="font-bold">{selectedDate.toDateString()}</span>
    <button class="px-4 py-2 rounded bg-CTA hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover" on:click={nextDay}>Next Day &gt;</button>
</div>

<div class="day-entries p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Entries for {selectedDate.toDateString()}</h2>
    {#each $entries as entry}
        <div class="entry p-2 bg-gray-100 rounded-lg mb-2">
            <span class="mood font-bold">Mood: {entry.mood}</span>
            {#if entry.tags}
                - <span class="tags">Tags: {entry.tags}</span>
            {/if}
            <button class="view-button ml-2 px-2 py-1 rounded bg-CTA hover:bg-CTA-Hover text-white" on:click={() => viewEntry(entry.id)}>View</button>
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
    .mood {
        font-weight: bold;
    }
    .tags {
        font-style: italic;
    }
    .view-button {
        margin-left: 10px;
    }
</style>
