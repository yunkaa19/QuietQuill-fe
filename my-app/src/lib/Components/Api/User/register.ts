import { post } from '$lib/Components/Api/Request';

interface RegisterUserCommand {
    email: string;
    password: string;
}

interface RegisterResponse {
    identityID?: string;
    errors?: Array<{
        propertyName: string;
        errorMessage: string;
    }>;
}

export async function register(data: RegisterUserCommand): Promise<RegisterResponse> {
    try {
        const response = await post<RegisterResponse>('api/Users/register', data, false);

        if (response.errors && response.errors.length > 0) {
            // Handle registration errors
            const errorMessages = response.errors.map(err => `${err.propertyName}: ${err.errorMessage}`).join('\n');
            throw new Error(errorMessages);
        }

        if (!response.identityID) {
            throw new Error('Invalid registration response');
        }

        return response; // Return the successful registration response
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}
