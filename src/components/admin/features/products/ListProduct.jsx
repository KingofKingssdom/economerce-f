import "../../../../styles/index.css";
import { getProductAll, getProductCode } from "../../../../services/ApiProduct";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { IoAddOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { CgSortAz } from "react-icons/cg";
import { MdFileDownload, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import PageNavigation from "../../common/PageNavigation";
import { LiaEyeSolid } from "react-icons/lia";
import UpdateProduct from "./UpdateProduct";
function ListProduct() {
    const [products, setProducts] = useState([]);
    const [showBoxUpdate, setShowBoxUpdate] = useState(false);
    const [idData, setIdData] = useState(0);
    const fetchProducAll = async () => {
        try {
            await getProductAll().then((response) => {
                setProducts(response.data)
            });

        } catch (error) {
            console.log("Lỗi lấy toàn bộ sản phẩm " + error)
        }
    }
    useEffect(() => {
        fetchProducAll()
    }, [])
    const [displayData, setDisplayData] = useState([]);
    const [filterData, setFilterData] = useState("");
    const handleFilterData = (e) => {
        setFilterData(e.target.value);
    }
    const handleSearch = async () => {
        try {
            await getProductCode(filterData).then((response) => {
                setProducts([response.data]);
            })
        }
        catch (error) {
            console.log("Lỗi lọc sản phẩm " + error)
        }
    }
    const handleUpdate = (id) => {
        setShowBoxUpdate(true)
        setIdData(id)
    }
    return (
        <>
            <div className="container-admin">
                <div className="content-list">
                    <div className="container-content-list">
                        <div>
                            <h2>Quản lý sản phẩm</h2>
                            <p>Danh sách cách sản phẩm trong hệ thống</p>
                        </div>
                        <Link to="/admin/addProduct" className="btn-add-list">
                            <IoAddOutline /> THÊM SẢN PHẨM
                        </Link>
                    </div>
                    <div className="table-content-list">
                        <div className="content-top-list">
                            <div className="search-item-list">
                                Tìm kiếm theo mã sản phẩm
                                <div className="container-search-item-list">
                                    <input
                                        value={filterData}
                                        onChange={handleFilterData}
                                        placeholder="Nhập mã tìm kiếm ......."
                                    />
                                    <button
                                        onClick={handleSearch}
                                    >Tìm</button>
                                </div>

                            </div>
                            <div className="filter-item-list">
                                <div className="filter-sort">
                                    <CgSortAz />
                                </div>
                                <div className="filter-download">
                                    <MdFileDownload />
                                </div>
                            </div>
                        </div>

                        <table className="table-content-list-all">
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Danh mục</th>
                                    <th>Giá niêm yết</th>
                                    <th>Số lượng</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayData.map((product) => (

                                    <tr key={product.id}>
                                        <td style={{ color: "red", fontWeight: "bolder" }}>{product.productCode}</td>
                                        <td>{product.productName}</td>
                                        <td></td>
                                        <td>
                                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                product.productVariants[0]?.currentPrice)}
                                        </td>
                                        <td>{product.productVariants[0]?.stock}</td>
                                        <td style={{
                                            color:
                                                product.productVariants[0]?.stock >= 10 ? 'green' :
                                                    product.productVariants[0]?.stock > 0 ? 'blue' : 'red',
                                        }}>
                                            {product.productVariants[0]?.stock >= 10 ? "Còn hàng" :
                                                product.productVariants[0]?.stock > 0 ? "Sắp hết hàng" : "Hết hàng"}
                                        </td>
                                        <td>
                                            <Link to={`/admin/product-variants/id/${product.id}`}>
                                                <button className="btn-view" style={{
                                                    border: 'none'
                                                }}>
                                                    <LiaEyeSolid />
                                                </button>
                                            </Link>

                                            <button className="btn-update" style={{
                                                border: "none",
                                                marginLeft: "5px"
                                            }}
                                                onClick={() => handleUpdate(product.id)}>
                                                <GoPencil />
                                            </button>
                                            <Link to={`/admin/updateProduct/${product.id}`}>
                                                <button className="btn-delete" style={{
                                                    marginLeft: '5px',
                                                    border: 'none'
                                                }}>
                                                    <FaRegTrashAlt />
                                                </button>
                                            </Link>
                                        </td>

                                    </tr>
                                ))
                                }

                            </tbody>
                        </table>
                        <div>
                            <div className="container-button-change-page">
                                <PageNavigation
                                    resData={products}
                                    onPageChange={(items) => setDisplayData(items)}
                                />

                            </div>
                        </div>
                    </div>

                    {/* <div className="tb-list-product">
                        <table className="">
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
                    </div> */}

                </div>
                <div className={`container-update-in-list ${showBoxUpdate ? 'active-box-update' : ''}`} >
                    <div className={`container-box-update-content ${showBoxUpdate ? 'active-box-update-down' : ''}`}>
                        <UpdateProduct
                            id={idData}
                            onSuccess={() => setShowBoxUpdate(false)}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}
export default ListProduct;