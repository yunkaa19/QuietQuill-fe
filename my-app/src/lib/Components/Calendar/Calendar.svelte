<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { writable } from 'svelte/store';
    import { fetchAndMapEntries } from './apiHelper'; // Adjust the path as necessary
    import MonthlyView from './MonthlyView.svelte';
    import WeeklyView from './WeeklyView.svelte';
    import TodayView from './TodayView.svelte';

    export let currentDate = new Date();
    export let currentUser: any;
    let view: 'daily' | 'weekly' | 'monthly' = 'monthly';
    let selectedDate = new Date();

    const dispatch = createEventDispatcher();
    let monthGrid = writable([]);

    // Fetch data whenever currentUser or currentDate changes
    $: if (currentUser) {
        fetchAndMapEntries(currentUser, currentDate, monthGrid);
    }

    function switchView(newView: 'daily' | 'weekly' | 'monthly', date: Date = new Date()) {
        view = newView;
        selectedDate = date;
    }

    function handleAddEntryClick(event: CustomEvent<Date>) {
        dispatch('addEntryClick', event.detail);
    }

    function handleEntryClick(event: CustomEvent<{ date: Date, entries: any[] }>) {
        if (event.detail.entries.length > 1) {
            switchView('daily', event.detail.date);
        } else {
            dispatch('entryClick', event.detail.entries[0].id);
        }
    }
</script>

<div class="view-buttons">
    <button on:click={() => switchView('daily')}>Daily</button>
    <button on:click={() => switchView('weekly')}>Weekly</button>
    <button on:click={() => switchView('monthly')}>Monthly</button>
</div>

{#if view === 'monthly'}
    <MonthlyView {currentDate} {monthGrid} on:addEntryClick={handleAddEntryClick} on:entryClick={handleEntryClick} />
{/if}

{#if view === 'weekly'}
    <WeeklyView {currentDate} on:addEntryClick={handleAddEntryClick} on:entryClick={handleEntryClick} />
{/if}

{#if view === 'daily'}
    <TodayView {currentDate} {selectedDate} on:addEntryClick={handleAddEntryClick} on:entryClick={handleEntryClick} />
{/if}

<style>
    .view-buttons {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }
</style>
