<script lang="ts">
    import JournalEntryForm from '$lib/Components/JournalEntries/JournalEntryForm.svelte';
    import { page } from '$app/stores';

    let selectedDate: string | null = null;

    $: {
        const url = new URL($page.url.href);
        selectedDate = url.searchParams.get('date');
    }
</script>

<div class="journal-page bg-gray-100 min-h-screen flex flex-col items-center py-8">
    <JournalEntryForm {selectedDate} />
</div>

<style>
    .journal-page {
        width: 100%;
    }
</style>
