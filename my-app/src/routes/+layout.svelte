<script lang=ts>
    import '../global.css'
    import  Navbar from '$lib/nav.svelte'

    import { onMount, onDestroy } from 'svelte'
    import { goto } from '$app/navigation'
    import { session} from "$lib/session";

    import type { LayoutData} from "../../.svelte-kit/types/src/routes/$types";
    export let data: LayoutData;

    let loading = true;
    let loggedIn: boolean = false;

    const unsubscribe = session.subscribe((cur: any) => {
        loggedIn = cur?.loggedIn;
        loading = cur?.loading;
    });
    
    function checkSession() {
        session.update((cur: any) => {
            return {
                ...cur,
                loading: false
            };
        });
    }
    
    onMount(async () => {
        checkSession();
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="flex min-h-screen">
    <!-- Sidebar with potential to overlay content when expanded -->
    <Navbar {loggedIn} class="fixed inset-y-0 left-0 z-40 w-16 md:w-64 flex-shrink-0 overflow-y-auto transition-width duration-300" />

    <!-- Content Area, aligned next to the non-expanded sidebar -->
    <div class="flex-1 min-h-screen ml-16">
        {#if loading}
            <div>Loading...</div>
        {:else}
            <div class="bg-bgColor">

                Logged in: {loggedIn ? 'Yes' : 'No'}
                <slot />
            </div>

        {/if}
    </div>
</div>