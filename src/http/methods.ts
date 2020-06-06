export const post = async <T>(url: string, payload: T): Promise<[number, T?]> => {

    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (response.status === 201) {
        const payload = await response.json();
        return [response.status, payload as T];
    }

    return [response.status]
}

export const get = async <T>(url: string): Promise<[number, T?]> => {

    const response = await fetch(url);
    if (response.status === 200) {

        const payload = await response.json();
        return [response.status, payload as T];
    }

    return [response.status];
}