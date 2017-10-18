import 'whatwg-fetch';

export default {
    get: (url) =>
        fetch(url, {credentials: 'same-origin'})
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.text();
                } else if (response.status === 401 || response.status === 403) {
                    window.location.pathname = '/home';
                    return null;
                }
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }),

    post: (url, jsonBody) =>
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(jsonBody),
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.text();
                }
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }),
};
