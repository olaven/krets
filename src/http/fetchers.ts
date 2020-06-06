export const post = <T> (url: string, payload: T) => 
    fetch(url, {
        method: "post", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(payload)
    }); 

export const get = async <T> (url: string): Promise<[number, T?]> => {

    const response = await fetch(url); 
    if (response.status === 200) {

        const payload = await response.json(); 
        return [response.status, payload as T]; 
    } 

    return [response.status]; 
}