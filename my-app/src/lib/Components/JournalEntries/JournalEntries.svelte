<script lang="ts">
    export let entries: { id: number, title: string, content: string }[] = [];
</script>

<div class="journal-entries-container">
    {#if entries.length === 0}
        <p class="no-entries">No journal entries yet.</p>
    {/if}

    {#each entries as entry}
        <div class="journal-entry">
            <h2 class="entry-title">{entry.title}</h2>
            <p class="entry-content">{entry.content}</p>
        </div>
    {/each}
</div>

<style>
    .journal-entries-container {
        width: 100%;
        max-width: 600px;
        margin-top: 20px;
    }

    .no-entries {
        text-align: center;
        color: gray;
    }

    .journal-entry {
        background: white;
        padding: 20px;
        margin: 10px 0;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .entry-title {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    .entry-content {
        font-size: 1rem;
        color: #333;
    }
</style>
