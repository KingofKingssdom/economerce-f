import "../indexAdmin.css"
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
function ListOrderDetail() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`http://localhost:8080/orderItem/orderId?orderId=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchOrderDetail();
    }, [id]);

    return (
        <>
            <div className="container-orderDetail">
                <div className="content-orderDetail">
                    <h1>Chi tiết đơn hàng</h1>
                    <div className="limited">
                        <table class="table table-light table-striped table-bordered table-hover tb-d">
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th className="th-nd">Tên sản phẩm</th>
                                    <th>Giá sản phẩm</th>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Số lượng sản phẩm</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.map((orderDetail, index) => (
                                    <tr key={orderDetail.id || index}>
                                        <td>{orderDetail.product.id}</td>
                                        <td>{orderDetail.product.productName}</td>
                                        <td>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                            orderDetail.product.priceCurrent)}</td>
                                        <td><img className="img-detail" src={`data:image/jpeg;base64,${orderDetail.product.productImage}`} alt="Ảnh nhãn hiệu" /></td>
                                        <td>
                                            {orderDetail.quantity}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>


        </>
    )
}
export default ListOrderDetail;
