import { error, redirect } from '@sveltejs/kit';
import { CapacitorHttp } from '@capacitor/core';

const prefix = 'https://kuchnia4.vercel.app';

export async function post(path: string, data: any): Promise<boolean> {
	if (import.meta.env.ADAPTER === 'static') {
		const response = await CapacitorHttp.post({
			url: `${prefix}/api${path}`,
			data,
			headers: { Accept: 'application/json' }
		});
		return response.status === 200;
	} else {
		const response = await fetch(`/api${path}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Conent-Type': 'application/json',
				Accept: 'application/json'
			}
		});
		return response.ok;
	}
}

export async function _delete(path: string, data: any): Promise<boolean> {
	if (import.meta.env.ADAPTER === 'static') {
		const response = await CapacitorHttp.delete({
			url: `${prefix}/api${path}`,
			data,
			headers: { Accept: 'application/json' }
		});

		return response.status === 200;
	} else {
		const response = await fetch(`/api${path}`, {
			method: 'DELETE',
			body: JSON.stringify(data),
			headers: {
				'Conent-Type': 'application/json',
				Accept: 'application/json'
			}
		});
		return response.ok;
	}
}

export async function use<T>(
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	path: RequestInfo | URL
): Promise<T> {
	if (import.meta.env.ADAPTER === 'static') {
		const response = await CapacitorHttp.get({
			url: `${prefix}/api${path}`,
			headers: { Accept: 'application/json' }
		});
		if (response.status === 200) {
			return response.data;
		}
		if (response.status === 401 && response.data.message === 'not logged in') {
			throw redirect(303, '/login');
		}
		throw error(response.status, response.data);
	} else {
		const response = await fetch(`/api${path}`, {
			headers: { Accept: 'application/json' }
		});
		let data: any;
		try {
			data = await response.json();
		} catch (e) {
			throw error(400, 'invalid response format');
		}
		if (response.ok) {
			return data;
		}
		if (response.status === 401 && data.message === 'not logged in') {
			throw redirect(303, '/login');
		}
		throw error(response.status, data);
	}
}
