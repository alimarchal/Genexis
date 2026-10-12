export interface JsonResponse<T> {
    status: number;
    data: T;
}

export class JsonRequestError<T = unknown> extends Error {
    response: JsonResponse<T>;

    constructor(response: JsonResponse<T>) {
        super(`Request failed with status ${response.status}`);
        this.response = response;
    }
}

const xsrfToken = (): string => {
    const row = document.cookie.split('; ').find((cookie) => cookie.startsWith('XSRF-TOKEN='));

    return row ? decodeURIComponent(row.split('=')[1]) : '';
};

export async function postJson<T = unknown>(url: string, body: unknown): Promise<JsonResponse<T>> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-XSRF-TOKEN': xsrfToken(),
        },
        body: JSON.stringify(body),
    });

    const data = (await response.json().catch(() => ({}))) as T;
    const result = { status: response.status, data };

    if (!response.ok) {
        throw new JsonRequestError<T>(result);
    }

    return result;
}
