import "../indexAdmin.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
function ListProduct() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [products, setProducts] = useState([]);
    // const [filteredProducts, setFilteredProducts] = useState([]);
    // const [idProductFilter, setIdProductFilter] = useState("");

    // Hàm lấy danh sách sản phẩm
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/product/search/all`);
            setProducts(response.data.data.content);
            // setFilteredProducts(response.data.data);
        } catch (error) {
            console.error("Lỗi lấy toàn bộ sản phẩm :", error);
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
                // setFilteredProducts((prev) => prev.filter((product) => product.id !== id));
            }
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };


    // const handleFilter = async () => {
    //     if (idProductFilter.trim() === "") {
    //         setFilteredProducts(products);
    //         return;
    //     }

    //     try {
    //         const token = localStorage.getItem("token");
    //         const response = await axios.get(`http://localhost:8080/product/${idProductFilter}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         if (response.data) {
    //             setFilteredProducts([response.data]);
    //         } else {
    //             setFilteredProducts([]);
    //         }
    //     } catch (error) {
    //         console.error("Error filtering:", error);
    //         setFilteredProducts([]);
    //         alert("Không tìm thấy sản phẩm với mã này.");
    //     }
    // };

    return (
        <>
            <div className="container-admin">
                <div className="content">
                    <h1>Danh sách các sản phẩm</h1>
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập mã sản phẩm..."
                        // value={idProductFilter}
                        // onChange={(e) => setIdProductFilter(e.target.value)}
                        />
                        {/* <button onClick={handleFilter}>Lọc</button> */}
                    </div>
                    <div className="limited">
                        <table className="table table-light table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Thông tin khuyến mãi</th>
                                    <th>Sản phẩm nổi bật</th>
                                    <th>Sản phẩm khuyến mãi</th>
                                    <th>Số lượng</th>

                                    <th className="repair-table">Xem chi tiết</th>
                                    <th className="repair-table">Chỉnh sửa</th>
                                    <th className="repair-table">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id || index}>
                                        <td>{product.productCode}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.description}</td>
                                        <td>{product.featured ? "Nổi bật" : "Không nổi bật"}</td>
                                        <td>{product.promotional ? "Khuyến mãi" : "Không khuyến mãi"}</td>
                                        <td>{product.quantityProduct}</td>
                                        <td>
                                            <Link to={`/admin/productDetail/${product.id}`}>
                                                <button className="btn btn-success">
                                                    <MdOutlineRemoveRedEye />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/admin/updateProduct/${product.id}`}>
                                                <button className="btn btn-warning">
                                                    <GoPencil />

                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <div className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                                                <MdDeleteOutline />
                                            </div>
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
