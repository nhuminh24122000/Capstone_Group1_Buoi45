import axios from "axios";
import { ACCESS_TOKEN, getLocalStorage } from "../util";

const BASE_URL = 'https://shop.cyberlearn.vn/api';

// Những api nào cần auth đăng nhập, private
export const axiosWithAuth = axios.create({
    baseURL: BASE_URL,
    timeout: 180_000, //3 phut
})

// nó sẽ chạy cái này trc khi gọi api
axiosWithAuth.interceptors.request.use((config) => {
    // them vao header truoc khi call api
    config.headers = {
        Authorization: `Bearer ${getLocalStorage(ACCESS_TOKEN)}`,
    };
    return config;
}, (err) => {
    return Promise.reject(err)
})