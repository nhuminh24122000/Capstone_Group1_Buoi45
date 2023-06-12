import axios from "axios"

export const ACCESS_TOKEN = 'accessToken';
export const USER_LOGIN = "user_login";

export const http = axios.create({
    baseURL: 'https://shop.cyberlearn.vn',
    timeout: 30000
})

export const saveLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const deleteKey = (key) => {
    localStorage.removeItem(key);
}