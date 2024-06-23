import { post } from '$lib/Components/Api/Request';
import { getToken } from '$lib/Components/Api/Auth';

interface UpdatePasswordCommand {
    Email: string | undefined;
    oldPassword: string;
    newPassword: string;
}

export async function updatePassword(data: UpdatePasswordCommand): Promise<void> {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('User is not authenticated');
        }

        await post('api/Users/UpdatePassword', data, true);
    } catch (error) {
        console.error('Update password error:', error);
        throw error;
    }
}
