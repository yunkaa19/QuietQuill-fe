import { post } from '$lib/Components/Api/Request';
import { setToken } from '$lib/Components/Api/Auth';
import { login as storeLogin } from '$lib/stores/session';

interface LoginUserCommand {
    email: string;
    password: string;
}

interface LoginResponse {
    Token: string;
    UserId: string;
    Email: string;
    Role: string;
}

interface User {
    Token: string;
    UserId: string;
    Email: string;
    Role: string;
}

export async function login(data: LoginUserCommand): Promise<User> {
    try {
        
        const response = await post<LoginResponse>('api/Users/login', data, false);

        if (!response.Token || !response.UserId || !response.Email || !response.Role) {
            throw new Error('Invalid login response');
        }

        const userData: User = {
            UserId: response.UserId,
            Email: response.Email,
            Role: response.Role,
            Token: response.Token
        };

        setToken(userData);
        storeLogin(userData);
        return userData; // Ensure the userData is returned
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}
