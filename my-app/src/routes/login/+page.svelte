<script lang="ts">
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { login } from '$lib/Components/Api/Users/Users';
    import { setToken } from '$lib/Components/Api/Auth';
    import { session } from '$lib/session'; // Ensure you have session management

    let email: string = '';
    let password: string = '';
    let errorMessage = writable('');

    async function loginWithMail() {
        try {
            const token = await login({ email, password });
            setToken(token);
            session.set({
                loggedIn: true,
                user: {
                    email,
                }
            });
            goto('/');
        } catch (error) {
            errorMessage.set(error.message);
        }
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-bgColor text-textColor">
    <h1 class="mb-8 text-4xl font-bold">Login</h1>
    <div class="w-full max-w-sm p-8 space-y-8 bg-white rounded-lg shadow-md">
        <form class="space-y-6" on:submit|preventDefault={loginWithMail}>
            <input class="w-full p-4 text-lg text-bgColor text-gray-700 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                   bind:value={email} type="email" placeholder="Email" required />
            <input class="w-full p-4 text-lg text-bgColor text-gray-700 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                   bind:value={password} type="password" placeholder="Password" required />
            <button class="w-full p-4 text-lg font-semibold text-white bg-CTA rounded-md hover:bg-CTA-Hover"
                    type="submit">Login</button>
        </form>
        {#if $errorMessage}
            <p class="text-red-500 text-sm">{$errorMessage}</p>
        {/if}
        <div class="text-sm text-center text-bgColor">or</div>
        <!-- Remove Google login for now -->
        <div class="text-center text-bgColor">
            Don't you have an account?
            <a href="/register" class="font-semibold text-CTA hover:text-CTA-Hover">Register</a>
        </div>
    </div>
</div>
