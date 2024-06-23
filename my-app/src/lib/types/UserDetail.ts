export interface JournalEntry {
    id: string;
    userId: string;
    content: string;
    entryDate: string;
    mood: string;
    tags: string;
}

export interface UserDetail {
    UserId: string;
    Username: string | null;
    Email: string;
    JournalEntries: JournalEntry[];
    Habits: any[];
    MeditationSessions: any[];
    Reminders: any[];
    UserQuizRecords: any[];
}
