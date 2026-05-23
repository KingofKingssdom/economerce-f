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
export function postRegisterAdmin(FullName, PhoneNumber, Email, Password) {
    return apiFetch("/user/register/Admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            FullName,
            PhoneNumber,
            Email,
            Password
        })
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