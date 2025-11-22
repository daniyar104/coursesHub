import api from "./api";
import type { Category } from "./types";

export async function getAllCategories(): Promise<Category[]> {
    const { data } = await api.get("/courses/categories");
    return data.data;
}
