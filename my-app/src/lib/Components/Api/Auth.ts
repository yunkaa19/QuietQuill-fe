import { session} from "$lib/session";


export function getToken(): string | null {
    return localStorage.getItem('authToken');
}

export function setToken(token: string): void {
    localStorage.setItem('authToken', token);
}

export function clearToken(): void {
    session.set({
        loggedIn: false,
        user: {
            email: '',
        }
    });
    localStorage.removeItem('authToken');
}
