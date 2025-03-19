import "./indexUser.css"
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Order() {
    const [orders, setOrders] = useState([]);
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        if (user && user.id) { // Chỉ gọi API đơn hàng khi có userId
            const fetchOrder = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/order/user?userId=${user.id}`, {
                        withCredentials: true, //  Gửi session
                    });
                    setOrders(response.data);
                } catch (error) {
                    console.error("Lỗi lấy đơn hàng:", error);
                }
            };
    
            fetchOrder();
        }
    }, [user]);
   

    return(
        <div className="container-order">
        <div className="content-order">
            <h1>Đơn hàng của bạn</h1>
            <div className="limited">
           {orders.length > 0 ? (<table class="table table-light table-striped table-bordered table-hover">
            <thead>
                        <tr>
                            <th className="th-id">Mã đơn hàng</th>
                            <th className="th-st">Trạng thái</th>
                            <th>Mô tả</th>
                            <th>Chi tiết đơn hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.status}</td>
                                    <td>{order.description}</td>
                                    <td>
                                        <Link to={`/orderDetail/${order.id}`}>
                                            <button  className="btn btn-success">Xem chi tiết</button> - 
                                        </Link> 
                                               
                                    </td>
                                </tr>
                            ))}
                    </tbody>

        </table>):( "Không có đơn hàng nào vui lòng lựa chọn mua sản phẩm")} 
            </div>
             
        </div>
        </div>
        )
}
export default Order;