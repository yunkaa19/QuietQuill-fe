<script lang="ts">
    import Calendar from '$lib/Components/Calendar/Calendar.svelte';
    import { goto } from '$app/navigation';

    let selectedDate = new Date();

    function handleDateChange(event: CustomEvent<Date>) {
        selectedDate = event.detail;
    }

    function handleAddEntryClick(event: CustomEvent<Date>) {
        const date = event.detail;
        const formattedDate = date.toISOString().split('T')[0];
        const url = `/journals/journal_page/new?date=${formattedDate}`;
        console.log('Navigating to URL:', url);
        goto(url);
    }
</script>

<div class="journal-page bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8">
    <div class="calendar-container bg-white shadow-lg p-6 rounded-lg mb-6 w-full max-w-5xl">
        <Calendar {selectedDate} on:dateChange={handleDateChange} on:addEntryClick={handleAddEntryClick} />
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
</style>
