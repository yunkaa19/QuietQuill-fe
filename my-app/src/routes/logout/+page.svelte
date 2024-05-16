<script lang="ts">
    import { clearToken, getToken } from "$lib/Components/Api/Auth";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {
        console.log('Before clearing token:', getToken()); // Log current token
        clearToken();
        console.log('After clearing token:', getToken()); // Log to confirm token is cleared
        
        // Add a small delay to ensure localStorage changes are processed
        setTimeout(() => {
            goto("/");
        }, 100);
    });
</script>
