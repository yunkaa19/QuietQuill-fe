import { post } from '$lib/Components/Api/Request';

interface RegisterUserCommand {
    email: string;
    password: string;
}

interface RegisterResponse {
    identityID: string;
}

export async function register(data: RegisterUserCommand): Promise<RegisterResponse> {
    try {
        const response = await post<RegisterResponse>('api/Users/register', data, false);

        if (response.identityID == null) {
            throw new Error('Invalid registration response');
        }

        return response;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}
