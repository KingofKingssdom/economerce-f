import { useState, useEffect } from "react";
import "./indexUser.css";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]); // mảng lưu id đã check
    const [show, setShow] = useState(false);

    const handleCheck = (id) => {
        setCheckedItems((prev) => {
            if (prev.includes(id)) {

                return prev.filter((item) => item !== id);
            } else {

                return [...prev, id];
            }
        });
    };


    const selectedItems = cartItems.filter((item) =>
        checkedItems.includes(item.id)
    );

    const totalAmount = selectedItems.reduce(
        (sum, item) => sum + item.totalPrice, 0
    );
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/cartItem/all`, { withCredentials: true });
            setCartItems(response.data.data);
        } catch (error) {
            console.error("Lỗi gọi API lấy cách mặt hàng trong giỏ hàng:", error);
        }
    };
    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleOrder = async () => {
        if (checkedItems.length === 0) {
            alert("Vui lòng chọn ít nhất 1 sản phẩm để đặt hàng!");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/order/create`, {
                cartItemIds: checkedItems,
            }, {
                withCredentials: true
            });
            const dataResponse = response.data.data;
            const orderId = dataResponse.id;
            sessionStorage.setItem("orderId", `${orderId}`);
            await fetchCartItems();
            setCheckedItems([]);
            setShow(true);

        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
            alert("Có lỗi xảy ra khi đặt hàng!");
        }
    };
    const handleClose = () => {
        setShow(false)
    }

    return (
        <>
            <div className="container-order">
                <div className="content-order">
                    <h4 className="title">Giỏ hàng của bạn</h4>
                    <div className="container-rep-order">
                        {cartItems.length > 0 ? (
                            cartItems.map((cartItem) => (
                                <div className="container-order-product" key={cartItem.id}>
                                    <div className="btn-check-item">
                                        <input
                                            className="check-select"
                                            type="checkbox"
                                            onClick={() => handleCheck(cartItem.id)}
                                        />
                                    </div>
                                    <div className="left-order-product">
                                        <img src={`${IMAGE_BASE_URL}${cartItem.productColor.urlPhoto}`} alt={cartItem.productName} />
                                    </div>
                                    <div className="center-order-product">
                                        <h6><b>Sản phẩm:</b> {cartItem.productName}</h6>
                                        <p className="p-buy"></p>
                                        <p><b>Số lượng:</b> {cartItem.quantity} </p>
                                        <p><b>Đơn giá: </b>
                                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                cartItem.productPrice)}
                                        </p>
                                        <p><b>Phiên bản:</b> {cartItem.productVariant.storage}</p>
                                        <p><b>Màu sắc:</b> {cartItem.productColor.titleVariant}</p>
                                    </div>

                                    <div className="rigth-order-product">
                                        <p><b>Thành tiền: </b> {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                            cartItem.totalPrice)}
                                        </p>

                                    </div>
                                    <div className="rigth-order-product">

                                        <div className="btn-delete">
                                            <MdDelete />
                                        </div>
                                    </div>

                                </div>

                            ))) : (
                            <p>Giỏ hàng của bạn trống hãy thêm sản phẩm vào giỏ hàng của mình nhé.</p>
                        )}
                    </div>


                    {cartItems.length > 0 ? (
                        <div className="container-total">
                            <p>
                                <b>Tổng tiền: </b>
                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalAmount)}
                            </p>


                            <div className="btn-buy"
                                onClick={handleOrder}
                            >
                                Mua ngay
                            </div>

                        </div>
                    ) : ("")}


                </div>
            </div>
            <div className={`table-confirm ${show ? "showBohover" : ""}`}>
                <div className={`box-confirm ${show ? "showBox" : ""}`}>
                    <h6>Chọn phương thức thanh toán</h6>
                    <div className="select-box-container ">
                        <Link
                            to="/payOnline"
                            className="btn-online"
                        >
                            <div


                            >
                                Thanh toán online
                            </div>
                        </Link>

                        <div
                            className="btn-confirm-order"
                            onClick={handleClose}
                        >
                            Thanh toán khi nhận hàng
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Cart;