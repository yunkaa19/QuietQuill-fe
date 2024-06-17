import { del } from '$lib/Components/Api/Request';

interface DeleteJournalEntryResponse {
    success: boolean;
    message?: string;
}

export async function deleteJournalEntry(journalId: string): Promise<DeleteJournalEntryResponse> {
    try {
        const response = await del<DeleteJournalEntryResponse>('api/Journal/Delete', { journalId });

        if (response == null || response.message == "false" ) {
            throw new Error('Invalid delete journal entry response');
        }

        return response;
    } catch (error) {
        console.error('Delete journal entry error:', error);
        throw error;
    }
}