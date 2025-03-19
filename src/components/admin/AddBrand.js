import "./indexAdmin.css"

import axios from 'axios';
import { useEffect, useState } from 'react';

function AddBrand() {
    const [brandName, setBrandName] = useState("");
    const [categoryIds, setCategoryIds] = useState("");
    const [imageBrand, setImageBrand] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
   const  [categories, setCategories] = useState([]);

   useEffect(()=>{
    const fetchCategory = async () => {
        const response = await axios.get("http://localhost:8080/category/getAll");
        setCategories(response.data);
    }
    fetchCategory();
},[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset thông báo trước đó
        setMessage("");
        setErrorMessage("");

        // Kiểm tra các trường bắt buộc
        if ( !brandName ) {
            setErrorMessage("Vui lòng điền đầy đủ các trường bắt buộc.");
            return;
        }

       const formData = new FormData();
        formData.append("brandName", brandName);
        formData.append("categoryIds", categoryIds);
        if (imageBrand) {
            formData.append("imageBrand", imageBrand);
        }
        

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/brand/add', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200 || response.status === 201) {
                 setMessage("Thêm nhãn hàng thành công!");
                // Reset form
                setBrandName("");
                setCategoryIds("");
                setImageBrand(null);
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
            {message && <p className="notification-success">{message}</p>}
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
                        <label htmlFor="categoryIds">Danh mục sản phẩm:</label>
                        <select 
                            id="categoryIds" 
                            name="categoryIds" 
                            value={categoryIds} 
                            onChange={(e) => setCategoryIds(Number(e.target.value))}
                        >
                            <option value="">Chọn</option>
                            {categories.map((category)=>(
                                <option key={category.id} value={category.id}>{category.categoryName}</option>
                            ))}
                            
                        </select>
                    </div>
                    <div>
                        <label htmlFor="imageBrand">Chọn ảnh nhãn hàng:</label>
                        <input 
                            type="file" 
                            id="imageBrand" 
                            name="imageBrand" 
                            accept="image/*"
                            onChange={(e) => setImageBrand(e.target.files[0])}
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
