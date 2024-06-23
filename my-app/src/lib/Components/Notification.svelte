<script lang="ts">
    import { fade } from 'svelte/transition';

    export let message: string = '';

    let isVisible = true;

    function closeNotification() {
        isVisible = false;
    }

    setTimeout(closeNotification, 10000);  // Notification stays visible for 10 seconds
</script>

<!-- Updated structure with flexbox for proper layout -->
<div class="notification bg-Card-Background text-textColor p-4 rounded-lg shadow-strong flex justify-between items-start"
     class:visible={isVisible}
     class:invisible={!isVisible}
     transition:fade={{ duration: 800 }}>
    <p class="flex-1">{message}</p> <!-- Flex-1 allows the paragraph to take up the available space -->
    <button class="close-btn" on:click={closeNotification}>×</button>
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

    .notification {
        position: fixed;  /* Makes the notification float over content */
        top: 20px;        /* Adjust as necessary */
        right: 20px;      /* Adjust as necessary */
        z-index: 10;      /* Ensures it's above most other elements */
        width: auto;      /* Adjust width as needed */
        max-width: 90%;   /* Prevents the notification from being too wide */
    }

    .shadow-strong {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);  /* Stronger shadow for better visibility */
    }

    .close-btn {
        background: none;
        border: none;
        color: inherit;  /* Use text color from TailwindCSS textColor */
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 12px; /* Ensures some spacing between the message and the close button */
        line-height: 1;   /* Adjust line height to match the button size */
    }
</style>
