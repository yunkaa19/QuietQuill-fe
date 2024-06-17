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

interface UpdateJournalEntryResponse {
    entry: JournalEntry;
}

export async function updateJournalEntry(entry: JournalEntry): Promise<UpdateJournalEntryResponse> {
    try {
        const response = await post<UpdateJournalEntryResponse>('api/Journal/Update', { entry });

        // Log the entire response for debugging purposes
        console.log('API response:', response);

        // Check if the response contains the expected structure
        if (!response) {
            throw new Error('Invalid update journal entry response');
        }

        return response;
    } catch (error: any) {
        console.error('Update journal entry error:', error.message || error);
        throw error;
    }
}
