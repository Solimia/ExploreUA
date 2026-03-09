const accessTokenKey = "token";


export const tokenService = {
    save(token) {
        localStorage.setItem(accessTokenKey, token);
    },
    get() {
        return localStorage.getItem(accessTokenKey) || null;
    },
    clear() {
        localStorage.removeItem(accessTokenKey);
    }
}