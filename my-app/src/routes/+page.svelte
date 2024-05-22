<script>
    import { goto } from "$app/navigation";

    function gotoSignUp() {
        goto("/register");
    }
</script>

<main class="flex flex-col items-center justify-center min-h-screen bg-bgColor text-textColor p-6">
    <div class="text-center space-y-8">
        <h1 class=" text-textColor text-5xl font-bold text-CTA">Welcome to Your Mental Health Companion</h1>
        <p class="text-xl">Your journey to better mental health starts here.</p>

        <div class="features space-y-4">
            <h2 class="text-3xl font-semibold">Features</h2>
            <ul class="list-disc list-inside space-y-2">
                <li>Daily Mental Health Tracking</li>
                <li>Personalized Wellness Plans</li>
                <li>Connect with Therapists</li>
                <li>Community Support Forums</li>
            </ul>
        </div>

        <div class="get-started space-y-4">
            <h2 class="text-3xl font-semibold">Get Started</h2>
            <p class="text-lg">Join our community to start your wellness journey.</p>
            <button class="bg-CTA hover:bg-CTA-Hover text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300" on:click={gotoSignUp}>
                Sign Up Today
            </button>
        </div>
    </div>
</main>
