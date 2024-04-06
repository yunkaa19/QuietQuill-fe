<script lang="ts">
    import { session } from '$lib/session';
    import { auth } from '$lib/firebase.client';
    import {
        GoogleAuthProvider,
        signInWithPopup,
        signInWithEmailAndPassword,
        type UserCredential
    } from 'firebase/auth';
    import { goto } from '$app/navigation';

    let email: string = '';
    let password: string = '';

    async function loginWithMail() {
        await signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const { user }: UserCredential = result;
                session.set({
                    loggedIn: true,
                    user: {
                        displayName: user?.displayName,
                        email: user?.email,
                        photoURL: user?.photoURL,
                        uid: user?.uid
                    }
                });
                goto('/');
            })
            .catch((error) => {
                return error;
            });
    }

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
            .then((result) => {
                const { displayName, email, photoURL, uid } = result?.user;
                session.set({
                    loggedIn: true,
                    user: {
                        displayName,
                        email,
                        photoURL,
                        uid
                    }
                });

                goto('/');
            })
            .catch((error) => {
                return error;
            });
    }
</script>


<div class="flex flex-col items-center justify-center min-h-screen bg-bgColor text-textColor">
    <h1 class="mb-8 text-4xl font-bold">Login</h1>
    <div class="w-full max-w-sm p-8 space-y-8 bg-white rounded-lg shadow-md">
        <form class="space-y-6" on:submit|preventDefault={loginWithMail}>
            <input class="w-full p-4 text-lg text-bgColor text-gray-700 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                   bind:value={email} type="email" placeholder="Email" required />
            <input class="w-full p-4 text-lg text-bgColor text-gray-700 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                   bind:value={password} type="password" placeholder="Password" required />
            <button class="w-full p-4 text-lg font-semibold text-white bg-CTA rounded-md hover:bg-CTA-Hover"
                    type="submit">Login</button>
        </form>
        <div class="text-sm text-center text-bgColor">or</div>
        <button class="text-bgColor flex items-center justify-center w-full p-4 font-semibold text-gray-700 bg-white rounded-md shadow hover:shadow-md"
                on:click={loginWithGoogle}>
            <img src="src/lib/images/google.svg" alt="Google logo" class="w-6 h-6 mr-3">
            Login with Google
        </button>
        <div class="text-center text-bgColor">
            Don't you have an account?
            <a href="/register" class="font-semibold text-CTA hover:text-CTA-Hover">Register</a>
        </div>
    </div>
</div>