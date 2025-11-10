export const setToken = (token: string, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // срок жизни cookie
    document.cookie = `token=${token};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getToken = () => {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
};

export const deleteToken = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
};
