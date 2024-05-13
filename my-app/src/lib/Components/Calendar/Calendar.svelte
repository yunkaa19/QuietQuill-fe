<script lang="ts">
    import { writable } from 'svelte/store';
    import TodayView from '$lib/Components/Calendar/TodayView.svelte';
    import WeeklyView from '$lib/Components/Calendar/WeeklyView.svelte';
    import MonthlyView from '$lib/Components/Calendar/MonthlyView.svelte';

    let view = writable('monthly'); // 'today', 'weekly', 'monthly'
    let currentDate = new Date();
</script>

<div class="calendar-controls flex justify-center space-x-4 my-4">
    <!-- Controls for switching views -->
    <button class="bg-bgColor px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" on:click={() => view.set('today')}>Today</button>
    <button class="bg-bgColor px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" on:click={() => view.set('weekly')}>Weekly</button>
    <button class="bg-bgColor px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50" on:click={() => view.set('monthly')}>Monthly</button>
</div>

<div class="calendar-view flex flex-col items-center justify-center">
    {#if $view === 'today'}
        <TodayView {currentDate} />
    {:else if $view === 'weekly'}
        <WeeklyView {currentDate} />
    {:else if $view === 'monthly'}
        <MonthlyView {currentDate} />
    {/if}
</div>