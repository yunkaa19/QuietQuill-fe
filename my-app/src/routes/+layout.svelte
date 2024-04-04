<script lang=ts>
    import '../global.css'
    import  Navbar from '$lib/nav.svelte'
    
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import { session} from "$lib/session";
    import { auth } from "$lib/firebase.client";
    import { signOut } from "firebase/auth";
    
    import type { LayoutData} from "../../.svelte-kit/types/src/routes/$types";
    import {load} from "./+layout";
    export let data: LayoutData;
    
    let loading = true;
    let loggedIn: boolean = false;
    
    session.subscribe((cur: any) => {
        loggedIn = cur?.loggedIn;
        loading = cur?.loading;
    });

    onMount(async () => {
        const user: any = await data.getAuthUser();

        const loggedIn = !!user && user?.emailVerified;
        session.update((cur: any) => {
            loading = false;
            return {
                ...cur,
                user,
                loggedIn,
                loading: false
            };
        });

        if (loggedIn) {
            goto('/');
        }
    });
</script>
<Navbar />
{#if loading}
    <div>Loading...</div>
    {:else}
    <div>
        Logged in: {loggedIn}
<slot />
    </div>
{/if}
