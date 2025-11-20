import api from "./api";
import type { UserProfile } from "./types";

export async function getUserProfile() {
    const { data } = await api.get("/users/me");
    return data;
}
