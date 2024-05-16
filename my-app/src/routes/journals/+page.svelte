<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Calendar from '$lib/Components/Calendar/Calendar.svelte';

    // Define a type for journal entries
    interface JournalEntry {
        id: number;
        title: string;
        content: string;
    }

    let selectedDate = new Date();
    let journalEntries: JournalEntry[] = []; // Now explicitly typed as an array of JournalEntry

    onMount(() => {
        loadJournalEntries(selectedDate);
    });

    function loadJournalEntries(date: Date) {
        // Replace with actual logic to load journal entries for a given date
        journalEntries = [
            { id: 1, title: 'Reflections on Today', content: 'Today I learned...' },
            // ...other entries
        ];
    }

    function handleDateChange(event: CustomEvent<Date>) {
        // Using type assertion to inform TypeScript about the encapsulated type
        let newDate: Date = event.detail as Date;
        selectedDate = newDate;
        loadJournalEntries(selectedDate);
    }
</script>

<div class="journal-page bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8">
    <div class="calendar-container bg-white shadow-lg p-6 rounded-lg mb-6 w-full max-w-5xl">
        <Calendar {selectedDate} on:dateChange={handleDateChange} />
    </div>
</div>

<style>
    .journal-page {
        display: flex;
        padding: 1rem;
    }

    .calendar-container {
        width: 100%;
        max-width: 5xl;
    }

    .journal-entries {
        flex-grow: 1;
        margin-left: 2rem;
    }
</style>
