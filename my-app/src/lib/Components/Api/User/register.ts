import { post } from '$lib/Components/Api/Request';

interface RegisterUserCommand {
    email: string;
    password: string;
}

interface RegisterResponse {
    UserId: string;
    Email: string;
    Role: string;
}

export async function register(data: RegisterUserCommand): Promise<RegisterResponse> {
    try {
        const response = await post<RegisterResponse>('api/Users/register', data, false);

        if (!response.UserId || !response.Email || !response.Role) {
            throw new Error('Invalid registration response');
        }

        return response; // Return the registration response
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}
