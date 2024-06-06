// GetJournalEntries.ts

import { post } from '$lib/Components/Api/Request';

interface JournalEntry {
    id: string;
    userId: string;
    content: string;
    day: string;
    month: string;
    year: string;
    mood: number;
    tags: string;
}

interface GetJournalEntriesRequest {
    userId: string;
    month: string;
    year: string;
}

interface GetJournalEntriesResponse {
    journals: JournalEntry[];
}

export async function getJournalEntries(request: GetJournalEntriesRequest): Promise<GetJournalEntriesResponse> {
    

    try {
        const response = await post<GetJournalEntriesResponse>('api/Journal/GetMonth', request);

        console.log('Received response from API:', response);

        if (!response || !response.journals) {
            throw new Error('Invalid get journal entries response');
        }

        return response;
    } catch (error : any) {
        console.error('Get journal entries error:', error.message);
        throw error;
    }
}
