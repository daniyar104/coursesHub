export const setToken = (
    token: string,
    days = 7,
    options: {
        sameSite?: "Lax" | "Strict" | "None";
        secure?: boolean;
    } = {}
) => {
    const { sameSite = "Lax", secure = window.location.protocol === "https:" } =
        options;

    const expires = new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();

    let cookie = `token=${token}; expires=${expires}; path=/; SameSite=${sameSite}`;
    if (secure) cookie += "; Secure";

    document.cookie = cookie;
};

export const getToken = () => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "token") return value;
    }
    return null;
};

export const deleteToken = () => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export function isTokenValid(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp >= now;
    } catch {
        return false;
    }
}
