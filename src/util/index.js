export const saveLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const deleteKey = (key) => {
    localStorage.removeItem(key);
}