import { post } from '$lib/Components/Api/Request';
import type { UserDetail } from '$lib/types/UserDetail';

export async function getUserInfo(userId: string): Promise<UserDetail> {
    try {
        console.log('Fetching user info... userId:', userId);
        const response = await post<UserDetail>(`api/Users/GetUser`, { userId: userId });
        return response;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
}
