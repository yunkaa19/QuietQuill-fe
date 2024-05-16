<script lang="ts">
    import { goto } from '$app/navigation';

    export let error: { status: number, message: string };

    function goHome() {
        goto('/');
    }
</script>

{#if error.status === 404}
    <div class="flex flex-col items-center justify-center min-h-screen bg-bgColor text-textColor p-4">
        <div class="text-center">
            <img src="/path-to-your-comforting-image.svg" alt="Comforting Image" class="mx-auto mb-8 w-64 h-64" />
            <h1 class="text-5xl font-bold mb-4">Oops! Page Not Found</h1>
            <p class="text-2xl mb-4">It seems you are lost. Let's guide you back to a better place.</p>
            <p class="text-lg mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <button class="px-6 py-2 text-lg font-semibold text-white bg-CTA rounded-md hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover"
                    on:click={goHome}>Take Me Home</button>
        </div>
    </div>
{:else}
    <div class="flex flex-col items-center justify-center min-h-screen bg-bgColor text-textColor p-4">
        <div class="text-center">
            <img src="/path-to-your-error-image.svg" alt="Error Image" class="mx-auto mb-8 w-64 h-64" />
            <h1 class="text-5xl font-bold mb-4">Something Went Wrong</h1>
            <p class="text-2xl mb-4">It seems something went wrong. Let's guide you back to a better place.</p>
            <p class="text-lg mb-8">{error.message}</p>
            <button class="px-6 py-2 text-lg font-semibold text-white bg-CTA rounded-md hover:bg-CTA-Hover focus:outline-none focus:ring-2 focus:ring-CTA-Hover"
                    on:click={goHome}>Take Me Home</button>
        </div>
    </div>
{/if}
