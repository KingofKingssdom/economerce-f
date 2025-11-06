import '../indexAdmin.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateOrder({ id, onUpdateSuccess, isOpen }) {

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [status, setStatus] = useState("");
    const [toggle, setToggle] = useState(false);
    const [closeBox, setCloseBox] = useState(false);
    const [togglePay, setTogglePay] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCloseBox(false);
            setToggle(false);
            setTogglePay(false);
            setStatus("");
        }
    }, [isOpen]);
    const handleConfirmStatus = async () => {
        try {
            await axios.put(
                `${API_BASE_URL}/order/update?orderId=${id}&status=${status}`,
                {},
                { withCredentials: true }

            );
            if (onUpdateSuccess) onUpdateSuccess();
            setCloseBox(true)
        } catch (error) {
            console.error("Lỗi khi cập nhập trạng thái đơn hàng:", error);
            alert("Có lỗi xảy ra khi cập nhập trạng thái đơn hàng!");
        }
    };
    const handleConfirmPaymentStatus = async () => {
        try {
            await axios.put(
                `${API_BASE_URL}/order/update/paymentStatus?orderId=${id}&paymentStatus=${status}`,
                {},
                { withCredentials: true }

            );
            if (onUpdateSuccess) onUpdateSuccess();
            setCloseBox(true)
        } catch (error) {
            console.error("Lỗi khi cập nhập trạng thái đơn hàng:", error);
            alert("Có lỗi xảy ra khi cập nhập trạng thái đơn hàng!");
        }
    };
    return (
        <>
            <div className={`container-accept-common ${closeBox ? "hidden-box" : ""}`}>
                <div className={`container-select-accept ${toggle ? "hidden-box" : ""}`}>
                    <h5>Lựa chọn xác nhận</h5>
                    <div className="content-select-accept">
                        <div className='content-select-status'
                            onClick={() => { setToggle(true) }}
                        >
                            Trạng thái
                        </div>
                        <div className='content-select-pay'
                            onClick={() => { setTogglePay(true) }}
                        >
                            Thanh toán
                        </div>

                    </div>

                </div>
                <div className={`container-select-accept-status-order ${toggle ? "" : "hidden-box"} `}>
                    <h5>Trạng thái đơn hàng</h5>
                    <div>
                        <label htmlFor="status">Trạng thái sản phẩm:</label>
                        <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Chọn</option>
                            <option value="CONFIRMED">Xác nhận đơn</option>
                            <option value="SHIPPING">Đang giao</option>
                            <option value="DELIVERED">Đã giao</option>
                            <option value="CANCELLED">Đã hủy</option>
                        </select>
                    </div>

                    <button className='btn btn-success'
                        onClick={handleConfirmStatus}
                    >
                        Xác nhận
                    </button>
                </div>

                <div className={`container-select-accept-status-order ${togglePay ? "" : "hidden-box"} `}>
                    <h5>Trạng thái thanh toán</h5>
                    <div>
                        <label htmlFor="status">Trạng thái thanh toán:</label>
                        <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Chọn</option>
                            <option value="UNPAID">Chưa thanh toán</option>
                            <option value="PAID">Đã thanh toán</option>
                            <option value="REFUNDED">Hoàn tiền</option>
                        </select>
                    </div>

                    <button className='btn btn-success'
                        onClick={handleConfirmPaymentStatus}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>



        </>
    )
}
export default UpdateOrder;
