const accessTokenKey = "refresh";


export const refreshService = {
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