export interface User {
    UserId: string;
    Username: string;
    Email: string;
    JournalEntries: { title: string; content: string; date: string }[];
    Habits: { name: string; status: string }[];
    MeditationSessions: { title: string; date: string }[];
}