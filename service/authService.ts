import api from "./api";
import {LoginRequest, LoginResponse} from "./types";


export async function login(payload: LoginRequest): Promise<LoginResponse>  {
    const {data} = await api.post<LoginResponse>('/login', payload);
    return data;
}
