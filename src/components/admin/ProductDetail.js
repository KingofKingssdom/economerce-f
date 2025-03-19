import "./indexAdmin.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";

function ProductDetail() {
    const { id } = useParams(); // Lấy id từ URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
    
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/product/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product detail:', error);
                setError(error);
                setLoading(false);
            }
        };

        // Chỉ gọi API khi id thay đổi
        if (id) {
            fetchProduct();
        }
    }, [id]); 


    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Có lỗi xảy ra: {error.message}</div>;

    return(
        <>
        <div className="container-admin">
        <div className="content">
            <div className="header">
                <h2>Thông tin chi tiết sản phẩm</h2>
            </div>
            {product && (
                <div className="DetailStudent-container">
                    <img 
                        alt="Thông tin chi tiết học sinh"  
                        src={`data:image/jpeg;base64,${product.productImage}`}
                    />
                    <div className="DetailStudent-content">
                        <p><span>Tên sản phẩm:</span> {product.productName}</p>
                        <p><span>Giá trước khi giảm:</span> { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                 product.pricePrevious)}</p>
                        <p><span>Giá hiện tại:</span> { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                 product.priceCurrent)}</p>
                        <p><span>Giảm giá:</span> {product.discountPercent }</p>
                        <p><span>Trả góp:</span> {product.installment }</p>
                        <p><span>Thông tin khuyễn mãi:</span> {product.description }</p> 
                        <p><span>Số lượng:</span> {product.quantity }</p> 
                        <p><span>Tình trạng:</span> {product.status}</p>
                    </div>
                </div>
            )}
        </div>
        </div>
        
        </>
    )
}

export default ProductDetail;