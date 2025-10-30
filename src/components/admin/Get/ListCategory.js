import "../indexAdmin.css"
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
function ListCategory() {
    const [categorys, setCategorys] = useState([]);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`http://localhost:8080/category/getAll`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCategorys(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách học sinh:", error);
            }
        };
        fetchCategory();
    }, [])




    return (
        <>
            <div className="container-admin">
                <div className="content">
                    <h1>Danh mục</h1>
                    <div className="limited">
                        <table class="table table-light table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên danh mục</th>
                                    <th>Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorys.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.categoryName}</td>
                                        <td> <Link to={`/admin/updateCategory/${category.id}`}><button className="btn btn-warning">Cập nhập</button></Link></td>

                                    </tr>
                                ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ListCategory;