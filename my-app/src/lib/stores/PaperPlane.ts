import { writable } from 'svelte/store';
import { showMessage } from '$lib/stores/notifications';
import { getToken } from '$lib/Components/Api/Auth';  // Import the function to get the user's token

interface Message {
    Content: string;
    UserId: string;
}

export const socket = writable<WebSocket | null>(null);
export const messages = writable<{ id: string, content: string }[]>([]);

export function connectWebSocket(url: string, reconnectDelay = 5000) {
    const connect = () => {
        const user = getToken();
        const token = user ? user.Token : '';

        // Modify the URL to include the token as a query parameter
        const wsUrl = `${url}?token=${token}`;

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            socket.set(ws);
        };

        ws.onmessage = (event) => {
            console.log('WebSocket message received:', event.data);
            const message: Message = JSON.parse(event.data);
            showMessage(message.Content);
            messages.update(msgs => [...msgs, { id: generateUniqueId(), content: message.Content }]);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            socket.set(null);
            // Try to reconnect after a specified delay
            setTimeout(connect, reconnectDelay);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws.close(); // Ensure the connection is closed properly
        };
    };

    connect(); // Initial connection
}

export function sendMessage(content: string) {
    socket.subscribe((ws) => {
        const user = getToken();
        if (ws && ws.readyState === WebSocket.OPEN && user) {
            const message = JSON.stringify({
                Content: content,
                UserId: user.UserId
            });
            ws.send(message);
        }
    });
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
