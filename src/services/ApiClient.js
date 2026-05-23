
async function apiFetch(endpoint, options = {}) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    options.credentials = 'include';

    let response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (response.status === 401 && !options._retry) {
        options._retry = true; // Đánh dấu để tránh lặp vô tận


        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
            method: 'POST',
            credentials: 'include'
        });

        if (refreshRes.ok) {
            // Nếu refresh thành công, thực hiện lại request ban đầu
            return apiFetch(endpoint, options);
        } else {
            // Nếu refresh cũng thất bại (hết hạn cả refresh token)
            // Có thể xóa thông tin user cục bộ và chuyển hướng login tại đây
            console.warn("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
            // window.location.href = '/login';
        }
    }

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "API Error");
    }


    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    } else {

        const textData = await response.text();
        return textData;
    }
}
export default apiFetch;