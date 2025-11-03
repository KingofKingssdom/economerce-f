
import '../indexAdmin.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function UpdateCategory() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState("");
    const [message, setMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset thông báo trước đó
        setMessage("");
        setErrorMessage("");

        // Kiểm tra các trường bắt buộc
        if (!categoryName) {
            setErrorMessage("Vui lòng điền đầy đủ các thông tin.");
            return;
        }

        const formData = new FormData();
        formData.append("categoryName", categoryName);


        try {
            const response = await axios.put(`${API_BASE_URL}/category/update?categoryId=${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200 || response.status === 201) {
                setMessage(true)
                setTimeout(() => { setMessage(false) }, 5000)
                // Reset form
                setCategoryName("");
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
                        <h1>Cập nhập danh mục</h1>
                    </div>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="full-width">
                                <label htmlFor="categoryName">Tên danh muc:</label>
                                <input type="text"
                                    id="categoryName"
                                    name="categoryName"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)} />
                            </div>
                            <button type='submit' className='button-add' >Cập nhật</button>
                        </form>

                    </div>
                </div>
            </div>

        </>
    )
}
export default UpdateCategory;
