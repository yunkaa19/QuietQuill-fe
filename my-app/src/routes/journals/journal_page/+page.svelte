<script lang="ts">
    import JournalEntryForm from '$lib/Components/JournalEntries/JournalEntryForm.svelte';
    import JournalEntries from '$lib/Components/JournalEntries/JournalEntries.svelte';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    interface JournalEntry {
        id: number;
        title: string;
        content: string;
    }

    let journalEntries: JournalEntry[] = [];
    let nextId = 1;
    let selectedDate: Date | null = null;

    $: {
        const urlParams = new URLSearchParams($page.url.search);
        const dateParam = urlParams.get('date');
        if (dateParam) {
            selectedDate = new Date(dateParam);
        }
    }

    function addEntry(event: CustomEvent) {
        const newEntry = { id: nextId++, title: event.detail.title, content: event.detail.content };
        journalEntries = [...journalEntries, newEntry];
    }

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const dateParam = urlParams.get('date');
        if (dateParam) {
            selectedDate = new Date(dateParam);
        }
    });
</script>

<div class="journal-page bg-gray-100 min-h-screen flex flex-col items-center py-8">
    <JournalEntryForm {selectedDate} on:submit={addEntry} />
    <JournalEntries entries={journalEntries} />
</div>

<style>
    .journal-page {
        width: 100%;
    }
</style>
