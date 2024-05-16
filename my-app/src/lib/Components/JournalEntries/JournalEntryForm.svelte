<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';

    // Define the JournalDTO type
    interface JournalDTO {
        id?: string;
        userId?: string;
        content?: string;
        day?: string;
        month?: string;
        year?: string;
        mood?: string;
        tags?: string;
    }

    let journalEntry: JournalDTO = {
        content: '',
        day: '',
        month: '',
        year: '',
        mood: 'HAPPY',
        tags: ''
    };

    let isSubmitting = writable(false);
    let errorMessage = writable('');

    const moods = [
        "HAPPY", "SAD", "ANGRY", "CALM", "ANXIOUS", "EXCITED", "BORED", "RELAXED", "GRATEFUL",
        "FRUSTRATED", "CONFUSED", "HOPEFUL", "INSPIRED", "NERVOUS", "LONELY", "SURPRISED",
        "TIRED", "STRESSED", "MOTIVATED", "ENERGETIC", "SCARED", "JEALOUS", "CONTENT",
        "MELANCHOLIC", "INDIFFERENT", "OVERWHELMED", "RELIEVED", "EMBARRASSED", "HOPELESS",
        "GUILTY", "PROUD", "AWKWARD", "LOVED", "PEACEFUL", "TRUSTING"
    ];

    // Function to handle form submission
    async function handleSubmit() {
        isSubmitting.set(true);
        errorMessage.set('');

        try {
            const response = await fetch('YOUR_BACKEND_URL/journals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(journalEntry),
            });

            if (!response.ok) {
                throw new Error('Failed to submit journal entry');
            }

            goto('/journals');
        } catch (error) {
            errorMessage.set(error.message);
        } finally {
            isSubmitting.set(false);
        }
    }
</script>

<div class="journal-form-container bg-white shadow-lg p-6 rounded-lg max-w-3xl mx-auto mt-8">
    <h1 class="text-2xl font-bold mb-4">New Journal Entry</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="grid grid-cols-3 gap-4">
            <div>
                <label for="day" class="block text-sm font-medium text-gray-700">Day</label>
                <input type="text" id="day" bind:value={journalEntry.day} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required />
            </div>
            <div>
                <label for="month" class="block text-sm font-medium text-gray-700">Month</label>
                <input type="text" id="month" bind:value={journalEntry.month} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required />
            </div>
            <div>
                <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
                <input type="text" id="year" bind:value={journalEntry.year} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required />
            </div>
        </div>

        <div>
            <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
            <textarea id="content" bind:value={journalEntry.content} rows="5" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required></textarea>
        </div>

        <div>
            <label for="mood" class="block text-sm font-medium text-gray-700">Mood</label>
            <select id="mood" bind:value={journalEntry.mood} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm">
                {#each moods as mood}
                    <option value={mood}>{mood}</option>
                {/each}
            </select>
        </div>

        <div>
            <label for="tags" class="block text-sm font-medium text-gray-700">Tags</label>
            <input type="text" id="tags" bind:value={journalEntry.tags} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" />
        </div>

        {#if $errorMessage}
            <p class="text-red-500 text-sm">{$errorMessage}</p>
        {/if}

        <div class="flex justify-end">
            <button type="submit" class="px-4 py-2 bg-CTA text-white rounded hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover focus:ring-opacity-50" disabled={$isSubmitting}>
                {#if $isSubmitting} Submitting... {:else} Submit {/if}
            </button>
        </div>
    </form>
</div>

<style>
    .journal-form-container {
        background-color: var(--bgColor);
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
</style>
