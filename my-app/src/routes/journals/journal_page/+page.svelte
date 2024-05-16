<script lang="ts">
    import JournalEntryForm from '$lib/Components/JournalEntries/JournalEntryForm.svelte';
    import JournalEntries from '$lib/Components/JournalEntries/JournalEntryDetail.svelte';

    interface JournalEntry {
        id: number;
        title: string;
        content: string;
    }

    let journalEntries: JournalEntry[] = [];
    let nextId = 1;

    function addEntry(event) {
        journalEntries = [
            ...journalEntries,
            { id: nextId++, title: event.detail.title, content: event.detail.content }
        ];
    }
</script>

<div class="journal-page bg-gray-100 min-h-screen flex flex-col items-center py-8">
    <JournalEntryForm on:submit={addEntry} />
    <JournalEntries {entries} />
</div>

<style>
    .journal-page {
        width: 100%;
    }
</style>
