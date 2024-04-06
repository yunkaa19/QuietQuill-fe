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

<div class="flex min-h-screen">
    <!-- Sidebar with potential to overlay content when expanded -->
    <Navbar class="fixed inset-y-0 left-0 z-40 w-16 md:w-64 flex-shrink-0 overflow-y-auto transition-width duration-300" />

    <!-- Content Area, aligned next to the non-expanded sidebar -->
    <div class="flex-1 min-h-screen ml-16 p-4">
        {#if loading}
            <div>Loading...</div>
        {:else}
            <div>
                Logged in: {loggedIn ? 'Yes' : 'No'}
                <slot />
            </div>
        {/if}
    </div>
</div>