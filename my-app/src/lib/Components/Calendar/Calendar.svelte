<script lang="ts">
    import { writable } from 'svelte/store';
    import TodayView from '$lib/Components/Calendar/TodayView.svelte';
    import WeeklyView from '$lib/Components/Calendar/WeeklyView.svelte';
    import MonthlyView from '$lib/Components/Calendar/MonthlyView.svelte';
    import { goto } from '$app/navigation';

    let view = writable('monthly'); // 'today', 'weekly', 'monthly'
    let currentDate = new Date();

    function navigateToDetail(id: string) {
        goto(`/journals/${id}`);
    }
</script>

<div class="calendar-container flex flex-col items-center justify-center w-full h-full bg-bgColor p-4 rounded-lg shadow-md">
    <div class="calendar-controls flex justify-center space-x-4 mb-4">
        <!-- Controls for switching views -->
        <button class="bg-CTA px-4 py-2 text-white rounded hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover focus:ring-opacity-50" on:click={() => view.set('today')}>Today</button>
        <button class="bg-CTA px-4 py-2 text-white rounded hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover focus:ring-opacity-50" on:click={() => view.set('weekly')}>Weekly</button>
        <button class="bg-CTA px-4 py-2 text-white rounded hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover focus:ring-opacity-50" on:click={() => view.set('monthly')}>Monthly</button>
    </div>

    <div class="calendar-view w-full max-w-5xl transition-transform duration-300 ease-in-out">
        {#if $view === 'today'}
            <TodayView {currentDate} on:entryClick={event => navigateToDetail(event.detail)} />
        {:else if $view === 'weekly'}
            <WeeklyView {currentDate} on:entryClick={event => navigateToDetail(event.detail)} />
        {:else if $view === 'monthly'}
            <MonthlyView {currentDate} on:entryClick={event => navigateToDetail(event.detail)} />
        {/if}
    </div>
</div>

<style>
    .calendar-container {
        background-color: var(--bgColor);
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .calendar-controls {
        margin-bottom: 1.5rem;
    }
    .calendar-controls button {
        min-width: 100px;
    }
    .calendar-view {
        transition: transform 0.5s ease-in-out;
    }
</style>
