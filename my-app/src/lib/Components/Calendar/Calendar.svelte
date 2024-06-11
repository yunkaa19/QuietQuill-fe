<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import MonthlyView from './MonthlyView.svelte';
    import WeeklyView from './WeeklyView.svelte';
    import TodayView from './TodayView.svelte';

    export let currentDate = new Date();
    let view: 'daily' | 'weekly' | 'monthly' = 'monthly';

    const dispatch = createEventDispatcher();

    function switchView(newView: 'daily' | 'weekly' | 'monthly') {
        view = newView;
    }

    function handleAddEntryClick(event: CustomEvent<Date>) {
        dispatch('addEntryClick', event.detail);
    }

    function handleEntryClick(event: CustomEvent<string>) {
        dispatch('entryClick', event.detail);
    }
</script>

<div class="view-buttons">
    <button on:click={() => switchView('daily')}>Daily</button>
    <button on:click={() => switchView('weekly')}>Weekly</button>
    <button on:click={() => switchView('monthly')}>Monthly</button>
</div>

{#if view === 'monthly'}
    <MonthlyView {currentDate} on:addEntryClick={handleAddEntryClick} on:entryClick={handleEntryClick} />
{/if}

{#if view === 'weekly'}
    <WeeklyView {currentDate} on:addEntryClick={handleAddEntryClick} on:entryClick={handleEntryClick} />
{/if}

{#if view === 'daily'}
    <TodayView {currentDate} on:addEntryClick={handleAddEntryClick} on:entryClick={handleEntryClick} />
{/if}

<style>
    .view-buttons {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1rem;
        padding: 1rem;
    }
    .week {
        display: contents;
    }
    .day {
        padding: 1rem;
        background-color: #f0f0f0;
        border-radius: 0.5rem;
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100px;
        transition: transform 0.5s ease-in-out;
    }
    .day.current-month {
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .date {
        font-size: 0.875rem;
        color: #2E5157;
        font-weight: 500;
    }
</style>