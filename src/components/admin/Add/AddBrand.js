import "../indexAdmin.css"

import axios from 'axios';
import { useEffect, useState } from 'react';

function AddBrand() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");


    const [brandName, setBrandName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [urlImageBrand, setUrlImageBrand] = useState("");

    const [categories, setCategories] = useState([]);




    useEffect(() => {
        const fetchCategory = async () => {
            const response = await axios.get(`${API_BASE_URL}/category/search/all`);
            setCategories(response.data.data);
        }
        fetchCategory();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset thông báo trước đó
        setMessage("");
        setErrorMessage("");

        // Kiểm tra các trường bắt buộc
        if (!brandName && !categoryId && !urlImageBrand) {
            setErrorMessage("Vui lòng điền đầy đủ các thông tin.");
            return;
        }

        const formData = new FormData();
        formData.append("brandName", brandName);
        formData.append("urlImageBrand", urlImageBrand);
        formData.append("categoryId", categoryId);

        try {
            const response = await axios.post(`${API_BASE_URL}/brand/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200 || response.status === 201) {
                setMessage(true)
                setTimeout(() => { setMessage(false) }, 5000)
                // Reset form
                setBrandName("");
                setUrlImageBrand("");
                setCategoryId("");

            } else {
                setErrorMessage("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage("Có lỗi");
            } else {
                alert("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
            }
        }
    };


    return (
        <div className='container-admin'>
            <div className="content">
                {message && <p className="notification-success">Thêm thành công</p>}
                {errorMessage && <p className="notification-error">{errorMessage}</p>}
                <div className="header-add">
                    <h1>Thêm nhãn hàng</h1>
                </div>
                <div className="form-container">

                    <form onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="brandName">Tên nhãn hàng:</label>
                            <input
                                type="text"
                                id="brandName"
                                name="brandName"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="">
                            <label htmlFor="categoryId">Danh mục sản phẩm:</label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                value={categoryId}
                                onChange={(e) => setCategoryId(Number(e.target.value))}
                            >
                                <option value="">Chọn</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.categoryName}</option>
                                ))}

                            </select>
                        </div>
                        <div>
                            <label htmlFor="urlImageBrand">Chọn ảnh nhãn hàng:</label>
                            <input
                                type="file"
                                id="urlImageBrand"
                                name="urlImageBrand"
                                onChange={(e) => setUrlImageBrand(e.target.files[0])}
                            />
                        </div>

                        <button className='button-add' type="submit">Thêm</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default AddBrand;
