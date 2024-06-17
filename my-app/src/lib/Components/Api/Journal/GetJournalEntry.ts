import { post } from '$lib/Components/Api/Request';

interface JournalEntry {
    id: string;
    userId: string;
    content: string;
    day: string | null;
    month: string | null;
    year: string | null;
    mood: number;
    tags: string;
}

interface GetJournalEntryRequest {
    userId: string;
    entryID: string;
}

interface GetJournalEntryResponse {
    entry: JournalEntry; // Change from 'journal' to 'entry'
}

export async function getJournalEntry(request: GetJournalEntryRequest): Promise<GetJournalEntryResponse> {
    try {
        const response = await post<GetJournalEntryResponse>('api/Journal/GetEntry', request);

        console.log('Received response from API:', response);

        if (!response || !response.entry || !response.entry.id) {
            throw new Error('Invalid get journal entry response');
        }

        return response;
    } catch (error: any) {
        console.error('Get journal entry error:', error.message);
        throw error;
    }
}
