
import './indexAdmin.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
function UpdateCategory(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/category/${id}`); 
                setCategory(response.data); 
            } catch (error) {
                console.error("Error fetching student:", error);
            }
        };

        fetchCategory();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const data = {
            categoryName: category
        };

        try {
            const response = await axios.put(
                `http://localhost:8080/category/update/${id}`,data,
                {
                    headers: {
                        'Content-Type': "application/json",
                    },
                }
            );

             if (response.status === 200) {
                  setShowMessage(true);
                  setTimeout(() => {
                      setShowMessage(false);
                      navigate('/admin/listCategory');
                  }, 3000);
             } else {
                
                console.error('Update failed:', response);
                alert('Cập nhật thất bại. Vui lòng thử lại.');

             }


        } catch (error) {
            console.error("Error updating student:", error);
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
                <h1>Cập nhập danh mục</h1>
            </div>
            <div className="form-container">
                <form onSubmit={handleUpdate}>
                        <div className="full-width">
                            <label htmlFor="category">Tên danh muc:</label>
                            <input type="text" 
                            id="category" 
                            name="category" 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} />
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
