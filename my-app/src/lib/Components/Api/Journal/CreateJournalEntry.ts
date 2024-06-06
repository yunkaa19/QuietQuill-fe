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

interface CreateJournalEntryResponse {
    entry: JournalEntry;
}

export async function createJournalEntry(entry: JournalEntry): Promise<CreateJournalEntryResponse> {
    try {
        const response = await post<CreateJournalEntryResponse>('api/Journal/Create', { entry });

        if (!response || !response.entry) {
            throw new Error('Invalid create journal entry response');
        }

        return response;
    } catch (error) {
        console.error('Create journal entry error:', error);
        throw error;
    }
}
