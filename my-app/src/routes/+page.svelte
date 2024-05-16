<script>
    import { goto} from "$app/navigation";
    
    function gotoSignUp() {
        goto("/register");
    }
</script>

<style>
    /* Add some basic styling */
    h1 {
        color: #00675b;
    }
    .features, .get-started {
        margin-top: 20px;
    }
</style>

<main>
    <h1>Welcome to Your Mental Health Companion</h1>
    <p>Your journey to a better mental health starts here.</p>

    <div class="features">
        <h2>Features</h2>
        <ul>
            <li>Daily Mental Health Tracking</li>
            <li>Personalized Wellness Plans</li>
            <li>Connect with Therapists</li>
            <li>Community Support Forums</li>
        </ul>
    </div>

    <div class="get-started">
        <h2>Get Started</h2>
        <p>Join our community to start your wellness journey.</p>
        <!-- You can replace the href with your actual sign-up or contact page -->
<!--        <a on:click={gotoSignUp()}>Sign Up Today</a>-->
    </div>
</main>
