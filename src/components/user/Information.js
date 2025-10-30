import { useEffect, useState } from "react";
import "./indexUser.css";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

function Information() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { id } = useParams();
    const location = useLocation();

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [cart, setCart] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [amount, setAmount] = useState(0);
    const [orderInfo, setOrderInfo] = useState("");
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [transactionId, setTransactionId] = useState("");

    // Lấy giỏ hàng theo id
    useEffect(() => {
        if (!id) {
            console.error("Lỗi: id không hợp lệ");
            return;
        }
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/cart/${id}`);
                setCart(response.data);
            } catch (error) {
                console.error("Lỗi lấy giỏ hàng:", error);
            }
        };
        fetchCart();
    }, [id]);

    // Lấy sản phẩm trong giỏ hàng
    useEffect(() => {
        if (!cart.cartId) return;
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/cartItem/cart?cartId=${cart.cartId}`);
                setCartItems(response.data);
            } catch (error) {
                console.error("Lỗi lấy sản phẩm giỏ hàng:", error);
            }
        };
        fetchCartItems();
    }, [cart]);


    const totalPrice = cartItems.reduce((total, item) => total + item.product.priceCurrent * item.quantity, 0);

    // Cập nhật amount và orderInfo
    useEffect(() => {
        if (totalPrice >= 5000 && totalPrice < 1_000_000_000) {
            setAmount(Math.floor(totalPrice));
        } else {
            setAmount(5000);
        }
        setOrderInfo(`Order_${cart.cartId || "unknown"}`);
    }, [totalPrice, cart]);

    // Kiểm tra kết quả thanh toán khi quay lại từ VNPay
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const status = queryParams.get("paymentStatus");
        const transactionId = queryParams.get("transactionId");

        if (status) {
            setPaymentStatus(status);
            setTransactionId(transactionId || "");
        }
    }, [location]);

    // Xử lý đặt hàng và thanh toán
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cart.cartId || amount < 5000 || amount >= 1_000_000_000) {
            alert("Số tiền không hợp lệ! Hãy kiểm tra giỏ hàng.");
            return;
        }

        try {


            // 1. Gửi API tạo đơn hàng
            const formData = new FormData();
            formData.append("cartId", cart.cartId);
            formData.append("fullName", fullName);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("amount", amount);

            const orderResponse = await axios.post("http://localhost:8080/order/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",

                },
            });

            if (orderResponse.status === 200 || orderResponse.status === 201) {
                console.log("Đơn hàng đã được tạo thành công!");
            }

            // 2. Gửi API thanh toán VNPay 
            const paymentFormData = new FormData();
            paymentFormData.append("amount", amount * 100);
            paymentFormData.append("orderInfo", orderInfo);

            const vnpayResponse = await axios.post("http://localhost:8080/api/VNPay/submitOrder", paymentFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",

                },
            });

            if (vnpayResponse.status === 200) {
                console.log("Chuyển đến VNPay để thanh toán...");
                window.location.href = vnpayResponse.data.vnpayUrl;
            } else {
                alert("Lỗi khi tạo thanh toán VNPay!");
            }
        } catch (error) {
            console.error("Lỗi gửi api thanh toán:", error);
            alert("Có lỗi xảy ra! Vui lòng thử lại.");
        }
    };

    return (
        <div className="container-form">
            <div className="header-form">Vui lòng điền chính xác thông tin nhận hàng</div>

            {paymentStatus && (
                <div className={`payment-status ${paymentStatus === "Success" ? "success" : "failed"}`}>
                    {paymentStatus === "Success"
                        ? `Thanh toán thành công! Mã giao dịch: ${transactionId}`
                        : "Thanh toán thất bại. Vui lòng thử lại!"}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Họ và tên</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Nhập địa chỉ</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Số tiền thanh toán</label>
                    <input type="text" id="amount" value={amount.toLocaleString("vi-VN")} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="orderInfo">Mã đơn hàng</label>
                    <input type="text" id="orderInfo" value={orderInfo} readOnly />
                </div>
                <div className="form-group">
                    <button type="submit">XÁC NHẬN</button>
                </div>
            </form>
        </div>
    );
}

export default Information;
