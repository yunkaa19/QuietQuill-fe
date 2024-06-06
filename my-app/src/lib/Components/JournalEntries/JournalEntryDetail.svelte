<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { writable } from 'svelte/store';

    interface JournalDTO {
        id: string;
        userId?: string;
        content: string;
        day: string;
        month: string;
        year: string;
        mood: string;
        tags?: string;
    }

    let journalEntry = writable<JournalDTO | null>(null);
    let isEditing = writable(false);
    let errorMessage = writable('');

    $: journalId = $page.url.searchParams.get('id');

    onMount(async () => {
        try {
            const response = await fetch(`YOUR_BACKEND_URL/journals/${journalId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch journal entry');
            }
            const data = await response.json();
            journalEntry.set(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                errorMessage.set(error.message || 'An unexpected error occurred');
            } else {
                errorMessage.set('An unexpected error occurred');
            }
        }
    });

    function editEntry() {
        isEditing.set(true);
    }

    async function handleSubmit() {
        const entry = $journalEntry;
        if (!entry) {
            errorMessage.set('Journal entry is null');
            return;
        }

        const payload = {
            ...entry,
            id: entry.id || '' // Ensure id is always a string
        };

        try {
            const response = await fetch(`YOUR_BACKEND_URL/journals/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to update journal entry');
            }

            isEditing.set(false);
            goto('/journals');
        } catch (error: unknown) {
            if (error instanceof Error) {
                errorMessage.set(error.message || 'An unexpected error occurred');
            } else {
                errorMessage.set('An unexpected error occurred');
            }
        }
    }
</script>

<div class="journal-detail-container bg-white shadow-lg p-6 rounded-lg max-w-3xl mx-auto mt-8">
    {#if $journalEntry}
        {#if $isEditing}
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label for="day" class="block text-sm font-medium text-gray-700">Day</label>
                        <input type="text" id="day" bind:value={$journalEntry.day} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required />
                    </div>
                    <div>
                        <label for="month" class="block text-sm font-medium text-gray-700">Month</label>
                        <input type="text" id="month" bind:value={$journalEntry.month} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required />
                    </div>
                    <div>
                        <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
                        <input type="text" id="year" bind:value={$journalEntry.year} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required />
                    </div>
                </div>

                <div>
                    <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
                    <textarea id="content" bind:value={$journalEntry.content} rows="5" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required></textarea>
                </div>

                <div>
                    <label for="mood" class="block text-sm font-medium text-gray-700">Mood</label>
                    <select id="mood" bind:value={$journalEntry.mood} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm">
                        {#each [
                            "HAPPY", "SAD", "ANGRY", "CALM", "ANXIOUS", "EXCITED", "BORED", "RELAXED", "GRATEFUL",
                            "FRUSTRATED", "CONFUSED", "HOPEFUL", "INSPIRED", "NERVOUS", "LONELY", "SURPRISED",
                            "TIRED", "STRESSED", "MOTIVATED", "ENERGETIC", "SCARED", "JEALOUS", "CONTENT",
                            "MELANCHOLIC", "INDIFFERENT", "OVERWHELMED", "RELIEVED", "EMBARRASSED", "HOPELESS",
                            "GUILTY", "PROUD", "AWKWARD", "LOVED", "PEACEFUL", "TRUSTING"
                        ] as mood}
                            <option value={mood}>{mood}</option>
                        {/each}
                    </select>
                </div>

                <div>
                    <label for="tags" class="block text-sm font-medium text-gray-700">Tags</label>
                    <input type="text" id="tags" bind:value={$journalEntry.tags} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" />
                </div>

                {#if $errorMessage}
                    <p class="text-red-500 text-sm">{$errorMessage}</p>
                {/if}

                <div class="flex justify-end">
                    <button type="submit" class="px-4 py-2 bg-CTA text-white rounded hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover focus:ring-opacity-50">
                        Save Changes
                    </button>
                </div>
            </form>
        {:else}
            <div>
                <h1 class="text-2xl font-bold mb-4">Journal Entry</h1>
                <p class="text-gray-700"><strong>Date:</strong> {$journalEntry.day}/{$journalEntry.month}/{$journalEntry.year}</p>
                <p class="text-gray-700"><strong>Mood:</strong> {$journalEntry.mood}</p>
                <p class="text-gray-700"><strong>Content:</strong></p>
                <p class="text-gray-700 mb-4">{$journalEntry.content}</p>
                <p class="text-gray-700"><strong>Tags:</strong> {$journalEntry.tags}</p>

                <div class="flex justify-end mt-4">
                    <button class="px-4 py-2 bg-CTA text-white rounded hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover focus:ring-opacity-50" on:click={editEntry}>Edit</button>
                </div>
            </div>
        {/if}
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<style>
    .journal-detail-container {
        background-color: var(--bgColor);
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
</style>
