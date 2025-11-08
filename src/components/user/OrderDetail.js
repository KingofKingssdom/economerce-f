import "./indexUser.css"
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
function OrderDetail() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);

    const fetchOrderItems = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/orderItem/all?orderId=${id}`, { withCredentials: true });
            setOrderDetails(response.data.data); // <-- lấy đúng field data
        } catch (error) {
            console.error("Lỗi gọi API lấy cách mặt hàng trong giỏ hàng:", error);
        }
    };
    useEffect(() => {
        fetchOrderItems();
    }, []);
    return (
        <>
            <div className="container-order">
                <div className="content-order">
                    <h4 className="title">Chi tiết đơn hàng</h4>
                    <div className="container-rep-order">
                        {orderDetails.length > 0 ? (
                            orderDetails.map((orderItem) => (
                                <div className="container-order-product" key={orderItem.id}>
                                    <div>
                                    </div>
                                    <div className="left-order-product">
                                        <img src={`${IMAGE_BASE_URL}${orderItem.productColor.urlPhoto}`} alt={orderItem.productName} />
                                    </div>
                                    <div className="center-order-product">
                                        <h6><b>Sản phẩm:</b> {orderItem.productName}</h6>
                                        <p className="p-buy"></p>
                                        <p><b>Số lượng:</b> {orderItem.quantity} </p>
                                        <p><b>Đơn giá: </b>
                                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                orderItem.priceBuy)}
                                        </p>
                                        <p><b>Phiên bản:</b> {orderItem.productVariant.storage}</p>
                                        <p><b>Màu sắc:</b> {orderItem.productColor.titleVariant}</p>
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            ))) : (
                            <p>Không có sản phẩm nào </p>
                        )}


                    </div>

                </div>

            </div>

        </>
    )
}
export default OrderDetail;
