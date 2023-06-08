import axios from "axios"

export const http = axios.create({
    baseURL: 'https://shop.cyberlearn.vn',
    timeout: 30000
})