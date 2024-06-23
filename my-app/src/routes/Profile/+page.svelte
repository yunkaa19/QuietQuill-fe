<script lang="ts">
    import { onDestroy } from 'svelte';
    import { userId } from '$lib/stores/session';
    import { getUserInfo } from '$lib/Components/Api/User/GetUserInfo';
    import UpdatePassword from '$lib/Components/User/UpdatePassword.svelte';
    import type { UserDetail } from '$lib/types/UserDetail';

    interface JournalEntry {
        id: string;
        userId: string;
        content: string;
        entryDate: string;
        mood: string;
        tags: string;
    }

    interface UserDetail {
        UserId: string;
        Username: string | null;
        Email: string;
        JournalEntries: JournalEntry[];
        Habits: any[];
        MeditationSessions: any[];
        Reminders: any[];
        UserQuizRecords: any[];
    }

    let currentUser: UserDetail = {
        UserId: '',
        Username: null,
        Email: '',
        JournalEntries: [],
        Habits: [],
        MeditationSessions: [],
        Reminders: [],
        UserQuizRecords: [],
    };

    let loading = true;
    let error: Error | null = null;
    let showUpdatePasswordModal = false;

    async function fetchUserInfo(id: string) {
        loading = true;
        error = null;
        try {
            const userInfo = await getUserInfo(id);
            if (userInfo) {
                currentUser = {
                    ...userInfo,
                    JournalEntries: userInfo.journalEntries || [],
                    Habits: userInfo.habits || [],
                    MeditationSessions: userInfo.meditationSessions || [],
                };
                loading = false;
            } else {
                throw new Error("Failed to load user data.");
            }
        } catch (err) {
            error = err;
            loading = false;
        }
    }

    let unsubscribe;
    $: if (userId) {
        unsubscribe = userId.subscribe(value => {
            if (value) {
                fetchUserInfo(value);
            }
        });
    }

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    function openUpdatePasswordModal() {
        showUpdatePasswordModal = true;
    }

    function closeUpdatePasswordModal() {
        showUpdatePasswordModal = false;
    }
</script>

<main class="flex flex-col items-center justify-center min-h-screen bg-bgColor text-textColor p-6">
    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p>Error loading user information: {error.message}</p>
    {:else}
        <div class="max-w-4xl w-full bg-Card-Background p-8 rounded-lg space-y-8">
            <!-- User Info -->
            <section class="flex items-center space-x-6">
                <img src="src/lib/images/default-avatar.png" alt="User Avatar" class="w-24 h-24 rounded-full">
                <div>
                    <h1 class="text-3xl font-bold">{currentUser.Username || 'Anonymous'}</h1>
                    <p class="text-lg">{currentUser.Email}</p>
                </div>
            </section>

            <!-- Activity Summary -->
            <section class="grid grid-cols-3 gap-4">
                <div class="bg-CTA p-4 rounded-lg text-center">
                    <h2 class="text-2xl font-semibold">Journals</h2>
                    <p class="text-xl">{currentUser.JournalEntries.length}</p>
                </div>
                <div class="bg-CTA p-4 rounded-lg text-center">
                    <h2 class="text-2xl font-semibold">Habits Tracked</h2>
                    <p class="text-xl">{currentUser.Habits.length}</p>
                </div>
                <div class="bg-CTA p-4 rounded-lg text-center">
                    <h2 class="text-2xl font-semibold">Meditations</h2>
                    <p class="text-xl">{currentUser.MeditationSessions.length}</p>
                </div>
            </section>

            <!-- Recent Journal Entries -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold">Recent Journal Entries</h2>
                <ul class="space-y-2">
                    {#each currentUser.JournalEntries.slice(0, 3) as entry (entry.id)}
                        <li class="p-4 bg-CTA-Hover rounded-lg">
                            <h3 class="text-xl font-semibold">{entry.content.slice(0, 30)}...</h3>
                            <p class="text-sm">Mood: {entry.mood}</p>
                            <p class="text-xs text-right">Date: {entry.entryDate}</p>
                        </li>
                    {/each}
                </ul>
            </section>

            <!-- Settings -->
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold">Account Settings</h2>
                <div class="flex flex-col space-y-2">
                    <button class="bg-CTA p-2 rounded-lg hover:bg-CTA-Hover transition-colors duration-300">Edit Profile</button>
                    <button class="bg-CTA p-2 rounded-lg hover:bg-CTA-Hover transition-colors duration-300" on:click={openUpdatePasswordModal}>Change Password</button>
                    <button class="bg-red p-2 rounded-lg hover:bg-red-600 transition-colors duration-300">Delete Account</button>
                </div>
            </section>
        </div>
    {/if}

    {#if showUpdatePasswordModal}
        <UpdatePassword email={currentUser.Email} on:close={closeUpdatePasswordModal} />
    {/if}
</main>
