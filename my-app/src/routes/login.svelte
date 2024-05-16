<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { session } from '$lib/session';
    import {getToken} from "$lib/Components/Api/Auth.js";

    let loading = true;

    onMount(async () => {
        if ( getToken() !== null ) {
            session.set({loggedIn: true, user: null, loading: false});
            goto('/');
        }
        else    {
            session.set({loggedIn: false, user: null, loading: false});
            goto('/login');
        }
    });
</script>

{#if loading}
    <p>Checking authentication status...</p>
{:else}
    <p>User is logged in and will be redirected.</p>
{/if}