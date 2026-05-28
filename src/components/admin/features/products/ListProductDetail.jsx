import "../../../../styles/index.css"
import { getProductById } from "../../../../services/ApiProduct";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { FaPen } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { CgSortAz } from "react-icons/cg";
import { MdFileDownload, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { getProductVariantByProductId } from "../../../../services/ApiProduct";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import UpdateProductVariant from "./UpdateProductVariant";
function ListProductDetail() {
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const { id } = useParams(); // Lấy id từ URL
    const [productVariants, setProductVariants] = useState(null);
    const [showBoxUpdate, setShowBoxUpdate] = useState(false);
    const [idData, setIdData] = useState(0);
    const fetchProductVariant = async () => {
        try {
            await getProductVariantByProductId(id).then((response) => {
                setProductVariants(response.data)
            })
        } catch (error) {
            console.log("Lỗi lấy sản phẩm theo id " + error)
        }

    }
    useEffect(() => {
        fetchProductVariant()
    }, [])

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
                            <h2>Quản lý phiên bảng sản phẩm</h2>
                            <p>Danh sách các phiên bản sản phẩm trong hệ thống</p>
                        </div>
                        <Link to={`/admin/addProductVariant/${id}`} className="btn-add-list">
                            <IoAddOutline /> THÊM PHIÊN BẢN
                        </Link>
                    </div>
                    <div className="table-content-list">
                        <table className="table-content-list-all">
                            <thead>
                                <tr>
                                    <th>Mã phiên bản</th>
                                    <th>Dung lượng lưu trữ</th>
                                    <th>Giá nhập kho</th>
                                    <th>Giá niêm yết</th>
                                    <th>Màu sắc</th>
                                    <th>Ảnh phiên bản</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productVariants ? (
                                    productVariants.map((productVariant) => (

                                        <tr key={productVariant.id}>
                                            <td style={{ color: "red", fontWeight: "bolder", height: '20px' }}>{productVariant.id}</td>
                                            <td>{productVariant.storage}</td>
                                            <td>
                                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                    productVariant.originPrice)}
                                            </td>
                                            <td>
                                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                    productVariant.currentPrice)}
                                            </td>
                                            <td>{productVariant.colorName}</td>
                                            <td><img style={{
                                                maxWidth: '50px',
                                                maxheight: '50px'
                                            }} src={`${IMAGE_BASE_URL}${productVariant.urlProductColor}`} alt="Ảnh nhãn hiệu" /></td>
                                            <td>
                                                <button className="btn-update" style={{
                                                    marginLeft: '5px',
                                                    border: 'none'
                                                }}
                                                    onClick={() => handleUpdate(productVariant.id)}
                                                >
                                                    <GoPencil />
                                                </button>

                                                <Link to={`/admin/updateProduct/${productVariant.id}`}>
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
                                ) : (<tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>
                                        Đang tải dữ liệu...
                                    </td>
                                </tr>)
                                }

                            </tbody>
                        </table>

                    </div>

                </div>
                <div className={`container-update-in-list ${showBoxUpdate ? 'active-box-update' : ''}`} >
                    <div className={`container-box-update-content ${showBoxUpdate ? 'active-box-update-down' : ''}`}>
                        <UpdateProductVariant
                            id={idData}
                            onSuccess={() => setShowBoxUpdate(false)}
                        />
                    </div>

                </div>
            </div >
        </>
    )
}
export default ListProductDetail;