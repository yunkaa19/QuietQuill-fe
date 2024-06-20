<script lang="ts">
    import { fade } from 'svelte/transition';

    export let message: string = '';

    let isVisible = true;

    function closeNotification() {
        isVisible = false;
    }

    setTimeout(closeNotification, 10000);
</script>

<div class="bg-blue-500 text-white p-4 rounded shadow-lg" class:visible={isVisible} class:invisible={!isVisible} transition:fade>
    <p>{message}</p>
</div>

<style>
    .visible {
        visibility: visible;
        opacity: 1;
        transition: opacity 0.8s ease-in-out;
    }

    .invisible {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s 0.3s, opacity 0.3s ease-in-out;
    }
</style>
