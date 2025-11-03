import '../indexAdmin.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function UpdateBrand() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const [brandName, setBrandName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [urlImageBrand, setUrlImageBrand] = useState("");
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
        if (!brandName && !urlImageBrand && !categoryId) {
            setErrorMessage("Vui lòng điền đầy đủ các thông tin.");
            return;
        }

        const formData = new FormData();
        formData.append("brandName", brandName);
        formData.append("urlImageBrand", urlImageBrand);
        formData.append("categoryId", categoryId);


        try {
            const response = await axios.put(`${API_BASE_URL}/brand/update?brandId=${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200 || response.status === 201) {
                setMessage(true)
                setTimeout(() => { setMessage(false) }, 5000)
                // Reset form
                setBrandName("");
                setCategoryId("");
                setUrlImageBrand("");
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
        <>
            <div className='container-admin'>
                <div className="content">
                    {message && <div className="notification-success">
                        <p>Cập nhập thành công!</p>
                    </div>}
                    <div className="header-add">
                        <h1>Cập nhập nhãn hàng</h1>
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
                            <button type='submit' className='button-add' >Cập nhật</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
export default UpdateBrand;