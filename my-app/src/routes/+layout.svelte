<script lang="ts">
    import '../global.css';
    import Navbar from '$lib/nav.svelte';
    import Modal from '$lib/Components/PaperPlane/Modal.svelte';
    import Notification from '$lib/Components/Notification.svelte';
    import { showModal } from '$lib/stores/Modal';
    import { notifications } from '$lib/stores/notifications';
    import { sendMessage, connectWebSocket } from '$lib/stores/PaperPlane';
    import { onMount } from 'svelte';

    let isModalOpen = false;

    showModal.subscribe(value => {
        isModalOpen = value;
    });

    function handleSend(event: any) {
        sendMessage(event.detail.message);
    }

    onMount(() => {
        //connectWebSocket('ws://localhost:5103/ws'); //TODO: Adjust this to production later
        connectWebSocket('ws://localhost:8080/ws');
    });
</script>

<div class="flex min-h-screen">
    <!-- Sidebar with potential to overlay content when expanded -->
    <Navbar />

    <!-- Content Area, aligned next to the non-expanded sidebar -->
    <div class="flex-1 min-h-screen ml-16">
        <slot />
    </div>
</div>

<!-- Modal for sending messages -->
<Modal isOpen={isModalOpen} on:send={handleSend} />

<!-- Container for stacking notifications -->
<div class="fixed top-16 right-4 space-y-4">
    {#each $notifications as notification (notification.id)}
        <Notification message={notification.content} />
    {/each}
</div>
