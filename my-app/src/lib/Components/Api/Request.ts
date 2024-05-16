const BASE_URL = 'http://localhost:5103'; //TODO: Adjust this

interface RequestOptions {
    method: string;
    headers: Headers;
    body?: string;
}

export async function request<T>(endpoint: string, method: string, data?: any, rawResponse: boolean = false): Promise<T> {
    const token = localStorage.getItem('authToken'); 
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
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
        return rawResponse ? (await response.text()) as unknown as T : await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

export function get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, 'GET');
}

export function post<T>(endpoint: string, data: any, rawResponse: boolean = false): Promise<T> {
    return request<T>(endpoint, 'POST', data, rawResponse);
}

export function put<T>(endpoint: string, data: any): Promise<T> {
    return request<T>(endpoint, 'PUT', data);
}

export function del<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, 'DELETE');
}
