import "../indexAdmin.css"
import axios from 'axios';
import { useState } from 'react';

function AddCategory() {
    const [categoryName, setCategoryName] = useState("");
    const [message, setMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");

        // Kiểm tra trường bắt buộc
        if (!categoryName) {
            setErrorMessage("Vui lòng điền đầy đủ các trường bắt buộc.");
            return;
        }


        const data = {
            categoryName: categoryName
        };
        try {
            // const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/category/add', data, {
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200 || response.status === 201) {
                setMessage(true);
                setTimeout(() => {
                    setMessage(false)
                }, 5000)

                // Reset form
                setCategoryName("");

            } else {
                setErrorMessage("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container-admin'>
            {/* <Sidebar/> */}
            <div className="content">
                {message && <p className="notification-success">Thêm sản phẩm thành công</p>}
                {errorMessage && <p className="notification-error">{errorMessage}</p>}
                <div className="header-add">
                    <h1>Thêm Danh mục</h1>
                </div>
                <div className="form-container">

                    <form onSubmit={handleSubmit}>

                        <div className="full-width">
                            <label htmlFor="categoryName">Thêm tên danh mục:</label>
                            <input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>

                        <button className='button-add' type="submit">Thêm</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default AddCategory;

