import "./indexAdmin.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ListProduct() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [idProductFilter, setIdProductFilter] = useState("");

    // Hàm lấy danh sách sản phẩm
    const fetchProduct = async () => {
        try {
            const response = await axios.get("http://localhost:8080/product/getAll");
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Gọi API lấy danh sách sản phẩm khi component mount
    useEffect(() => {
        fetchProduct();
    }, []);

    // Hàm xóa sản phẩm
    const handleDelete = async (id) => {
    
        try {
            const response = await axios.delete(`http://localhost:8080/product/${id}`);
            if (response.status === 204) {
                console.log("Xóa thành công");

                // Cập nhật lại danh sách sản phẩm sau khi xóa
                setProducts((prev) => prev.filter((product) => product.id !== id));
                setFilteredProducts((prev) => prev.filter((product) => product.id !== id));
            }
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };

    
    const handleFilter = async () => {
        if (idProductFilter.trim() === "") {
            setFilteredProducts(products);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:8080/product/${idProductFilter}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                setFilteredProducts([response.data]);
            } else {
                setFilteredProducts([]);
            }
        } catch (error) {
            console.error("Error filtering:", error);
            setFilteredProducts([]);
            alert("Không tìm thấy sản phẩm với mã này.");
        }
    };

    return (
        <>
            <div className="container-admin">
                <div className="content">
                    <h1>Danh sách các sản phẩm</h1>
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập mã sản phẩm..."
                            value={idProductFilter}
                            onChange={(e) => setIdProductFilter(e.target.value)}
                        />
                        <button onClick={handleFilter}>Lọc</button>
                    </div>
                    <div className="limited">
                        <table className="table table-light table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá hiện tại</th>
                                    <th>Số lượng</th>
                                    <th className="repair-table">Xem chi tiết</th>
                                    <th className="repair-table">Chỉnh sửa</th>
                                    <th className="repair-table">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product, index) => (
                                    <tr key={product.id || index}>
                                        <td>{product.id}</td>
                                        <td>{product.productName}</td>
                                        <td>
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(product.priceCurrent)}
                                        </td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <Link to={`/admin/productDetail/${product.id}`}>
                                                <button className="btn btn-success">Chi tiết</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/admin/updateProduct/${product.id}`}>
                                                <button className="btn btn-warning">Cập nhật</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListProduct;
