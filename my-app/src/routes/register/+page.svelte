<script lang="ts">
    import { register } from '$lib/Components/Api/User/register';
    import { goto } from '$app/navigation';

    let email: string = '';
    let password: string = '';
    let registrationError: string = '';

    // Reactive validation checks
    let hasUpperCase: boolean = false;
    let hasLowerCase: boolean = false;
    let hasNumber: boolean = false;
    let hasSpecialChar: boolean = false;
    let isPasswordValid: boolean = false;

    // Update conditions reactively
    $: {
        hasUpperCase = /[A-Z]/.test(password);
        hasLowerCase = /[a-z]/.test(password);
        hasNumber = /[0-9]/.test(password);
        hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
        isPasswordValid = password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    }

    async function registerWithEmail() {
        if (!isPasswordValid) {
            registrationError = 'Password does not meet criteria.';
            return;
        }

        registrationError = ''; // Reset errors on new submission
        try {
            const { identityID } = await register({ email, password });
            console.log('Registration successful, Identity ID:', identityID);
            await goto('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            registrationError = error.message; // Display detailed error messages
        }
    }
</script>



<div class="flex flex-col items-center justify-center min-h-screen bg-bgColor text-textColor"><div class="flex flex-col items-center justify-center min-h-screen bg-bgColor text-textColor">
    <h1 class="mb-8 text-4xl font-bold">Register</h1>
    <div class="w-full max-w-sm p-8 space-y-8 bg-white rounded-lg shadow-md">
        <form class="space-y-6" on:submit|preventDefault={registerWithEmail}>
            <input class="w-full p-4 text-lg text-bgColor text-gray-700 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                   bind:value={email} type="email" placeholder="Email" required />

            <div>
                <input class="w-full p-4 text-lg text-bgColor text-gray-700 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                       bind:value={password} type="password" placeholder="Password" required />
                <ul class="list-disc ml-4 text-sm">
                    <li class={password.length >= 8 ? 'text-green-500' : 'text-red-500'}>At least 8 characters</li>
                    <li class={hasUpperCase ? 'text-green-500' : 'text-red-500'}>At least one uppercase letter</li>
                    <li class={hasLowerCase ? 'text-green-500' : 'text-red-500'}>At least one lowercase letter</li>
                    <li class={hasNumber ? 'text-green-500' : 'text-red-500'}>At least one number</li>
                    <li class={hasSpecialChar ? 'text-green-500' : 'text-red-500'}>At least one special character</li>
                </ul>
            </div>

            {#if registrationError}
                <p class="text-red-500">{registrationError}</p>
            {/if}
            <button class="w-full p-4 text-lg font-semibold text-white bg-CTA rounded-md hover:bg-CTA-Hover"
                    type="submit" disabled={!isPasswordValid}>Register</button>
        </form>
        <div class="text-sm text-center text-bgColor">or</div>
        <button class="text-bgColor flex items-center justify-center w-full p-4 font-semibold text-gray-700 bg-white rounded-md shadow hover:shadow-md"
                on:click={registerWithEmail} disabled>
            <img src="images/google.svg" alt="Google logo" class="w-6 h-6 mr-3">
            Register with Google
        </button>
        <div class="text-center text-bgColor">
            Already have an account?
            <a href="/login" class="font-semibold text-CTA hover:text-CTA-Hover">Login</a>
        </div>
    </div>
</div>
</div>