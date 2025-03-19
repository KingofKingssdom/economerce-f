import './indexAdmin.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
function UpdateBrand(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [brandName, setBrandName] = useState("");
    const [categoryIds, setCategoryIds] = useState("");
    const [imageBrand, setImageBrand] = useState(null);
    const  [categories, setCategories] = useState([]);
    useEffect(()=>{
        const fetchCategory = async () => {
            const response = await axios.get("http://localhost:8080/category/getAll");
            setCategories(response.data);
        }
        fetchCategory();
    },[])
     const [showMessage, setShowMessage] = useState(false);
    
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('brandName', brandName);
        formData.append('categoryIds', categoryIds);
        if (imageBrand) { 
              formData.append('imageBrand', imageBrand);
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/brand/update/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

             if (response.status === 200) {
                  setShowMessage(true);
                  setTimeout(() => {
                      setShowMessage(false);
                      navigate('/admin/listBrand');
                  }, 3000);
             } else {
                
                console.error('Update failed:', response);
                alert('Cập nhật thất bại. Vui lòng thử lại.');

             }


        } catch (error) {
            console.error("Error updating teacher:", error);
            alert('Cập nhật thất bại. Vui lòng kiểm tra lại dữ liệu.');
        }
    };
    return(
        <>
        <div className='container-admin'>
            <div className="content">
        {showMessage && <div className="notification-success">
                    <p>Cập nhập thành công!</p>
                </div> }
            <div className="header-add">
                <h1>Cập nhập nhãn hàng</h1>
            </div>
            <div className="form-container">
                <form onSubmit={handleUpdate}>
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
                    <button type='submit' className='button-add' >Cập nhật</button>
                </form>
            </div>
        </div>
        </div>
        
        </>
    )
}
export default UpdateBrand;