const ENDPOINT = "https://api.covidtracking.com/v1/states/daily.json";

export function getUsers() {
    return fetch(ENDPOINT)
        .then(response => {
            return response.json();
        })
        .then(json => json);
}