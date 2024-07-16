import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const StorageItem = localStorage.getItem("persist:root");
const parsedObject = JSON.parse(StorageItem);
const parseduser = JSON.parse(parsedObject?.user ?? null);
const TOKEN = parseduser?.currentUser?.accesToken || null;



export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
});

