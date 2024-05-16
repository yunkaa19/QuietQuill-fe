<script lang="ts">
    

    let email: string = '';
    let password: string = '';

    async function registerWithEmail() {
        
    }

    
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-bgColor text-textColor">
    <h1 class="mb-8 text-4xl font-bold">Register</h1>
    <div class="w-full max-w-sm p-8 space-y-8 bg-white rounded-lg shadow-md">
        <form class="space-y-6" on:submit|preventDefault={registerWithEmail}>
            <input class="w-full p-4 text-lg text-bgColor text-gray-700 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                   bind:value={email} type="email" placeholder="Email" required />
            <input class="w-full p-4 text-lg text-bgColor text-gray-700 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                   bind:value={password} type="password" placeholder="Password" required />
            <button class="w-full p-4 text-lg font-semibold text-white bg-CTA rounded-md hover:bg-CTA-Hover"
                    type="submit">Register</button>
        </form>
        <div class="text-sm text-center text-bgColor">or</div>
        <button class="text-bgColor flex items-center justify-center w-full p-4 font-semibold text-gray-700 bg-white rounded-md shadow hover:shadow-md"
                on:click={registerWithEmail}>
            <img src="src/lib/images/google.svg" alt="Google logo" class="w-6 h-6 mr-3">
            Register with Google
        </button>
        <div class="text-center text-bgColor">
            Already have an account?
            <a href="/login" class="font-semibold text-CTA hover:text-CTA-Hover">Login</a>
        </div>
    </div>
</div>