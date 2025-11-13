
import api from "./api";


export async function getAll(): Promise<any> {
    const { data } = await api.get('/courses');
    return data;
}
