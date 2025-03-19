import "./indexAdmin.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ListOrder() {
    const [orders, setOrders] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false); // Toggle để hiển thị đơn đã giao
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/order/getAll", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrder();
    }, []);

    // Hàm cập nhật trạng thái đơn hàng
    const handleUpdateOrder = async (id, status, description) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:8080/order/update/status/${id}`,
                null,
                {
                    params: { status, description },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Cập nhật lại danh sách đơn hàng sau khi cập nhật
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === id ? { ...order, status, description } : order
                )
            );

            if (response.status === 200) {
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 5000);}
        } catch (error) {
            console.error("Lỗi cập nhật đơn hàng:", error);
            alert("Cập nhật thất bại!");
        }
    };

    // Lọc đơn hàng theo trạng thái
    const filteredOrders = showCompleted
        ? orders // Hiển thị tất cả nếu bật "Xem đơn đã giao"
        : orders.filter((order) => order.status !== "ĐÃ GIAO HÀNG");

    return (
        <div className="container-listOrder">
            <div className="content-listOrder">
                <h1>Danh sách đơn hàng</h1>
                {showMessage && <div className="notification-success">
                    <p>Cập nhập thành công!</p>
                </div> }
                {/* Toggle Hiển thị đơn đã giao */}
                <button
                    className="btn btn-info mb-3"
                    onClick={() => setShowCompleted(!showCompleted)}
                >
                    {showCompleted ? "Ẩn đơn hàng đã giao" : "Hiển thị đơn hàng đã giao"}
                </button>

                <div className="limited">
                {filteredOrders.length > 0 ? (
                     filteredOrders.map((order) => (
                    <table key={order.id} className="table table-light table-striped table-bordered table-hover list-orderTable">
                        <thead >
                            <tr>
                                <th className="th-id">Mã đơn hàng</th>
                                <th>Tên khách hàng</th>
                                <th className="th-id">Số điện thoại</th>
                                <th className="th-id">Địa chỉ</th>
                                <th className="th-st">Trạng thái</th>
                                <th>Mô tả</th>
                                <th>Chi tiết đơn hàng</th>
                                <th>Cập nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                                    <tr>
                                        <td>{order.id}</td>
                                        <td>{order.fullName}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.address}</td>
                                        <td>
                                            <select
                                                value={order.status || "CHỜ GIAO HÀNG"}
                                                onChange={(e) => {
                                                    const newStatus = e.target.value;
                                                    setOrders((prevOrders) =>
                                                        prevOrders.map((o) =>
                                                            o.id === order.id ? { ...o, status: newStatus } : o
                                                        )
                                                    );
                                                }}
                                            >
                                                <option value="CHỜ GIAO HÀNG">CHỜ GIAO HÀNG</option>
                                                <option value="ĐANG GIAO HÀNG">ĐANG GIAO HÀNG</option>
                                                <option value="ĐÃ GIAO HÀNG">ĐÃ GIAO HÀNG</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={order.description || ""}
                                                onChange={(e) => {
                                                    const newDescription = e.target.value;
                                                    setOrders((prevOrders) =>
                                                        prevOrders.map((o) =>
                                                            o.id === order.id ? { ...o, description: newDescription } : o
                                                        )
                                                    );
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <Link to={`/admin/orderDetail/${order.id}`}>
                                                <button className="btn btn-success">Xem chi tiết</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => handleUpdateOrder(order.id, order.status, order.description)}
                                            >
                                                Cập nhật
                                            </button>
                                        </td>
                                    </tr>
                                
                            
                        </tbody>
                    </table>
                   )) ) : (
                        <p>Không có đơn hàng nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListOrder;
