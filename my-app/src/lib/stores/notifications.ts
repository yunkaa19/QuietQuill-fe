import { writable } from 'svelte/store';

interface Notification {
    id: string;
    content: string;
}

export const notifications = writable<Notification[]>([]);

export function showMessage(content: string) {
    notifications.update((msgs) => [...msgs, { id: generateUniqueId(), content }]);
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
