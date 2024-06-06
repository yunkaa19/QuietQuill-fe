import { writable, derived } from 'svelte/store';
import { clearToken } from '$lib/Components/Api/Auth';

interface User {
    Token: string;
    UserId: string;
    Email: string;
    Role: string;
}

function getInitialUser(): User | null {
    if (typeof localStorage !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        console.log('Stored User:', storedUser);
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                return null;
            }
        }
    }
    return null;
}

export const user = writable<User | null>(getInitialUser());

user.subscribe(value => {
    if (typeof localStorage !== 'undefined') {
        if (value) {
            try {
                localStorage.setItem('user', JSON.stringify(value));
            } catch (error) {
                console.error('Error storing user:', error);
            }
        } else {
            localStorage.removeItem('user');
        }
    }

    if (value === undefined) {
        console.error('User store set to undefined. Stack trace:', new Error().stack);
        user.set(getInitialUser());
    }
});

export const loggedIn = derived(user, $user => $user !== null);
export const token = derived(user, $user => $user?.Token);
export const userId = derived(user, $user => $user?.UserId);
export const email = derived(user, $user => $user?.Email);
export const role = derived(user, $user => $user?.Role);



export const login = (userData: User) => {
    user.set(userData);
};

export const logout = () => {
    user.set(null);
    clearToken();
};
