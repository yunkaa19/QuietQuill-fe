import { user } from "$lib/stores/session";

const BASE_URL = 'quietquillapi:8080';
//const BASE_URL = 'http://localhost:5103'; // TODO: Adjust this

interface RequestOptions {
    method: string;
    headers: Headers;
    body?: string;
}

let currentUser: any;
user.subscribe(value => {
    currentUser = value;
});

export async function request<T>(endpoint: string, method: string, data?: any, rawResponse: boolean = false): Promise<T> {
    
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': currentUser ? `bearer ${currentUser?.Token}` : '', 
    });


    const config: RequestOptions = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    };


    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, config);

        const responseData = await (rawResponse ? response.text() : response.json());

        if (!response.ok) {
            console.error('API request failed with status:', response.status); // Error log
            throw new Error(responseData.message || 'API request failed');
        }

        return responseData as T;
    } catch (error) {
        console.error('API request error:', error); // Error log
        throw error;
    }
}

export function get<T>(endpoint: string, data: any): Promise<T> {
    return request<T>(endpoint, 'GET', data);
}

export function post<T>(endpoint: string, data: any, rawResponse: boolean = false): Promise<T> {
    return request<T>(endpoint, 'POST', data, rawResponse);
}

export function put<T>(endpoint: string, data: any): Promise<T> {
    return request<T>(endpoint, 'PUT', data);
}

export function del<T>(endpoint: string, data: any): Promise<T> {
    return request<T>(endpoint, 'DELETE', data);
}
