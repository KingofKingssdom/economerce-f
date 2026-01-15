import "./indexAdmin.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import { FaPen } from "react-icons/fa";
function ProductDetail() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
    const { id } = useParams(); // Lấy id từ URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/product/search?productId=${id}`);
                setProduct(response.data.data);
            } catch (error) {
                console.error('Error fetching product detail:', error);
            }
        };

        // Chỉ gọi API khi id thay đổi
        if (id) {
            fetchProduct();
        }
    }, [id]);

    console.log(product);
    return (
        <>
            <div className="container-admin">
                <div className="content">
                    <div className="header">
                        <h2>Chi tiết sản phẩm</h2>
                    </div>
                    <div className="detail-container">
                        <div className="box-detail-container ">
                            <h6 >Màu sắc sản phẩm</h6>
                            <div className="content-box-detail">
                                <table class="table table-light table-striped table-bordered table-hover table-product">
                                    <thead>
                                        <tr>
                                            <th >Màu sắc</th>
                                            <th >Ảnh màu sắc</th>
                                            <th>Chỉnh sửa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product?.productColors?.map((productColor, index) => (
                                            <tr key={productColor.id || index}>
                                                <td>{productColor.titleVariant}</td>
                                                <td>
                                                    <div className="frame-image">
                                                        <img src={`${IMAGE_BASE_URL}${productColor.urlPhoto}`} alt="Ảnh nhãn hiệu"
                                                            style={{ "object-fit": "containt" }}
                                                        />
                                                    </div>
                                                </td>
                                                <td><button className="btn btn-warning"><FaPen /></button></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="box-detail-container">
                            <h6>Phiên bản sản phẩm</h6>
                            <div className="content-box-detail">
                                <table class="table table-light table-striped table-bordered table-hover table-product"
                                >
                                    <thead>
                                        <tr>
                                            <th>Bộ nhớ</th>
                                            <th>Giá gốc</th>
                                            <th >Giá giảm</th>
                                            <th>Chỉnh sửa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product?.productVariants?.map((productVariant, index) => (
                                            <tr key={productVariant.id || index}>
                                                <td>{productVariant.storage}</td>
                                                <td>{productVariant.priceOrigin}</td>
                                                <td>{productVariant.priceDiscount}</td>
                                                <td><button className="btn btn-warning"><FaPen /></button></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="box-detail-container detail-specification">
                            <h6>Thông số sản phẩm</h6>
                            <div className="content-box-detail">
                                <table class="table table-light table-striped table-bordered table-hover table-product"
                                >

                                    <tbody>
                                        {product?.specifications?.map((spec) => {
                                            const filteredDetails = spec.specificationDetails?.filter(
                                                (detail) => detail.productId === product.id
                                            );

                                            // Không có detail đúng product → không render spec này
                                            if (!filteredDetails || filteredDetails.length === 0) return null;

                                            return (
                                                <React.Fragment key={spec.id}>
                                                    <tr className="table-secondary">
                                                        <td colSpan="3">
                                                            {spec.nameSpecification}
                                                        </td>
                                                    </tr>

                                                    {filteredDetails.map((detail, i) => (
                                                        <tr key={`${spec.id}-${i}`}>
                                                            <td>{detail.labelSpecification}</td>
                                                            <td>{detail.valueSpecification}</td>
                                                            <td><button className="btn btn-warning"><FaPen /></button></td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            );
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default ProductDetail;