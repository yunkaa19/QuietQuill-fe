<script>
    import { onMount } from 'svelte';
    import { login, isAuthenticated } from '$lib/firebase.js';

    let loading = true;

    onMount(async () => {
        const isLoggedIn = await isAuthenticated();
        if (!isLoggedIn) {
            login();
        } else {
            // Redirect to the user's dashboard or profile
            // This could be a SvelteKit navigation or simply setting window.location
        }
        loading = false;
    });
</script>

{#if loading}
    <p>Checking authentication status...</p>
{:else}
    <p>User is logged in and will be redirected.</p>
{/if}