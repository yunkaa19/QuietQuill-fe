//const BASE_URL = 'localhost:5103'; //TODO: Adjust this
const BASE_URL = 'http://localhost:8080';
interface RequestOptions {
    method: string;
    headers: Headers;
    body?: string;
}

async function request<T>(endpoint: string, method: string, data?: any): Promise<T> {
    const token = localStorage.getItem('authToken'); // Replace with your actual token management strategy
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Adjust as per your backend requirements
    });

    const config: RequestOptions = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    };

    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, config);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'API request failed');
        }
        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

export function get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, 'GET');
}

export function post<T>(endpoint: string, data: any): Promise<T> {
    return request<T>(endpoint, 'POST', data);
}

export function put<T>(endpoint: string, data: any): Promise<T> {
    return request<T>(endpoint, 'PUT', data);
}

export function del<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, 'DELETE');
}
