import apiFetch from "./ApiClient";

export function getProductAll() {
    return apiFetch("/product", {
        method: "GET"
    });
}

export function getProductFeatured(categoryId) {
    return apiFetch(`/product/feature?featured=true&categoryId=${categoryId}`, {
        method: "GET"

    })
}
export function getProductPromotional() {
    return apiFetch(`/product/promotional?promotional=true`, {
        method: "GET"

    })
}
export function getProductPhone() {
    return apiFetch("/product/search/category?categoryId=1", {
        method: "GET"
    })
}
export function getProductByName(productName) {
    return apiFetch(`/product/productName/${productName}`, {
        method: "GET"
    })
}

export function postProduct(formData) {
    return apiFetch("/product", {
        method: "POST",
        body: formData
    })
}
export function putProduct(id, formData) {
    return apiFetch(`/product/${id}`, {
        method: "PUT",
        body: formData
    })
}
export function postProductColor(value) {
    return apiFetch("/productColor/create", {
        method: "POST",
        body: value
    })

}
export function postProductVariant(productId, formData) {
    return apiFetch(`/product-variants/productId/${productId}`, {
        method: "POST",
        body: formData
    })
}
export function putProductVariant(id, productId, formData) {
    return apiFetch(`/product-variantId/${id}/productId/${productId}`, {
        method: "PUT",
        body: formData
    })
}
export function postProductSpecification(value) {
    return apiFetch("/product-specifications/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            specificationName: value,
        })
    })
}
export function gettProductSpecification() {
    return apiFetch("/product-specifications/", {
        method: "GET"
    })
}
export function putProductSpecification(id, value) {
    return apiFetch(`/product-specifications/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            specificationName: value,
        })
    })
}
export function getProductSpecificationByProductId(value) {
    return apiFetch(`/productSpecification/search?productId=${value}`, {
        method: "GET"
    })
}
export function postProductSpecificationDetail(value) {
    return apiFetch("/specificationDetail/create", {
        method: "POST",
        body: value
    })
}
export function getProductById(id) {
    return apiFetch(`/product/productId/${id}`, {
        method: "GET"
    })
}
export function getProductByCategoryId(id) {
    return apiFetch(`/product/categoryId/${id}`, {
        method: "GET"
    })
}
export function getProductByCategoryIdAndBrandId(categoryId, brandId) {
    return apiFetch(`/product/category-brand?categoryId=${categoryId}&brandId=${brandId}`, {
        method: "GET"
    })
}
export function getProductVariantByProductId(productId) {
    return apiFetch(`/product-variants/productId/${productId}`, {
        method: "GET"
    })
}
export function getTotalProduct() {
    return apiFetch(`/product-variants/total-products`, {
        method: "GET"
    })
}