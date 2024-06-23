<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { updatePassword } from '$lib/Components/Api/User/UpdatePassword';
    import {email} from '$lib/stores/session';
    
    export let Email: string | undefined = '';
    
    $: $email, Email = $email;

    let oldPassword = '';
    let newPassword = '';
    let confirmPassword = '';
    let passwordUpdateError: any | null = null;
    let passwordUpdateSuccess = false;

    
    
    
    const dispatch = createEventDispatcher();

    async function handlePasswordUpdate() {
        if (newPassword !== confirmPassword) {
            passwordUpdateError = new Error("New password and confirm password do not match");
            return;
        }

        passwordUpdateError = null;
        passwordUpdateSuccess = false;
        try {
            await updatePassword({
                Email,
                oldPassword,
                newPassword
            });
            passwordUpdateSuccess = true;
            dispatch('close');
        } catch (error) {
            passwordUpdateError = error;
        }
    }

    function closeModal() {
        dispatch('close');
    }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Update Password</h2>
        <div class="flex flex-col space-y-2">
            <input type="password" placeholder="Old Password" bind:value={oldPassword} class="p-2 rounded-lg border" />
            <input type="password" placeholder="New Password" bind:value={newPassword} class="p-2 rounded-lg border" />
            <input type="password" placeholder="Confirm New Password" bind:value={confirmPassword} class="p-2 rounded-lg border" />
            <button on:click={handlePasswordUpdate} class="bg-CTA p-2 rounded-lg hover:bg-CTA-Hover transition-colors duration-300">Update Password</button>
            {#if passwordUpdateError}
                <p class="text-red-500">{passwordUpdateError.message}</p>
            {/if}
            {#if passwordUpdateSuccess}
                <p class="text-green-500">Password updated successfully!</p>
            {/if}
        </div>
        <button on:click={closeModal} class="mt-4 bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition-colors duration-300">Close</button>
    </div>
</div>

<style>
    .fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .bg-opacity-50 {
        background-color: rgba(0, 0, 0, 0.5);
    }
    .bg-white {
        background-color: #fff;
    }
    .rounded-lg {
        border-radius: 0.5rem;
    }
    .shadow-lg {
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
    .p-6 {
        padding: 1.5rem;
    }
</style>
