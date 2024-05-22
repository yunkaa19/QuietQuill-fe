<script lang="ts">
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";
</script>

<h1>Oh no! Something is not zen</h1>
<p>It seems that you have reached an error page. This button will restore the feng shui</p>
<button on:click={() => goto('/')}>Restore the balance</button>

<h4>Additional information: {$page.status}:</h4>
<pre>{$page.error.message}</pre>
