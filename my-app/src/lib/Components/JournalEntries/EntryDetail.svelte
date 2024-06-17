<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let entry: any;
    const dispatch = createEventDispatcher();

    let updatedEntry = { ...entry };
    let isSubmitting = false;
    let errorMessage = '';
    let successMessage = '';

    // Ensure date is in the correct format for the date input
    updatedEntry.date = `${entry.year}-${String(entry.month).padStart(2, '0')}-${String(entry.day).padStart(2, '0')}`;

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

    async function handleUpdate() {
        isSubmitting = true;
        errorMessage = '';
        successMessage = '';

        try {
            const [year, month, day] = updatedEntry.date.split('-');
            updatedEntry.year = year;
            updatedEntry.month = month;
            updatedEntry.day = day;

            const { date, ...entryWithoutDate } = updatedEntry;

            console.log('Dispatching update with entry:', entryWithoutDate);
            await dispatch('update', { entry: entryWithoutDate });
            successMessage = 'Entry updated successfully!';
            setTimeout(() => successMessage = '', 3000); // Clear success message after 3 seconds
        } catch (error: unknown) {
            if (error instanceof Error) {
                errorMessage = error.message || 'An unexpected error occurred';
            } else {
                errorMessage = 'An unexpected error occurred';
            }
        } finally {
            isSubmitting = false;
        }
    }

    function confirmDelete() {
        if (confirm('Are you sure you want to delete this entry?')) {
            handleDelete();
        }
    }

    async function handleDelete() {
        try {
            console.log('Dispatching delete for entryId:', updatedEntry.id);
            dispatch('delete', { entryId: updatedEntry.id });
        } catch (error: unknown) {
            if (error instanceof Error) {
                errorMessage = error.message || 'An unexpected error occurred';
            } else {
                errorMessage = 'An unexpected error occurred';
            }
        }
    }
</script>

<div class="journal-form-container bg-white shadow-lg p-8 rounded-lg mx-auto mt-12">
    <h1 class="text-3xl font-bold mb-6 text-textColor text-center">Journal Entry</h1>
    <form on:submit|preventDefault={handleUpdate} class="space-y-6">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
                <label for="date" class="block text-sm font-semibold text-gray-700">Date</label>
                <input type="date" id="date" bind:value={updatedEntry.date} class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required />
            </div>

            <div>
                <label for="mood" class="block text-sm font-semibold text-gray-700">Mood</label>
                <select id="mood" bind:value={updatedEntry.mood} class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm">
                    {#each moods as { value, label }}
                        <option value={value}>{label}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label for="tags" class="block text-sm font-semibold text-gray-700">Tags</label>
                <input type="text" id="tags" bind:value={updatedEntry.tags} class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" />
            </div>
        </div>

        <div>
            <label for="content" class="block text-sm font-semibold text-gray-700">Content</label>
            <textarea id="content" bind:value={updatedEntry.content} rows="5" class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-CTA focus:border-CTA sm:text-sm" required></textarea>
        </div>

        {#if errorMessage}
            <p class="text-red-500 text-sm mt-2">{errorMessage}</p>
        {/if}

        {#if successMessage}
            <p class="text-green-500 text-sm mt-2">{successMessage}</p>
        {/if}

        <div class="flex justify-between">
            <button type="button" on:click={confirmDelete} class="px-5 py-2 bg-red text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">
                Delete
            </button>
            <button type="submit" class="px-5 py-2 bg-CTA text-white rounded hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover focus:ring-opacity-50" disabled={isSubmitting}>
                {#if isSubmitting} Updating... {:else} Update {/if}
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
        width: calc(100% - 2rem); /* Ensure the form uses full width minus padding */
        max-width: 800px; /* Set a maximum width for the form */
        margin: auto; /* Center the container */
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
