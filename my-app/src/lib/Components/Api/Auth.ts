interface User {
    Token: string;
    UserId: string;
    Email: string;
    Role: string;
}

export function getToken(): User | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
}

export function setToken(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
}

export function clearToken(): void {
    localStorage.removeItem('user');
}
