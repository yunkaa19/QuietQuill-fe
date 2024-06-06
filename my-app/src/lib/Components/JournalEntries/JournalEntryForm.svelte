<script lang="ts">
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { createJournalEntry } from '$lib/Components/Api/Journal/CreateJournalEntry';
    import { user } from "$lib/stores/session";

    interface JournalEntry {
        id: string;
        userId: string;
        content: string;
        day: string;
        month: string;
        year: string;
        mood: number;
        tags: string;
    }

    interface JournalDTO {
        id?: string;
        userId?: string;
        content?: string;
        date?: string;
        mood?: number;
        tags?: string;
    }

    export let selectedDate: string | null = null;

    let journalEntry: JournalDTO = {
        content: '',
        date: selectedDate || '',
        mood: 1,
        tags: ''
    };

    let isSubmitting = writable(false);
    let errorMessage = writable('');
    let currentUser: any = null;

    user.subscribe(value => {
        currentUser = value;
    });

    const moods = [
        { value: 1, label: "HAPPY" },
        { value: 2, label: "SAD" },
        { value: 3, label: "ANGRY" },
        { value: 4, label: "CALM" },
        { value: 5, label: "ANXIOUS" },
        { value: 6, label: "EXCITED" },
        { value: 7, label: "BORED" },
        { value: 8, label: "RELAXED" },
        { value: 9, label: "GRATEFUL" },
        { value: 10, label: "FRUSTRATED" },
        { value: 11, label: "CONFUSED" },
        { value: 12, label: "HOPEFUL" },
        { value: 13, label: "INSPIRED" },
        { value: 14, label: "NERVOUS" },
        { value: 15, label: "LONELY" },
        { value: 16, label: "SURPRISED" },
        { value: 17, label: "TIRED" },
        { value: 18, label: "STRESSED" },
        { value: 19, label: "MOTIVATED" },
        { value: 20, label: "ENERGETIC" },
        { value: 21, label: "SCARED" },
        { value: 22, label: "JEALOUS" },
        { value: 23, label: "CONTENT" },
        { value: 24, label: "MELANCHOLIC" },
        { value: 25, label: "INDIFFERENT" },
        { value: 26, label: "OVERWHELMED" },
        { value: 27, label: "RELIEVED" },
        { value: 28, label: "EMBARRASSED" },
        { value: 29, label: "HOPELESS" },
        { value: 30, label: "GUILTY" },
        { value: 31, label: "PROUD" },
        { value: 32, label: "AWKWARD" },
        { value: 33, label: "LOVED" },
        { value: 34, label: "PEACEFUL" },
        { value: 35, label: "TRUSTING" }
    ];

    async function handleSubmit() {
        isSubmitting.set(true);
        errorMessage.set('');

        try {
            const entry: JournalEntry = {
                id: journalEntry.id || '',
                userId: currentUser?.UserId || '',
                content: journalEntry.content || '',
                day: journalEntry.date?.split('-')[2] || '',
                month: journalEntry.date?.split('-')[1] || '',
                year: journalEntry.date?.split('-')[0] || '',
                mood: journalEntry.mood || 1,
                tags: journalEntry.tags || ''
            };

            const response = await createJournalEntry(entry);

            if (response.entry) {
                goto('/journals');
            } else {
                throw new Error('Failed to create journal entry');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                errorMessage.set(error.message || 'An unexpected error occurred');
            } else {
                errorMessage.set('An unexpected error occurred');
            }
        } finally {
            isSubmitting.set(false);
        }
    }
</script>

<div class="journal-form-container bg-white shadow-lg p-8 rounded-lg mx-auto mt-12">
    <h1 class="text-3xl font-bold mb-6 text-textColor text-center">New Journal Entry</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
                <label for="date" class="block text-sm font-semibold text-gray-700">Date</label>
                <input type="date" id="date" bind:value={journalEntry.date} class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required />
            </div>

            <div>
                <label for="mood" class="block text-sm font-semibold text-gray-700">Mood</label>
                <select id="mood" bind:value={journalEntry.mood} class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm">
                    {#each moods as { value, label }}
                        <option value={value}>{label}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label for="tags" class="block text-sm font-semibold text-gray-700">Tags</label>
                <input type="text" id="tags" bind:value={journalEntry.tags} class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" />
            </div>
        </div>

        <div>
            <label for="content" class="block text-sm font-semibold text-gray-700">Content</label>
            <textarea id="content" bind:value={journalEntry.content} rows="5" class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required></textarea>
        </div>

        {#if $errorMessage}
            <p class="text-red-500 text-sm mt-2">{$errorMessage}</p>
        {/if}

        <div class="flex justify-end">
            <button type="submit" class="px-5 py-2 bg-CTA text-white rounded hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover focus:ring-opacity-50" disabled={$isSubmitting}>
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
        width: 80%; /* Set the width to 80% */
        max-width: 1200px; /* Set a maximum width */
    }

    .journal-form-container h1 {
        color: var(--textColor);
    }

    input, textarea, select {
        color: var(--textColor);
        background-color: var(--Card-Background);
    }

    input::placeholder, textarea::placeholder {
        color: var(--textColor);
        opacity: 0.5;
    }

    input:focus, textarea:focus, select:focus {
        border-color: var(--CTA);
        box-shadow: 0 0 0 3px rgba(46, 81, 87, 0.3);
    }

    button:disabled {
        background-color: var(--CTA-Hover);
        cursor: not-allowed;
    }
</style>
