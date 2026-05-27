import apiFetch from "./ApiClient";
export function postCategory(formData) {
    return apiFetch("/category", {
        method: "POST",
        body: formData
    })
}
export function putCategory(id, formData) {
    return apiFetch(`/category/${id}`, {
        method: "PUT",
        body: formData
    })
}
export function getCategory() {
    return apiFetch("/category", {
        method: "GET"
    })
}
export function getCategoryByCategoryCode(categoryCode) {
    return apiFetch(`/category/categoryCode/${categoryCode}`, {
        method: "GET"
    })
}

