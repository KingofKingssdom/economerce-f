import "../indexAdmin.css"
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
function ListCategory() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [categorys, setCategorys] = useState([]);

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/category/search/all`);
            setCategorys(response.data.data);
            // setFilteredProducts(response.data.data);
        } catch (error) {
            console.error("Lỗi lấy toàn bộ sản phẩm :", error);
        }
    };

    // Gọi API lấy danh sách sản phẩm khi component mount
    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <>
            <div className="container-admin">
                <div className="content">
                    <h2>Danh mục</h2>
                    <div className="box-containt-table list-category">
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
                                        <td>
                                            <Link to={`/admin/updateCategory/${category.id}`}>
                                                <button className="btn btn-warning">
                                                    <GoPencil />
                                                </button>
                                            </Link></td>

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