//import { useEffect, useState } from "react";
import "./indexUser.css";
import axios from "axios";
function PayMethod() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const id = sessionStorage.getItem("orderId");
    let maDon = "";
    let amount = "";
    let orderInfo = "";
    const handleCheckoutVNPay = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/order/search?orderId=${id}`,

                {
                    withCredentials: true
                });
            const dataResponse = response.data.data;
            maDon = dataResponse.id;
            amount = dataResponse.totalPrice;
            const orderInforOld = dataResponse.orderName;
            const orderInforNew = orderInforOld.split("|")[0].replace(/\s+/g, '');
            console.log("Giá trị mới " + orderInforNew)
            orderInfo = orderInforNew;

        } catch (error) {
            console.error("Lỗi khi chọn Lấy sản phẩm trong Session :", error);
            alert("Có lỗi xảy ra khi chọn thanh toán theo VNPay!");
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/VNPay/submitOrder?amount=${amount}&orderInfo=${orderInfo}&orderId=${maDon}`,
                {

                },
                {
                    withCredentials: true
                });
            const dataResponse = response.data;
            const vnPayUrl = dataResponse.vnpayUrl;
            window.location.href = vnPayUrl;
        } catch (error) {
            console.error("Lỗi khi chọn thanh toán theo VNPay :", error);
            alert("Có lỗi xảy ra khi chọn thanh toán theo VNPay!");
        }
    };
    console.log(orderInfo)

    return (
        <>
            <div className="container-paymethod">
                <h3>Chọn hình thức thanh toán</h3>
                <div className="pay-select-container">
                    <div className="select-VNpay"
                        onClick={handleCheckoutVNPay}
                    >
                        <img
                            src="/image/VNPay.jpg"
                            alt="LogoVNPay"
                        />
                    </div>
                    <div
                        className="select-other-pay"
                    >
                        Khác
                    </div>
                </div>
            </div>
        </>
    )
}
export default PayMethod;