import apiFetch from "./ApiClient";
export function postLogin(formData) {
    return apiFetch("/auth/login", {
        method: "POST",
        body: formData
    });
}

export function postRegister(formData) {
    return apiFetch("/auth/register/USER", {
        method: "POST",
        body: formData
    });
}
export function postRegisterAdmin(formData) {
    return apiFetch("/auth/register/Admin", {
        method: "POST",
        body: formData
    });
}
export function getUserCurrent() {
    return apiFetch(`/user/me`, {
        method: "GET"
    })
}
export function getCountUser() {
    return apiFetch(`/user/count`, {
        method: "GET"
    })
}