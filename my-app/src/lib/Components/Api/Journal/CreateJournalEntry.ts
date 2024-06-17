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
        const response = await post<JournalEntry>('api/Journal/Create', { entry });

        console.log('Create journal entry response:', response);

        if (!response || !response.id || !response.userId) {
            throw new Error('Invalid create journal entry response');
        }

        // Wrapping the response in the expected format
        return { entry: response };
    } catch (error) {
        console.error('Create journal entry error:', error);
        throw error;
    }
}
