<script lang="ts">
    import { onMount } from 'svelte';
    import EntryDetail from '$lib/Components/JournalEntries/EntryDetail.svelte';
    import { getJournalEntry } from '$lib/Components/Api/Journal/GetJournalEntry';
    import { deleteJournalEntry } from '$lib/Components/Api/Journal/DeleteJournalEntry';
    import { updateJournalEntry } from '$lib/Components/Api/Journal/UpdateJournalEntry';
    import { user } from '$lib/stores/session';

    let entryId: string;
    let entry: any = {};
    let loading: boolean = true;
    let error: string | null = null;
    let currentUser: any = null;

    user.subscribe(value => {
        currentUser = value;
    });

    $: {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            entryId = urlParams.get('e') || '';
            console.log('Extracted entryId:', entryId);
        }
    }

    onMount(async () => {
        if (!entryId) {
            error = 'No entry ID provided';
            loading = false;
            return;
        }

        if (!currentUser) {
            error = 'User not logged in';
            loading = false;
            return;
        }

        try {
            const userId = currentUser.UserId;
            console.log('Fetching entry for userId:', userId, 'and entryId:', entryId);
            const response = await getJournalEntry({ userId, entryID: entryId });
            console.log('Fetched entry response:', response);
            entry = response.entry;
            loading = false;
        } catch (err) {
            console.error('Error fetching entry:', err);
            error = 'Failed to load entry.';
            loading = false;
        }
    });

    async function handleDelete(event) {
        try {
            const entryId = event.detail.entryId;
            console.log('Deleting entry with ID:', entryId);
            await deleteJournalEntry(entryId);
            // Redirect to journals page after deletion
            if (typeof window !== 'undefined') {
                window.location.href = '/journals';
            }
        } catch (err) {
            error = 'Failed to delete entry.';
        }
    }

    async function handleUpdate(event) {
        try {
            const updatedEntry = event.detail.entry;
            console.log('Updating entry with data:', updatedEntry);
            await updateJournalEntry(updatedEntry);
            // Reload the entry data after update
            const userId = currentUser.UserId;
            const responseAfterUpdate = await getJournalEntry({ userId, entryID: entryId });
            entry = responseAfterUpdate.entry;
        } catch (err) {
            console.error('Error updating entry:', err);
            error = 'Failed to update entry.';
        }
    }
</script>

{#if loading}
    <p>Loading...</p>
{:else if error}
    <p>{error}</p>
{:else}
    <div class="container">
        <EntryDetail {entry} on:delete={handleDelete} on:update={handleUpdate} />
    </div>
{/if}

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
    }

    .text-green-500 {
        color: green;
    }

    .text-sm {
        font-size: 0.875rem;
    }

    .mb-4 {
        margin-bottom: 1rem;
    }
</style>
