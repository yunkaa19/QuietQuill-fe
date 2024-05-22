<script lang="ts">
    import { logout } from "$lib/stores/session";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {
        logout();
        setTimeout(() => {
            goto("/");
        }, 100);
    });
</script>
