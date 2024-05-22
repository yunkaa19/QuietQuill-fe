<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-bgColor text-textColor p-4">
    <div class="bg-Card-Background p-8 rounded-lg shadow-lg text-center space-y-6">
        <h1 class="text-4xl font-bold text-textColor">Oh no! Something is not zen</h1>
        <p class="text-lg">It seems that you have reached an error page. This button will restore the feng shui.</p>
        <button class="bg-CTA hover:bg-CTA-Hover text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300" on:click={() => goto('/')}>
            Restore the balance
        </button>
        <div class="mt-4">
            <h4 class="text-xl">Additional information: {$page.status}</h4>
            <pre class="text-sm text-red-500">{$page.error.message}</pre>
        </div>
    </div>
</div>
