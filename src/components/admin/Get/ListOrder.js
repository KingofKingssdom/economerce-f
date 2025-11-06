import "../indexAdmin.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import UpdateOrder from "../Update/UpdateOrder";

function ListOrder() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [orders, setOrders] = useState([]);
    const [idOrder, setIdOrder] = useState(0);
    const [toggle, setToggle] = useState(false);
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/order/search/all`);
            setOrders(response.data.data);
        } catch (error) {
            console.error("Lỗi lấy toàn bộ sản phẩm :", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleAcceptOrder = (id) => {
        setIdOrder(id);
        setToggle(true)

    }
    const handleUpdateSuccess = () => {
        fetchOrders();
        setToggle(false);   // đóng box
    };

    const statusMap = {
        PENDING: { text: "Chờ xác nhận", color: "orange" },
        CONFIRMED: { text: "Đã xác nhận", color: "blue" },
        SHIPPING: { text: "Đang giao", color: "purple" },
        DELIVERED: { text: "Hoàn thành", color: "green" },
        CANCELLED: { text: "Đã hủy", color: "red" },
        PAID: { text: "Đã thanh toán", color: "green" },
        UNPAID: { text: "Chưa thanh toán", color: "red" },
        COD: { text: "Tiền mặt", color: "purple" },
        VNPAY: { text: "Ví VNPay", color: "blue" },
    };
    return (
        <div className="container-admin">
            <div className="content">
                <h2>Danh sách đơn hàng</h2>
                <div className="box-containt-table list-product">
                    <table className="table table-light table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Tên đơn hàng</th>
                                <th>Ngày cập nhập</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Phương thức</th>
                                <th>Thanh toán</th>
                                <th>Người mua</th>
                                <th>Liên hệ</th>
                                <th>Email</th>

                                <th className="repair-table">Xem chi tiết</th>
                                <th className="repair-table">Chỉnh sửa</th>
                                <th className="repair-table">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id || index}>
                                    <td>{order.id}</td>
                                    <td>{order.orderName}</td>
                                    <td>{new Date(order.dayCreate).toLocaleDateString("vi-VN")}</td>
                                    <td>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice)}</td>
                                    <td style={{ color: statusMap[order.status]?.color }}>
                                        {statusMap[order.status]?.text}
                                    </td>
                                    <td style={{ color: statusMap[order.paymentMethod]?.color }}>
                                        {statusMap[order.paymentMethod]?.text}
                                    </td>
                                    <td style={{ color: statusMap[order.paymentStatus]?.color }}>
                                        {statusMap[order.paymentStatus]?.text}
                                    </td>


                                    <td>{order.fullName}</td>
                                    <td>{order.phoneNumber}</td>
                                    <td>{order.email}</td>
                                    <td>
                                        <Link to={`/admin/productDetail/${order.id}`}>
                                            <button className="btn btn-success">
                                                <MdOutlineRemoveRedEye />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-warning"
                                            onClick={() => { handleAcceptOrder(order.id) }}
                                        >
                                            <GoPencil />

                                        </button>

                                    </td>
                                    <td>
                                        {/* onClick={() => handleDelete(product.id)} */}
                                        <div className="btn btn-danger">
                                            <MdDeleteOutline />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={`container-box-seclect-order ${toggle ? "show-box-select-order" : ""}`}>
                {toggle && (
                    <UpdateOrder
                        id={idOrder}
                        isOpen={toggle}
                        onUpdateSuccess={handleUpdateSuccess}
                    />
                )}
            </div>
        </div>
    );
}

export default ListOrder;
