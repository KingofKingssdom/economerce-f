import "./indexUser.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
function Order() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null); // 🔹 Lưu id đơn hàng cần xóa

    // Lấy danh sách đơn hàng
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/order/all`, { withCredentials: true });
            setOrders(response.data.data);
        } catch (error) {
            console.error("Lỗi gọi API lấy danh sách đơn hàng:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // 🔹 Hàm click nút xóa (chỉ mở box xác nhận)
    const handleOpenConfirm = (id) => {
        setSelectedOrderId(id);
        setShow(true);
    };

    // 🔹 Hàm gọi API xóa khi người dùng xác nhận
    const handleConfirmDelete = async () => {
        if (!selectedOrderId) return;

        try {
            await axios.put(
                `${API_BASE_URL}/order/delete?orderId=${selectedOrderId}&status=CANCELLED`,
                {},
                { withCredentials: true }
            );
            setShow(false);
            setSelectedOrderId(null);
            fetchOrders(); // Cập nhật lại danh sách đơn
        } catch (error) {
            console.error("Lỗi khi xóa đơn hàng:", error);
            alert("Có lỗi xảy ra khi xóa đơn hàng!");
        }
    };

    // 🔹 Đóng popup mà không xóa
    const handleClose = () => {
        setShow(false);
        setSelectedOrderId(null);
    };

    const statusMap = {
        PENDING: { text: "Đang chờ xác nhận", color: "orange" },
        CONFIRMED: { text: "Đã xác nhận", color: "blue" },
        DELIVERING: { text: "Đang giao hàng", color: "purple" },
        COMPLETED: { text: "Hoàn thành", color: "green" },
        CANCELLED: { text: "Đã hủy", color: "red" },
        PAID: { text: "Đã thanh toán", color: "green" },
        UNPAID: { text: "Chưa thanh toán", color: "red" },
        COD: { text: "Tiền mặt", color: "purple" },
        VNPAY: { text: "Ví VNPay", color: "blue" },
    };

    return (
        <div className="container-order">
            <div className="content-order">
                <h4 className="title">Đơn hàng của bạn</h4>
                <div className="container-rep-order">
                    {orders.length > 0 ? (
                        <table className="table table-light table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Tên đơn hàng</th>
                                    <th>Ngày cập nhật</th>
                                    <th>Tổng giá tiền</th>
                                    <th>Phương thức thanh toán</th>
                                    <th>Thanh toán</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.orderName}</td>
                                        <td>{new Date(order.dayCreate).toLocaleDateString("vi-VN")}</td>
                                        <td>
                                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice)}
                                        </td>
                                        <td style={{ color: statusMap[order.paymentMethod]?.color }}>
                                            {statusMap[order.paymentMethod]?.text}
                                        </td>
                                        <td style={{ color: statusMap[order.paymentStatus]?.color }}>
                                            {statusMap[order.paymentStatus]?.text}
                                        </td>
                                        <td style={{ color: statusMap[order.status]?.color }}>
                                            {statusMap[order.status]?.text}
                                        </td>
                                        <td>
                                            <Link to={`/orderDetail/${order.id}`}>
                                                <button className="btn-view">
                                                    <MdOutlineRemoveRedEye />
                                                </button>
                                            </Link>
                                            <button
                                                className="btn-cancel"
                                                onClick={() => handleOpenConfirm(order.id)} // 🔹 chỉ mở popup
                                            >
                                                <MdDeleteOutline />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        "Không có đơn hàng nào, vui lòng lựa chọn mua sản phẩm"
                    )}
                </div>
            </div>

            {/* 🔹 Popup xác nhận xóa */}
            {show && (
                <div className="table-confirm showBohover">
                    <div className="box-confirm showBox">
                        <h6>Bạn có chắc là muốn hủy đơn hàng này?</h6>
                        <div className="select-box-container">
                            <div className="btn-online" onClick={handleConfirmDelete}>
                                Xác nhận
                            </div>
                            <div className="btn-confirm-order" onClick={handleClose}>
                                Hủy bỏ
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Order;