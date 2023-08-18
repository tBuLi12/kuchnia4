import { browser, building } from '$app/environment';
import { error, redirect } from '@sveltejs/kit';

export async function post(path: string, data: any): Promise<boolean> {
	const response = await fetch(`/api/${path}`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Conent-Type': 'application/json'
		}
	});

	return response.ok;
}

export async function _delete(path: string, data: any): Promise<boolean> {
	const response = await fetch(`/api${path}`, {
		method: 'DELETE',
		body: JSON.stringify(data),
		headers: {
			'Conent-Type': 'application/json'
		}
	});

	return response.ok;
}

export async function use<T>(
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	path: RequestInfo | URL
): Promise<T> {
	const response = await fetch(`/api${path}`);
	if (response.ok) {
		return await response.json();
	}
	if (response.redirected) {
		throw redirect(response.status as any, response.headers.get('Location') as any);
	}
	throw error(response.status, await response.text());
}
