import { post } from '$lib/Components/Api/Request'

interface LoginUserCommand {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
}

export function login(data: LoginUserCommand): Promise<AuthResponse> {
    return post<AuthResponse>('api/Users/login', data, true);
}