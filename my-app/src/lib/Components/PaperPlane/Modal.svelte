<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { showModal } from '../../stores/Modal';
    import { onMount } from 'svelte';

    export let isOpen = false;
    const dispatch = createEventDispatcher();

    let message = '';
    const maxChars = 100;
    let isButtonDisabled = false;
    let timeoutId: NodeJS.Timeout;

    function closeModal() {
        showModal.set(false);
    }

    function sendMessage() {
        if (message.trim().length > 0) {
            dispatch('send', { message });
            closeModal();
            disableButton();
        }
    }

    function disableButton() {
        isButtonDisabled = true;
        timeoutId = setTimeout(() => {
            isButtonDisabled = false;
        }, 10 * 60 * 1000); // 10 minutes
    }

    onMount(() => {
        return () => clearTimeout(timeoutId); // Cleanup timeout on component destroy
    });
</script>

<div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" class:invisible={!isOpen}
     class:visible={isOpen} on:click={closeModal}>
    <div class="bg-white rounded-lg shadow-xl p-6 w-1/3" on:click|stopPropagation>
        <h2 class="text-2xl font-bold mb-4">Send Paper Plane</h2>
        <textarea
                class="w-full p-2 border rounded"
                maxlength={maxChars}
                bind:value={message}
                placeholder="Enter your message..."
        ></textarea>
        <div class="flex justify-between mt-2 text-sm text-gray-600">
            <span>{message.length} / {maxChars} characters</span>
        </div>
        <div class="flex justify-end mt-4">
            <button class="bg-red text-white px-4 py-2 rounded mr-2" on:click={closeModal}>Cancel</button>
            <button
                    class="px-4 py-2 rounded"
                    class:bg-CTA={!isButtonDisabled}
                    class:bg-gray-400={isButtonDisabled}
                    class:cursor-not-allowed={isButtonDisabled}
                    on:click={sendMessage}
                    disabled={isButtonDisabled || message.length === 0}>
                {isButtonDisabled ? 'Wait 10 minutes' : 'Send'}
            </button>
        </div>
    </div>
</div>

<style>
    .visible {
        visibility: visible;
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }

    .invisible {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s 0.3s, opacity 0.3s ease-in-out;
    }

    .bg-CTA {
        background-color: var(--your-cta-color, #007bff); /* Use your actual CTA color here */
    }

    .bg-gray-400 {
        background-color: #cbd5e0;
    }

    .cursor-not-allowed {
        cursor: not-allowed;
    }
</style>
